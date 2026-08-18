import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Edit3,
  Linkedin,
  MessageSquare,
  Mail,
  LogOut,
  Camera,
  CheckCircle,
  X,
  Save,
  Cpu,
  Cog,
  Radio,
  Building,
  Brain,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SmileyAvatarSVG,
  BentoCommunitiesSVG,
  BentoFollowersSVG,
  BentoFollowingSVG,
  BentoFlexSVG,
} from '../components/PremiumVectors';

const DEPARTMENT_BADGES = {
  COMP: {
    code: 'COMP',
    fullName: 'Computer Engineering',
    themeGradient: 'from-[#818CF8] via-[#C084FC] to-[#D8B4FE]',
    stampColor: 'border-white/60 text-white',
    icon: Cpu,
    doodleTag: 'COMP_DEPT // 0101',
  },
  IT: {
    code: 'IT',
    fullName: 'Information Technology',
    themeGradient: 'from-[#60A5FA] via-[#818CF8] to-[#C084FC]',
    stampColor: 'border-blue-200/80 text-white',
    icon: Sparkles,
    doodleTag: 'IT_DEPT // CLOUD',
  },
  MECH: {
    code: 'MECH',
    fullName: 'Mechanical Engineering',
    themeGradient: 'from-[#FB923C] via-[#F43F5E] to-[#8B5CF6]',
    stampColor: 'border-amber-200/80 text-white',
    icon: Cog,
    doodleTag: 'MECH_DEPT // TURBO',
  },
  ENTC: {
    code: 'ENTC',
    fullName: 'Electronics & Telecommunication',
    themeGradient: 'from-[#34D399] via-[#06B6D4] to-[#6366F1]',
    stampColor: 'border-emerald-200/80 text-white',
    icon: Radio,
    doodleTag: 'ENTC_DEPT // RF_WAVE',
  },
  CIVIL: {
    code: 'CIVIL',
    fullName: 'Civil Engineering',
    themeGradient: 'from-[#FBBF24] via-[#D97706] to-[#78350F]',
    stampColor: 'border-yellow-200/80 text-white',
    icon: Building,
    doodleTag: 'CIVIL_DEPT // ARCH',
  },
  AIDS: {
    code: 'AI-DS',
    fullName: 'Artificial Intelligence & Data Science',
    themeGradient: 'from-[#EC4899] via-[#8B5CF6] to-[#3B82F6]',
    stampColor: 'border-pink-200/80 text-white',
    icon: Brain,
    doodleTag: 'AIDS_DEPT // NEURAL',
  },
};

