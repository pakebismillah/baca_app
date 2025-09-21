// components/ChatHistory.jsx
import React from 'react';

const ChatHistory = ({ history, isTyping }) => {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {history.map((message, index) => {
        const isUser = message.role === 'user';
        const isError = message.isError;

        return (
          <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
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
                {message.timestamp ? new Date(message.timestamp).toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }) : ''}
              </div>
            </div>
          </div>
        );
      })}
      
      {isTyping && (
        <div className="flex justify-start mb-4">
          <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%]">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-xs">🤖</span>
              </div>
              <span className="text-xs font-medium text-gray-600">AI Assistant</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-500 ml-2">AI sedang mengetik...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;