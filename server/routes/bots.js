import { Router } from 'express';
import { getAllBots, getBot, createBot, updateBot, deleteBot } from '../db.js';

const router = Router();

// 获取所有机器人
router.get('/', (req, res) => {
  const bots = getAllBots();
  res.json(bots);
});

// 获取单个机器人
router.get('/:id', (req, res) => {
  const bot = getBot(Number(req.params.id));
  if (!bot) return res.status(404).json({ error: 'Bot not found' });
  res.json(bot);
});

// 创建机器人
router.post('/', (req, res) => {
  const { name, avatar, avatar_type, personality, backstory, theme_color, model } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: '名字不能为空哦～' });
  }
  const bot = createBot({ name, avatar, avatar_type, personality, backstory, theme_color, model });
  res.status(201).json(bot);
});

// 更新机器人
router.put('/:id', (req, res) => {
  const bot = getBot(Number(req.params.id));
  if (!bot) return res.status(404).json({ error: 'Bot not found' });

  const updated = updateBot(Number(req.params.id), req.body);
  res.json(updated);
});

// 删除机器人（级联删除消息）
router.delete('/:id', (req, res) => {
  const ok = deleteBot(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: 'Bot not found' });
  res.json({ success: true });
});

export default router;
