import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Plus,
  Send,
  X,
  Music,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_CAMPUS_MEMES = [
  {
    id: 'meme_1',
    author: 'PCCOE CodeVault Hacker',
    tag: '#InSemPanik',
    caption: 'When you submit the final assignment at 11:59:58 PM on PCCOE ERP Portal 😭💀',
    image: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=800&auto=format&fit=crop&q=80',
    audio: 'PCCOE Exam Season Beats 🎵',
    upvotes: 428,
    commentsCount: 64,
    comments: [
      { id: 'c1', author: 'FE Student', text: 'Literally running from B-block to Admin block rn 😭', time: '12m ago' },
    ],
  },
  {
    id: 'meme_2',
    author: 'Canteen Resident',
    tag: '#CanteenWars',
    caption: 'Debate of the century: Main Canteen Masala Dosa vs Back-gate Nescafe Maggi 🍽️🔥',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    audio: 'Chai & Maggi Vibes ☕',
    upvotes: 682,
    commentsCount: 92,
    comments: [
      { id: 'c3', author: 'Foodie PCCOE', text: 'Nescafe Cold Coffee on a sunny afternoon hits different', time: '1h ago' },
    ],
  },
  {
    id: 'meme_3',
    author: 'TechFest Zion Lead',
    tag: '#HackathonNight',
    caption: '24-hour hackathon in Computer Lab 4: It worked on localhost, why is prod failing?! ⚡💻',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    audio: 'Synthwave Cyberpunk Pulse ⚡',
    upvotes: 890,
    commentsCount: 110,
    comments: [],
  },
];

