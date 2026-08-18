import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import BotEditor from './components/BotEditor.jsx';
import SettingsView from './components/SettingsView.jsx';
import { getBots } from './api.js';

export default function App() {
  const [bots, setBots] = useState([]);
  const [activeBotId, setActiveBotId] = useState(null);
  const [view, setView] = useState('chat'); // 'chat' | 'create' | 'edit' | 'settings'
  const [editingBot, setEditingBot] = useState(null);

  const loadBots = useCallback(async () => {
    try {
      const data = await getBots();
      setBots(data);
    } catch (err) {
      console.error('加载机器人列表失败:', err);
    }
  }, []);

  useEffect(() => {
    loadBots();
  }, [loadBots]);

  const activeBot = bots.find(b => b.id === activeBotId) || null;

  const handleSelectBot = (id) => {
    setActiveBotId(id);
    setView('chat');
  };

  const handleCreateBot = () => {
    setEditingBot(null);
    setView('create');
  };

  const handleEditBot = (bot) => {
    setEditingBot(bot);
    setView('edit');
  };

  const handleBotSaved = () => {
    loadBots();
    setView('chat');
    setEditingBot(null);
  };

  const handleBotDeleted = () => {
    loadBots();
    setView('chat');
    setActiveBotId(null);
    setEditingBot(null);
  };

  const handleOpenSettings = () => {
    setView('settings');
  };

  const handleBack = () => {
    setView('chat');
    setEditingBot(null);
  };

  return (
    <div className="app">
      <Sidebar
        bots={bots}
        activeBotId={activeBotId}
        onSelectBot={handleSelectBot}
        onCreateBot={handleCreateBot}
        onEditBot={handleEditBot}
        onOpenSettings={handleOpenSettings}
      />

      <main className="main-content">
        {view === 'create' && (
          <BotEditor onSaved={handleBotSaved} onCancel={handleBack} />
        )}
        {view === 'edit' && editingBot && (
          <BotEditor bot={editingBot} onSaved={handleBotSaved} onDeleted={handleBotDeleted} onCancel={handleBack} />
        )}
        {view === 'settings' && (
          <SettingsView onBack={handleBack} />
        )}
        {view === 'chat' && activeBot && (
          <ChatWindow bot={activeBot} onBotUpdated={loadBots} />
        )}
        {view === 'chat' && !activeBot && (
          <div className="empty-state">
            <div className="empty-icon">👋</div>
            <h2>欢迎来到AI角色扮演！</h2>
            <p>左侧选择或创建一个聊天机器人，开始对话吧～</p>
          </div>
        )}
      </main>
    </div>
  );
}
