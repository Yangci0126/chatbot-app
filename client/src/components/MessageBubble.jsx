import React from 'react';

export default function MessageBubble({ message, botAvatar, themeColor }) {
  const isUser = message.role === 'user';

  return (
    <div className={`message-row ${isUser ? 'message-user' : 'message-assistant'}`}>
      {!isUser && (
        <div className="message-avatar" style={{ backgroundColor: themeColor + '20' }}>
          {botAvatar}
        </div>
      )}
      <div
        className={`message-bubble ${isUser ? 'bubble-user' : 'bubble-assistant'}`}
        style={!isUser ? { borderLeftColor: themeColor } : {}}
      >
        <div className="message-content">{message.content}</div>
      </div>
      {isUser && (
        <div className="message-avatar message-avatar-user">👤</div>
      )}
    </div>
  );
}
