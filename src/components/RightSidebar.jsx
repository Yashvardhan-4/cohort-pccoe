import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ArrowRight, BookOpen, TrendingUp, Code2, User } from 'lucide-react';
import { SmileyAvatarSVG } from './PremiumVectors';

export const RightSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-80 shrink-0 hidden xl:flex flex-col gap-6 p-4 border-l border-border/60 bg-card/60 backdrop-blur-md overflow-y-auto select-none">
      {/* Search Cohort Box with ⌘K Badge */}
      <div className="relative">
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-muted/40 border border-border/80 text-xs text-muted-foreground focus-within:border-accent focus-within:bg-background transition-all shadow-sm">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search cohort..."
            className="w-full bg-transparent text-xs text-foreground focus:outline-none placeholder:text-muted-foreground"
          />
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border/50 shrink-0">
            ⌘K
          </span>
        </div>
      </div>

      {/* C/COMMUNITIES Section */}
      <div className="space-y-3">
        <Link
          to="/dashboard/communities"
          className="flex items-center justify-between text-xs font-bold font-secondary text-muted-foreground hover:text-foreground tracking-wider uppercase transition-colors"
        >
          <span>C/COMMUNITIES</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="space-y-2.5">
          <Link
            to="/dashboard/communities"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted/60 transition-colors group cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium text-foreground truncate group-hover:text-accent transition-colors">
              Higher Studies Club for UPSC / MPSC -...
            </span>
          </Link>

          <Link
            to="/dashboard/communities/gdgcpccoe"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted/60 transition-colors group cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium text-foreground truncate group-hover:text-accent transition-colors">
              Google Developer Groups PCCOE
            </span>
          </Link>

          <Link
            to="/dashboard/communities"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted/60 transition-colors group cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium text-foreground truncate group-hover:text-accent transition-colors">
              Higher Studies Club for CAT / GMAT -...
            </span>
          </Link>
        </div>
      </div>

      {/* C/FRIENDS Section */}
      <div className="space-y-3 relative">
        <Link
          to="/dashboard/network"
          className="flex items-center justify-between text-xs font-bold font-secondary text-muted-foreground hover:text-foreground tracking-wider uppercase transition-colors"
        >
          <span>C/FRIENDS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="space-y-2.5">
          <Link
            to="/dashboard/network"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted/60 transition-colors group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              C
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                C157_ Shravan Kolhe
              </p>
              <p className="text-[10px] text-muted-foreground">@shravan24</p>
            </div>
          </Link>

          <Link
            to="/dashboard/network"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted/60 transition-colors group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden shadow-sm shrink-0">
              <SmileyAvatarSVG color="#10B981" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                FELINA MATHEW
              </p>
              <p className="text-[10px] text-muted-foreground">@felina22</p>
            </div>
          </Link>

          <Link
            to="/dashboard/network"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted/60 transition-colors group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                SHUJA MIRZA
              </p>
              <p className="text-[10px] text-muted-foreground">@shujaullah25</p>
            </div>
          </Link>
        </div>
      </div>

      {/* C/CONNECT Section */}
      <div className="space-y-3">
        <Link
          to="/dashboard/connect"
          className="flex items-center justify-between text-xs font-bold font-secondary text-muted-foreground hover:text-foreground tracking-wider uppercase transition-colors"
        >
          <span>C/CONNECT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="space-y-2.5">
          <Link
            to="/dashboard/connect"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted/60 transition-colors group cursor-pointer"
          >
            <div className="truncate">
              <p className="text-xs font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                C157_ Shravan Kolhe
              </p>
              <p className="text-[10px] text-muted-foreground">@shravan24</p>
            </div>
          </Link>

          <Link
            to="/dashboard/connect"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted/60 transition-colors group cursor-pointer"
          >
            <div className="truncate">
              <p className="text-xs font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                FELINA MATHEW
              </p>
              <p className="text-[10px] text-muted-foreground">@felina22</p>
            </div>
          </Link>

          <Link
            to="/dashboard/connect"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted/60 transition-colors group cursor-pointer"
          >
            <div className="truncate">
              <p className="text-xs font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                SHUJA MIRZA
              </p>
              <p className="text-[10px] text-muted-foreground">@shujaullah25</p>
            </div>
          </Link>
        </div>
      </div>

      {/* C/CALENDAR Section */}
      <div className="space-y-3">
        <Link
          to="/dashboard/calendar"
          className="flex items-center justify-between text-xs font-bold font-secondary text-muted-foreground hover:text-foreground tracking-wider uppercase transition-colors"
        >
          <span>C/CALENDAR</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="p-3 rounded-2xl bg-muted/30 border border-border/60 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">No upcoming events</span>
          <img
            src="/assets/dark3-QsL2CcWP.svg"
            alt="Spider-man sketch"
            className="w-8 h-8 object-contain opacity-40"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </aside>
  );
};
