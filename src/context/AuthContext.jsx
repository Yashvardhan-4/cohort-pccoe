import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('cohort_active_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Supabase Auth Session and Listen to OAuth changes
  useEffect(() => {
    // 1. Fetch current live session from Supabase
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
        localStorage.setItem('cohort_active_user', JSON.stringify(profile));
      }
      setLoading(false);
    });

    // 2. Auth state change listener (Triggered when returning from Google redirect)
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
        console.warn('Supabase Google OAuth trigger:', error.message);
        throw error;
      }
      return { success: true, data };
    } catch (err) {
      console.error('Google OAuth Exception:', err);
      throw err;
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
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
