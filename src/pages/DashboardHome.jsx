import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Paperclip,
  Send,
  Heart,
  MessageSquare,
  ExternalLink,
  Smile,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_FEED_POSTS = [
  {
    id: 'post_1',
    author: {
      name: 'Vrushabh Hirap',
      username: 'vrushabhhirap',
      avatar: '/user1_ghlxbj.jpg',
      time: '6 May',
    },
    likesCount: 5,
    isLiked: false,
    content: 'TOC solutions are up on Cohort 👾\nhave a look whenever you want... panic studying before the exam is still an option 😜',
    linkAttachment: {
      url: 'https://drive.google.com/drive/folders/1vK-5yOIEpuYwEnlvyUx_n_JXfj389dks',
      domain: 'drive.google.com',
    },
    repliesCount: 1,
    showReplies: true,
    replies: [
      {
        id: 'rep_1',
        author: {
          name: 'SOHAM ZAGARE',
          username: 'soham24',
          avatarLetter: 'S',
          avatarBg: 'bg-emerald-500',
          time: '6 May',
        },
        content: 'Cohort goated ngl',
      },
    ],
  },
  {
    id: 'post_2',
    author: {
      name: 'Anushka Shinde',
      username: 'anushkashinde',
      avatar: '/user2_oss1xv.jpg',
      time: '4 May',
    },
    likesCount: 16,
    isLiked: false,
    content: "Friendly announcement for those still 'searching for resources' 😋\nAll In-Sem past question banks have been archived in B-Block repo.",
    repliesCount: 0,
    showReplies: false,
    replies: [],
  },
];

export const DashboardHome = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(INITIAL_FEED_POSTS);
  const [postText, setPostText] = useState('');
  const [activeReplyInputs, setActiveReplyInputs] = useState({});

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const newPost = {
      id: `post_${Date.now()}`,
      author: {
        name: user?.name || 'Yashvardhan Borude',
        username: user?.username || 'yashvardhan24',
        avatar: user?.avatar || '/user3_jasy6u.jpg',
        time: 'Just now',
      },
      likesCount: 0,
      isLiked: false,
      content: postText.trim(),
      repliesCount: 0,
      showReplies: true,
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setPostText('');
  };

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            isLiked: !p.isLiked,
            likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1,
          };
        }
        return p;
      })
    );
  };

  const handleAddReply = (postId) => {
    const text = activeReplyInputs[postId];
    if (!text || !text.trim()) return;

    const newReply = {
      id: `rep_${Date.now()}`,
      author: {
        name: user?.name || 'Yashvardhan Borude',
        username: user?.username || 'yashvardhan24',
        avatarLetter: 'Y',
        avatarBg: 'bg-blue-500',
        time: 'Just now',
      },
      content: text.trim(),
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            repliesCount: p.repliesCount + 1,
            replies: [...p.replies, newReply],
          };
        }
        return p;
      })
    );

    setActiveReplyInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 select-none">
      {/* Header with Context Title & Spider-man Doodle (Screenshot 1) */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold font-secondary text-foreground">
          c/home
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

      {/* Top Post Composer Box (Screenshot 1) */}
      <div className="rounded-3xl bg-card border border-border/80 p-5 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shrink-0">
            2
          </div>
          <textarea
            rows={3}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind? Type @ to tag users or communities"
            className="w-full bg-transparent text-xs sm:text-sm text-foreground focus:outline-none placeholder:text-muted-foreground resize-none"
          />
        </div>

        {/* Composer Action Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span>Attach</span>
          </button>

          <div className="flex items-center gap-2">
            {postText && (
              <button
                type="button"
                onClick={() => setPostText('')}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleCreatePost}
              disabled={!postText.trim()}
              className="flex items-center gap-1.5 px-5 py-1.5 rounded-full bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 disabled:opacity-40 shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feed Posts List (Screenshot 1) */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-3xl bg-card border border-border/80 p-5 shadow-sm space-y-4"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar || '/user1_ghlxbj.jpg'}
                  alt={post.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-border"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-foreground">
                      {post.author.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      @{post.author.username}
                    </span>
                    <span className="text-[11px] text-muted-foreground">•</span>
                    <span className="text-[11px] text-muted-foreground">
                      {post.author.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Heart Like Pill */}
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                  post.isLiked
                    ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                    : 'bg-muted/40 text-muted-foreground border-border/60 hover:text-foreground'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-current' : ''}`} />
                <span>{post.likesCount}</span>
              </button>
            </div>

            {/* Post Content */}
            <p className="text-xs sm:text-sm text-foreground whitespace-pre-line leading-relaxed">
              {post.content}
            </p>

            {/* Google Drive Link Preview Capsule (Screenshot 1) */}
            {post.linkAttachment && (
              <a
                href={post.linkAttachment.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border/80 hover:border-accent transition-all group"
              >
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div className="truncate flex-1">
                  <p className="text-xs font-bold text-[#2563EB] truncate group-hover:underline">
                    {post.linkAttachment.url}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {post.linkAttachment.domain}
                  </p>
                </div>
              </a>
            )}

            {/* Reply Count Button Pill */}
            {post.repliesCount > 0 && (
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border/60 text-xs font-semibold text-muted-foreground">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.repliesCount} Reply</span>
                </span>
              </div>
            )}

            {/* Nested Replies Thread (Screenshot 1) */}
            <div className="space-y-3 pt-2">
              {post.replies.map((rep) => (
                <div
                  key={rep.id}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-muted/30 border border-border/40"
                >
                  <div
                    className={`w-7 h-7 rounded-full ${rep.author.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}
                  >
                    {rep.author.avatarLetter}
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-foreground">
                        {rep.author.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        @{rep.author.username}
                      </span>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <span className="text-[10px] text-muted-foreground">
                        {rep.author.time}
                      </span>
                    </div>
                    <p className="text-xs text-foreground">{rep.content}</p>
                  </div>
                </div>
              ))}

              {/* Inline Reply Input Box (Screenshot 1) */}
              <div className="flex items-center gap-2 pt-1">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  ●
                </div>
                <div className="flex-1 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/40 border border-border/60 focus-within:border-accent focus-within:bg-background transition-all">
                  <input
                    type="text"
                    placeholder="Write a reply... Type @ to tag someone"
                    value={activeReplyInputs[post.id] || ''}
                    onChange={(e) =>
                      setActiveReplyInputs({
                        ...activeReplyInputs,
                        [post.id]: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddReply(post.id);
                    }}
                    className="w-full bg-transparent text-xs text-foreground focus:outline-none placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={() => handleAddReply(post.id)}
                    className="text-muted-foreground hover:text-[#2563EB] transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
