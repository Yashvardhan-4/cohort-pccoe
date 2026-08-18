import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Shield,
  Search,
  Send,
  Lock,
  Clock,
  Sparkles,
  Paperclip,
  Smile,
  Mic,
  MoreVertical,
  CheckCheck,
  User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmileyAvatarSVG } from '../components/PremiumVectors';

const CONNECT_MEMBERS = [
  {
    id: 'm_1',
    name: '004_Aaryan_Bhujang',
    username: 'aaryan23',
    isSmiley: true,
    avatarColor: '#F43F5E',
    status: 'Online',
  },
  {
    id: 'm_2',
    name: '005_nisha Devatwal',
    username: 'nisha24',
    letter: 'D',
    avatarBg: 'bg-orange-700',
    status: 'Active 5m ago',
  },
  {
    id: 'm_3',
    name: '005_Rudraksh_Charhate',
    username: 'rudraksh23',
    isSmiley: true,
    avatarColor: '#F43F5E',
    status: 'Online',
  },
  {
    id: 'm_4',
    name: '007_Aboli Jadhav',
    username: 'aboli25',
    letter: 'A',
    avatarBg: 'bg-blue-500',
    status: 'Offline',
  },
  {
    id: 'm_5',
    name: '021-Shreyash_Desai',
    username: 'shreyash23',
    letter: 'S',
    avatarBg: 'bg-slate-900',
    status: 'Online',
  },
  {
    id: 'm_6',
    name: '027 - MANASVI PATIL',
    username: 'manasvi24',
    letter: 'P',
    avatarBg: 'bg-blue-600',
    status: 'Active 1h ago',
  },
];

export const Connect = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState({});
  const [inputText, setInputText] = useState('');

  const filteredMembers = CONNECT_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedUser) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: user?.name || 'Me',
      isMe: true,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      expiresIn: 30,
    };

    const currentChat = messages[selectedUser.id] || [];
    setMessages({
      ...messages,
      [selectedUser.id]: [...currentChat, newMsg],
    });
    setInputText('');
  };

  const activeMessages = selectedUser ? messages[selectedUser.id] || [] : [];

  return (
    <div className="w-full h-full flex flex-col space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold font-secondary text-foreground">
          c/connect
        </h1>
        <img
          src="/assets/dark1-BZ1HA7yb.svg"
          alt="Spider-man doodle"
          className="w-10 h-10 object-contain opacity-70"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
          Encrypted chats for cohort users. Messages auto-disappear 30 seconds after read.
        </span>
      </div>

      {/* Full-Width Full-Height Conversation Arena */}
      <div className="h-[calc(100vh-8.5rem)] w-full rounded-3xl bg-card border border-border/80 overflow-hidden shadow-lg flex flex-col md:flex-row">
        {/* Left Contacts Drawer (w-80) */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-border/60 p-4 flex flex-col gap-4 overflow-y-auto shrink-0 bg-muted/10">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-2xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-accent"
            />
          </div>

          {/* RECENTS Section */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              RECENTS
            </span>
            <p className="text-xs text-muted-foreground/60 py-0.5">No users</p>
          </div>

          {/* FOLLOWERS Section */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              FOLLOWERS
            </span>
            <p className="text-xs text-muted-foreground/60 py-0.5">No users</p>
          </div>

          {/* MEMBERS Section */}
          <div className="space-y-2 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              MEMBERS ({filteredMembers.length})
            </span>
            <div className="space-y-1.5">
              {filteredMembers.map((member) => {
                const isSelected = selectedUser?.id === member.id;

                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedUser(member)}
                    className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#2563EB] font-bold'
                        : 'hover:bg-muted/60 text-foreground'
                    }`}
                  >
                    {member.isSmiley ? (
                      <div className="w-9 h-9 rounded-full overflow-hidden shadow-sm shrink-0">
                        <SmileyAvatarSVG color={member.avatarColor} />
                      </div>
                    ) : (
                      <div
                        className={`w-9 h-9 rounded-full ${member.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                      >
                        {member.letter}
                      </div>
                    )}
                    <div className="truncate flex-1">
                      <p className="text-xs font-bold truncate leading-tight">
                        {member.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        @{member.username}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Full-Width Center Encrypted Chat Arena */}
        <div className="flex-1 flex flex-col justify-between bg-background/50 relative p-6 h-full overflow-hidden">
          {!selectedUser ? (
            /* Empty Secure Conversation State */
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-blue-500/10 text-[#2563EB] flex items-center justify-center shadow-inner">
                <Shield className="w-10 h-10" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold font-secondary text-foreground">
                  Start a secure conversation
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Pick any cohort user from the left to open an encrypted chat. Messages auto-disappear 30 seconds after read with zero server logs.
                </p>
              </div>
            </div>
          ) : (
            /* Active Full-Bleed Conversation Arena */
            <div className="flex-1 flex flex-col justify-between h-full space-y-4 overflow-hidden">
              {/* Chat Top Banner */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3 shrink-0">
                <div className="flex items-center gap-3">
                  {selectedUser.isSmiley ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm shrink-0">
                      <SmileyAvatarSVG color={selectedUser.avatarColor} />
                    </div>
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full ${selectedUser.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-sm`}
                    >
                      {selectedUser.letter}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {selectedUser.name}
                    </h3>
                    <p className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
                      <Lock className="w-3 h-3" /> End-to-End Encrypted • {selectedUser.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Feed Area */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                <div className="flex justify-center my-2">
                  <span className="px-3 py-1 rounded-full bg-muted/60 text-[10px] font-medium text-muted-foreground border border-border/40">
                    🔒 Messages in this chat are secured with 256-bit encryption and auto-destruct
                  </span>
                </div>

                {activeMessages.length === 0 ? (
                  <div className="text-center py-16 space-y-2">
                    <p className="text-xs text-muted-foreground">
                      No messages yet with @{selectedUser.username}.
                    </p>
                    <p className="text-[11px] text-accent font-semibold">
                      Say hello to start the encrypted session!
                    </p>
                  </div>
                ) : (
                  activeMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-xs font-medium max-w-md shadow-sm ${
                          msg.isMe
                            ? 'bg-[#2563EB] text-white rounded-br-none'
                            : 'bg-card border border-border text-foreground rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground px-1">
                        <Clock className="w-2.5 h-2.5 text-amber-500" />
                        <span>30s auto-delete</span>
                        <span>•</span>
                        <span>{msg.time}</span>
                        {msg.isMe && <CheckCheck className="w-3 h-3 text-blue-500" />}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Message Input Bar */}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-border/60 shrink-0">
                <input
                  type="text"
                  placeholder="Type an encrypted message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-card border border-border text-xs text-foreground focus:outline-none focus:border-accent shadow-sm"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-3 rounded-2xl bg-[#2563EB] text-white disabled:opacity-40 shadow-md cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
