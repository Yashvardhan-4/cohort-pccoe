import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  RefreshCw,
  Maximize2,
  Minimize2,
  Compass,
  BookOpen,
  MapPin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { askBuddyAI } from '../lib/gemini';

const SUGGESTED_CAMPUS_PROMPTS = [
  'Where are the Computer Labs in B-Block?',
  'Tell me about GDGC & Team Redline clubs.',
  'How do I find notes for In-Sem exams?',
  'What are the best food spots near PCCOE gate?',
];

export const BuddyAIChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 'init_1',
      isUser: false,
      text: 'Hey Yashvardhan! 👋 I am **Buddy AI**, your personalized PCCOE campus assistant powered by Gemini. Ask me anything about campus locations, clubs, notes, syllabus, or Cohort features!',
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim() || isTyping) return;

    const userMsg = {
      id: `u_${Date.now()}`,
      isUser: true,
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await askBuddyAI(query, messages);
      const aiMsg = {
        id: `ai_${Date.now()}`,
        isUser: false,
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      const errorMsg = {
        id: `err_${Date.now()}`,
        isUser: false,
        text: 'Sorry, I ran into a network glitch. Please try asking again!',
        time: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-20 right-4 sm:right-8 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden select-none"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center p-1 border border-white/30">
                <img
                  src="/buddy-removebg-preview_cwrfpd.png"
                  alt="Buddy AI"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold font-secondary">Buddy AI</h3>
                  <span className="px-1.5 py-0.2 rounded bg-white/20 text-[9px] font-extrabold uppercase">
                    Gemini 1.5
                  </span>
                </div>
                <p className="text-[10px] text-purple-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Official PCCOE Campus Companion
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isUser && (
                  <div className="w-7 h-7 rounded-xl bg-purple-600/20 text-purple-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                    msg.isUser
                      ? 'bg-[#2563EB] text-white rounded-br-none shadow-sm'
                      : 'bg-card border border-border text-foreground rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`text-[9px] block text-right ${
                      msg.isUser ? 'text-blue-200' : 'text-muted-foreground'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 pl-9">
                <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                <span>Buddy AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          {messages.length < 3 && (
            <div className="p-2 border-t border-border/50 bg-card flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {SUGGESTED_CAMPUS_PROMPTS.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-muted/60 hover:bg-accent/20 hover:text-accent border border-border/60 text-[10px] font-medium text-muted-foreground whitespace-nowrap transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-card border-t border-border flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask Buddy AI about PCCOE..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 rounded-2xl bg-[#2563EB] text-white disabled:opacity-40 shadow-sm cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
