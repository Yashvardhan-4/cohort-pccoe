import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Layers,
  Search,
  Compass,
  Info,
  X,
  Footprints,
  Coffee,
  Building2,
  Trophy,
  BookOpen,
  Wrench,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PCCOE_3D_LANDMARKS = [
  {
    id: 'b_block',
    name: 'B-Block (Computer, IT & AI-DS)',
    code: 'B-BLOCK',
    category: 'tech',
    top: '36%',
    left: '56%',
    height: 'h-24 sm:h-28',
    width: 'w-24 sm:w-28',
    color: 'from-blue-600 to-indigo-700',
    pinColor: 'bg-blue-500',
    icon: Building2,
    floors: ['Ground: GPU Computing & Server Room', '1st: Comp Labs 1-4 & GDGC Room', '2nd: IT HOD & Software Labs', '3rd: AI-DS Labs & Seminar Hall B-302'],
    description: 'High-speed NVIDIA AI cluster, departmental labs, and Google Developer Groups hub.',
  },
  {
    id: 'a_block',
    name: 'A-Block (Mechanical & Civil Engineering)',
    code: 'A-BLOCK',
    category: 'mech',
    top: '52%',
    left: '36%',
    height: 'h-20 sm:h-24',
    width: 'w-28 sm:w-32',
    color: 'from-amber-600 to-orange-700',
    pinColor: 'bg-amber-500',
    icon: Building2,
    floors: ['Ground: Dean Academics & CNC Lab', '1st: Thermodynamics & CAD/CAM', '2nd: Classrooms A-201 to A-210', '3rd: Civil Surveying & Library'],
    description: 'Autonomous academic dean center, mechanical design labs, and civil engineering testing bays.',
  },
  {
    id: 'admin_lib',
    name: 'Admin Building & Central Library',
    code: 'ADMIN-LIB',
    category: 'admin',
    top: '22%',
    left: '42%',
    height: 'h-24 sm:h-26',
    width: 'w-22 sm:w-26',
    color: 'from-purple-600 to-pink-700',
    pinColor: 'bg-purple-500',
    icon: BookOpen,
    floors: ['Ground: Principal Office & Accounts Counter', '1st: Central Library (50,000+ Books)', '2nd: 350-Seat AC Central Reading Hall', '3rd: Exam Cell & Board Room'],
    description: 'Administrative offices, student bonafide counter, and air-conditioned multi-story central library.',
  },
  {
    id: 'canteen',
    name: 'PCCOE Main Canteen & Food Court',
    code: 'CANTEEN',
    category: 'food',
    top: '68%',
    left: '48%',
    height: 'h-16 sm:h-18',
    width: 'w-24 sm:w-28',
    color: 'from-rose-600 to-red-700',
    pinColor: 'bg-rose-500',
    icon: Coffee,
    floors: ['Ground: South Indian Dosa, Thali Counter & Juice Bar', 'Mezzanine: Faculty Dining & Nescafe Kiosk'],
    description: 'Campus cafeteria serving breakfast, lunch meals, snacks, and student lounge area.',
  },
  {
    id: 'workshop',
    name: 'Central Workshop & SAE Racing Garage',
    code: 'WORKSHOP',
    category: 'labs',
    top: '62%',
    left: '22%',
    height: 'h-18 sm:h-20',
    width: 'w-24 sm:w-28',
    color: 'from-emerald-600 to-teal-700',
    pinColor: 'bg-emerald-500',
    icon: Wrench,
    floors: ['Bay 1: Lathe & Fitting Machines', 'Bay 2: 3D Printing FabLab', 'Bay 3: Team Redline Formula SAE Garage'],
    description: 'Prototyping FabLab, carpentry, welding, and racecar design garage.',
  },
  {
    id: 'sports',
    name: 'Sports Arena & Basketball Court',
    code: 'SPORTS',
    category: 'sports',
    top: '46%',
    left: '78%',
    height: 'h-16 sm:h-20',
    width: 'w-28 sm:w-36',
    color: 'from-cyan-600 to-blue-700',
    pinColor: 'bg-cyan-500',
    icon: Trophy,
    floors: ['Outdoor: Floodlit Basketball Court & Cricket Turf', 'Indoor: Table Tennis, Badminton & Gym'],
    description: 'Tournament-ready basketball court, gymnasium, and sports pavilion.',
  },
];

