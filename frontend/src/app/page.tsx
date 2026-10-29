"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Compass,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronRight,
  Building2,
  FileText,
  MapPin,
  ExternalLink,
  Award,
  BookOpen,
  Calendar,
  Sparkles,
  AlertCircle
} from "lucide-react";
import PaceLogo from "@/components/PaceLogo";

export default function IntegratedMyIITLandingPage() {
  const [selectedRole, setSelectedRole] = useState<"student" | "counselor" | "recruiter" | "superadmin">("student");

  return (
    <div className="min-h-screen bg-[#EEF2F6] text-[#1E293B] flex flex-col font-sans selection:bg-[#F5A623] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. OFFICIAL MY.IIT MAROON & GOLD REGALIA HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="myiit-header-gradient text-white px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-lg bg-white p-1 shadow-sm flex items-center justify-center shrink-0">
              <PaceLogo size={40} showText={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wide text-white text-base sm:text-lg">
                  P.A.C.E. MSU-IIT
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F5A623] text-[#0F172A] uppercase font-mono tracking-wider">
                  Career Center Portal
                </span>
              </div>
              <p className="text-xs text-stone-200">
                Mindanao State University – Iligan Institute of Technology
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-200 hidden md:inline">
              "All your study and work in one portal."
            </span>
            <Link
              href="/auth/login"
              className="btn-myiit-gold px-4 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Lock size={13} className="text-[#0F172A]" />
              <span>Portal Sign In</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sub-Header Status Line */}
      <div className="bg-white border-b border-[#D1D5DB] px-4 sm:px-8 py-2 text-xs text-[#64748B] shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#0F172A]">Home</span>
            <span>/</span>
            <span>Career Advancement Gateway (AY 2026-2027)</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>My.IIT Network Active</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION WITH RICH TEXTS & CAMPUS PHOTOGRAPHY
          ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Main Hero Card with Side Photography */}
        <div className="myiit-card p-6 sm:p-8 border-l-4 border-l-[#7A0016] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF3D6] border border-[#F5A623]/60 text-xs font-bold text-[#7A0016] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#7A0016]"></span>
              Official MSU-IIT Career Center Ecosystem
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Connecting <span className="text-[#7A0016]">IITian Students</span>, Faculty Counselors, and Industry Leaders.
            </h1>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Welcome to P.A.C.E., the official career advancement bridge integrated directly with your My.IIT institutional identity. Access personalized career mentoring, upload and get faculty feedback on resumes, and explore verified employment opportunities from top partner companies.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/dashboard/student"
                className="btn-myiit-primary px-5 py-2.5 rounded text-xs flex items-center gap-2 shadow-sm"
              >
                <span>Launch Student Dashboard</span>
                <ArrowRight size={14} className="text-[#FFD700]" />
              </Link>
              <Link
                href="/auth/login"
                className="px-4 py-2.5 rounded bg-white hover:bg-slate-50 text-[#334155] text-xs font-bold border border-[#D1D5DB] transition-all"
              >
                Sign In with @g.msuiit.edu.ph
              </Link>
            </div>

            <div className="pt-3 grid grid-cols-3 gap-2 border-t border-[#E2E8F0] text-xs text-[#64748B]">
              <div>✓ Verified Resume Versioning</div>
              <div>✓ Standardized Mock Rubrics</div>
              <div>✓ Gymnasium Career Fair Pass</div>
            </div>
          </div>

          {/* Campus Photography Showcase */}
          <div className="lg:col-span-5 space-y-3">
            <div className="myiit-card overflow-hidden border border-[#D1D5DB] shadow-sm">
              <div className="relative h-52 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
                  alt="MSU-IIT Campus Grounds"
                  className="w-full h-full object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/30 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-[#7A0016] text-[#FFD700] text-[10px] font-bold px-2 py-0.5 rounded shadow border border-[#F5A623]">
                  MSU-IIT Main Campus • Iligan City
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[10px] font-mono text-[#FFD700] uppercase font-bold">Center of Excellence</p>
                  <p className="text-xs font-bold">College of Computer Studies & College of Engineering</p>
                </div>
              </div>

              {/* Data Strip */}
              <div className="p-3 bg-white grid grid-cols-3 divide-x divide-[#E2E8F0] text-center">
                <div>
                  <div className="text-base font-black text-[#7A0016] font-mono-num">2,847</div>
                  <div className="text-[9px] text-[#64748B] font-bold uppercase">Graduates Hired</div>
                </div>
                <div>
                  <div className="text-base font-black text-[#0F172A] font-mono-num">156</div>
                  <div className="text-[9px] text-[#64748B] font-bold uppercase">Partner Corps</div>
                </div>
                <div>
                  <div className="text-base font-black text-[#D97706] font-mono-num">489</div>
                  <div className="text-[9px] text-[#64748B] font-bold uppercase">Mentorships</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2">
              <AlertCircle size={15} className="text-[#D97706] shrink-0 mt-0.5" />
              <span><strong>Notice:</strong> Annual On-Campus Job Fair schedule is live. Reserve interview booth slots in the student portal.</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. MY.IIT AFFILIATION GATEWAY SELECTORS (Cards with Photos)
            ───────────────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-[#D1D5DB] pb-2">
            <div>
              <span className="text-xs font-bold text-[#7A0016] uppercase tracking-wider font-mono">My.IIT Role Segmentation</span>
              <h2 className="text-lg font-bold text-[#0F172A]">Choose Your User Affiliation to Proceed:</h2>
            </div>
            <span className="text-xs text-[#64748B]">Single Sign-On Enabled</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Student Card */}
            <div
              onClick={() => setSelectedRole("student")}
              className={`myiit-gate overflow-hidden flex flex-col justify-between ${
                selectedRole === "student" ? "active" : ""
              }`}
            >
              <div>
                <div className="h-28 bg-slate-100 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80"
                    alt="IITian College Students"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-[#7A0016] text-[#FFD700] px-2 py-0.5 rounded font-mono">
                    BSIT / Undergrad
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-[#0F172A]">I'm a College / Graduate Student</h3>
                  <p className="text-xs text-[#64748B]">Upload resumes, view counselor badges, and reserve interview booth passes.</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link
                  href="/dashboard/student"
                  className="btn-myiit-primary w-full py-2 rounded text-xs flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>Student Portal</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Counselor Card */}
            <div
              onClick={() => setSelectedRole("counselor")}
              className={`myiit-gate overflow-hidden flex flex-col justify-between ${
                selectedRole === "counselor" ? "active" : ""
              }`}
            >
              <div>
                <div className="h-28 bg-slate-100 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                    alt="Career Counselor"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-[#5C0011] text-[#FFD700] px-2 py-0.5 rounded font-mono">
                    Faculty Guidance
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-[#0F172A]">I'm a Career Guidance Counselor</h3>
                  <p className="text-xs text-[#64748B]">Grade mock technical evaluations with rubrics and manage appointment queues.</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link
                  href="/dashboard/counselor"
                  className="w-full py-2 rounded bg-slate-100 hover:bg-[#7A0016] hover:text-white text-[#334155] text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-[#D1D5DB]"
                >
                  <span>Counselor Suite</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Recruiter Card */}
            <div
              onClick={() => setSelectedRole("recruiter")}
              className={`myiit-gate overflow-hidden flex flex-col justify-between ${
                selectedRole === "recruiter" ? "active" : ""
              }`}
            >
              <div>
                <div className="h-28 bg-slate-100 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80"
                    alt="Corporate Recruiter"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-[#F5A623] text-[#0F172A] px-2 py-0.5 rounded font-mono">
                    Corporate Partner
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-[#0F172A]">I'm a Corporate Recruiter</h3>
                  <p className="text-xs text-[#64748B]">Discover verified student talent filtered by major, GPA, and technical skills.</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link
                  href="/dashboard/recruiter"
                  className="w-full py-2 rounded bg-slate-100 hover:bg-[#7A0016] hover:text-white text-[#334155] text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-[#D1D5DB]"
                >
                  <span>Recruiter Hub</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Superadmin Card */}
            <div
              onClick={() => setSelectedRole("superadmin")}
              className={`myiit-gate overflow-hidden flex flex-col justify-between ${
                selectedRole === "superadmin" ? "active" : ""
              }`}
            >
              <div>
                <div className="h-28 bg-slate-100 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80"
                    alt="Executive Dean"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-[#334155] text-white px-2 py-0.5 rounded font-mono">
                    Executive Office
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-[#0F172A]">I'm a Career Center Admin</h3>
                  <p className="text-xs text-[#64748B]">Oversee counselor workload balancing, partner tokens, and CHED metrics.</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link
                  href="/dashboard/superadmin"
                  className="w-full py-2 rounded bg-slate-100 hover:bg-[#7A0016] hover:text-white text-[#334155] text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-[#D1D5DB]"
                >
                  <span>Admin Console</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. COLLEGIATE CAREER PIPELINES (College Showcase with Emblems)
            ───────────────────────────────────────────────────────────── */}
        <div className="myiit-card p-6 space-y-4">
          <div className="border-b border-[#E2E8F0] pb-2 flex justify-between items-center">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase">Collegiate Career Pipelines Participating</h3>
            <span className="text-xs font-mono text-[#7A0016]">Accredited Programs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#7A0016] text-[#FFD700] font-bold text-sm flex items-center justify-center shadow-xs">
                  CCS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">College of Computer Studies</h4>
                  <span className="text-[10px] font-mono text-[#7A0016] font-bold">CHED Center of Excellence</span>
                </div>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                BSIT, BSCS, BSIS programs specializing in cloud engineering, distributed architectures, and machine learning.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#0F172A] text-[#FFD700] font-bold text-sm flex items-center justify-center shadow-xs">
                  COET
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">College of Engineering & Tech</h4>
                  <span className="text-[10px] font-mono text-[#0284C7] font-bold">ABET Accredited Programs</span>
                </div>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                BSECE, BSME, BSCE, BSEE with direct hardware prototyping in collaboration with FabLab Mindanao.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#D97706] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  CSM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">College of Science & Math</h4>
                  <span className="text-[10px] font-mono text-[#D97706] font-bold">AACCUP Level IV Status</span>
                </div>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                BS Mathematics, BS Statistics, BS Physics providing data science and quantitative modeling talent.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* ─────────────────────────────────────────────────────────────
          5. AUTHENTIC MY.IIT FOOTER
          ───────────────────────────────────────────────────────────── */}
      <footer className="mt-auto bg-[#1E293B] text-white border-t-4 border-[#7A0016] py-8 px-4 sm:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-bold text-[#FFD700]">Mindanao State University – Iligan Institute of Technology</p>
            <p className="text-stone-300 text-[11px]">
              Andres Bonifacio Ave, Tibanga, Iligan City 9200 | P.A.C.E. Career Platform
            </p>
          </div>
          <div className="text-[11px] text-stone-300 font-mono text-center sm:text-right">
            Official Regalia: Maroon & Gold | Version 2.4 My.IIT Specification
          </div>
        </div>
      </footer>
    </div>
  );
}
