// components/ChatSidebar.jsx
import React from 'react';
import ChatSessionItem from './ChatSessionItem';

const ChatSidebar = ({ 
  isOpen, 
  onClose, 
  onCreateNew, 
  sessions, 
  currentSessionId, 
  onSelectSession, 
  onDeleteSession 
}) => {
  return (
    <div className={`
      ${isOpen ? 'w-80' : 'w-0'}
      transition-all duration-300 ease-in-out bg-white border-r border-gray-200 flex flex-col
      overflow-hidden
    `}>
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Chat History</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors lg:hidden"
          >
            ✕
          </button>
        </div>
        <button
          onClick={onCreateNew}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          + New Chat
        </button>
      </div>

      {/* Chat Sessions List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No chat history yet</p>
              <p className="text-sm mt-2">Start a conversation to see your chats here</p>
            </div>
          ) : (
            sessions.map(session => (
              <ChatSessionItem
                key={session.id}
                session={session}
                isActive={session.id === currentSessionId}
                onSelect={() => onSelectSession(session.id)}
                onDelete={onDeleteSession}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;