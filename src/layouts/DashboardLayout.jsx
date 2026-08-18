import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Users,
  UserCheck,
  MessageSquare,
  Zap,
  MapPin,
  Calendar,
  Gamepad2,
  Bell,
  Mail,
  User,
  Sun,
  Moon,
  BarChart3,
  Search,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { RightSidebar } from '../components/RightSidebar';
import { BuddyAIChatModal } from '../components/BuddyAIChatModal';

export const DashboardLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isBuddyModalOpen, setIsBuddyModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Home', icon: Home, exact: true },
    { to: '/dashboard/communities', label: 'Communities', icon: Users, badge: 2 },
    { to: '/dashboard/network', label: 'Friends', icon: UserCheck },
    { to: '/dashboard/connect', label: 'Connect', icon: MessageSquare },
    { to: '/dashboard/xd', label: 'XD Reels', icon: Zap },
    { to: '/dashboard/map', label: 'Campus Map', icon: MapPin },
    { to: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
    { to: '/dashboard/arcade', label: 'Arcade', icon: Gamepad2 },
    { to: '/dashboard/headsup', label: 'HeadsUp', icon: Bell, badge: 2 },
    { to: '/dashboard/contact', label: 'Contact Us', icon: Mail },
    { to: '/dashboard/profile', label: 'Profile', icon: User },
    ...(isAdmin ? [{ to: '/dashboard/admins', label: 'Admins', icon: BarChart3, badge: 'PRO' }] : []),
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FB] dark:bg-[#07080A] text-foreground font-sans relative">
      {/* Subtle Geometric Doodle Pattern Background (Muted Ambient Backdrop) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-[0.09] dark:opacity-[0.05] text-zinc-800 dark:text-zinc-400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dashboard-geo-doodle"
            width="160"
            height="320"
            patternUnits="userSpaceOnUse"
          >
            <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {/* ROW 1 */}
              <polygon points="24,6 34,24 14,24" />
              <polygon points="56,6 68,15 56,24" />
              <rect x="80" y="8" width="14" height="14" rx="1.5" />
              <polygon points="108,6 118,24 98,24" />
              <polygon points="140,6 152,15 140,24" />

              {/* ROW 2 */}
              <rect x="2" y="50" width="14" height="14" rx="1.5" />
              <polygon points="20,50 36,50 28,66" />
              <rect x="42" y="52" width="10" height="10" rx="1" />
              <circle cx="64" cy="57" r="6" />
              <rect x="82" y="50" width="14" height="14" rx="1.5" />
              <polygon points="100,50 116,50 108,66" />
              <rect x="122" y="52" width="10" height="10" rx="1" />
              <circle cx="144" cy="57" r="6" />

              {/* ROW 3 */}
              <polygon points="0,88 6,98 0,98" />
              <circle cx="20" cy="96" r="6" />
              <rect x="36" y="91" width="10" height="10" rx="1" />
              <rect x="58" y="91" width="10" height="10" rx="1" />
              <polygon points="82,86 92,104 72,104" />
              <circle cx="102" cy="96" r="6" />
              <rect x="118" y="91" width="10" height="10" rx="1" />
              <rect x="138" y="91" width="10" height="10" rx="1" />

              {/* ROW 4 */}
              <polygon points="24,126 34,144 14,144" />
              <rect x="36" y="131" width="10" height="10" rx="1" />
              <polygon points="56,126 68,135 56,144" />
              <rect x="80" y="128" width="14" height="14" rx="1.5" />
              <polygon points="108,126 118,144 98,144" />
              <rect x="118" y="131" width="10" height="10" rx="1" />
              <polygon points="140,126 152,135 140,144" />

              {/* ROW 5 */}
              <rect x="2" y="170" width="14" height="14" rx="1.5" />
              <polygon points="20,170 36,170 28,186" />
              <rect x="42" y="172" width="10" height="10" rx="1" />
              <circle cx="64" cy="177" r="6" />
              <rect x="82" y="170" width="14" height="14" rx="1.5" />
              <polygon points="100,170 116,170 108,186" />
              <rect x="122" y="172" width="10" height="10" rx="1" />
              <circle cx="144" cy="177" r="6" />

              {/* ROW 6 */}
              <polygon points="0,208 6,218 0,218" />
              <circle cx="20" cy="216" r="6" />
              <rect x="36" y="211" width="10" height="10" rx="1" />
              <rect x="58" y="211" width="10" height="10" rx="1" />
              <polygon points="82,206 92,224 72,224" />
              <circle cx="102" cy="216" r="6" />
              <rect x="118" y="211" width="10" height="10" rx="1" />
              <rect x="138" y="211" width="10" height="10" rx="1" />

              {/* ROW 7 */}
              <polygon points="24,246 34,264 14,264" />
              <rect x="36" y="251" width="10" height="10" rx="1" />
              <polygon points="56,246 68,255 56,264" />
              <rect x="80" y="248" width="14" height="14" rx="1.5" />
              <polygon points="108,246 118,264 98,264" />
              <rect x="118" y="251" width="10" height="10" rx="1" />
              <polygon points="140,246 152,255 140,264" />

              {/* ROW 8 */}
              <rect x="2" y="290" width="14" height="14" rx="1.5" />
              <polygon points="20,290 36,290 28,306" />
              <rect x="42" y="292" width="10" height="10" rx="1" />
              <circle cx="64" cy="297" r="6" />
              <rect x="82" y="290" width="14" height="14" rx="1.5" />
              <polygon points="100,290 116,290 108,306" />
              <rect x="122" y="292" width="10" height="10" rx="1" />
              <circle cx="144" cy="297" r="6" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dashboard-geo-doodle)" />
      </svg>

      {/* ===================== HOVER-EXPANDABLE LEFT SIDEBAR ===================== */}
      <aside
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className={`fixed left-0 top-0 bottom-0 flex flex-col justify-between border-r border-border/80 bg-card/95 backdrop-blur-2xl py-4 transition-all duration-300 ease-in-out shadow-2xl select-none ${
          isSidebarHovered ? 'w-64 px-4 z-[80] shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'w-16 px-2.5 items-center z-[70]'
        }`}
      >
        {/* Top Cohort Logo & Brand Name */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 w-full cursor-pointer overflow-hidden"
        >
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center p-1 hover:scale-105 transition-transform shrink-0">
            <img
              src="/cohort-logo_g04wy2.png"
              alt="Cohort Logo"
              className="w-full h-full object-contain"
            />
          </div>
          {isSidebarHovered && (
            <div className="overflow-hidden whitespace-nowrap transition-opacity duration-200">
              <h1 className="text-sm font-bold font-secondary text-foreground leading-none">
                Cohort
              </h1>
              <p className="text-[10px] font-medium text-accent">PCCOE Pune</p>
            </div>
          )}
        </div>

        {/* Navigation Icon List */}
        <nav className="flex-1 w-full my-4 flex flex-col gap-1.5 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.to || location.pathname === item.to + '/'
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                title={!isSidebarHovered ? item.label : undefined}
                className={`relative flex items-center gap-3.5 px-3 py-2.5 rounded-2xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/25'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-foreground hover:bg-muted/70'
                } ${!isSidebarHovered ? 'justify-center' : ''}`}
              >
                <div className="relative shrink-0">
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                  {item.badge && !isSidebarHovered && (
                    <span className="absolute -top-1 -right-1 px-1 min-w-[14px] h-[14px] rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>

                {isSidebarHovered && (
                  <span className="text-xs font-semibold whitespace-nowrap overflow-hidden flex-1 truncate">
                    {item.label}
                  </span>
                )}

                {isSidebarHovered && item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-bold shrink-0">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions: Theme Switcher & Logout */}
        <div className="w-full flex flex-col gap-1.5 pt-3 border-t border-border/50">
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-3 w-full p-2.5 rounded-2xl text-zinc-500 hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer ${
              !isSidebarHovered ? 'justify-center' : ''
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-5 h-5 text-zinc-700 shrink-0" />
            )}
            {isSidebarHovered && (
              <span className="text-xs font-semibold whitespace-nowrap truncate">
                {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
              </span>
            )}
          </button>

          <button
            onClick={handleLogout}
            title="Log Out"
            className={`flex items-center gap-3 w-full p-2.5 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer ${
              !isSidebarHovered ? 'justify-center' : ''
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarHovered && (
              <span className="text-xs font-semibold whitespace-nowrap truncate">
                Log Out
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* ===================== CENTER VIEWPORT & RIGHT SIDEBAR ===================== */}
      <div className="flex-1 flex h-full min-w-0 pl-16 overflow-hidden relative z-10">
        {/* Center Main Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto relative p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Right Dashboard Sidebar */}
        <RightSidebar />
      </div>

      {/* Floating Circular Buddy AI Chatbot Bubble at Bottom Right */}
      <div
        onClick={() => setIsBuddyModalOpen(!isBuddyModalOpen)}
        title="Chat with Buddy AI"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-0.5 shadow-2xl hover:scale-110 transition-transform cursor-pointer flex items-center justify-center group"
      >
        <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
          <img
            src="/buddy-removebg-preview_cwrfpd.png"
            alt="Buddy AI"
            className="w-7 h-7 object-contain group-hover:rotate-12 transition-transform"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Interactive Gemini-Powered Buddy AI Chatbot Modal */}
      <BuddyAIChatModal
        isOpen={isBuddyModalOpen}
        onClose={() => setIsBuddyModalOpen(false)}
      />
    </div>
  );
};