export const CampusMap = () => {
  const [selectedLandmark, setSelectedLandmark] = useState(PCCOE_3D_LANDMARKS[0]);
  const [viewAngle, setViewAngle] = useState('isometric'); // 'isometric' | 'perspective' | 'top'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLandmarks = PCCOE_3D_LANDMARKS.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-secondary text-foreground">
              c/maps
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold">
              3D PCCOE Campus
            </span>
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
            Interactive 3D isometric navigation for PCCOE Nigdi Sector-26 campus.
          </p>
        </div>

        {/* View Angle Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewAngle('isometric')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewAngle === 'isometric'
                ? 'bg-[#2563EB] text-white shadow-md'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            3D Isometric
          </button>
          <button
            onClick={() => setViewAngle('perspective')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewAngle === 'perspective'
                ? 'bg-[#2563EB] text-white shadow-md'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Elevated
          </button>
          <button
            onClick={() => setViewAngle('top')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewAngle === 'top'
                ? 'bg-[#2563EB] text-white shadow-md'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            2D Map
          </button>
        </div>
      </div>

      {/* Main 3D Isometric Viewport Container */}
      <div className="relative w-full h-[74vh] min-h-[560px] rounded-3xl bg-[#090A0C] border border-border/80 overflow-hidden shadow-2xl flex items-center justify-center p-4">
        {/* Subtle 3D Isometric Ground Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E2228_1px,transparent_1px),linear-gradient(to_bottom,#1E2228_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

        {/* Surrounding Street Tags */}
        <div className="absolute top-4 left-6 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
          Ganga Nagar Road ➔ Akurdi Stn
        </div>
        <div className="absolute bottom-4 left-6 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
          Sector 26, Pradhikaran, Nigdi
        </div>

        {/* 3D Tilted Campus Ground */}
        <div
          className={`relative w-full max-w-4xl h-[78vh] rounded-3xl transition-transform duration-700 ${
            viewAngle === 'isometric'
              ? '[transform:perspective(1400px)_rotateX(32deg)_rotateZ(-14deg)]'
              : viewAngle === 'perspective'
              ? '[transform:perspective(1000px)_rotateX(48deg)]'
              : '[transform:none]'
          }`}
        >
          {/* Base Campus Layout Ground Floor */}
          <div className="absolute inset-0 rounded-3xl bg-[#111418] border-2 border-zinc-800 shadow-2xl overflow-hidden">
            {/* Campus Central Green Quad */}
            <div className="absolute top-[38%] left-[44%] w-40 h-32 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 flex items-center justify-center">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-emerald-400">
                PCCOE Quad
              </span>
            </div>

            {/* Roads & Pathways */}
            <div className="absolute top-0 bottom-0 left-[38%] w-10 bg-zinc-800/60 border-l border-r border-zinc-700/40" />
            <div className="absolute left-0 right-0 top-[52%] h-10 bg-zinc-800/60 border-t border-b border-zinc-700/40" />
          </div>

          {/* Connected Route Polyline */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <polyline
              points="420,180 540,240 480,480 340,360 220,440"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray="6 6"
              opacity="0.8"
            />
          </svg>

          {/* 3D Extruded Buildings & Pins */}
          {PCCOE_3D_LANDMARKS.map((item) => {
            const isSelected = selectedLandmark?.id === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                style={{ top: item.top, left: item.left }}
                onClick={() => setSelectedLandmark(item)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
              >
                {/* 3D Extruded Building Block with Depth Shadow */}
                <div
                  className={`relative ${item.width} ${item.height} rounded-2xl bg-gradient-to-tr ${item.color} border-2 border-white/30 shadow-[0_18px_30px_rgba(0,0,0,0.8)] transition-transform duration-300 ${
                    isSelected ? 'scale-115 ring-4 ring-white' : 'hover:scale-105'
                  }`}
                >
                  {/* Rooftop Indicator & Code */}
                  <div className="absolute inset-0 p-2 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/40 px-1.5 py-0.5 rounded">
                        {item.code}
                      </span>
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${item.pinColor} animate-ping`} />
                      <span className="text-[9px] font-bold truncate drop-shadow">
                        {item.name.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Landmark Details Modal Card */}
        <AnimatePresence>
          {selectedLandmark && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 right-6 left-6 sm:left-auto sm:w-96 rounded-3xl bg-card/95 backdrop-blur-2xl border border-border p-5 space-y-4 shadow-2xl z-40"
            >
              <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider">
                    PCCOE Autonomous Campus
                  </span>
                  <h3 className="text-sm font-bold font-secondary text-foreground">
                    {selectedLandmark.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLandmark(null)}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedLandmark.description}
              </p>

              {/* Floor Breakdown */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase text-foreground">
                  Floor Directory
                </span>
                <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                  {selectedLandmark.floors.map((floor, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-2 rounded-xl bg-muted/40 border border-border/50 text-[11px] text-muted-foreground"
                    >
                      {floor}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ©TomTom 3D Campus Engine Badge */}
        <div className="absolute bottom-3 right-4 z-30 text-[10px] font-semibold text-zinc-400 bg-black/80 px-2.5 py-1 rounded-lg border border-zinc-800 backdrop-blur-md">
          ©TomTom 3D Engine • PCCOE
        </div>
      </div>
    </div>
  );
};
