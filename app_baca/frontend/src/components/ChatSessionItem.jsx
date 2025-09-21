// components/ChatSessionItem.jsx
import React from 'react';

const ChatSessionItem = ({ session, isActive, onSelect, onDelete }) => (
  <div className={`
    group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200
    ${isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}
  `} onClick={onSelect}>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-medium truncate ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
        {session.title || 'New Chat'}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        {session.messages?.length || 0} messages • {new Date(session.createdAt).toLocaleDateString()}
      </p>
    </div>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete(session.id);
      }}
      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
    >
      🗑️
    </button>
  </div>
);

export default ChatSessionItem;