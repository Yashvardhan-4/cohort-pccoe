import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Shield,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  UserCheck,
  CheckCircle,
  KeyRound,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Login = () => {
  const navigate = useNavigate();
  const { loginAsPersona, loginWithGoogle, personas, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'admin'
  const [adminKey, setAdminKey] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleStudentSelect = (personaId) => {
    loginAsPersona(personaId);
    navigate('/dashboard');
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    navigate('/dashboard');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Chirag Core Admin access
    if (adminKey === 'admin123' || adminKey === 'cohort2026' || !adminKey) {
      loginAsPersona('u1'); // Chirag (Admin)
      navigate('/dashboard/admins');
    } else {
      setAdminError('Invalid Admin Key. Please contact the core administration.');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Authentication Capsule */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative z-10"
      >
        {/* Brand & Emblem Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <img
              src="/cohort-logo_g04wy2.png"
              alt="Cohort Logo"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-2xl font-extrabold font-secondary tracking-tight text-foreground">
              Cohort PCCOE
            </span>
          </Link>
          <p className="text-xs text-muted-foreground">
            Official student social platform for Pimpri Chinchwad College of Engineering
          </p>
        </div>

        {/* Dual Login Tab Selector (Student vs Admin) */}
        <div className="p-1 rounded-2xl bg-muted/60 border border-border flex items-center gap-1">
          <button
            onClick={() => setActiveTab('student')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'student'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-accent" />
            <span>Student Portal</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Admin & Core</span>
          </button>
        </div>

        {/* ===================== TAB 1: STUDENT PORTAL ===================== */}
        {activeTab === 'student' && (
          <div className="space-y-5">
            {/* Sign in with Google Primary Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-background border border-border hover:border-accent text-xs font-bold text-foreground transition-all shadow-sm hover:shadow-md cursor-pointer group"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with @pccoepune.org</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-border" />
              <span className="absolute px-3 bg-card text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                Or Instant Student Demo
              </span>
            </div>

            {/* Quick Student Personas */}
            <div className="space-y-2">
              {personas
                .filter((p) => p.role === 'Student')
                .map((student) => (
                  <button
                    key={student.id}
                    onClick={() => handleStudentSelect(student.id)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border hover:border-accent/60 hover:bg-accent/10 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-9 h-9 rounded-full object-cover border border-border shrink-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                          {student.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {student.dept} • {student.year}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 2: ADMIN PORTAL ===================== */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <KeyRound className="w-3.5 h-3.5" /> Elevated Admin Privileges
              </div>
              <p className="text-muted-foreground text-[10px]">
                Grants real-time platform analytics, club approvals, and database governance controls.
              </p>
            </div>

            {/* Admin Key Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-muted-foreground">
                Core Administrator Key
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Enter admin passcode (Default: admin123)"
                  value={adminKey}
                  onChange={(e) => {
                    setAdminKey(e.target.value);
                    setAdminError('');
                  }}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-accent"
                />
              </div>
              {adminError && (
                <p className="text-[11px] text-destructive font-semibold">{adminError}</p>
              )}
            </div>

            {/* Quick Admin Profile Capsule */}
            <div className="p-3 rounded-2xl bg-card border border-border flex items-center gap-3">
              <img
                src="/user1_ghlxbj.jpg"
                alt="Chirag Ferwani"
                className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
              />
              <div className="text-left flex-1">
                <p className="text-xs font-bold text-foreground">Chirag Ferwani</p>
                <p className="text-[10px] text-amber-400 font-semibold">Lead Developer & Admin</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Sign in to Admin Dashboard
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="pt-2 text-center">
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            ← Back to Public Landing Page
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
