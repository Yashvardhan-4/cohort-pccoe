import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Flame,
  Code,
  Smile,
  Zap,
  ExternalLink,
  Layers,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'memes', label: 'Trending Memes', icon: Flame, sub: 'memes' },
  { id: 'programmerhumor', label: 'Code & Tech', icon: Code, sub: 'programmerhumor' },
  { id: 'dankmemes', label: 'Dank Memes', icon: Zap, sub: 'dankmemes' },
  { id: 'me_irl', label: 'Student Life', icon: Layers, sub: 'me_irl' },
  { id: 'wholesomememes', label: 'Wholesome', icon: Smile, sub: 'wholesomememes' },
];

const FALLBACK_CAMPUS_MEMES = [
  {
    id: 'campus_1',
    author: 'u/PCCOE_Hacker',
    tag: '#InSemPanik',
    caption: 'When you submit the final assignment at 11:59:58 PM on PCCOE ERP Portal 😭💀',
    image: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=800&auto=format&fit=crop&q=80',
    audio: 'PCCOE Exam Season Beats 🎵',
    upvotes: 842,
    commentsCount: 64,
    comments: [
      { id: 'c1', author: 'FE Student', text: 'Literally running from B-block to Admin block rn 😭', time: '12m ago' },
      { id: 'c2', author: 'IT Senior', text: 'Classic PCCOE moment.', time: '5m ago' },
    ],
  },
  {
    id: 'campus_2',
    author: 'u/Canteen_Resident',
    tag: '#CanteenWars',
    caption: 'Debate of the century: Main Canteen Masala Dosa vs Back-gate Nescafe Maggi 🍽️🔥',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    audio: 'Chai & Maggi Vibes ☕',
    upvotes: 1120,
    commentsCount: 92,
    comments: [
      { id: 'c3', author: 'Foodie PCCOE', text: 'Nescafe Cold Coffee on a sunny afternoon hits different', time: '1h ago' },
    ],
  },
  {
    id: 'campus_3',
    author: 'u/DevOps_Enjoyer',
    tag: '#HackathonNight',
    caption: '24-hour hackathon in Computer Lab 4: It worked on localhost, why is prod failing?! ⚡💻',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    audio: 'Synthwave Cyberpunk Pulse ⚡',
    upvotes: 954,
    commentsCount: 45,
    comments: [],
  },
];

