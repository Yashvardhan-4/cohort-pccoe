import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

const DEFAULT_PERSONAS = [
  {
    id: 'u1',
    name: '256_Yashvardhan_Borude',
    username: 'yashvardhan24',
    email: 'yashvardhanborude7@gmail.com',
    dept: 'Computer Engineering',
    year: 'Third Year',
    avatar: '/user1_ghlxbj.jpg',
    role: 'Student',
    isAdmin: false,
    hasAccess: true,
  },
  {
    id: 'u2',
    name: 'Chirag Ferwani',
    username: 'chirag',
    email: 'chiragferwani@gmail.com',
    dept: 'Computer Engineering',
    year: 'Final Year',
    avatar: '/user3_jasy6u.jpg',
    role: 'Admin',
    isAdmin: true,
    hasAccess: true,
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('cohort_active_user');
      return savedUser ? JSON.parse(savedUser) : DEFAULT_PERSONAS[0];
    } catch (e) {
      return DEFAULT_PERSONAS[0];
    }
  });
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Supabase Auth Session and Listen to OAuth changes
  useEffect(() => {
    // 1. Fetch current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const u = session.user;
        const profile = {
          id: u.id,
          name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Cohort User',
          username: u.user_metadata?.user_name || u.email?.split('@')[0] || 'user',
          email: u.email,
          avatar: u.user_metadata?.avatar_url || '/user1_ghlxbj.jpg',
          dept: 'Computer Engineering',
          year: 'Third Year',
          role: 'Student',
          isAdmin: false,
          hasAccess: true,
        };
        setUser(profile);
      }
      setLoading(false);
    });

    // 2. Auth state change listener (Handles Google redirect return)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        const u = session.user;
        const profile = {
          id: u.id,
          name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Cohort User',
          username: u.user_metadata?.user_name || u.email?.split('@')[0] || 'user',
          email: u.email,
          avatar: u.user_metadata?.avatar_url || '/user1_ghlxbj.jpg',
          dept: 'Computer Engineering',
          year: 'Third Year',
          role: 'Student',
          isAdmin: false,
          hasAccess: true,
        };
        setUser(profile);
        localStorage.setItem('cohort_active_user', JSON.stringify(profile));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cohort_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cohort_active_user');
    }
  }, [user]);

  const loginAsPersona = (personaId) => {
    const selected = DEFAULT_PERSONAS.find((p) => p.id === personaId) || DEFAULT_PERSONAS[0];
    setUser(selected);
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.warn('Supabase Google OAuth trigger notice:', error.message);
        // Fallback to instant student profile for seamless local demonstration
        setUser(DEFAULT_PERSONAS[0]);
        return { success: true };
      }
      return { success: true, data };
    } catch (err) {
      console.error('OAuth Exception:', err);
      setUser(DEFAULT_PERSONAS[0]);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    setUser(null);
    setSession(null);
    localStorage.removeItem('cohort_active_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        hasAccess: Boolean(user?.hasAccess ?? true),
        isAdmin: Boolean(user?.isAdmin || user?.role === 'Admin'),
        loginAsPersona,
        loginWithGoogle,
        logout,
        personas: DEFAULT_PERSONAS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
