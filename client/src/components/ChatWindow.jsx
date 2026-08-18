import React, { useState, useEffect, useRef, useCallback } from 'react';
import MessageBubble from './MessageBubble.jsx';
import { getMessages, sendMessage, clearMessages } from '../api.js';

export default function ChatWindow({ bot, onBotUpdated }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const loadMessages = useCallback(async () => {
    try {
      const data = await getMessages(bot.id);
      setMessages(data);
    } catch (err) {
      console.error('加载消息失败:', err);
    }
  }, [bot.id]);

  useEffect(() => {
    setMessages([]);
    setError('');
    setInput('');
    loadMessages();
  }, [bot.id, loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const content = input.trim();
    if (!content || loading) return;

    // 先添加用户消息到界面
    const userMsg = { id: Date.now(), bot_id: bot.id, role: 'user', content, created_at: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const data = await sendMessage(bot.id, content);
      if (data.needSetup) {
        setError('请先在左侧「API设置」中配置 API Key～');
        return;
      }
      const assistantMsg = {
        id: Date.now() + 1,
        bot_id: bot.id,
        role: 'assistant',
        content: data.reply,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      onBotUpdated();
    } catch (err) {
      setError('发送失败：' + err.message);
      // 移除已添加的用户消息
      setMessages(prev => prev.filter(m => m.id !== userMsg.id));
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = async () => {
    if (!window.confirm('确定要清空所有聊天记录吗？')) return;
    try {
      await clearMessages(bot.id);
      setMessages([]);
    } catch (err) {
      setError('清空失败：' + err.message);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header" style={{ borderBottomColor: bot.theme_color || '#6366f1' }}>
        <div className="chat-bot-info">
          <div className="chat-bot-avatar">{bot.avatar}</div>
          <div>
            <div className="chat-bot-name">{bot.name}</div>
            {bot.personality && (
              <div className="chat-bot-desc">{bot.personality.slice(0, 60)}</div>
            )}
          </div>
        </div>
        <div className="chat-actions">
          <button className="btn btn-ghost btn-sm" onClick={handleClear} title="清空对话">
            🗑️ 清空
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="messages-empty">
            <div style={{ fontSize: 48 }}>{bot.avatar}</div>
            <h3>开始和 {bot.name} 聊天吧！</h3>
            <p>{bot.personality ? `Ta 的性格：${bot.personality.slice(0, 50)}...` : '输入第一条消息开始对话～'}</p>
          </div>
        )}
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            message={msg}
            botAvatar={bot.avatar}
            themeColor={bot.theme_color || '#6366f1'}
          />
        ))}
        {loading && (
          <div className="typing-indicator">
            <div className="message-avatar" style={{ backgroundColor: (bot.theme_color || '#6366f1') + '20' }}>
              {bot.avatar}
            </div>
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>{bot.name} 正在输入...</span>
          </div>
        )}
        {error && <div className="error-banner chat-error">{error}</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          ref={inputRef}
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`跟 ${bot.name} 说点什么...`}
          rows={1}
          disabled={loading}
          autoFocus
        />
        <button
          className="btn btn-primary send-btn"
          onClick={handleSend}
          disabled={!input.trim() || loading}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
