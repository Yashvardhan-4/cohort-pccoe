import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-background border-t-2 dark:border-white/20 border-zinc-300 text-foreground pt-16 pb-12 transition-colors select-none">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 space-y-14">
        {/* Top 3-Column Navigation Grid with Responsive Column Divider Lines */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Column 1: Product */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-base font-bold font-secondary text-[#818CF8]">
              Product
            </h4>
            <ul className="space-y-3 text-sm font-medium dark:text-zinc-400 text-zinc-700">
              <li>
                <Link to="/dashboard" className="dark:hover:text-white hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/connect" className="dark:hover:text-white hover:text-black transition-colors">
                  Connect
                </Link>
              </li>
              <li>
                <Link to="/dashboard/map" className="dark:hover:text-white hover:text-black transition-colors">
                  Maps
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profile" className="dark:hover:text-white hover:text-black transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company with Responsive Column Divider */}
          <div className="md:col-span-5 space-y-4 md:border-l-2 dark:md:border-white/30 md:border-zinc-300 md:pl-8">
            <h4 className="text-base font-bold font-secondary text-[#C084FC]">
              Company
            </h4>
            <ul className="space-y-3 text-sm font-medium dark:text-zinc-400 text-zinc-700">
              <li>
                <Link to="/dashboard/communities" className="dark:hover:text-white hover:text-black transition-colors">
                  Communities
                </Link>
              </li>
              <li>
                <Link to="/dashboard/network" className="dark:hover:text-white hover:text-black transition-colors">
                  Friends
                </Link>
              </li>
              <li>
                <Link to="/dashboard/xd" className="dark:hover:text-white hover:text-black transition-colors">
                  XD
                </Link>
              </li>
              <li>
                <Link to="/dashboard/map" className="dark:hover:text-white hover:text-black transition-colors">
                  Maps
                </Link>
              </li>
              <li>
                <Link to="/dashboard/calendar" className="dark:hover:text-white hover:text-black transition-colors">
                  Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Links with Responsive Column Divider */}
          <div className="md:col-span-4 flex items-center gap-5 md:border-l-2 dark:md:border-white/30 md:border-zinc-300 md:pl-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="dark:text-zinc-400 text-zinc-700 dark:hover:text-white hover:text-black hover:scale-110 transition-all"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="dark:text-zinc-400 text-zinc-700 dark:hover:text-white hover:text-black hover:scale-110 transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:chiragferwani@gmail.com"
              aria-label="Email"
              className="dark:text-zinc-400 text-zinc-700 dark:hover:text-white hover:text-black hover:scale-110 transition-all"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t-2 dark:border-white/20 border-zinc-300" />

        {/* Bottom Section: Regulatory disclaimer & Giant Cohort logo */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-lg space-y-2">
            <h5 className="text-sm font-bold text-indigo-400">
              Regulatory disclaimer
            </h5>
            <p className="text-xs sm:text-sm dark:text-zinc-400 text-zinc-700 leading-relaxed">
              Cohort is a community platform, not a bank. Services are provided by partner
              organizations across the campus up to applicable limits.
            </p>
          </div>

          {/* Giant Cohort Brand Emblem */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <img
              src="/cohort-logo_g04wy2.png"
              alt="Cohort Logo"
              className="w-14 h-14 object-contain"
              onError={(e) => {
                e.target.src = '/cohort-logo.png';
              }}
            />
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-secondary text-[#C084FC]">
              Cohort
            </span>
          </div>
        </div>

        {/* Bottom-most Row: Copyright & Legal */}
        <div className="pt-6 border-t dark:border-white/10 border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm dark:text-zinc-400 text-zinc-600">
          <p>©2026 Cohort Social Inc.</p>
          <div className="flex items-center gap-6 font-medium">
            <Link to="/privacy-policy" className="dark:hover:text-white hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="dark:hover:text-white hover:text-black transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
