import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, dataStore } from '../lib/supabase';

const AuthContext = createContext(null);

const DEFAULT_PERSONAS = [
  {
    id: 'u1',
    name: 'Chirag Ferwani',
    username: 'chirag',
    email: 'chiragferwani@gmail.com',
    dept: 'Computer Engineering',
    year: 'Final Year',
    avatar: '/user1_ghlxbj.jpg',
    role: 'Admin',
    isAdmin: true,
    hasAccess: true,
  },
  {
    id: 'u2',
    name: 'Yashvardhan Borude',
    username: 'yashvardhan',
    email: 'yashvardhan.borude@pccoepune.org',
    dept: 'Information Technology',
    year: 'Third Year',
    avatar: '/user3_jasy6u.jpg',
    role: 'Student',
    isAdmin: false,
    hasAccess: true,
  },
  {
    id: 'u3',
    name: 'Pooja Iyer',
    username: 'pooja_iyer',
    email: 'pooja.iyer@pccoepune.org',
    dept: 'Electronics & Telecommunication',
    year: 'Final Year',
    avatar: '/user2_oss1xv.jpg',
    role: 'Student',
    isAdmin: false,
    hasAccess: true,
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('cohort_active_user');
      return savedUser ? JSON.parse(savedUser) : DEFAULT_PERSONAS[0]; // Chirag (Admin) by default
    } catch (e) {
      return DEFAULT_PERSONAS[0];
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cohort_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cohort_active_user');
    }
  }, [user]);

  const loginAsPersona = (personaId) => {
    const selected = DEFAULT_PERSONAS.find(p => p.id === personaId) || DEFAULT_PERSONAS[0];
    setUser(selected);
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard',
        },
      });
      if (error) {
        console.warn('Live Google OAuth triggered, falling back to instant login:', error.message);
        setUser(DEFAULT_PERSONAS[0]);
      }
    } catch (err) {
      setUser(DEFAULT_PERSONAS[0]);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cohort_active_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
