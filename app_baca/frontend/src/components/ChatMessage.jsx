// components/ChatMessage.jsx
import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.isError;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`
        max-w-[80%] rounded-2xl px-4 py-3 
        ${isUser 
          ? 'bg-blue-500 text-white' 
          : isError 
            ? 'bg-red-50 text-red-800 border border-red-200' 
            : 'bg-gray-100 text-gray-800'
        }
      `}>
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs">🤖</span>
            </div>
            <span className="text-xs font-medium text-gray-600">AI Assistant</span>
          </div>
        )}
        
        <div className="whitespace-pre-wrap">
          {message.text}
        </div>
        
        <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;