export const XD = () => {
  const { user } = useAuth();
  const [reels, setReels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeCommentDrawer, setActiveCommentDrawer] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likedReels, setLikedReels] = useState({});
  const [newPostModal, setNewPostModal] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [newTag, setNewTag] = useState('#Confession');

  // Live Meme Scraper from Public Meme Endpoints
  const fetchLiveMemes = async () => {
    setLoadingMeta(true);
    try {
      const res = await fetch('https://meme-api.com/gimme/15');
      if (res.ok) {
        const data = await res.json();
        if (data.memes && data.memes.length > 0) {
          const formatted = data.memes.map((m, idx) => ({
            id: `reddit_${idx}_${Date.now()}`,
            author: m.author ? `u/${m.author}` : 'Reddit Meme Creator',
            tag: `#${m.subreddit || 'memes'}`,
            caption: m.title,
            image: m.url,
            audio: 'Viral Trending Audio 🎵',
            upvotes: m.ups || Math.floor(Math.random() * 500) + 50,
            commentsCount: Math.floor(Math.random() * 40) + 5,
            comments: [
              { id: 'rc1', author: 'Cohort Student', text: 'This is ridiculously accurate 😂', time: '10m ago' },
            ],
          }));
          setReels([...FALLBACK_CAMPUS_MEMES, ...formatted]);
        } else {
          setReels(FALLBACK_CAMPUS_MEMES);
        }
      } else {
        setReels(FALLBACK_CAMPUS_MEMES);
      }
    } catch (e) {
      console.warn('Meme API fetch fallback:', e);
      setReels(FALLBACK_CAMPUS_MEMES);
    } finally {
      setTimeout(() => {
        setLoadingMeta(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchLiveMemes();
  }, []);

  // Keyboard navigation (j/k or Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeCommentDrawer || newPostModal) return;
      if (e.key === 'ArrowDown' || e.key === 'j') {
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, reels.length, activeCommentDrawer, newPostModal]);

  const goToNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const toggleLike = (reelId) => {
    setLikedReels((prev) => {
      const isLiked = prev[reelId];
      const updated = { ...prev, [reelId]: !isLiked };
      setReels((currentReels) =>
        currentReels.map((r) =>
          r.id === reelId
            ? { ...r, upvotes: isLiked ? r.upvotes - 1 : r.upvotes + 1 }
            : r
        )
      );
      return updated;
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const currentReel = reels[currentIndex];
    const newComment = {
      id: `c_${Date.now()}`,
      author: user?.name || 'Anonymous Student',
      text: commentText.trim(),
      time: 'Just now',
    };

    setReels((prev) =>
      prev.map((r) =>
        r.id === currentReel.id
          ? {
              ...r,
              commentsCount: r.commentsCount + 1,
              comments: [newComment, ...r.comments],
            }
          : r
      )
    );
    setCommentText('');
  };

  if (loadingMeta) {
    return (
      <div className="h-[calc(100vh-5rem)] flex flex-col items-center justify-center space-y-5 bg-background select-none">
        {/* Animated Meta Infinity Gradient Logo */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg
            className="w-20 h-20 animate-pulse"
            viewBox="0 0 100 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 10 C15 10 5 20 5 25 C5 30 15 40 30 40 C42 40 48 30 50 25 C52 20 58 10 70 10 C85 10 95 20 95 25 C95 30 85 40 70 40 C58 40 52 30 50 25 C48 20 42 10 30 10 Z"
              stroke="url(#metaInfinityGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="metaInfinityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0064E0" />
                <stop offset="35%" stopColor="#8A3FFC" />
                <stop offset="70%" stopColor="#D12771" />
                <stop offset="100%" stopColor="#FA383E" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-sm font-bold font-secondary bg-gradient-to-r from-[#0064E0] via-[#8A3FFC] to-[#FA383E] bg-clip-text text-transparent">
            XD Reels & Meme Scraper
          </h2>
          <p className="text-xs text-muted-foreground">
            Scraping live viral memes & campus confessions...
          </p>
        </div>
      </div>
    );
  }

  const activeReel = reels[currentIndex] || FALLBACK_CAMPUS_MEMES[0];

  return (
    <div className="h-[calc(100vh-5rem)] w-full flex items-center justify-center bg-background/95 overflow-hidden relative select-none">
      {/* Floating Refresh Scraper Button */}
      <button
        onClick={fetchLiveMemes}
        title="Scrape Fresh Memes"
        className="absolute top-4 left-4 sm:left-8 z-30 p-2.5 rounded-full bg-card border border-border text-foreground hover:bg-muted shadow-md cursor-pointer transition-transform hover:scale-105"
      >
        <RefreshCw className="w-4 h-4 text-accent" />
      </button>

      {/* Floating Post Confession Button */}
      <button
        onClick={() => setNewPostModal(true)}
        className="absolute top-4 right-4 sm:right-8 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 shadow-lg cursor-pointer transition-transform hover:scale-105"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Post Meme</span>
      </button>

      {/* Main Single Reel Viewport Card */}
      <div className="relative w-full max-w-[420px] h-[88vh] max-h-[720px] rounded-3xl overflow-hidden bg-black border border-border shadow-2xl flex flex-col justify-between">
        {/* Background Image / Media Canvas */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeReel.image}
            alt={activeReel.caption}
            className="w-full h-full object-contain sm:object-cover opacity-90 filter brightness-95"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=800&auto=format&fit=crop&q=80';
            }}
          />
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
        </div>

        {/* Top Header */}
        <div className="relative z-10 p-4 flex items-center justify-between text-white">
          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-bold text-accent">
            {activeReel.tag}
          </span>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Bottom Reel Details */}
        <div className="relative z-10 p-5 space-y-2 text-white">
          <p className="text-xs font-bold text-zinc-300">
            {activeReel.author}
          </p>
          <p className="text-xs sm:text-sm font-medium leading-relaxed drop-shadow-md">
            {activeReel.caption}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-zinc-300 pt-1">
            <Music className="w-3.5 h-3.5 text-accent animate-spin" />
            <span className="truncate">{activeReel.audio}</span>
          </div>
        </div>

        {/* Right Reels Action Floating Bar */}
        <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-4 text-white">
          {/* Like Button */}
          <button
            onClick={() => toggleLike(activeReel.id)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className={`p-3 rounded-full backdrop-blur-md transition-all ${
              likedReels[activeReel.id]
                ? 'bg-rose-500 text-white scale-110'
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}>
              <Heart className={`w-5 h-5 ${likedReels[activeReel.id] ? 'fill-current' : ''}`} />
            </div>
            <span className="text-[11px] font-bold drop-shadow">
              {activeReel.upvotes}
            </span>
          </button>

          {/* Comment Drawer Toggle */}
          <button
            onClick={() => setActiveCommentDrawer(true)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold drop-shadow">
              {activeReel.commentsCount}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(activeReel.image || window.location.href);
                alert('Meme link copied to clipboard!');
              }
            }}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium drop-shadow">Share</span>
          </button>
        </div>

        {/* Left Up/Down Navigation Buttons */}
        <div className="absolute left-3 bottom-20 z-20 flex flex-col gap-2">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-110'
            }`}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === reels.length - 1}
            className={`p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all ${
              currentIndex === reels.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-110'
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide-Up Comments Drawer */}
      <AnimatePresence>
        {activeCommentDrawer && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
          >
            <div className="w-full max-w-md bg-card border border-border rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[80vh] flex flex-col justify-between shadow-2xl">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-bold font-secondary text-foreground">
                    Comments ({activeReel.comments?.length || 0})
                  </h3>
                </div>
                <button
                  onClick={() => setActiveCommentDrawer(false)}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto space-y-3 py-2">
                {activeReel.comments?.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-6">
                    No comments yet. Be the first to comment!
                  </p>
                ) : (
                  activeReel.comments?.map((c) => (
                    <div key={c.id} className="p-3 rounded-2xl bg-muted/40 border border-border/50 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">{c.author}</span>
                        <span className="text-[10px] text-muted-foreground">{c.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{c.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Input Bar */}
              <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-2 border-t border-border">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="p-2.5 rounded-xl bg-[#2563EB] text-white disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
