import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Sparkles, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, user, loading } = useAuth();
  const [agreed, setAgreed] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = async () => {
    if (!agreed) {
      alert('Please agree to the Terms and Conditions and Privacy Policy to continue.');
      return;
    }
    setSigningIn(true);
    try {
      await loginWithGoogle();
    } catch (e) {
      console.error('Google Sign-in failed:', e);
      alert('Google Sign-In notice: ' + (e.message || 'Unable to connect to Google provider. Please verify Supabase configuration.'));
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#090A0C] p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Top Center Spotlight Ambient Lighting (Screenshot) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl pointer-events-none" />

      {/* Signature Floating Spider-Man Ambient Stickers (Screenshot) */}
      {/* Top Left Standing Spider-man */}
      <img
        src="/assets/dark3-QsL2CcWP.svg"
        alt="Spider-man top-left"
        className="absolute top-8 left-12 w-10 h-10 object-contain opacity-70 pointer-events-none hidden md:block"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />

      {/* Top Right Waving Spider-man */}
      <img
        src="/assets/dark1-BZ1HA7yb.svg"
        alt="Spider-man top-right"
        className="absolute top-8 right-12 w-12 h-12 object-contain opacity-80 pointer-events-none hidden md:block"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />

      {/* Right Edge Spider-man Mask */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center pointer-events-none hidden md:block">
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <ellipse cx="50" cy="50" rx="42" ry="46" fill="#DC2626" />
          <path d="M50 4 L50 96 M4 50 L96 50 M16 18 L84 82 M16 82 L84 18" stroke="#18181B" strokeWidth="3" />
          <path d="M22 38 Q36 28 44 46 Q32 50 22 38 Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="4" />
          <path d="M78 38 Q64 28 56 46 Q68 50 78 38 Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="4" />
        </svg>
      </div>

      {/* Left Edge Crawling Spider-man */}
      <img
        src="/assets/dark4-DqvLaxtE.svg"
        alt="Spider-man left"
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 object-contain opacity-70 pointer-events-none hidden md:block"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />

      {/* Bottom Left Red Graffiti Text */}
      <div className="absolute bottom-8 left-10 text-rose-600 font-mono font-black text-xs tracking-widest uppercase opacity-75 hidden md:block">
        SPIDER-MAN
      </div>

      {/* Bottom Right Crouching Spider-man */}
      <img
        src="/assets/dark5-DxY4dtIz.png"
        alt="Spider-man bottom-right"
        className="absolute bottom-6 right-12 w-11 h-11 object-contain opacity-80 pointer-events-none hidden md:block"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />

      {/* ===================== CENTRAL 2-COLUMN LOGIN CARD (Screenshot) ===================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl min-h-[480px] bg-[#181A1E] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10"
      >
        {/* Left Column: Reflective Chrome Prismatic Artwork (Screenshot) */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-zinc-950 flex items-center justify-center">
          {/* Diagonal Striped Prismatic Gradient Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#DC2626_0%,#F59E0B_25%,#10B981_50%,#06B6D4_75%,#8B5CF6_100%)] opacity-85" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.3)_20px,rgba(0,0,0,0.3)_40px)]" />

          {/* Centered High-Fidelity 3D Chrome Figure Artwork */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
              alt="Cohort Prism Sculpture"
              className="w-full h-full object-cover rounded-2xl filter contrast-125 brightness-95 shadow-2xl mix-blend-luminosity"
              onError={(e) => {
                e.target.src = '/leftSideImage_eekf5p.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Welcome to Cohort & Google Sign-In (Screenshot) */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center items-center text-center space-y-6 bg-[#181A1E]">
          {/* Centered Cohort Colored Logo Emblem */}
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center p-1 hover:scale-105 transition-transform">
            <img
              src="/cohort-logo_g04wy2.png"
              alt="Cohort Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-secondary tracking-tight text-white uppercase">
              WELCOME TO COHORT
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mx-auto">
              Connect, message, and innovate with your campus community
            </p>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-center gap-2 text-left pt-2">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`w-4 h-4 rounded flex items-center justify-center transition-all cursor-pointer ${
                agreed
                  ? 'bg-white text-black font-black'
                  : 'bg-zinc-900 border border-zinc-600'
              }`}
            >
              {agreed && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
            <label
              onClick={() => setAgreed(!agreed)}
              className="text-[11px] text-zinc-400 cursor-pointer select-none"
            >
              I agree to the{' '}
              <Link
                to="/terms"
                onClick={(e) => e.stopPropagation()}
                className="text-white underline font-medium hover:text-cyan-400"
              >
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy-policy"
                onClick={(e) => e.stopPropagation()}
                className="text-white underline font-medium hover:text-cyan-400"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Google Sign-in Card Pill (Screenshot) */}
          <div className="w-full max-w-sm pt-2">
            <button
              onClick={handleSignIn}
              disabled={signingIn}
              className="w-full flex items-center justify-between p-3 px-4 rounded-2xl bg-[#111315] border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 transition-all shadow-xl group cursor-pointer"
            >
              {/* Left Profile Info Capsule */}
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src="/user1_ghlxbj.jpg"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                    Sign in with Google
                  </p>
                  <p className="text-[10px] text-zinc-500 truncate">
                    PCCOE Student Single Sign-On
                  </p>
                </div>
              </div>

              {/* Right Circular Google 'G' Logo or Spinner */}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md shrink-0 group-hover:scale-110 transition-transform">
                {signingIn ? (
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-full h-full">
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
                )}
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
