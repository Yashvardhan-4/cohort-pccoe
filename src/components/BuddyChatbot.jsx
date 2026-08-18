import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Sparkles, Compass, Users, MapPin, Gamepad2, Calendar } from 'lucide-react';
import { dataStore } from '../lib/supabase';

export const BuddyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hey! I'm Buddy, your Cohort campus assistant. Ask me about clubs, finding peers, campus directions, or platform features!",
      time: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText = '';
      let routeAction = null;

      const clubs = dataStore.getClubs();
      const users = dataStore.getUsers();

      if (lower.includes('community') || lower.includes('club') || lower.includes('gdgc') || lower.includes('owasp')) {
        replyText = `We have 30+ active student clubs! Major ones include OWASP (Cybersecurity), GDGC (Google Developer Groups), ACM, GFG, and Art Circle. Would you like to explore the Communities directory?`;
        routeAction = { label: 'Explore Communities', path: '/dashboard/communities' };
      } else if (lower.includes('map') || lower.includes('location') || lower.includes('canteen') || lower.includes('mech') || lower.includes('lab')) {
        replyText = `PCCOE Campus Navigation: Computer & IT building is at B-Block, Mechanical is at A-Block, and the Canteen is near the central courtyard. Open the 3D Campus Map to see interactive floor layouts!`;
        routeAction = { label: 'Open Campus Map', path: '/dashboard/map' };
      } else if (lower.includes('chirag') || lower.includes('yashvardhan') || lower.includes('friend') || lower.includes('peer') || lower.includes('user')) {
        replyText = `You can search students and alumni in the Friends / Network directory. Found profiles for Chirag Ferwani (@chirag), Yashvardhan Borude (@yashvardhan), and Pooja Iyer (@pooja_iyer).`;
        routeAction = { label: 'View Network', path: '/dashboard/network' };
      } else if (lower.includes('game') || lower.includes('chess') || lower.includes('arcade') || lower.includes('sudoku')) {
        replyText = `Feeling like a brain break? You can challenge me to a game of Chess, solve a Sudoku puzzle, or play Tic-Tac-Toe in the Arcade!`;
        routeAction = { label: 'Launch Arcade', path: '/dashboard/arcade' };
      } else if (lower.includes('calendar') || lower.includes('exam') || lower.includes('insem') || lower.includes('holiday')) {
        replyText = `The next In-Sem examinations begin on 25th August, followed by OWASP CyberSprint on 28th August. Check the full schedule in the Academic Calendar.`;
        routeAction = { label: 'View Academic Calendar', path: '/dashboard/calendar' };
      } else if (lower.includes('xd') || lower.includes('confession') || lower.includes('secret') || lower.includes('tip')) {
        replyText = `XD is the anonymous campus board where students share candid tips, placement advice, and cafeteria reviews.`;
        routeAction = { label: 'Open XD Exchange', path: '/dashboard/xd' };
      } else {
        replyText = `I can help you navigate anything on Cohort! Try checking out the Communities directory, 3D Campus Map, Realtime Connect messaging, or the Arcade.`;
        routeAction = { label: 'Go to Feed', path: '/dashboard' };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          routeAction,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Buddy Avatar Launcher */}
      <div className="fixed bottom-5 right-5 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-2.5 rounded-full bg-card/90 backdrop-blur-md border border-accent/40 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-accent"
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            <img
              src="/buddy-removebg-preview_cwrfpd.png"
              alt="Buddy AI"
              className="w-12 h-12 object-contain drop-shadow-md transition-transform duration-300 group-hover:rotate-6"
            />
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full animate-pulse" />
          </div>
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-22 right-4 sm:right-6 w-[min(92vw,380px)] h-[520px] z-50 rounded-2xl bg-card border border-border/80 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-muted/30 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center overflow-hidden">
                  <img
                    src="/buddy-removebg-preview_cwrfpd.png"
                    alt="Buddy"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-1.5 text-foreground">
                    Buddy <Sparkles className="w-3.5 h-3.5 text-accent fill-accent/30" />
                  </h3>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Campus AI Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompt Pills */}
            <div className="p-2 border-b border-border/40 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none bg-background/50">
              <button
                onClick={() => handleSend('Show student clubs')}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-muted/60 hover:bg-accent/20 hover:text-accent transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Users className="w-3 h-3" /> Clubs
              </button>
              <button
                onClick={() => handleSend('Where is Mechanical building?')}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-muted/60 hover:bg-accent/20 hover:text-accent transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <MapPin className="w-3 h-3" /> Campus Map
              </button>
              <button
                onClick={() => handleSend('Play games in Arcade')}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-muted/60 hover:bg-accent/20 hover:text-accent transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Gamepad2 className="w-3 h-3" /> Arcade
              </button>
              <button
                onClick={() => handleSend('Upcoming exams')}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-muted/60 hover:bg-accent/20 hover:text-accent transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Calendar className="w-3 h-3" /> Exams
              </button>
            </div>

            {/* Message List */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-accent text-white rounded-br-none'
                        : 'bg-muted/70 text-foreground border border-border/50 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    {m.routeAction && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate(m.routeAction.path);
                        }}
                        className="mt-2 w-full py-1.5 px-3 rounded-lg bg-background/80 hover:bg-background text-foreground border border-border text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Compass className="w-3 h-3 text-accent" /> {m.routeAction.label}
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {m.time}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/50 rounded-full w-fit">
                  <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-2.5 bg-background border-t border-border flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Buddy anything..."
                className="flex-1 bg-muted/50 text-foreground text-xs px-3.5 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-border/50"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-accent text-white hover:bg-accent/90 disabled:opacity-40 transition-opacity cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
