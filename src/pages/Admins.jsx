import React, { useState } from 'react';
import { dataStore } from '../lib/supabase';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  Users,
  ShieldCheck,
  TrendingUp,
  Activity,
  Check,
  X,
  Clock,
  Filter,
} from 'lucide-react';
import { motion } from 'framer-motion';

const DEPT_DATA = [
  { name: 'Computer', value: 145 },
  { name: 'IT', value: 98 },
  { name: 'EnTC', value: 62 },
  { name: 'Mechanical', value: 45 },
  { name: 'Civil', value: 28 },
  { name: 'AI & DS', value: 72 },
];

const USER_TYPE_DATA = [
  { name: 'Students', value: 310 },
  { name: 'Alumni', value: 40 },
];

const SCREEN_TIME_DATA = [
  { date: '12 Aug', seconds: 4800 },
  { date: '13 Aug', seconds: 6200 },
  { date: '14 Aug', seconds: 8900 },
  { date: '15 Aug', seconds: 7100 },
  { date: '16 Aug', seconds: 9400 },
  { date: '17 Aug', seconds: 11500 },
  { date: '18 Aug', seconds: 12800 },
];

const INITIAL_REQUESTS = [
  { id: 'req_1', name: 'Atharva Patil', email: 'atharva.patil@pccoepune.org', dept: 'Computer', status: 'Pending', time: '10 mins ago' },
  { id: 'req_2', name: 'Sakshi Deshpande', email: 'sakshi.d@pccoepune.org', dept: 'Information Technology', status: 'Pending', time: '1 hour ago' },
  { id: 'req_3', name: 'Karan Mehra', email: 'karan.mehra@pccoepune.org', dept: 'EnTC', status: 'Approved', time: 'Yesterday' },
];

const COLORS = ['#83C5BE', '#00B4D8', '#7209B7', '#F72585', '#4CC9F0', '#F39C12'];

export const Admins = () => {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [activeTab, setActiveTab] = useState('statistics');

  const handleAction = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-card to-card/80 border border-border/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Platform Control Center
          </span>
          <h1 className="text-2xl font-bold font-secondary text-foreground">
            Admin Analytics & Governance
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor real-time student engagement, department demographics, and verify campus access requests.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-muted/60 p-1.5 rounded-full border border-border/60">
          <button
            onClick={() => setActiveTab('statistics')}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'statistics'
                ? 'bg-accent text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'requests'
                ? 'bg-accent text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Access Requests ({requests.filter((r) => r.status === 'Pending').length})
          </button>
        </div>
      </div>

      {activeTab === 'statistics' && (
        <div className="space-y-6">
          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-card border border-border/80 shadow-sm">
              <p className="text-[11px] font-bold uppercase text-muted-foreground">Total Users</p>
              <h3 className="text-2xl font-extrabold font-secondary text-foreground mt-1">350+</h3>
              <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18 this week
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-card border border-border/80 shadow-sm">
              <p className="text-[11px] font-bold uppercase text-muted-foreground">Active Clubs</p>
              <h3 className="text-2xl font-extrabold font-secondary text-foreground mt-1">30</h3>
              <p className="text-[10px] text-accent mt-1">Technical & Cultural</p>
            </div>
            <div className="p-5 rounded-3xl bg-card border border-border/80 shadow-sm">
              <p className="text-[11px] font-bold uppercase text-muted-foreground">Total Views</p>
              <h3 className="text-2xl font-extrabold font-secondary text-foreground mt-1">11,513</h3>
              <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +4.2% live trend
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-card border border-border/80 shadow-sm">
              <p className="text-[11px] font-bold uppercase text-muted-foreground">Pending Requests</p>
              <h3 className="text-2xl font-extrabold font-secondary text-rose-400 mt-1">
                {requests.filter((r) => r.status === 'Pending').length}
              </h3>
              <p className="text-[10px] text-muted-foreground mt-1">Awaiting approval</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Distribution Bar Chart */}
            <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Department Distribution
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DEPT_DATA}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={11} />
                    <YAxis stroke="#888888" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#121212',
                        borderColor: '#333333',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="value" fill="#83C5BE" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Daily Platform Screen Time Area Chart */}
            <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Daily Campus Engagement (Seconds)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SCREEN_TIME_DATA}>
                    <XAxis dataKey="date" stroke="#888888" fontSize={11} />
                    <YAxis stroke="#888888" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#121212',
                        borderColor: '#333333',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="seconds"
                      stroke="#00B4D8"
                      fill="#00B4D8"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Pending Account Verification Requests</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground">
                  <th className="pb-3 font-semibold">Student Name</th>
                  <th className="pb-3 font-semibold">Institutional Email</th>
                  <th className="pb-3 font-semibold">Department</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 font-bold text-foreground">{req.name}</td>
                    <td className="py-3.5 font-mono text-muted-foreground">{req.email}</td>
                    <td className="py-3.5 text-foreground">{req.dept}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          req.status === 'Approved'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : req.status === 'Rejected'
                            ? 'bg-destructive/15 text-destructive'
                            : 'bg-amber-500/15 text-amber-400'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-2">
                      {req.status === 'Pending' ? (
                        <>
                          <button
                            onClick={() => handleAction(req.id, 'Approved')}
                            className="px-3 py-1 rounded-full bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(req.id, 'Rejected')}
                            className="px-3 py-1 rounded-full bg-muted text-destructive hover:bg-destructive/20 transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] text-muted-foreground">Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
