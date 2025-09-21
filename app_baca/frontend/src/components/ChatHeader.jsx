// components/ChatHeader.jsx
import React from 'react';

const ChatHeader = ({ 
  sidebarOpen, 
  onToggleSidebar, 
  currentSession, 
  onDeleteSession 
}) => {
  return (
    <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {!sidebarOpen && (
          <button
            onClick={() => onToggleSidebar(true)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ☰
          </button>
        )}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">AI SQL Assistant</h1>
          <p className="text-sm text-gray-500">
            {currentSession ? `${currentSession.messages.length} messages` : 'Ready to help with your queries'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {currentSession && (
          <button
            onClick={() => onDeleteSession(currentSession.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete current chat"
          >
            🗑️
          </button>
        )}
        <button
          onClick={() => onToggleSidebar(!sidebarOpen)}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          title="Toggle sidebar"
        >
          {sidebarOpen ? '→' : '←'}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;