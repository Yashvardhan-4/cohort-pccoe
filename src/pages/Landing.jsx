import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ClubsMarquee } from '../components/ClubsMarquee';
import { CurvedLoop } from '../components/CurvedLoop';
import LiquidEther from '../components/LiquidEther';
import {
  Eye,
  Radio,
  LayoutGrid,
  Heart,
  MessageSquare,
  Sparkles,
  Map,
  Calendar,
  User,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Landing = () => {
  // Live ticking counter around 11,585 as seen in screenshots
  const [viewCount, setViewCount] = useState(11585);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-accent/30">
      <Navbar />

      {/* ===================== HERO SECTION (Full width w-full with responsive white/dark top and bottom borders) ===================== */}
      <section className="w-full relative overflow-hidden border-t-2 border-b-2 dark:border-white/20 border-zinc-300 pt-16 pb-32 mb-28">
        {/* LiquidEther Cursor Reactive Fluid Canvas spanning full width */}
        <div className="absolute inset-0 z-0 pointer-events-auto opacity-75">
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B497CF']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>

        {/* Centered Hero Content Container */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          {/* Left Column: Hero Headline & Action Buttons */}
          <div className="space-y-6 text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-secondary leading-[1.08] text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#C084FC]">
              A Social<br />
              Platform for<br />
              PCCOE
            </h1>

            <p className="text-sm sm:text-base dark:text-zinc-400 text-zinc-700 max-w-xl leading-relaxed font-normal">
              Aggregate discussions, campus navigation, and encrypted messaging in real time.
              Monitor events and track opportunities—all without juggling multiple logins.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Link
                to="/login"
                className="px-7 py-3 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90 transition-all shadow-lg cursor-pointer"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-7 py-3 rounded-full dark:bg-[#121212] bg-zinc-100 border dark:border-[#27272A] border-zinc-300 dark:text-white text-zinc-900 font-medium text-sm hover:bg-zinc-200 dark:hover:bg-[#1C1C1E] transition-all cursor-pointer"
              >
                Explore platform
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Metric Widget Card (Theme Responsive) */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl dark:bg-[#09090B]/90 bg-white/95 backdrop-blur-xl border dark:border-[#27272A] border-zinc-300 p-6 shadow-2xl"
            >
              {/* Window Action Dots */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>

              {/* Inner Metric Box (Theme Responsive) */}
              <div className="rounded-2xl dark:bg-[#121214] bg-zinc-50 border dark:border-[#27272A]/80 border-zinc-200 p-6 space-y-4">
                <p className="text-[11px] font-bold tracking-wider dark:text-zinc-500 text-zinc-600 uppercase">
                  TOTAL PROJECT VIEWS
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 dark:text-zinc-500 text-zinc-600 stroke-[1.5]" />
                    <span className="text-3xl sm:text-4xl font-extrabold font-secondary dark:text-white text-zinc-950 tracking-tight">
                      {viewCount.toLocaleString()}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full dark:bg-[#052E16] bg-emerald-50 dark:text-[#4ADE80] text-emerald-700 border dark:border-[#166534] border-emerald-300">
                    <TrendingUp className="w-3.5 h-3.5" /> +4.2%
                  </span>
                </div>

                <p className="text-xs dark:text-zinc-500 text-zinc-600">Updating in realtime</p>

                {/* Animated Bar Chart Activity Simulator */}
                <div className="pt-2 flex items-end gap-2 h-14">
                  {[35, 45, 60, 50, 75, 55, 68, 88].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-t-md transition-all duration-500 ${
                        i === 7
                          ? 'bg-gradient-to-t from-[#6366F1] to-[#A78BFA]'
                          : 'dark:bg-zinc-800/80 bg-zinc-300 hover:bg-zinc-400 dark:hover:bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== MAIN SECTIONS (Centered max-w-[1200px] with generous inter-section spacing) ===================== */}
      <main className="max-w-[1200px] mx-auto px-6 md:px-12 pb-28 relative z-10 space-y-36">
        {/* SECTION 1: CONNECTING COMMUNITIES & CURVED ROTATING MARQUEE */}
        <section className="text-center space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-secondary text-transparent bg-clip-text bg-gradient-to-r from-[#FF9FFC] to-[#C084FC]">
              Connecting Communities
            </h2>
          </div>

          {/* Infinite Rotating Clubs Track */}
          <ClubsMarquee />

          {/* Space between Ticker and 360-Degree Convex Curved Marquee */}
          <div className="pt-8">
            <CurvedLoop />
          </div>
        </section>

        {/* SECTION 2: EXPLORE PLATFORM FEATURES (Sharp rectangular border, matching gradient title and svg colors) */}
        <section className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-secondary text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#C084FC]">
              Explore Platform Features
            </h2>
            <p className="text-xs sm:text-sm dark:text-zinc-400 text-zinc-700 leading-relaxed">
              From encrypted messaging to real-time campus navigation, discover all the tools
              designed to empower your social experience.
            </p>
          </div>

          {/* Sharp Rectangular Boundary Container with 0 Gap (Theme Responsive) */}
          <div className="rounded-none border dark:border-zinc-800/90 border-zinc-300 dark:bg-[#0D0D0D] bg-white overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x dark:divide-zinc-800/80 divide-zinc-200 shadow-2xl">
            {/* Card 1: Home Feed */}
            <div className="p-6 space-y-3.5 dark:hover:bg-[#131313] hover:bg-zinc-50 transition-all duration-300 group cursor-default border-b dark:border-zinc-800/80 border-zinc-200">
              <div className="w-9 h-9 flex items-center justify-center text-[#60A5FA] group-hover:text-[#C084FC] group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold bg-gradient-to-r from-[#60A5FA] to-[#C084FC] bg-clip-text text-transparent">
                Home Feed
              </h3>
              <p className="text-xs dark:text-zinc-400 text-zinc-700 leading-relaxed group-hover:dark:text-zinc-300 group-hover:text-zinc-950 transition-colors">
                Stay updated with a personalized feed of posts, announcements, and discussions from your subscribed communities and friends across campus.
              </p>
            </div>

            {/* Card 2: Communities */}
            <div className="p-6 space-y-3.5 dark:hover:bg-[#131313] hover:bg-zinc-50 transition-all duration-300 group cursor-default border-b dark:border-zinc-800/80 border-zinc-200">
              <div className="w-9 h-9 flex items-center justify-center text-[#60A5FA] group-hover:text-[#C084FC] group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold bg-gradient-to-r from-[#60A5FA] to-[#C084FC] bg-clip-text text-transparent">
                Communities
              </h3>
              <p className="text-xs dark:text-zinc-400 text-zinc-700 leading-relaxed group-hover:dark:text-zinc-300 group-hover:text-zinc-950 transition-colors">
                Discover and join 30+ student-run clubs and organizations at PCCOE — from OWASP and GDGC to Art Circle and NSS.
              </p>
            </div>

            {/* Card 3: Friends */}
            <div className="p-6 space-y-3.5 dark:hover:bg-[#131313] hover:bg-zinc-50 transition-all duration-300 group cursor-default border-b dark:border-zinc-800/80 border-zinc-200">
              <div className="w-9 h-9 flex items-center justify-center text-[#60A5FA] group-hover:text-[#C084FC] group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold bg-gradient-to-r from-[#60A5FA] to-[#C084FC] bg-clip-text text-transparent">
                Friends
              </h3>
              <p className="text-xs dark:text-zinc-400 text-zinc-700 leading-relaxed group-hover:dark:text-zinc-300 group-hover:text-zinc-950 transition-colors">
                Build your campus network by adding friends, viewing their activity, and staying connected through shared communities.
              </p>
            </div>

            {/* Card 4: Connect */}
            <div className="p-6 space-y-3.5 dark:hover:bg-[#131313] hover:bg-zinc-50 transition-all duration-300 group cursor-default border-b dark:border-zinc-800/80 border-zinc-200">
              <div className="w-9 h-9 flex items-center justify-center text-[#60A5FA] group-hover:text-[#C084FC] group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold bg-gradient-to-r from-[#60A5FA] to-[#C084FC] bg-clip-text text-transparent">
                Connect
              </h3>
              <p className="text-xs dark:text-zinc-400 text-zinc-700 leading-relaxed group-hover:dark:text-zinc-300 group-hover:text-zinc-950 transition-colors">
                Real-time encrypted messaging with end-to-end privacy. Chat one-on-one or in group conversations with fellow students.
              </p>
            </div>

            {/* Card 5: XD (Exchange) */}
            <div className="p-6 space-y-3.5 dark:hover:bg-[#131313] hover:bg-zinc-50 transition-all duration-300 group cursor-default">
              <div className="w-9 h-9 flex items-center justify-center text-[#60A5FA] group-hover:text-[#C084FC] group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold bg-gradient-to-r from-[#60A5FA] to-[#C084FC] bg-clip-text text-transparent">
                XD (Exchange)
              </h3>
              <p className="text-xs dark:text-zinc-400 text-zinc-700 leading-relaxed group-hover:dark:text-zinc-300 group-hover:text-zinc-950 transition-colors">
                An anonymous exchange board where students share honest thoughts, campus tips, professor reviews, and feedback freely.
              </p>
            </div>

            {/* Card 6: Campus Maps */}
            <div className="p-6 space-y-3.5 dark:hover:bg-[#131313] hover:bg-zinc-50 transition-all duration-300 group cursor-default">
              <div className="w-9 h-9 flex items-center justify-center text-[#60A5FA] group-hover:text-[#C084FC] group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300">
                <Map className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold bg-gradient-to-r from-[#60A5FA] to-[#C084FC] bg-clip-text text-transparent">
                Campus Maps
              </h3>
              <p className="text-xs dark:text-zinc-400 text-zinc-700 leading-relaxed group-hover:dark:text-zinc-300 group-hover:text-zinc-950 transition-colors">
                Interactive 3D campus navigation powered by TomTom — find classrooms, labs, cafeterias, and venues effortlessly.
              </p>
            </div>

            {/* Card 7: Academic Calendar */}
            <div className="p-6 space-y-3.5 dark:hover:bg-[#131313] hover:bg-zinc-50 transition-all duration-300 group cursor-default">
              <div className="w-9 h-9 flex items-center justify-center text-[#60A5FA] group-hover:text-[#C084FC] group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold bg-gradient-to-r from-[#60A5FA] to-[#C084FC] bg-clip-text text-transparent">
                Academic Calendar
              </h3>
              <p className="text-xs dark:text-zinc-400 text-zinc-700 leading-relaxed group-hover:dark:text-zinc-300 group-hover:text-zinc-950 transition-colors">
                Never miss an exam, holiday, or submission deadline. Sync your schedule with department and club events.
              </p>
            </div>

            {/* Card 8: Student Profile */}
            <div className="p-6 space-y-3.5 dark:hover:bg-[#131313] hover:bg-zinc-50 transition-all duration-300 group cursor-default">
              <div className="w-9 h-9 flex items-center justify-center text-[#60A5FA] group-hover:text-[#C084FC] group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold bg-gradient-to-r from-[#60A5FA] to-[#C084FC] bg-clip-text text-transparent">
                Student Profile
              </h3>
              <p className="text-xs dark:text-zinc-400 text-zinc-700 leading-relaxed group-hover:dark:text-zinc-300 group-hover:text-zinc-950 transition-colors">
                Showcase your achievements, certifications, and hackathon wins. Build your professional identity for peers & faculty.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: ABOUT COHORT PCCOE (Centered & High-contrast Justify Aligned Text) */}
        <section className="space-y-8 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-secondary text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#C084FC]">
            About Cohort PCCOE
          </h2>

          <div className="space-y-6 text-xs sm:text-sm leading-relaxed dark:text-zinc-400 text-zinc-800 text-justify">
            <p>
              Cohort is the official student social platform built exclusively for{' '}
              <strong className="dark:text-white text-zinc-950 font-bold">
                Pimpri Chinchwad College of Engineering (PCCOE)
              </strong>
              , Pune. Designed and developed by students, for students, it serves as the central hub where over{' '}
              <strong className="dark:text-white text-zinc-950 font-bold">350 active users</strong> connect, collaborate, and stay informed about everything happening on campus.
            </p>

            <p>
              Unlike generic social media platforms, Cohort is purpose-built for the college ecosystem. It aggregates more than 30 student-run communities and clubs — including technical organizations like{' '}
              <strong className="dark:text-white text-zinc-950 font-bold">
                OWASP, Google Developer Groups on Campus (GDGC), ACM, and Geeks for Geeks
              </strong>
              , as well as creative and social clubs like{' '}
              <strong className="dark:text-white text-zinc-950 font-bold">
                Art Circle, NSS, and ISR
              </strong>
              . Students can subscribe to communities, receive real-time post notifications, and participate in discussions without switching between multiple WhatsApp groups or Instagram pages.
            </p>

            <p>
              The platform features{' '}
              <strong className="dark:text-white text-zinc-950 font-bold">
                end-to-end encrypted messaging
              </strong>{' '}
              through the Connect module, allowing students to chat privately with friends or in groups. The{' '}
              <strong className="dark:text-white text-zinc-950 font-bold">
                XD (Exchange)
              </strong>{' '}
              board offers an anonymous space for campus-wide discussions, enabling students to share honest feedback, creative ideas, and study tips freely.
            </p>

            <p>
              Cohort also includes an{' '}
              <strong className="dark:text-white text-zinc-950 font-bold">
                interactive campus map
              </strong>{' '}
              powered by TomTom, helping new students and visitors navigate PCCOE's sprawling campus. The integrated{' '}
              <strong className="dark:text-white text-zinc-950 font-bold">
                academic calendar
              </strong>{' '}
              keeps everyone synchronized with exam schedules, holidays, and submission deadlines. Students can build their professional presence through{' '}
              <strong className="dark:text-white text-zinc-950 font-bold">
                achievement profiles
              </strong>
              , showcasing certifications, hackathon wins, and project accomplishments to peers and faculty alike.
            </p>

            <p>
              Built with modern technologies including{' '}
              <strong className="dark:text-white text-zinc-950 font-bold">
                React, Supabase, and real-time WebSocket connections
              </strong>
              , Cohort delivers a fast, responsive experience across desktop and mobile devices. The platform prioritizes student privacy, data security, and a distraction-free environment designed to enhance — not replace — the on-campus college experience.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
