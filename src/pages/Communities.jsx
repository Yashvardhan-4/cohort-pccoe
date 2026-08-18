import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Users, ChevronDown, Sparkles, Check, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const PCCOE_REAL_CLUBS = [
  {
    id: 'gdgc',
    title: 'Google Developer Groups PCCOE (GDGC)',
    username: 'gdgcpccoe',
    category: 'Technical',
    dept: 'Computer & IT',
    description: 'Official Google Developer community at PCCOE. Web, Cloud, Flutter, ML hackathons, Study Jams and Solution Challenge.',
    membersCount: 340,
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=gdgc_pccoe',
  },
  {
    id: 'owasp',
    title: 'OWASP PCCOE Student Chapter',
    username: 'owasppccoe',
    category: 'Technical',
    dept: 'Computer & IT',
    description: 'Premier cybersecurity and ethical hacking community. Organizing CTFs, bug hunting bootcamps, and defense workshops.',
    membersCount: 280,
    banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=owasp_shield',
  },
  {
    id: 'team_redline',
    title: 'Team Redline (SAE BAJA PCCOE)',
    username: 'teamredline',
    category: 'Automotive & Racing',
    dept: 'Mechanical',
    description: 'Formula Student & All-Terrain Vehicle designing, fabrication, and national racing champion team of PCCOE.',
    membersCount: 190,
    banner: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=redline_racing',
  },
  {
    id: 'art_circle',
    title: 'Art Circle PCCOE (Cultural & Drama)',
    username: 'artcircle',
    category: 'Cultural',
    dept: 'All Departments',
    description: 'The creative heartbeat of PCCOE. Firodiya Karandak, Purushottam Karandak drama teams, music band, and annual gathering organizers.',
    membersCount: 420,
    banner: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&auto=format&fit=crop&q=80',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=art_circle',
  },
  {
    id: 'iicpccoe',
    title: "Institution's Innovation Council (IIC)",
    username: 'iicpccoe',
    category: 'SDW',
    dept: 'All Departments',
    description: "Fostering campus innovation, startup ideation, patent support, and student entrepreneurship bootcamps.",
    membersCount: 160,
    banner: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=iic_pccoe',
  },
  {
    id: 'nsspccoe',
    title: 'National Service Scheme (NSS PCCOE)',
    username: 'nsspccoe',
    category: 'SDW',
    dept: 'All Departments',
    description: 'Government of India recognized student volunteer cell organizing blood donation, rural immersion, and environmental drives.',
    membersCount: 310,
    banner: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=nss_wheel',
  },
  {
    id: 'isrpccoe',
    title: 'Institutional Social Responsibility (ISR)',
    username: 'isrpccoe',
    category: 'SDW',
    dept: 'All Departments',
    description: 'Community service and social impact initiatives driven by PCCOE students across Pimpri-Chinchwad municipal schools.',
    membersCount: 145,
    banner: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=isr_pccoe',
  },
  {
    id: 'acm',
    title: 'ACM PCCOE Student Chapter',
    username: 'acmpccoe',
    category: 'Technical',
    dept: 'Computer & IT',
    description: 'Association for Computing Machinery chapter advancing computing as a science and a profession with competitive programming.',
    membersCount: 220,
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=acm_pccoe',
  },
];

export const Communities = () => {
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribedClubs, setSubscribedClubs] = useState({});

  const toggleSubscribe = (clubId) => {
    setSubscribedClubs((prev) => ({ ...prev, [clubId]: !prev[clubId] }));
  };

  const filteredClubs = PCCOE_REAL_CLUBS.filter((c) => {
    const matchesDept = selectedDept === 'All Departments' || c.dept.includes(selectedDept) || c.dept === 'All Departments';
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 select-none">
      {/* Header with Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-secondary text-foreground">
              c/communities
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
            Join discussions and connect with your peers across 30+ PCCOE clubs.
          </p>
        </div>

        {/* Search & Department Dropdown */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-card border border-border text-xs text-foreground focus:outline-none focus:border-accent"
            />
          </div>

          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-foreground focus:outline-none focus:border-accent cursor-pointer"
            >
              <option>All Departments</option>
              <option>Computer & IT</option>
              <option>Mechanical</option>
              <option>All Departments</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Clubs Grid with Real Cover Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClubs.map((club) => {
          const isSubscribed = subscribedClubs[club.id];

          return (
            <div
              key={club.id}
              className="rounded-3xl bg-card border border-border/80 overflow-hidden shadow-sm hover:shadow-md hover:border-accent/40 transition-all space-y-3 relative group flex flex-col justify-between"
            >
              <div>
                {/* Top Cover Banner */}
                <div className="h-32 w-full relative overflow-hidden bg-muted">
                  <img
                    src={club.banner}
                    alt={club.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white">
                    {club.category}
                  </span>

                  {/* Subscribe Bell Button */}
                  <button
                    onClick={() => toggleSubscribe(club.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md ${
                      isSubscribed
                        ? 'bg-accent text-accent-foreground scale-110 font-bold'
                        : 'bg-black/40 text-white hover:bg-black/60'
                    }`}
                  >
                    <Bell className={`w-3.5 h-3.5 ${isSubscribed ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Overlapping Club Logo & Info Body */}
                <div className="px-5 pt-3 space-y-2 relative">
                  <div className="flex items-end justify-between -mt-10 mb-2">
                    <img
                      src={club.logo}
                      alt={club.title}
                      className="w-14 h-14 rounded-2xl bg-card p-1 border-2 border-card shadow-lg object-contain"
                    />
                    <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {club.membersCount} members
                    </span>
                  </div>

                  <h3 className="text-sm font-bold font-secondary text-foreground group-hover:text-accent transition-colors leading-tight">
                    {club.title}
                  </h3>
                  <p className="text-[11px] font-medium text-accent">
                    @{club.username}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {club.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-4 pt-2 border-t border-border/40">
                <Link
                  to={`/dashboard/communities/${club.username}`}
                  className="w-full py-2 rounded-xl bg-muted/60 hover:bg-[#2563EB] hover:text-white text-xs font-bold text-foreground flex items-center justify-center transition-all shadow-sm"
                >
                  View Community Posts →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
