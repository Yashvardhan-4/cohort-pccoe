import React, { useState } from 'react';
import { Search, UserPlus, Users, Sparkles, UserCheck, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlumniVector,
  DiscoverStudentsVector,
  BuildConnectionsVector,
  ViewProfilesVector,
  SmileyAvatarSVG,
} from '../components/PremiumVectors';

const NETWORK_STUDENTS = [
  { id: 's1', username: 'shravan24', name: 'C157_ Shravan Kolhe', letter: 'C', bg: 'bg-purple-600' },
  { id: 's2', username: 'felina22', name: 'FELINA MATHEW', avatarColor: '#10B981', isSmiley: true },
  { id: 's3', username: 'arnav24', name: 'ARNAV JOSHI', avatarColor: '#6366F1', isSmiley: true },
  { id: 's4', username: 'gaurav25', name: 'GAURAV PATIL', letter: 'G', bg: 'bg-teal-600' },
  { id: 's5', username: 'rohada24', name: 'ROHIT KULKARNI', avatarColor: '#14B8A6', isSmiley: true },
  { id: 's6', username: 'suraj25', name: 'SURAJ DESHMUKH', letter: 'S', bg: 'bg-teal-700' },
  { id: 's7', username: 'vrushabhhirap8', name: 'VRUSHABH HIRAP', avatarImg: '/user1_ghlxbj.jpg' },
  { id: 's8', username: 'nikhil25', name: 'NIKHIL SHINDE', letter: 'N', bg: 'bg-stone-600' },
  { id: 's9', username: 'ninad24', name: 'NINAD JADHAV', avatarColor: '#8B5CF6', isSmiley: true },
  { id: 's10', username: 'aryajadhav', name: 'ARYA JADHAV', avatarColor: '#F43F5E', isSmiley: true },
];

export const Network = () => {
  const [followingState, setFollowingState] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  const toggleFollow = (id) => {
    setFollowingState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredStudents = NETWORK_STUDENTS.filter((s) =>
    s.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 select-none relative">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold font-secondary text-foreground">
            c/network
          </h1>
          <img
            src="/assets/dark1-BZ1HA7yb.svg"
            alt="Spider-man doodle"
            className="w-10 h-10 object-contain opacity-70"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Discover, connect, and build your campus network.
        </p>
      </div>

      {/* Top 4 Action Bento Bar with Animated Vector SVG Graphics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Card 1: Alumni Connect */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          onClick={() => setActiveModal('Alumni Connect')}
          className="p-5 rounded-3xl bg-card border border-border/80 text-center space-y-3 shadow-sm hover:border-accent/60 transition-all cursor-pointer group relative overflow-hidden"
        >
          <AlumniVector />
          <p className="text-xs font-bold text-foreground group-hover:text-accent transition-colors">
            Alumni Connect
          </p>
        </motion.div>

        {/* Card 2: Discover Students */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          onClick={() => setActiveModal('Discover Students')}
          className="p-5 rounded-3xl bg-card border border-border/80 text-center space-y-3 shadow-sm hover:border-accent/60 transition-all cursor-pointer group relative overflow-hidden"
        >
          <DiscoverStudentsVector />
          <p className="text-xs font-bold text-foreground group-hover:text-accent transition-colors">
            Discover Students
          </p>
        </motion.div>

        {/* Card 3: Build Connections */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          onClick={() => setActiveModal('Build Connections')}
          className="p-5 rounded-3xl bg-card border border-border/80 text-center space-y-3 shadow-sm hover:border-accent/60 transition-all cursor-pointer group relative overflow-hidden"
        >
          <BuildConnectionsVector />
          <p className="text-xs font-bold text-foreground group-hover:text-accent transition-colors">
            Build Connections
          </p>
        </motion.div>

        {/* Card 4: View Profiles */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          onClick={() => setActiveModal('View Profiles')}
          className="p-5 rounded-3xl bg-card border border-border/80 text-center space-y-3 shadow-sm hover:border-accent/60 transition-all cursor-pointer group relative overflow-hidden"
        >
          <ViewProfilesVector />
          <p className="text-xs font-bold text-foreground group-hover:text-accent transition-colors">
            View Profiles
          </p>
        </motion.div>
      </div>

      {/* Students Circular Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-secondary text-foreground">
            Students
          </h2>
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3.5 py-1.5 rounded-xl bg-card border border-border text-xs text-foreground focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {filteredStudents.map((s) => {
            const isFollowing = followingState[s.id];

            return (
              <div
                key={s.id}
                className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-card/60 border border-border/60 hover:border-accent/40 transition-all group"
              >
                {/* Circular Avatar */}
                {s.avatarImg ? (
                  <img
                    src={s.avatarImg}
                    alt={s.username}
                    className="w-16 h-16 rounded-full object-cover border-2 border-border shadow-md"
                  />
                ) : s.isSmiley ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-border/40">
                    <SmileyAvatarSVG color={s.avatarColor} />
                  </div>
                ) : (
                  <div
                    className={`w-16 h-16 rounded-full ${s.bg} text-white font-bold text-xl flex items-center justify-center shadow-lg`}
                  >
                    {s.letter}
                  </div>
                )}

                {/* Username */}
                <p className="text-xs font-bold text-foreground text-center truncate w-full">
                  @{s.username}
                </p>

                {/* Follow Button with Glowing Drop Shadow */}
                <button
                  onClick={() => toggleFollow(s.id)}
                  className={`w-full py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-md ${
                    isFollowing
                      ? 'bg-muted text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500'
                      : 'bg-[#2563EB] text-white hover:bg-blue-600 shadow-blue-500/30'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal for Action Bento */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-base font-bold font-secondary text-foreground">
                  {activeModal}
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect with verified PCCOE alumni, explore mutual campus batches, and send connection requests directly.
              </p>
              <div className="p-3 rounded-2xl bg-muted/40 border border-border text-xs space-y-1">
                <span className="font-bold text-foreground">Active Directory:</span>
                <p className="text-muted-foreground">350+ enrolled students and alumni across 6 engineering departments.</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-full bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
