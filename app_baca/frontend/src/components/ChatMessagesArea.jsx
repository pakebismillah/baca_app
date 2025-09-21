// components/ChatMessagesArea.jsx
import React from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

const ChatMessagesArea = ({ messages, isTyping }) => {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default ChatMessagesArea;