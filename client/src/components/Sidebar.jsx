import React from 'react';

export default function Sidebar({ bots, activeBotId, onSelectBot, onCreateBot, onEditBot, onOpenSettings }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">🤖 AI角色扮演</h1>
      </div>

      <button className="btn btn-primary sidebar-create-btn" onClick={onCreateBot}>
        ✨ 创建机器人
      </button>

      <nav className="bot-list">
        {bots.map(bot => (
          <div
            key={bot.id}
            className={`bot-list-item ${bot.id === activeBotId ? 'active' : ''}`}
            onClick={() => onSelectBot(bot.id)}
          >
            <span className="bot-avatar">{bot.avatar}</span>
            <span className="bot-name">{bot.name}</span>
            <button
              className="bot-edit-btn"
              onClick={(e) => { e.stopPropagation(); onEditBot(bot); }}
              title="编辑机器人"
            >
              ⚙️
            </button>
          </div>
        ))}
        {bots.length === 0 && (
          <div className="bot-list-empty">
            <p>还没有机器人</p>
            <p>点击上方按钮创建～</p>
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="btn btn-ghost" onClick={onOpenSettings}>
          ⚙️ API设置
        </button>
      </div>
    </aside>
  );
}
