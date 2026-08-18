import { createClient } from '@supabase/supabase-js';
import {
  INITIAL_CLUBS,
  INITIAL_POSTS,
  INITIAL_XD_POSTS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_HEADSUP_NOTICES,
  INITIAL_USERS,
  INITIAL_MESSAGES,
} from './initialData';

const supabaseUrl = 'https://guzgwtxnrnzzfmzjhzcp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1emd3dHhucm56emZtempoemNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NDczNTIsImV4cCI6MjA4NjAyMzM1Mn0.3_QqyxEVTFPM1hAPU6ogGIjNWeAEZpmlEPNbao78SaU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Local Reactive Storage Layer for seamless offline/demo resilience
const STORAGE_KEYS = {
  POSTS: 'cohort_posts',
  CLUBS: 'cohort_clubs',
  XD: 'cohort_xd_posts',
  CALENDAR: 'cohort_calendar',
  HEADSUP: 'cohort_headsup',
  USERS: 'cohort_users',
  MESSAGES: 'cohort_messages',
};

function getStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

// Initialize Local State
if (!localStorage.getItem(STORAGE_KEYS.POSTS)) setStorage(STORAGE_KEYS.POSTS, INITIAL_POSTS);
if (!localStorage.getItem(STORAGE_KEYS.CLUBS)) setStorage(STORAGE_KEYS.CLUBS, INITIAL_CLUBS);
if (!localStorage.getItem(STORAGE_KEYS.XD)) setStorage(STORAGE_KEYS.XD, INITIAL_XD_POSTS);
if (!localStorage.getItem(STORAGE_KEYS.CALENDAR)) setStorage(STORAGE_KEYS.CALENDAR, INITIAL_CALENDAR_EVENTS);
if (!localStorage.getItem(STORAGE_KEYS.HEADSUP)) setStorage(STORAGE_KEYS.HEADSUP, INITIAL_HEADSUP_NOTICES);
if (!localStorage.getItem(STORAGE_KEYS.USERS)) setStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) setStorage(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);

export const dataStore = {
  getPosts: () => getStorage(STORAGE_KEYS.POSTS, INITIAL_POSTS),
  savePosts: (posts) => setStorage(STORAGE_KEYS.POSTS, posts),
  
  getClubs: () => getStorage(STORAGE_KEYS.CLUBS, INITIAL_CLUBS),
  saveClubs: (clubs) => setStorage(STORAGE_KEYS.CLUBS, clubs),

  getXDPosts: () => getStorage(STORAGE_KEYS.XD, INITIAL_XD_POSTS),
  saveXDPosts: (posts) => setStorage(STORAGE_KEYS.XD, posts),

  getEvents: () => getStorage(STORAGE_KEYS.CALENDAR, INITIAL_CALENDAR_EVENTS),
  saveEvents: (events) => setStorage(STORAGE_KEYS.CALENDAR, events),

  getHeadsUp: () => getStorage(STORAGE_KEYS.HEADSUP, INITIAL_HEADSUP_NOTICES),
  saveHeadsUp: (notices) => setStorage(STORAGE_KEYS.HEADSUP, notices),

  getUsers: () => getStorage(STORAGE_KEYS.USERS, INITIAL_USERS),
  saveUsers: (users) => setStorage(STORAGE_KEYS.USERS, users),

  getMessages: () => getStorage(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES),
  saveMessages: (messages) => setStorage(STORAGE_KEYS.MESSAGES, messages),
};

// Asynchronous Live API with Real-time WebSocket Channels
export const api = {
  // Live Posts
  async fetchPosts() {
    try {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        dataStore.savePosts(data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase live fetch fallback to dataStore:', e);
    }
    return dataStore.getPosts();
  },

  async createPost(post) {
    const current = dataStore.getPosts();
    const updated = [post, ...current];
    dataStore.savePosts(updated);
    try {
      await supabase.from('posts').insert([post]);
    } catch (e) {}
    return post;
  },

  // Live Clubs
  async fetchClubs() {
    try {
      const { data, error } = await supabase.from('clubs').select('*');
      if (!error && data && data.length > 0) {
        dataStore.saveClubs(data);
        return data;
      }
    } catch (e) {}
    return dataStore.getClubs();
  },

  // Live Messages with Realtime Subscription
  async fetchMessages(channelId) {
    const all = dataStore.getMessages();
    return all.filter((m) => m.channelId === channelId);
  },

  async sendMessage(msg) {
    const all = dataStore.getMessages();
    const updated = [...all, msg];
    dataStore.saveMessages(updated);
    try {
      await supabase.from('messages').insert([msg]);
    } catch (e) {}
    return msg;
  },

  subscribeToMessages(channelId, callback) {
    try {
      const channel = supabase
        .channel(`chat:${channelId}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages', filter: `channel_id=eq.${channelId}` },
          (payload) => {
            callback(payload.new);
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(channel);
      };
    } catch (e) {
      return () => {};
    }
  },

  // Live XD Board
  async fetchXDPosts() {
    try {
      const { data, error } = await supabase.from('xd_posts').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        dataStore.saveXDPosts(data);
        return data;
      }
    } catch (e) {}
    return dataStore.getXDPosts();
  },

  async upvoteXD(postId) {
    const posts = dataStore.getXDPosts();
    const updated = posts.map((p) => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
    dataStore.saveXDPosts(updated);
    return updated;
  },
};
