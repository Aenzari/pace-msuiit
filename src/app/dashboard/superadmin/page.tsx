"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Briefcase,
  BarChart3,
  Settings,
  UserCheck,
  UserX,
  PlusCircle,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Award,
  Key,
  Database,
  RefreshCw,
  Sliders,
  ChevronRight,
  Filter,
  Eye,
  LogOut,
  Bell,
  Sparkles,
  Layers
} from "lucide-react";

interface CounselorItem {
  id: string;
  name: string;
  email: string;
  department: string;
  activeStudents: number;
  appointmentsToday: number;
  status: "active" | "inactive";
  quotaMax: number;
  rating: number;
}

interface RecruiterItem {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  industry: string;
  status: "pending" | "approved" | "suspended";
  joinDate: string;
  tokenAccess: boolean;
  activeJobs: number;
}

export default function SuperadminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "counselors" | "recruiters" | "analytics" | "settings">("overview");
  
  // Counselor State
  const [counselors, setCounselors] = useState<CounselorItem[]>([
    { id: "c1", name: "Dr. Maria Santos", email: "maria.santos@g.msuiit.edu.ph", department: "College of Computer Studies", activeStudents: 48, appointmentsToday: 6, status: "active", quotaMax: 10, rating: 4.9 },
    { id: "c2", name: "Prof. Roberto Gomez", email: "roberto.gomez@g.msuiit.edu.ph", department: "College of Engineering & Tech", activeStudents: 52, appointmentsToday: 8, status: "active", quotaMax: 8, rating: 4.8 },
    { id: "c3", name: "Guidance Counselor Elena Lim", email: "elena.lim@g.msuiit.edu.ph", department: "Psychological & Career Svcs", activeStudents: 39, appointmentsToday: 4, status: "active", quotaMax: 8, rating: 4.7 },
    { id: "c4", name: "Dr. Arthur Pendelton", email: "arthur.pendelton@g.msuiit.edu.ph", department: "College of Science & Math", activeStudents: 24, appointmentsToday: 0, status: "inactive", quotaMax: 6, rating: 4.6 },
    { id: "c5", name: "Engr. Fatima Al-Mansoor", email: "fatima.almansoor@g.msuiit.edu.ph", department: "Industry Liaison Unit", activeStudents: 41, appointmentsToday: 5, status: "active", quotaMax: 10, rating: 4.95 }
  ]);

  const [showAddCounselorModal, setShowAddCounselorModal] = useState(false);
  const [newCounselor, setNewCounselor] = useState({ name: "", email: "", department: "College of Computer Studies", quotaMax: 8 });

  // Recruiter State
  const [recruiters, setRecruiters] = useState<RecruiterItem[]>([
    { id: "r1", company: "TechCorp Philippines", contactPerson: "Sarah Jenkins", email: "s.jenkins@techcorp.ph", industry: "Fintech & Cloud Engineering", status: "approved", joinDate: "2026-08-15", tokenAccess: true, activeJobs: 6 },
    { id: "r2", company: "Ayala Digital Labs", contactPerson: "Marco Valdes", email: "m.valdes@ayaladigital.com", industry: "Enterprise Software & AI", status: "approved", joinDate: "2026-09-02", tokenAccess: true, activeJobs: 4 },
    { id: "r3", company: "Mindanao Silicon Ventures", contactPerson: "Amina Hadji", email: "amina@msv.tech", industry: "Embedded Systems & IoT", status: "pending", joinDate: "2026-10-24", tokenAccess: false, activeJobs: 2 },
    { id: "r4", company: "Global Semiconductor PH", contactPerson: "Engr. Leo Torres", email: "ltorres@globalsemi.com", industry: "Hardware & VLSI", status: "pending", joinDate: "2026-10-26", tokenAccess: false, activeJobs: 3 },
    { id: "r5", company: "Nexus CyberOps", contactPerson: "Derrick Tan", email: "tan@nexuscyber.io", industry: "Defensive Cybersecurity", status: "suspended", joinDate: "2026-05-11", tokenAccess: false, activeJobs: 0 }
  ]);

  // System Settings State
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoApproveDomains, setAutoApproveDomains] = useState(true);
  const [systemAlertMessage, setSystemAlertMessage] = useState("Official MSU-IIT Career Fair Season 2026-2027 is now live!");
  const [showAlertToast, setShowAlertToast] = useState(false);

  // Filter Search
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddCounselor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCounselor.name || !newCounselor.email) return;
    const added: CounselorItem = {
      id: `c${Date.now()}`,
      name: newCounselor.name,
      email: newCounselor.email,
      department: newCounselor.department,
      activeStudents: 0,
      appointmentsToday: 0,
      status: "active",
      quotaMax: Number(newCounselor.quotaMax) || 8,
      rating: 5.0
    };
    setCounselors([added, ...counselors]);
    setNewCounselor({ name: "", email: "", department: "College of Computer Studies", quotaMax: 8 });
    setShowAddCounselorModal(false);
  };

  const toggleCounselorStatus = (id: string) => {
    setCounselors(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c));
  };

  const handleRecruiterAction = (id: string, action: "approve" | "suspend" | "toggleToken") => {
    setRecruiters(prev => prev.map(r => {
      if (r.id !== id) return r;
      if (action === "approve") return { ...r, status: "approved", tokenAccess: true };
      if (action === "suspend") return { ...r, status: "suspended", tokenAccess: false };
      if (action === "toggleToken") return { ...r, tokenAccess: !r.tokenAccess };
      return r;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0d0709] text-stone-100 flex flex-col selection:bg-[#F5A623] selection:text-black">
      {/* Top Navigation */}
      <header className="h-16 border-b border-stone-800/80 bg-[#140b0e]/90 backdrop-blur sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7A0016] to-[#F5A623] flex items-center justify-center font-black text-white text-base shadow-lg shadow-[#7A0016]/30 group-hover:scale-105 transition-transform">
              P
            </div>
            <div>
              <div className="text-sm font-black tracking-wider flex items-center gap-1.5">
                <span className="text-[#FFD700]">P.A.C.E.</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#7A0016]/80 text-rose-200 border border-[#7A0016] font-mono">SUPERADMIN</span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono">MSU-IIT Career Center Administration</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 text-xs text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            System Node: <span className="font-mono text-amber-400">iligan-main-dc1</span>
          </div>

          <button 
            onClick={() => { setShowAlertToast(true); setTimeout(() => setShowAlertToast(false), 3000); }}
            className="relative p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-[#F5A623]/50 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#7A0016] text-[10px] font-bold text-white flex items-center justify-center border border-stone-950">
              3
            </span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-stone-800">
            <div className="w-9 h-9 rounded-xl bg-[#7A0016] border border-[#F5A623]/40 flex items-center justify-center text-amber-300 font-bold text-xs">
              SA
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold leading-tight text-stone-200">Dir. Renato Santos</p>
              <p className="text-[10px] text-stone-400 font-mono">Chief Career Executive</p>
            </div>
            <Link href="/" className="ml-2 text-stone-400 hover:text-stone-200 p-1.5 rounded-lg hover:bg-stone-900">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-stone-800/80 bg-[#12090c] p-4 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400 px-3 mb-2">Platform Hub</p>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeTab === "overview"
                      ? "bg-gradient-to-r from-[#7A0016] to-[#5C0011] text-amber-300 border border-[#F5A623]/30 shadow-md shadow-[#7A0016]/20"
                      : "text-stone-400 hover:text-stone-200 hover:bg-stone-900/60"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Executive Overview
                </button>

                <button
                  onClick={() => setActiveTab("counselors")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeTab === "counselors"
                      ? "bg-gradient-to-r from-[#7A0016] to-[#5C0011] text-amber-300 border border-[#F5A623]/30 shadow-md shadow-[#7A0016]/20"
                      : "text-stone-400 hover:text-stone-200 hover:bg-stone-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4" />
                    Counselor Matrix
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-amber-400 font-mono">
                    {counselors.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("recruiters")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeTab === "recruiters"
                      ? "bg-gradient-to-r from-[#7A0016] to-[#5C0011] text-amber-300 border border-[#F5A623]/30 shadow-md shadow-[#7A0016]/20"
                      : "text-stone-400 hover:text-stone-200 hover:bg-stone-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4" />
                    Corporate Partners
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-emerald-400 font-mono">
                    {recruiters.filter(r => r.status === "pending").length} new
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeTab === "analytics"
                      ? "bg-gradient-to-r from-[#7A0016] to-[#5C0011] text-amber-300 border border-[#F5A623]/30 shadow-md shadow-[#7A0016]/20"
                      : "text-stone-400 hover:text-stone-200 hover:bg-stone-900/60"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Institutional Analytics
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeTab === "settings"
                      ? "bg-gradient-to-r from-[#7A0016] to-[#5C0011] text-amber-300 border border-[#F5A623]/30 shadow-md shadow-[#7A0016]/20"
                      : "text-stone-400 hover:text-stone-200 hover:bg-stone-900/60"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Governance & Tokens
                </button>
              </nav>
            </div>

            {/* Quick Switcher for Testing other portals */}
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" /> Portal Jumper
              </div>
              <p className="text-[11px] text-stone-400">Jump straight into testing other authenticated roles:</p>
              <div className="grid grid-cols-1 gap-1 text-[11px]">
                <Link href="/dashboard/student" className="flex items-center justify-between p-1.5 rounded-lg text-stone-300 hover:bg-stone-900 hover:text-amber-300 transition-colors">
                  <span>Student View</span>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                </Link>
                <Link href="/dashboard/counselor" className="flex items-center justify-between p-1.5 rounded-lg text-stone-300 hover:bg-stone-900 hover:text-amber-300 transition-colors">
                  <span>Counselor Suite</span>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                </Link>
                <Link href="/dashboard/recruiter" className="flex items-center justify-between p-1.5 rounded-lg text-stone-300 hover:bg-stone-900 hover:text-amber-300 transition-colors">
                  <span>Recruiter Hub</span>
                  <ChevronRight className="w-3 h-3 text-stone-500" />
                </Link>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-br from-[#7A0016]/20 to-transparent border border-[#7A0016]/40 text-stone-400 text-[11px]">
            <p className="font-semibold text-stone-200 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
              MSU-IIT Accreditation
            </p>
            CHED Center of Excellence in Information Technology & Engineering.
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          {/* Mobile Tab Nav */}
          <div className="flex md:hidden overflow-x-auto gap-2 pb-2 border-b border-stone-800">
            {(["overview", "counselors", "recruiters", "analytics", "settings"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap capitalize ${
                  activeTab === tab ? "bg-[#7A0016] text-amber-300 border border-[#F5A623]/40" : "bg-stone-900 text-stone-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {showAlertToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F5A623]" />
                  <span>3 new recruiter applications pending review today!</span>
                </div>
                <button onClick={() => setShowAlertToast(false)} className="text-stone-400 hover:text-white">✕</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Hero Banner */}
              <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r from-[#7A0016] via-[#5C0011] to-[#2B0007] border border-[#F5A623]/30 shadow-2xl shadow-[#7A0016]/20">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFD700] to-transparent pointer-events-none"></div>
                <div className="relative z-10 max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur border border-amber-400/30 text-[11px] text-amber-300 font-mono">
                    <Sparkles className="w-3 h-3 text-[#FFD700]" />
                    MSU-IIT Career Advancement Ecosystem v2.4
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    Welcome back, Executive Director.
                  </h1>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    Platform synchronization is operating at <span className="text-[#FFD700] font-semibold">99.98% uptime</span>. 
                    Career counseling turnaround average has improved to <span className="text-emerald-400 font-semibold">18.4 hours</span> across all collegiate branches.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button onClick={() => setActiveTab("counselors")} className="px-4 py-2 rounded-xl bg-[#F5A623] text-stone-950 font-bold text-xs hover:bg-[#FFD700] transition-colors shadow-lg shadow-amber-500/20">
                      Balance Counselor Load
                    </button>
                    <button onClick={() => setActiveTab("recruiters")} className="px-4 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-stone-600 text-stone-200 text-xs font-semibold transition-colors">
                      Review 2 Pending Recruiters
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total IITian Students Enrolled", value: "4,821", change: "+14% YoY", icon: Users, color: "from-rose-500/20 to-[#7A0016]/40", border: "border-rose-500/30", text: "text-rose-400" },
                  { label: "Graduates Hired to Date", value: "2,847", change: "+88 this month", icon: Award, color: "from-amber-500/20 to-amber-900/40", border: "border-amber-500/30", text: "text-amber-400" },
                  { label: "Verified Corporate Partners", value: "156", change: "+12 pending", icon: Briefcase, color: "from-emerald-500/20 to-emerald-950/40", border: "border-emerald-500/30", text: "text-emerald-400" },
                  { label: "Active Career Counselors", value: "12", change: "100% capacity", icon: ShieldCheck, color: "from-blue-500/20 to-indigo-950/40", border: "border-blue-500/30", text: "text-blue-400" },
                ].map((stat, i) => (
                  <div key={i} className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.border} backdrop-blur relative overflow-hidden group`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-stone-400 font-medium">{stat.label}</span>
                      <stat.icon className={`w-5 h-5 ${stat.text}`} />
                    </div>
                    <div className="flex items-baseline justify-between">
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                      <span className={`text-[11px] font-mono font-semibold ${stat.text}`}>{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions & Live Stream */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent System Logs */}
                <div className="lg:col-span-2 p-5 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#F5A623]" /> Real-Time Institutional Activity
                    </h3>
                    <span className="text-[11px] text-stone-400 font-mono">Stream Auto-Refreshes</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { time: "2 mins ago", event: "Alexandra Reyes (BSIT-4) scheduled Mock Technical Interview with Dr. Maria Santos", type: "appointment" },
                      { time: "14 mins ago", event: "TechCorp Philippines published 2 new Associate Cloud Architect postings", type: "job" },
                      { time: "42 mins ago", event: "Mindanao Silicon Ventures submitted corporate partner authorization paperwork", type: "partner" },
                      { time: "1 hour ago", event: "Prof. Roberto Gomez issued Digital Excellence CV Badge to Kyle Fernandez (BSCS-3)", type: "badge" },
                      { time: "3 hours ago", event: "Ayala Digital Labs dispatched 4 direct interview invites to IITian engineers", type: "hire" },
                    ].map((log, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800/60 text-xs">
                        <span className="text-[10px] text-stone-400 font-mono whitespace-nowrap pt-0.5">{log.time}</span>
                        <p className="text-stone-300 leading-snug">{log.event}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Health Panel */}
                <div className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-4">
                  <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" /> Infrastructure Matrix
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between mb-1 text-stone-300">
                        <span>IIT Google Auth Domain Sync</span>
                        <span className="text-emerald-400 font-mono font-bold">100% OK</span>
                      </div>
                      <div className="h-2 rounded-full bg-stone-950 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1 text-stone-300">
                        <span>Counselor Load Factor</span>
                        <span className="text-amber-400 font-mono font-bold">78% Nominal</span>
                      </div>
                      <div className="h-2 rounded-full bg-stone-950 overflow-hidden">
                        <div className="h-full bg-[#F5A623] rounded-full w-[78%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1 text-stone-300">
                        <span>CV Encryption & Storage Pool</span>
                        <span className="text-blue-400 font-mono font-bold">34.2 GB / 250 GB</span>
                      </div>
                      <div className="h-2 rounded-full bg-stone-950 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full w-[14%]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 space-y-1">
                    <p>• Daily Auto-Backup: Completed at 04:00 AM PHT</p>
                    <p>• Next Audit Cycle: November 15, 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: COUNSELORS */}
          {activeTab === "counselors" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#F5A623]" /> Counselor Faculty & Load Balancing
                  </h2>
                  <p className="text-xs text-stone-400">Manage appointment quotas, active status, and collegiate distribution.</p>
                </div>
                <button
                  onClick={() => setShowAddCounselorModal(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#7A0016] to-[#9B0020] border border-[#F5A623]/40 text-amber-300 text-xs font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-[#7A0016]/30"
                >
                  <PlusCircle className="w-4 h-4" /> Add University Counselor
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-900/60">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-stone-950/80 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
                    <tr>
                      <th className="p-3.5">Counselor Name & Email</th>
                      <th className="p-3.5">Department</th>
                      <th className="p-3.5 text-center">Active Students</th>
                      <th className="p-3.5 text-center">Today's Load</th>
                      <th className="p-3.5 text-center">Rating</th>
                      <th className="p-3.5 text-center">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/80">
                    {counselors.map((c) => (
                      <tr key={c.id} className="hover:bg-stone-800/40 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          <div>{c.name}</div>
                          <div className="text-[11px] text-stone-400 font-mono">{c.email}</div>
                        </td>
                        <td className="p-3.5 text-stone-300">{c.department}</td>
                        <td className="p-3.5 text-center font-mono font-bold text-amber-400">{c.activeStudents}</td>
                        <td className="p-3.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                            c.appointmentsToday >= c.quotaMax ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "bg-stone-800 text-stone-300"
                          }`}>
                            {c.appointmentsToday} / {c.quotaMax} max
                          </span>
                        </td>
                        <td className="p-3.5 text-center font-mono text-amber-300">★ {c.rating}</td>
                        <td className="p-3.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                            c.status === "active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-stone-800 text-stone-500"
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => toggleCounselorStatus(c.id)}
                            className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] text-stone-200"
                          >
                            {c.status === "active" ? "Set Inactive" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Modal */}
              {showAddCounselorModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <PlusCircle className="w-5 h-5 text-[#F5A623]" /> Add University Counselor
                    </h3>
                    <form onSubmit={handleAddCounselor} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-stone-300 mb-1 font-semibold">Full Name with Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Juanito Macaraeg"
                          value={newCounselor.name}
                          onChange={e => setNewCounselor({ ...newCounselor, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 focus:border-[#F5A623] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 mb-1 font-semibold">MSU-IIT Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="juanito.macaraeg@g.msuiit.edu.ph"
                          value={newCounselor.email}
                          onChange={e => setNewCounselor({ ...newCounselor, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 focus:border-[#F5A623] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 mb-1 font-semibold">Department / College</label>
                        <select
                          value={newCounselor.department}
                          onChange={e => setNewCounselor({ ...newCounselor, department: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 focus:border-[#F5A623] focus:outline-none"
                        >
                          <option>College of Computer Studies</option>
                          <option>College of Engineering & Tech</option>
                          <option>College of Science & Math</option>
                          <option>Psychological & Career Svcs</option>
                          <option>Industry Liaison Unit</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-stone-300 mb-1 font-semibold">Max Daily Appointment Slots</label>
                        <input
                          type="number"
                          min="1"
                          max="15"
                          value={newCounselor.quotaMax}
                          onChange={e => setNewCounselor({ ...newCounselor, quotaMax: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 focus:border-[#F5A623] focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddCounselorModal(false)}
                          className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-[#7A0016] text-amber-300 font-bold border border-[#F5A623]/40 hover:bg-[#9B0020]"
                        >
                          Authorize Counselor
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: RECRUITERS */}
          {activeTab === "recruiters" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-emerald-400" /> Corporate Partner Vetting & Token Access
                  </h2>
                  <p className="text-xs text-stone-400">Validate industry credentials and issue access tokens to search IIT talent pools.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search partner or industry..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>
              </div>

              {/* Recruiter List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recruiters
                  .filter(r => r.company.toLowerCase().includes(searchQuery.toLowerCase()) || r.industry.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((r) => (
                    <div key={r.id} className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-bold text-white text-sm">{r.company}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                            r.status === "approved" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                            r.status === "pending" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                            "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          }`}>
                            {r.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400">{r.industry}</p>
                        <div className="text-[11px] text-stone-300 space-y-0.5 pt-1 border-t border-stone-800/80">
                          <div>Contact: <span className="text-white font-medium">{r.contactPerson}</span></div>
                          <div className="font-mono text-stone-400">{r.email}</div>
                          <div>Active Job Openings: <span className="font-mono font-bold text-amber-400">{r.activeJobs}</span></div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-400 flex items-center gap-1.5">
                            <Key className="w-3.5 h-3.5 text-[#F5A623]" /> Candidate Search Token
                          </span>
                          <button
                            onClick={() => handleRecruiterAction(r.id, "toggleToken")}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              r.tokenAccess ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-stone-950 text-stone-500"
                            }`}
                          >
                            {r.tokenAccess ? "ACTIVE" : "REVOKED"}
                          </button>
                        </div>

                        <div className="flex gap-2">
                          {r.status === "pending" && (
                            <button
                              onClick={() => handleRecruiterAction(r.id, "approve")}
                              className="flex-1 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Approve Partner
                            </button>
                          )}
                          {r.status === "approved" && (
                            <button
                              onClick={() => handleRecruiterAction(r.id, "suspend")}
                              className="flex-1 py-1.5 rounded-xl bg-stone-800 hover:bg-rose-900/60 text-stone-300 hover:text-rose-200 text-xs transition-colors flex items-center justify-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Suspend
                            </button>
                          )}
                          {r.status === "suspended" && (
                            <button
                              onClick={() => handleRecruiterAction(r.id, "approve")}
                              className="flex-1 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors"
                            >
                              Reinstate
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: ANALYTICS */}
          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#F5A623]" /> Institutional Career & Placement Analytics
                </h2>
                <p className="text-xs text-stone-400">Statistical data for CHED accreditation and MSU-IIT board reporting.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart 1: Monthly Hires (SVG Bar Chart) */}
                <div className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                      Graduate Placements by Month (Academic Year 2026)
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400">+34% vs 2025</span>
                  </div>

                  <div className="h-56 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-stone-800">
                    {[
                      { m: "Nov", h: 90, v: "180" },
                      { m: "Dec", h: 70, v: "140" },
                      { m: "Jan", h: 110, v: "220" },
                      { m: "Feb", h: 140, v: "280" },
                      { m: "Mar", h: 190, v: "380" },
                      { m: "Apr", h: 220, v: "440" },
                      { m: "May", h: 260, v: "520" },
                      { m: "Jun", h: 300, v: "610" },
                      { m: "Jul", h: 240, v: "490" },
                      { m: "Aug", h: 170, v: "340" },
                      { m: "Sep", h: 150, v: "300" },
                      { m: "Oct", h: 210, v: "420" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <span className="text-[10px] font-mono text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.v}
                        </span>
                        <div
                          style={{ height: `${(item.h / 300) * 160}px` }}
                          className="w-full rounded-t-md bg-gradient-to-t from-[#7A0016] to-[#F5A623] hover:to-[#FFD700] transition-all cursor-pointer"
                        ></div>
                        <span className="text-[10px] font-mono text-stone-400">{item.m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart 2: Appointment Distribution (Donut Breakdown) */}
                <div className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-4">
                  <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                    Counseling Focus Areas (Total: 1,842 Sessions)
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 items-center pt-2">
                    {/* Visual Donut representation with SVG */}
                    <div className="relative flex items-center justify-center">
                      <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                        {/* Mock Interview: 38% */}
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#7A0016" strokeWidth="16" strokeDasharray="90 150" strokeDashoffset="0" />
                        {/* Resume Review: 32% */}
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F5A623" strokeWidth="16" strokeDasharray="76 164" strokeDashoffset="-90" />
                        {/* Career Coaching: 20% */}
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#10b981" strokeWidth="16" strokeDasharray="47 193" strokeDashoffset="-166" />
                        {/* Mental Health/Other: 10% */}
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#6366f1" strokeWidth="16" strokeDasharray="24 216" strokeDashoffset="-213" />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-xl font-black text-white">1.8k</span>
                        <p className="text-[10px] text-stone-400">Sessions</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-stone-300">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#7A0016]"></span> Mock Technical
                        </span>
                        <span className="font-mono text-stone-300 font-bold">38%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-stone-300">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]"></span> Resume Review
                        </span>
                        <span className="font-mono text-stone-300 font-bold">32%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-stone-300">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Career Pathway
                        </span>
                        <span className="font-mono text-stone-300 font-bold">20%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-stone-300">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Well-being Advising
                        </span>
                        <span className="font-mono text-stone-300 font-bold">10%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart 3: Top Industry Placement (Horizontal Bars) */}
                <div className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-4 lg:col-span-2">
                  <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                    IITian Graduate Distribution by Industry Sector
                  </h3>
                  
                  <div className="space-y-3 pt-2">
                    {[
                      { industry: "Fintech, Cloud Platforms & Distributed Systems", pct: 42, count: "1,195 hired", color: "bg-rose-500" },
                      { industry: "Semiconductor, Microelectronics & Embedded IoT", pct: 26, count: "740 hired", color: "bg-amber-500" },
                      { industry: "AI, Data Science & Machine Learning Research", pct: 18, count: "512 hired", color: "bg-emerald-500" },
                      { industry: "Civil Infrastructure & Environmental Systems", pct: 9, count: "256 hired", color: "bg-blue-500" },
                      { industry: "Defense, Cybersecurity & Government Telecomm", pct: 5, count: "144 hired", color: "bg-purple-500" },
                    ].map((sec, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-stone-300 font-medium">{sec.industry}</span>
                          <span className="font-mono text-stone-400">{sec.count} ({sec.pct}%)</span>
                        </div>
                        <div className="h-2.5 bg-stone-950 rounded-full overflow-hidden">
                          <div style={{ width: `${sec.pct}%` }} className={`h-full ${sec.color} rounded-full`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#F5A623]" /> Governance, Security & System Controls
                </h2>
                <p className="text-xs text-stone-400">Configure single sign-on parameters, maintenance triggers, and API tokens.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Domain Policy */}
                <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4">
                  <h3 className="text-sm font-bold text-stone-200">Institutional SSO Domain Enforcement</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950">
                      <div>
                        <div className="font-medium text-white">Require @g.msuiit.edu.ph for Students</div>
                        <div className="text-[11px] text-stone-400">Strictly block consumer Gmail or Yahoo domains</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={autoApproveDomains}
                        onChange={e => setAutoApproveDomains(e.target.checked)}
                        className="w-4 h-4 accent-[#7A0016]"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950">
                      <div>
                        <div className="font-medium text-white">Platform Maintenance Lock</div>
                        <div className="text-[11px] text-stone-400">Displays read-only maintenance notice to non-admins</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={maintenanceMode}
                        onChange={e => setMaintenanceMode(e.target.checked)}
                        className="w-4 h-4 accent-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* System-wide Broadcast */}
                <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4">
                  <h3 className="text-sm font-bold text-stone-200">Global Campus Banner Broadcast</h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-400 mb-1">Banner Announcement Text</label>
                      <textarea
                        rows={3}
                        value={systemAlertMessage}
                        onChange={e => setSystemAlertMessage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 focus:border-[#F5A623] focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => alert("Global banner updated across all Student and Recruiter views.")}
                      className="px-4 py-2 rounded-xl bg-[#7A0016] text-amber-300 font-bold border border-[#F5A623]/30 hover:bg-[#9B0020] transition-colors"
                    >
                      Broadcast to Portals
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
