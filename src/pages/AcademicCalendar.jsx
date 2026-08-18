import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const AcademicCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState('August 2026');
  const [selectedDay, setSelectedDay] = useState(18);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // August 2026 Calendar Matrix (Screenshot 6)
  const calendarCells = [
    // Row 1: July Overflow & Aug 1
    { day: 26, isCurrentMonth: false },
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },

    // Row 2: Aug 2 - 8
    { day: 2, isCurrentMonth: true },
    {
      day: 3,
      isCurrentMonth: true,
      events: [{ title: 'Red Channel Examination', color: 'bg-muted/80 text-foreground border border-border' }],
    },
    { day: 4, isCurrentMonth: true },
    {
      day: 5,
      isCurrentMonth: true,
      events: [{ title: 'Red Channel Result', color: 'bg-muted/80 text-foreground border border-border' }],
    },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },

    // Row 3: Aug 9 - 15
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },

    // Row 4: Aug 16 - 22 (Day 18 active selected)
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true, isToday: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },

    // Row 5: Aug 23 - 29
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },

    // Row 6: Aug 30 - Sept 5
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false },
    { day: 5, isCurrentMonth: false },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 select-none">
      {/* Header (Screenshot 6) */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold font-secondary text-foreground">
            c/calendar
          </h1>
          <img
            src="/assets/dark1-BZ1HA7yb.svg"
            alt="Spider-man doodle"
            className="w-10 h-10 object-contain opacity-70"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Academic events and important dates.
        </p>
      </div>

      {/* Month & Controls Bar */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-base font-bold font-secondary text-foreground">
          {currentMonth}
        </h2>
        <div className="flex items-center gap-1 text-muted-foreground">
          <button className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid Container (Screenshot 6) */}
      <div className="rounded-3xl bg-card border border-border/80 overflow-hidden shadow-sm">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-border/60 bg-muted/30">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="py-3 text-center text-xs font-semibold text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 7-Column Date Cells Matrix */}
        <div className="grid grid-cols-7 divide-x divide-y divide-border/60">
          {calendarCells.map((cell, idx) => {
            const isSelected = cell.day === selectedDay && cell.isCurrentMonth;

            return (
              <div
                key={idx}
                onClick={() => cell.isCurrentMonth && setSelectedDay(cell.day)}
                className={`min-h-[100px] sm:min-h-[110px] p-2 sm:p-2.5 transition-all flex flex-col justify-between cursor-pointer ${
                  !cell.isCurrentMonth
                    ? 'bg-muted/10 text-muted-foreground/40'
                    : isSelected
                    ? 'bg-blue-500/5 ring-2 ring-blue-500 ring-inset z-10'
                    : 'hover:bg-muted/20 text-foreground'
                }`}
              >
                {/* Date Number Pill */}
                <div className="flex items-center justify-between">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      isSelected
                        ? 'bg-teal-600 text-white font-bold'
                        : cell.isCurrentMonth
                        ? 'text-foreground'
                        : 'text-muted-foreground/50'
                    }`}
                  >
                    {cell.day}
                  </span>
                </div>

                {/* Event Tags inside cell */}
                <div className="space-y-1 mt-1">
                  {cell.events?.map((evt, eIdx) => (
                    <div
                      key={eIdx}
                      className={`px-1.5 py-1 rounded-md text-[10px] font-medium truncate ${evt.color}`}
                      title={evt.title}
                    >
                      {evt.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
