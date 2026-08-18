import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, UserPlus, ExternalLink, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n_1',
    category: 'People',
    time: '13m ago',
    isUnread: true,
    title: 'You may know @aditya241',
    subtitle: '207_Aditya Patil is active on Cohort. Follow to stay updated.',
    profileUsername: 'aditya241',
  },
  {
    id: 'n_2',
    category: 'People',
    time: '13m ago',
    isUnread: true,
    title: 'You may know @vinayak23',
    subtitle: 'VINAYAK PAWARA is active on Cohort. Follow to stay updated.',
    profileUsername: 'vinayak23',
  },
];

export const HeadsUp = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const markSingleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
  };

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none">
      {/* Header (Screenshots 2 & 3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-secondary text-foreground">
              c/headsup
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB]/15 text-[#2563EB] text-xs font-bold">
                {unreadCount} unread
              </span>
            )}
            <img
              src="/assets/dark1-BZ1HA7yb.svg"
              alt="Spider-man doodle"
              className="w-9 h-9 object-contain opacity-70"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Your personalized notifications, recommendations, and updates.
          </p>
        </div>

        {/* Mark All Read Button */}
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Notifications List (Screenshots 2 & 3) */}
      <div className="space-y-4">
        {notifications.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4 relative group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-muted/60 text-muted-foreground shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  {/* Category Pill & Time */}
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 text-[10px] font-bold">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {item.time}
                    </span>
                    {item.isUnread && (
                      <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-border/40">
              <button
                onClick={() => navigate('/dashboard/network')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 shadow-sm transition-all cursor-pointer"
              >
                <span>View profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {item.isUnread && (
                <button
                  onClick={() => markSingleRead(item.id)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  Mark read
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
