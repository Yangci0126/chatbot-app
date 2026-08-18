import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../api.js';

export default function SettingsView({ onBack }) {
  const [settings, setSettings] = useState({ api_key: '', api_base_url: 'https://api.deepseek.com', default_model: 'deepseek-chat' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (err) {
      console.error('加载设置失败:', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateSettings(settings);
      setMessage('✅ 设置已保存！');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ 保存失败：' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field) => (e) => {
    setSettings(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="settings-view">
      <div className="editor-header">
        <button className="btn btn-ghost" onClick={onBack}>← 返回</button>
        <h2>⚙️ API 设置</h2>
      </div>

      {message && <div className={`info-banner ${message.startsWith('✅') ? 'success' : 'error'}`}>{message}</div>}

      <form onSubmit={handleSave} className="editor-form">
        <div className="form-group">
          <label htmlFor="api-key">API Key</label>
          <input
            id="api-key"
            type="password"
            value={settings.api_key || ''}
            onChange={handleChange('api_key')}
            placeholder="输入你的 API Key..."
          />
          <p className="form-hint">
            DeepSeek 的 API Key 可在 <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer">platform.deepseek.com</a> 获取。
            也支持其他兼容 OpenAI 接口的服务。
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="api-base-url">API Base URL</label>
          <input
            id="api-base-url"
            type="text"
            value={settings.api_base_url || ''}
            onChange={handleChange('api_base_url')}
            placeholder="https://api.deepseek.com"
          />
          <p className="form-hint">
            OpenAI 兼容的 API 地址。DeepSeek 默认是 https://api.deepseek.com
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="default-model">默认模型</label>
          <input
            id="default-model"
            type="text"
            value={settings.default_model || ''}
            onChange={handleChange('default_model')}
            placeholder="deepseek-chat"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? '保存中...' : '💾 保存设置'}
          </button>
        </div>
      </form>
    </div>
  );
}
