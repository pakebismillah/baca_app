/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import ChatBot from "../components/ChatBot.jsx";
import ChatSidebar from "../components/ChatSideBar.jsx";
import ChatHeader from "../components/ChatHeader.jsx";
import ChatMessagesArea from "../components/ChatMessagesArea.jsx";
import EmptyState from "../components/EmptyState.jsx";

export default function AiPage() {
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  const currentSession = chatSessions.find(s => s.id === currentSessionId);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSession?.messages, isTyping]);

  // Create new chat session
  const createNewSession = () => {
    const newSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
    };
    setChatSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    return newSession.id;
  };

  // Delete chat session
  const deleteSession = (sessionId) => {
    if (window.confirm('Hapus riwayat chat ini?')) {
      setChatSessions(prev => prev.filter(s => s.id !== sessionId));
      if (currentSessionId === sessionId) {
        setCurrentSessionId(null);
      }
    }
  };

  // Generate session title from first message
  const generateSessionTitle = (message) => {
    return message.length > 30 ? message.substring(0, 30) + '...' : message;
  };

  const askAi = async (input) => {
    let sessionId = currentSessionId;
    
    // Create new session if none exists
    if (!sessionId) {
      sessionId = createNewSession();
    }

    // Add user message immediately to UI
    setChatSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const isFirstMessage = session.messages.length === 0;
        return {
          ...session,
          title: isFirstMessage ? generateSessionTitle(input) : session.title,
          messages: [...session.messages, { 
            role: "user", 
            text: input, 
            timestamp: new Date().toISOString() 
          }]
        };
      }
      return session;
    }));

    setIsTyping(true);

    try {
      // Get current session for history
      const currentSessionData = chatSessions.find(s => s.id === sessionId);
      const history = currentSessionData ? currentSessionData.messages : [];

      const res = await fetch("http://localhost:3000/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          question: input, 
          history: history 
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // Add AI response to session
      setChatSessions(prev => prev.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            messages: [...session.messages, { 
              role: "ai", 
              text: data.answer || "Maaf, tidak ada jawaban yang diterima.", 
              timestamp: new Date().toISOString() 
            }]
          };
        }
        return session;
      }));
    } catch (error) {
      console.error('Error asking AI:', error);
      
      // Add error message
      setChatSessions(prev => prev.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            messages: [...session.messages, { 
              role: "ai", 
              text: `Maaf, terjadi kesalahan: ${error.message}. Silakan coba lagi.`, 
              timestamp: new Date().toISOString(),
              isError: true
            }]
          };
        }
        return session;
      }));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCreateNew={createNewSession}
        sessions={chatSessions}
        currentSessionId={currentSessionId}
        onSelectSession={setCurrentSessionId}
        onDeleteSession={deleteSession}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <ChatHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={setSidebarOpen}
          currentSession={currentSession}
          onDeleteSession={deleteSession}
        />

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {!currentSession || currentSession.messages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="p-6">
              <ChatMessagesArea 
                messages={currentSession.messages} 
                isTyping={isTyping} 
              />
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="bg-white border-t border-gray-200 p-6">
          <ChatBot 
            onSend={askAi} 
            disabled={isTyping}
            placeholder={currentSession ? "Ask about your book database..." : "Start a new conversation..."}
          />
        </div>
      </div>
    </div>
  );
}