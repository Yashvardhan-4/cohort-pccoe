import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dataStore } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { formatTimeAgo } from '../lib/utils';
import {
  Users,
  Check,
  Heart,
  MessageCircle,
  Calendar,
  Mail,
  Instagram,
  Linkedin,
  Github,
  ArrowLeft,
  Share2,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CommunityDetail = () => {
  const { clubusername } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [clubs, setClubs] = useState(() => dataStore.getClubs());
  const club = clubs.find((c) => c.clubusername === clubusername) || clubs[0];

  const [posts, setPosts] = useState(() => dataStore.getPosts());
  const [activeTab, setActiveTab] = useState('Feed');

  const clubPosts = posts.filter(
    (p) => p.clubusername === club?.clubusername || (club?.clubusername === 'owasp' && p.tags?.includes('owasp'))
  );

  const handleToggleJoin = () => {
    if (!club) return;
    const updated = clubs.map((c) => {
      if (c.id === club.id) {
        const isJoined = !c.isJoined;
        return {
          ...c,
          isJoined,
          membersCount: isJoined ? c.membersCount + 1 : Math.max(0, c.membersCount - 1),
        };
      }
      return c;
    });
    setClubs(updated);
    dataStore.saveClubs(updated);
  };

  if (!club) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-muted-foreground">Community not found.</p>
        <Link to="/dashboard/communities" className="text-accent underline text-xs mt-2 block">
          Back to Communities
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/communities')}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to all communities
      </button>

      {/* Hero Banner Card */}
      <div className="rounded-3xl bg-card border border-border/80 overflow-hidden shadow-sm">
        {/* Cover */}
        <div className="h-44 sm:h-56 relative bg-gradient-to-r from-muted to-muted/40 overflow-hidden">
          <img
            src={club.coverImage || '/b1_moeeg9.png'}
            alt={club.clubtitle}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-card border-4 border-background p-2 shadow-xl flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={club.logo}
                  alt={club.clubtitle}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mb-1">
                <h1 className="text-xl sm:text-2xl font-bold font-secondary text-foreground">
                  {club.clubtitle}
                </h1>
                <p className="text-xs font-mono text-muted-foreground">
                  c/{club.clubusername} • {club.category}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleToggleJoin}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                  club.isJoined
                    ? 'bg-muted text-foreground hover:bg-destructive/15 hover:text-destructive'
                    : 'bg-accent text-white hover:opacity-90'
                }`}
              >
                {club.isJoined ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Joined
                  </>
                ) : (
                  'Join Community'
                )}
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {club.description}
          </p>

          {/* Metadata & Socials */}
          <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>
                <strong className="text-foreground">{club.membersCount}</strong> Members
              </span>
              <span>
                <strong className="text-foreground">{club.followersCount}</strong> Followers
              </span>
              <span>
                Lead: <strong className="text-foreground">{club.lead}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {club.email && (
                <a
                  href={`mailto:${club.email}`}
                  className="p-1.5 rounded-lg bg-muted/60 hover:bg-muted text-foreground"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              )}
              {club.socials?.instagram && (
                <a
                  href={`https://instagram.com/${club.socials.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-muted/60 hover:bg-muted text-foreground"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
              {club.socials?.linkedin && (
                <a
                  href={`https://linkedin.com/company/${club.socials.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-muted/60 hover:bg-muted text-foreground"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-2">
        {['Feed', 'Upcoming Events', 'About'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-accent/15 text-accent border border-accent/30 shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Feed' && (
        <div className="space-y-4">
          {clubPosts.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-3xl bg-card border border-border/60 text-muted-foreground">
              <Sparkles className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm font-semibold">No club posts yet</p>
              <p className="text-xs">Follow this community for future updates.</p>
            </div>
          ) : (
            clubPosts.map((post) => (
              <div
                key={post.id}
                className="p-5 rounded-3xl bg-card border border-border/80 space-y-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-border"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{post.author.name}</h4>
                    <p className="text-[10px] text-muted-foreground">
                      {formatTimeAgo(post.created_at)}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {post.image && (
                  <div className="rounded-2xl overflow-hidden border border-border max-h-72">
                    <img src={post.image} alt="visual" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'Upcoming Events' && (
        <div className="p-6 rounded-3xl bg-card border border-border/80 space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Calendar className="w-4 h-4 text-accent" /> Scheduled Club Activities
          </h3>
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-foreground">CyberSprint 2026 CTF Hackathon</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                28th August 2026 • 24 Hours • Computer Lab 1 & 2
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-accent/20 text-accent">
              Open Registration
            </span>
          </div>
        </div>
      )}

      {activeTab === 'About' && (
        <div className="p-6 rounded-3xl bg-card border border-border/80 space-y-4 text-xs leading-relaxed text-muted-foreground">
          <h3 className="text-sm font-bold text-foreground">About the Community</h3>
          <p>{club.description}</p>
          <p>
            Operating under the Student Activities Committee at Pimpri Chinchwad College of Engineering, Pune.
          </p>
        </div>
      )}
    </div>
  );
};
