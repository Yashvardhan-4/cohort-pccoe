import React from 'react';
import { motion } from 'framer-motion';

// Premium Minimalist Vector Avatar (Smiley Face)
export const SmileyAvatarSVG = ({ className = 'w-full h-full', color = '#10B981' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="100" height="100" rx="30" fill={color} />
    {/* Eyes */}
    <circle cx="34" cy="44" r="6" fill="#090A0C" />
    <circle cx="66" cy="44" r="6" fill="#090A0C" />
    {/* Curved Smile */}
    <path
      d="M34 62 C42 74, 58 74, 66 62"
      stroke="#090A0C"
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Animated Alumni Connect Vector
export const AlumniVector = ({ className = 'w-16 h-16' }) => (
  <motion.div
    animate={{ y: [0, -3, 0] }}
    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
    className={`relative flex items-center justify-center ${className}`}
  >
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="alumniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Center Figure */}
      <circle cx="40" cy="30" r="12" fill="url(#alumniGrad)" />
      <path d="M22 66 C22 50, 58 50, 58 66" fill="url(#alumniGrad)" opacity="0.85" />
      {/* Left Figure */}
      <circle cx="20" cy="38" r="8" fill="#64748B" opacity="0.7" />
      <path d="M8 68 C8 56, 32 56, 32 68" fill="#64748B" opacity="0.5" />
      {/* Right Figure */}
      <circle cx="60" cy="38" r="8" fill="#64748B" opacity="0.7" />
      <path d="M48 68 C48 56, 72 56, 72 68" fill="#64748B" opacity="0.5" />
    </svg>
    <motion.div
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      className="absolute -top-1 right-1 w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-[10px] shadow-sm"
    >
      🎓
    </motion.div>
  </motion.div>
);

// Animated Discover Students Vector
export const DiscoverStudentsVector = ({ className = 'w-16 h-16' }) => (
  <motion.div
    animate={{ rotate: [0, 8, -8, 0] }}
    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
    className={`relative flex items-center justify-center ${className}`}
  >
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="magGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Magnifier Glass */}
      <circle cx="36" cy="36" r="22" stroke="url(#magGrad)" strokeWidth="6" fill="#06B6D4" fillOpacity="0.15" />
      {/* Handle */}
      <path d="M52 52 L68 68" stroke="url(#magGrad)" strokeWidth="7" strokeLinecap="round" />
      {/* Scanning Target Center */}
      <circle cx="36" cy="36" r="8" fill="#3B82F6" />
    </svg>
    <motion.span
      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.9, 0.3] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute top-2 right-2 w-3 h-3 rounded-full bg-cyan-400"
    />
  </motion.div>
);

// Animated Build Connections Vector
export const BuildConnectionsVector = ({ className = 'w-16 h-16' }) => (
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
    className={`relative flex items-center justify-center ${className}`}
  >
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {/* Connection Lines */}
      <line x1="20" y1="40" x2="40" y2="20" stroke="url(#nodeGrad)" strokeWidth="3" strokeDasharray="3 3" />
      <line x1="40" y1="20" x2="60" y2="40" stroke="url(#nodeGrad)" strokeWidth="3" strokeDasharray="3 3" />
      <line x1="20" y1="40" x2="40" y2="60" stroke="url(#nodeGrad)" strokeWidth="3" strokeDasharray="3 3" />
      <line x1="40" y1="60" x2="60" y2="40" stroke="url(#nodeGrad)" strokeWidth="3" strokeDasharray="3 3" />
      <line x1="20" y1="40" x2="60" y2="40" stroke="url(#nodeGrad)" strokeWidth="2" opacity="0.5" />
      {/* Nodes */}
      <circle cx="40" cy="20" r="8" fill="#8B5CF6" />
      <circle cx="20" cy="40" r="7" fill="#3B82F6" />
      <circle cx="60" cy="40" r="7" fill="#EC4899" />
      <circle cx="40" cy="60" r="8" fill="#10B981" />
      {/* Center Core */}
      <circle cx="40" cy="40" r="5" fill="#FFFFFF" />
    </svg>
  </motion.div>
);

// Animated View Profiles Vector
export const ViewProfilesVector = ({ className = 'w-16 h-16' }) => (
  <motion.div
    animate={{ y: [0, -2, 0] }}
    transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
    className={`relative flex items-center justify-center ${className}`}
  >
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      {/* ID Badge Card */}
      <rect x="18" y="14" width="44" height="52" rx="10" fill="url(#cardGrad)" stroke="#475569" strokeWidth="2" />
      <circle cx="40" cy="32" r="9" fill="#38BDF8" />
      <rect x="26" y="46" width="28" height="4" rx="2" fill="#94A3B8" />
      <rect x="30" y="53" width="20" height="3" rx="1.5" fill="#64748B" />
    </svg>
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
      className="absolute top-1 right-2 text-amber-400 text-xs font-bold"
    >
      ✦
    </motion.span>
  </motion.div>
);

// Bento Metric Vectors for Profile
export const BentoCommunitiesSVG = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9 mx-auto">
    <circle cx="24" cy="18" r="8" fill="#3B82F6" />
    <path d="M12 38 C12 28, 36 28, 36 38" fill="#3B82F6" opacity="0.8" />
    <circle cx="36" cy="22" r="5" fill="#60A5FA" opacity="0.7" />
    <path d="M30 40 C30 33, 44 33, 44 40" fill="#60A5FA" opacity="0.5" />
  </svg>
);

export const BentoFollowersSVG = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9 mx-auto">
    <rect x="8" y="12" width="32" height="24" rx="8" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="2" />
    <circle cx="20" cy="24" r="5" fill="#A78BFA" />
    <circle cx="28" cy="24" r="5" fill="#C084FC" />
  </svg>
);

export const BentoFollowingSVG = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9 mx-auto">
    <circle cx="24" cy="24" r="16" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="24" cy="24" r="8" fill="#10B981" />
  </svg>
);

export const BentoFlexSVG = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9 mx-auto">
    <path d="M14 38 L14 10 L34 18 L14 26" fill="#EF4444" />
    <line x1="14" y1="10" x2="14" y2="40" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
