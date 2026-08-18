import { Router } from 'express';
import OpenAI from 'openai';
import { getBot, getMessages, saveMessage, clearMessages, getRecentMessages, getSetting, updateSettings, updateBot } from '../db.js';

const router = Router();

function buildSystemPrompt(bot) {
  const parts = [];
  parts.push(`你是"${bot.name}"。`);
  if (bot.personality) {
    parts.push(`【性格设定】${bot.personality}`);
  }
  if (bot.backstory) {
    parts.push(`【背景故事/世界观】${bot.backstory}`);
  }
  parts.push('请严格按照以上设定与用户对话，始终保持角色一致性。');
  return parts.join('\n');
}

function getOpenAIClient() {
  const apiKey = getSetting('api_key');
  const baseURL = getSetting('api_base_url');

  if (!apiKey) {
    return null;
  }

  return new OpenAI({
    apiKey,
    baseURL: baseURL || 'https://api.deepseek.com',
  });
}

// 获取某个机器人的历史消息
router.get('/:botId/messages', (req, res) => {
  const messages = getMessages(Number(req.params.botId));
  res.json(messages);
});

// 发送消息并获取回复
router.post('/:botId/send', async (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: '消息不能为空哦～' });
  }

  const bot = getBot(Number(req.params.botId));
  if (!bot) {
    return res.status(404).json({ error: 'Bot not found' });
  }

  const client = getOpenAIClient();
  if (!client) {
    return res.status(400).json({
      error: '请先在设置中配置 API Key～',
      needSetup: true,
    });
  }

  // 保存用户消息
  saveMessage(bot.id, 'user', content.trim());

  // 获取最近的历史消息（最多20条），用于上下文
  const history = getRecentMessages(bot.id, 20);

  // 构建消息列表
  const messages = [
    { role: 'system', content: buildSystemPrompt(bot) },
    ...history.map(m => ({ role: m.role, content: m.content })),
  ];

  try {
    const completion = await client.chat.completions.create({
      model: bot.model || 'deepseek-chat',
      messages,
      temperature: 0.8,
      max_tokens: 2000,
    });

    const reply = completion.choices[0]?.message?.content || '（对方沉默了...）';

    // 保存助手回复
    saveMessage(bot.id, 'assistant', reply);

    // 触发更新时间戳
    updateBot(bot.id, { name: bot.name });

    res.json({ reply });
  } catch (err) {
    console.error('LLM API error:', err);
    res.status(500).json({
      error: `调用 AI 出错：${err.message || '未知错误'}`,
    });
  }
});

// 清空对话历史
router.delete('/:botId/messages', (req, res) => {
  clearMessages(Number(req.params.botId));
  res.json({ success: true });
});

export default router;