export const StudentProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Profile State
  const [profileData, setProfileData] = useState({
    name: '256_Yashvardhan_Borude',
    username: 'yashvardhan24',
    dept: 'COMP',
    whatsapp: '919876543210',
    linkedin: 'yashvardhan-borude',
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tempData, setTempData] = useState(profileData);
  const [activeTab, setActiveTab] = useState('posts');

  const currentBadge = DEPARTMENT_BADGES[profileData.dept] || DEPARTMENT_BADGES.COMP;
  const BadgeIcon = currentBadge.icon;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData(tempData);
    setEditModalOpen(false);
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none relative">
      {/* Ambient Spider-man Stickers */}
      <img
        src="/assets/dark1-BZ1HA7yb.svg"
        alt="Spider-man top"
        className="w-12 h-12 object-contain opacity-50 absolute -top-4 right-10 pointer-events-none"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />

      {/* Main Profile Capsule Container */}
      <div className="rounded-3xl bg-card border border-border/80 overflow-hidden shadow-md">
        {/* Animated Gradient Cover Banner */}
        <div
          className={`h-48 sm:h-56 bg-gradient-to-r ${currentBadge.themeGradient} relative p-5 sm:p-6 flex items-start justify-between overflow-hidden transition-all duration-700`}
        >
          {/* Animated Background Mesh & Wave Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/30 pointer-events-none" />

          {/* Floating Spider-man on Banner (Screenshot 1) */}
          <div className="absolute top-4 left-24 z-10">
            <img
              src="/assets/dark3-QsL2CcWP.svg"
              alt="Spider-man sketch"
              className="w-10 h-10 object-contain opacity-75 filter drop-shadow-md animate-bounce"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Animated Department Floating Doodle */}
          <div className="absolute bottom-4 left-36 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-mono border border-white/20 shadow-md">
            <BadgeIcon className="w-3.5 h-3.5 text-accent animate-spin" />
            <span className="font-bold tracking-wider">{currentBadge.doodleTag}</span>
          </div>

          <div />

          {/* Right Header: Badge + Live Animated Personalised Department Stamp */}
          <div className="flex items-center gap-3 z-10">
            {/* COHORT USER Pill */}
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-white/40 text-xs font-bold text-foreground shadow-lg">
              <span>COHORT USER</span>
              <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-current text-white" />
            </span>

            {/* Live Personalised Rotating Department Stamp (Screenshot 1) */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Rotating Circular Text Ring */}
              <svg className="w-full h-full animate-[spin_12s_linear_infinite] overflow-visible">
                <defs>
                  <path
                    id="stampCircle"
                    d="M 40,40 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
                    fill="none"
                  />
                </defs>
                <text className="text-[7.5px] font-extrabold uppercase fill-white tracking-[0.2em]">
                  <textPath href="#stampCircle" startOffset="0%">
                    COHORT SOCIAL • {currentBadge.code} • COHORT SOCIAL •
                  </textPath>
                </text>
              </svg>

              {/* Inner Department Code Capsule */}
              <div className="absolute inset-2.5 rounded-full border-2 border-white/80 bg-white/15 backdrop-blur-md flex flex-col items-center justify-center shadow-inner">
                <span className="text-[11px] font-black tracking-tight text-white leading-none">
                  {currentBadge.code}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Body Row */}
        <div className="px-6 sm:px-8 pb-6 relative pt-4">
          {/* Overlapping Vector Avatar Capsule */}
          <div className="absolute -top-14 sm:-top-16 left-6 sm:left-8 z-20">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-xl border-4 border-card bg-[#10B981]">
                <SmileyAvatarSVG color="#10B981" />
              </div>
              <button
                onClick={() => setEditModalOpen(true)}
                title="Change Avatar"
                className="absolute bottom-0 right-0 p-2 rounded-full bg-[#2563EB] text-white hover:bg-blue-600 shadow-md cursor-pointer transition-transform hover:scale-110"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* User Details & Action Buttons (Right-aligned) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-12 sm:pt-0 sm:pl-32">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-foreground">
                {profileData.name}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                @{profileData.username}
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setTempData(profileData);
                  setEditModalOpen(true);
                }}
                title="Edit Profile"
                className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <a
                href={`https://linkedin.com/in/${profileData.linkedin}`}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={() => navigate('/dashboard/connect')}
                title="Send Chat"
                className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <a
                href={`https://wa.me/${profileData.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                title="WhatsApp Message"
                className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>

          {/* 4-Card Metric Bento with Crisp Vector SVGs (Screenshot 1) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 text-center space-y-2">
              <BentoCommunitiesSVG />
              <p className="text-xl font-extrabold text-foreground">5</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                COMMUNITIES
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 text-center space-y-2">
              <BentoFollowersSVG />
              <p className="text-xl font-extrabold text-foreground">0</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                FOLLOWERS
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 text-center space-y-2">
              <BentoFollowingSVG />
              <p className="text-xl font-extrabold text-foreground">3</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                FOLLOWING
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 text-center space-y-2">
              <BentoFlexSVG />
              <p className="text-xl font-extrabold text-foreground">0</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                FLEX
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-secondary text-foreground">
          Activity
        </h3>

        {/* Tabs: Posts 0 | Replies 0 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'posts'
                ? 'bg-card border border-border text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Posts <span className="text-accent ml-1">0</span>
          </button>
          <button
            onClick={() => setActiveTab('replies')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'replies'
                ? 'bg-card border border-border text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Replies <span className="text-muted-foreground ml-1">0</span>
          </button>
        </div>

        {/* Empty State */}
        <div className="p-12 rounded-3xl bg-card border border-border/80 text-center space-y-3 shadow-sm relative">
          <p className="text-xs text-muted-foreground">No posts yet.</p>
          <div className="flex justify-center">
            <img
              src="/assets/dark6-D8XR4DWk.png"
              alt="Spider-man doodle"
              className="w-14 h-14 object-contain opacity-30"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* ===================== EDIT PROFILE MODAL (Screenshot 2) ===================== */}
      <AnimatePresence>
        {editModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-[#18181B] text-white border border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-bold font-secondary text-white">
                  Edit Profile
                </h3>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSaveProfile} className="space-y-4">
                {/* NAME */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={tempData.name}
                    onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* USERNAME */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    USERNAME
                  </label>
                  <div className="flex items-center px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 focus-within:border-cyan-400">
                    <span className="text-zinc-500 text-xs mr-1">@</span>
                    <input
                      type="text"
                      required
                      value={tempData.username}
                      onChange={(e) => setTempData({ ...tempData, username: e.target.value })}
                      className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2-Column Row: DEPARTMENT & WHATSAPP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      DEPARTMENT
                    </label>
                    <select
                      value={tempData.dept}
                      onChange={(e) => setTempData({ ...tempData, dept: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      <option value="COMP">COMP (Computer Eng)</option>
                      <option value="IT">IT (Information Tech)</option>
                      <option value="MECH">MECH (Mechanical Eng)</option>
                      <option value="ENTC">ENTC (Electronics & TC)</option>
                      <option value="CIVIL">CIVIL (Civil Eng)</option>
                      <option value="AIDS">AIDS (AI & Data Science)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      WHATSAPP
                    </label>
                    <input
                      type="text"
                      placeholder="91XXXXXXXXXX"
                      value={tempData.whatsapp}
                      onChange={(e) => setTempData({ ...tempData, whatsapp: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* LINKEDIN USERNAME */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    LINKEDIN USERNAME
                  </label>
                  <div className="flex items-center px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 focus-within:border-cyan-400">
                    <span className="text-zinc-500 text-xs mr-1">linkedin.com/in/</span>
                    <input
                      type="text"
                      placeholder="your-linkedin-username"
                      value={tempData.linkedin}
                      onChange={(e) => setTempData({ ...tempData, linkedin: e.target.value })}
                      className="w-full bg-transparent text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Bottom Action Buttons (Screenshot 2) */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2DD4BF] hover:bg-[#14B8A6] text-black text-xs font-bold shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
