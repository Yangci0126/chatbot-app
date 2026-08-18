import React, { useState, useEffect } from 'react';
import { createBot, updateBot, deleteBot } from '../api.js';

const AVATAR_OPTIONS = [
  '🤖', '🧑‍🚀', '🦊', '🐱', '🐶', '🐼', '🦄', '🐉',
  '🧙‍♂️', '🧛', '🧝', '👻', '😺', '🦸', '👽'
];

const THEME_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
  '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#06b6d4', '#3b82f6',
];

export default function BotEditor({ bot, onSaved, onDeleted, onCancel }) {
  const isEditing = !!bot;

  const [form, setForm] = useState({
    name: '',
    avatar: '🤖',
    avatar_type: 'emoji',
    personality: '',
    backstory: '',
    theme_color: '#6366f1',
    model: 'deepseek-chat',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bot) {
      setForm({
        name: bot.name || '',
        avatar: bot.avatar || '🤖',
        avatar_type: bot.avatar_type || 'emoji',
        personality: bot.personality || '',
        backstory: bot.backstory || '',
        theme_color: bot.theme_color || '#6366f1',
        model: bot.model || 'deepseek-chat',
      });
    }
  }, [bot]);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleAvatarSelect = (emoji) => {
    setForm(prev => ({ ...prev, avatar: emoji, avatar_type: 'emoji' }));
  };

  const handleColorSelect = (color) => {
    setForm(prev => ({ ...prev, theme_color: color }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('名字不能为空！给你的机器人起个酷酷的名字吧～');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (isEditing) {
        await updateBot(bot.id, form);
      } else {
        await createBot(form);
      }
      onSaved();
    } catch (err) {
      setError('保存失败：' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`确定要删除「${bot.name}」吗？所有聊天记录也会一起删掉哦！`)) return;
    try {
      await deleteBot(bot.id);
      onDeleted();
    } catch (err) {
      setError('删除失败：' + err.message);
    }
  };

  return (
    <div className="bot-editor">
      <div className="editor-header">
        <button className="btn btn-ghost" onClick={onCancel}>← 返回</button>
        <h2>{isEditing ? '✏️ 编辑机器人' : '✨ 创建新机器人'}</h2>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-group">
          <label>名字</label>
          <input
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="给你的机器人起个名字..."
            maxLength={30}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>头像（选一个Emoji）</label>
          <div className="avatar-picker">
            {AVATAR_OPTIONS.map(emoji => (
              <button
                key={emoji}
                type="button"
                className={`avatar-option ${form.avatar === emoji ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>主题色</label>
          <div className="avatar-picker">
            {THEME_COLORS.map(color => (
              <button
                key={color}
                type="button"
                className={`avatar-option ${form.theme_color === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              >
                {form.theme_color === color ? '✓' : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="personality">性格设定</label>
          <textarea
            id="personality"
            value={form.personality}
            onChange={handleChange('personality')}
            rows={4}
            placeholder="例如：温柔体贴的邻家姐姐，说话轻声细语，喜欢用颜文字，偶尔会撒娇..."
          />
          <p className="form-hint">描述机器人的性格、说话风格、情绪反应方式。越详细越好。</p>
        </div>

        <div className="form-group">
          <label htmlFor="backstory">背景故事 / 世界观</label>
          <textarea
            id="backstory"
            value={form.backstory}
            onChange={handleChange('backstory')}
            rows={4}
            placeholder="例如：你是一个来自22世纪的AI助手，在一次时空实验中被送到了现代。你对这个时代充满好奇..."
          />
          <p className="form-hint">机器人的身份、背景、所在世界。这部分定义了它的「想法」和「认知」。</p>
        </div>

        <div className="form-group">
          <label htmlFor="model">AI 模型</label>
          <input
            id="model"
            type="text"
            value={form.model}
            onChange={handleChange('model')}
            placeholder="deepseek-chat"
          />
          <p className="form-hint">使用的模型名称，如 deepseek-chat、gpt-4o 等</p>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? '保存中...' : isEditing ? '💾 保存修改' : '✨ 创建机器人'}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              🗑️ 删除
            </button>
          )}
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