export const XD = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [reels, setReels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [redditAfter, setRedditAfter] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [activeCommentDrawer, setActiveCommentDrawer] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likedReels, setLikedReels] = useState({});
  const [copiedToast, setCopiedToast] = useState(false);

  // New post modal state
  const [newPostModal, setNewPostModal] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newTag, setNewTag] = useState('#PCCOE');

  // Format raw reddit/meme-api post
  const formatMeme = (m, idx) => ({
    id: m.id || `meme_${Date.now()}_${idx}_${Math.random().toString(36).substring(7)}`,
    author: m.author ? (m.author.startsWith('u/') ? m.author : `u/${m.author}`) : 'u/reddit_user',
    tag: `#${m.subreddit || selectedCategory.sub}`,
    caption: m.title || m.caption || 'Campus Humor',
    image: m.url || m.image,
    postLink: m.postLink || `https://reddit.com/r/${m.subreddit || selectedCategory.sub}`,
    audio: 'Viral Trending Sound 🎵',
    upvotes: m.ups || Math.floor(Math.random() * 800) + 120,
    commentsCount: Math.floor(Math.random() * 50) + 8,
    comments: [
      {
        id: `c_${idx}`,
        author: 'Cohort Student',
        text: 'This made my day 😂',
        time: 'Just now',
      },
    ],
  });

  // Fetch memes from Reddit/Meme API
  const fetchMemes = useCallback(
    async (isLoadMore = false, category = selectedCategory, afterToken = '') => {
      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      let fetchedMemes = [];
      let nextAfter = '';

      // Strategy 1: Public Meme-API endpoint with count=30
      try {
        const sub = category.sub;
        const res = await fetch(`https://meme-api.com/gimme/${sub}/25`);
        if (res.ok) {
          const data = await res.json();
          if (data.memes && data.memes.length > 0) {
            fetchedMemes = data.memes
              .filter((m) => !m.nsfw && m.url && (m.url.endsWith('.jpg') || m.url.endsWith('.png') || m.url.endsWith('.jpeg') || m.url.endsWith('.webp') || m.url.includes('i.redd.it') || m.url.includes('imgur')))
              .map(formatMeme);
          }
        }
      } catch (e) {
        console.warn('Meme API gimme failed, trying Reddit direct:', e);
      }

      // Strategy 2: Direct Reddit JSON API if meme-api was sparse
      if (fetchedMemes.length < 5) {
        try {
          const sub = category.sub;
          const url = `https://www.reddit.com/r/${sub}/hot.json?limit=25${afterToken ? `&after=${afterToken}` : ''}`;
          const res = await fetch(url);
          if (res.ok) {
            const json = await res.json();
            nextAfter = json.data?.after || '';
            const posts = json.data?.children || [];
            const valid = posts
              .map((p) => p.data)
              .filter(
                (p) =>
                  !p.over_18 &&
                  !p.is_video &&
                  p.url &&
                  (p.url.endsWith('.jpg') || p.url.endsWith('.png') || p.url.endsWith('.jpeg') || p.url.endsWith('.webp') || p.post_hint === 'image' || p.url.includes('i.redd.it'))
              )
              .map(formatMeme);

            fetchedMemes = [...fetchedMemes, ...valid];
          }
        } catch (e) {
          console.warn('Reddit direct JSON fallback failed:', e);
        }
      }

      // Final fallback if offline / network blocked
      if (fetchedMemes.length === 0 && !isLoadMore) {
        fetchedMemes = FALLBACK_CAMPUS_MEMES;
      }

      if (isLoadMore) {
        setReels((prev) => [...prev, ...fetchedMemes]);
        if (nextAfter) setRedditAfter(nextAfter);
        setIsLoadingMore(false);
      } else {
        setReels(fetchedMemes);
        setCurrentIndex(0);
        if (nextAfter) setRedditAfter(nextAfter);
        setIsLoading(false);
      }
    },
    [selectedCategory]
  );

  // Initial Fetch & Category Switch
  useEffect(() => {
    fetchMemes(false, selectedCategory);
  }, [selectedCategory, fetchMemes]);

  // Auto-Prefetch Next Batch on near-end of stream (Infinite Scroll)
  useEffect(() => {
    if (reels.length > 0 && currentIndex >= reels.length - 4 && !isLoadingMore) {
      fetchMemes(true, selectedCategory, redditAfter);
    }
  }, [currentIndex, reels.length, isLoadingMore, selectedCategory, redditAfter, fetchMemes]);

  // Navigation handlers
  const goToNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Force load more at boundary
      fetchMemes(true, selectedCategory, redditAfter);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation (ArrowDown/Up, J/K, Space to like)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeCommentDrawer || newPostModal) return;
      if (e.key === 'ArrowDown' || e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        if (reels[currentIndex]) {
          toggleLike(reels[currentIndex].id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, reels, activeCommentDrawer, newPostModal]);

  // Mouse wheel snap handler
  const wheelTimeout = useRef(null);
  const handleWheel = (e) => {
    if (activeCommentDrawer || newPostModal) return;
    if (wheelTimeout.current) return;

    if (e.deltaY > 30) {
      goToNext();
      wheelTimeout.current = setTimeout(() => {
        wheelTimeout.current = null;
      }, 350);
    } else if (e.deltaY < -30) {
      goToPrev();
      wheelTimeout.current = setTimeout(() => {
        wheelTimeout.current = null;
      }, 350);
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
    if (!currentReel) return;

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

  const handleShare = () => {
    const current = reels[currentIndex];
    if (!current) return;
    const shareUrl = current.image || current.postLink || window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newCaption.trim()) return;

    const customMeme = {
      id: `user_${Date.now()}`,
      author: user?.username ? `u/${user.username}` : 'u/CohortStudent',
      tag: newTag.startsWith('#') ? newTag : `#${newTag}`,
      caption: newCaption.trim(),
      image: newImageUrl.trim() || 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=800&auto=format&fit=crop&q=80',
      audio: 'Campus Original Audio 🎵',
      upvotes: 1,
      commentsCount: 0,
      comments: [],
    };

    setReels([customMeme, ...reels]);
    setCurrentIndex(0);
    setNewPostModal(false);
    setNewCaption('');
    setNewImageUrl('');
  };

  const activeReel = reels[currentIndex] || FALLBACK_CAMPUS_MEMES[0];

  return (
    <div
      onWheel={handleWheel}
      className="h-[calc(100vh-5rem)] w-full flex flex-col items-center justify-between bg-background/95 overflow-hidden relative select-none"
    >
      {/* Category Pills Header Bar */}
      <div className="w-full max-w-2xl px-4 pt-3 pb-2 z-30 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (selectedCategory.id !== cat.id) {
                    setSelectedCategory(cat);
                  }
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-105'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-accent' : ''}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => fetchMemes(false, selectedCategory)}
            title="Refresh Meme Stream"
            className="p-2 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-accent' : ''}`} />
          </button>

          <button
            onClick={() => setNewPostModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 shadow-md cursor-pointer transition-transform hover:scale-105"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Post</span>
          </button>
        </div>
      </div>

      {/* Main Reels Viewport */}
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
          <p className="text-xs text-muted-foreground font-medium animate-pulse">
            Fetching unlimited memes from Reddit /r/{selectedCategory.sub}...
          </p>
        </div>
      ) : (
        <div className="flex-1 w-full flex items-center justify-center pb-2 px-2 relative">
          {/* Main Reel Card Container */}
          <div className="relative w-full max-w-[420px] h-[calc(100vh-9.5rem)] max-h-[700px] rounded-3xl overflow-hidden bg-black border border-border/80 shadow-2xl flex flex-col justify-between">
            {/* Background Media */}
            <div className="absolute inset-0 z-0 bg-black flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeReel.id}
                  src={activeReel.image}
                  alt={activeReel.caption}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full object-contain filter brightness-95"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=800&auto=format&fit=crop&q=80';
                  }}
                />
              </AnimatePresence>
              {/* Vignette Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
            </div>

            {/* Top Bar Header */}
            <div className="relative z-10 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-accent">
                  {activeReel.tag}
                </span>
                <span className="text-[11px] font-semibold text-zinc-400 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-md">
                  #{currentIndex + 1} of {reels.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {activeReel.postLink && (
                  <a
                    href={activeReel.postLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-black/50 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-black/70 transition-colors"
                    title="Open on Reddit"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Bottom Reel Captions & Author */}
            <div className="relative z-10 p-5 space-y-2 text-white">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400">{activeReel.author}</span>
                <span className="text-[10px] text-zinc-400">• Reddit</span>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-snug drop-shadow-lg line-clamp-3">
                {activeReel.caption}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-zinc-300 pt-1">
                <Music className="w-3.5 h-3.5 text-accent animate-spin" />
                <span className="truncate">{activeReel.audio}</span>
              </div>
            </div>

            {/* Right Action Icons Bar */}
            <div className="absolute right-3 bottom-16 z-20 flex flex-col items-center gap-3.5 text-white">
              {/* Like / Heart */}
              <button
                onClick={() => toggleLike(activeReel.id)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div
                  className={`p-3 rounded-full backdrop-blur-md transition-all ${
                    likedReels[activeReel.id]
                      ? 'bg-rose-600 text-white scale-110 shadow-lg shadow-rose-600/50'
                      : 'bg-black/60 text-white hover:bg-black/80'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedReels[activeReel.id] ? 'fill-current' : ''}`} />
                </div>
                <span className="text-[11px] font-bold drop-shadow">
                  {activeReel.upvotes.toLocaleString()}
                </span>
              </button>

              {/* Comments */}
              <button
                onClick={() => setActiveCommentDrawer(true)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold drop-shadow">
                  {activeReel.commentsCount}
                </span>
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium drop-shadow">Share</span>
              </button>
            </div>

            {/* Left Vertical Stepper Controls */}
            <div className="absolute left-3 bottom-16 z-20 flex flex-col gap-2">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className={`p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all ${
                  currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-110'
                }`}
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all cursor-pointer hover:scale-110"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Keyboard Hint Bar */}
      <div className="w-full text-center pb-2 z-10 hidden sm:flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
        <span>💡 Use <b>↑ / ↓</b> or <b>J / K</b> or mouse wheel to scroll</span>
        <span>•</span>
        <span>Press <b>Spacebar</b> to Like</span>
        <span>•</span>
        <span>Unlimited live stream active</span>
      </div>

      {/* Copied Link Toast Notification */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xl flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Meme link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-Up Comments Drawer */}
      <AnimatePresence>
        {activeCommentDrawer && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
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
                  placeholder="Add a campus comment..."
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

      {/* Post Custom Meme Modal */}
      <AnimatePresence>
        {newPostModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-bold font-secondary text-foreground">
                    Post Campus Meme or Confession
                  </h3>
                </div>
                <button
                  onClick={() => setNewPostModal(false)}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground">Meme Caption / Story</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="E.g., That feeling when In-Sem timetable drops..."
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full p-3 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-accent resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground">Image URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground">Campus Tag</label>
                  <input
                    type="text"
                    placeholder="#InSemPanik or #CanteenWars"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewPostModal(false)}
                    className="px-4 py-2 rounded-xl bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 shadow-md cursor-pointer"
                  >
                    Publish Meme
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


