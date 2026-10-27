"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  FileText,
  Calendar,
  MessageSquare,
  QrCode,
  MapPin,
  Award,
  Star,
  CheckCircle2,
  Clock,
  Download,
  Share2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Sliders,
  Send,
  Upload,
  Search,
  Filter,
  Check,
  AlertCircle
} from "lucide-react";
import DashboardLayout, { NavItem } from "@/components/DashboardLayout";

const navItems: NavItem[] = [
  { id: "overview", label: "Student Overview", icon: <LayoutDashboard size={18} /> },
  { id: "credential", label: "QR Credential & Badging", icon: <QrCode size={18} /> },
  { id: "simulator", label: "Mock Technical Evaluation", icon: <Award size={18} /> },
  { id: "careerfair", label: "Campus Career Fair Booths", icon: <Building2 size={18} /> },
  { id: "resume", label: "CV Central & Upload", icon: <FileText size={18} /> },
  { id: "messages", label: "Counselor Messages", icon: <MessageSquare size={18} /> },
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Feature C: Career Center Verification QR State
  const [qrVerified, setQrVerified] = useState(true);
  const [verificationCode] = useState("PACE-CC-2026-AR0142");
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Feature D: Mock Technical Simulator Rubric State
  const [rubricScores, setRubricScores] = useState({
    systemDesign: 5,
    codingFundamentals: 4,
    problemSolving: 5,
    communication: 4,
    institutionalProfessionalism: 5
  });

  // Feature E: Campus Career Fair Booth State
  const [selectedBoothId, setSelectedBoothId] = useState("booth-1");
  const [bookedBooths, setBookedBooths] = useState<string[]>(["booth-1"]);
  const [slotSelected, setSlotSelected] = useState("10:15 AM - 10:30 AM");

  const careerFairBooths = [
    {
      id: "booth-1",
      company: "TechCorp Philippines",
      industry: "Enterprise Cloud & Distributed Systems",
      location: "Gymnasium Zone A - Booth #04",
      rep: "Engr. Marco Valdes (VP of Talent)",
      slotsAvailable: 4,
      targetColleges: ["CCS (BSIT / BSCS)", "COET (BSECE)"],
      hiringRoles: ["Associate Cloud Architect", "Full-Stack Software Engineer"],
      status: "Open For Booking",
      color: "border-l-4 border-l-[#7A0016]"
    },
    {
      id: "booth-2",
      company: "Ayala Digital Labs",
      industry: "Artificial Intelligence & Enterprise Systems",
      location: "Gymnasium Zone A - Booth #07",
      rep: "Sarah Jenkins (Lead Tech Talent Partner)",
      slotsAvailable: 2,
      targetColleges: ["CCS (BSCS / BSIT)", "CSM (Mathematics / Statistics)"],
      hiringRoles: ["Machine Learning Intern", "Data Analyst Graduate Associate"],
      status: "High Demand",
      color: "border-l-4 border-l-[#D97706]"
    },
    {
      id: "booth-3",
      company: "Mindanao Silicon Ventures",
      industry: "Semiconductor Hardware & Embedded IoT",
      location: "Gymnasium Zone B - Booth #12",
      rep: "Dr. Arthur Pendelton (R&D Director)",
      slotsAvailable: 6,
      targetColleges: ["COET (BSECE / BSME / BSCoE)"],
      hiringRoles: ["Hardware Verification Engineer", "Embedded Firmware Intern"],
      status: "Open For Booking",
      color: "border-l-4 border-l-[#0284C7]"
    },
    {
      id: "booth-4",
      company: "Global CyberDefense Operations",
      industry: "Information Security & SOC Monitoring",
      location: "Gymnasium Zone B - Booth #15",
      rep: "Derrick Tan (Chief Information Security Officer)",
      slotsAvailable: 1,
      targetColleges: ["CCS (BSIT / BSCS)"],
      hiringRoles: ["Junior SOC Analyst", "DevSecOps Associate"],
      status: "Almost Full",
      color: "border-l-4 border-l-[#475569]"
    }
  ];

  const currentBooth = careerFairBooths.find(b => b.id === selectedBoothId) || careerFairBooths[0];

  const handleBookBoothSlot = () => {
    if (!bookedBooths.includes(currentBooth.id)) {
      setBookedBooths([...bookedBooths, currentBooth.id]);
      alert(`Success! Speed interview time-slot [${slotSelected}] confirmed at ${currentBooth.company} (${currentBooth.location}). Present your digital QR pass at the gymnasium entrance.`);
    }
  };

  return (
    <DashboardLayout
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userRole="Undergraduate Candidate"
      userName="Alexandra Reyes"
      portalTitle="Student Career Portal"
      breadcrumb="My.IIT Student Portal / P.A.C.E. Advancement"
    >
      <div className="space-y-6">

        {/* Top Profile Strip (Clean My.IIT Style) */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-[#7A0016]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#7A0016] text-[#FFD700] font-black text-xl flex items-center justify-center border-2 border-[#F5A623] shadow-xs">
              AR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#0F172A]">Alexandra Reyes</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#FFF3D6] text-[#7A0016] text-[10px] font-bold border border-[#F5A623]/60">
                  ★ DEAN'S LISTER
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  QR VERIFIED
                </span>
              </div>
              <p className="text-xs text-[#64748B]">BS Information Technology • 4th Year Standing • Student ID: 2021-0142</p>
              <div className="flex items-center gap-4 text-[11px] pt-1">
                <span className="text-[#7A0016] font-bold">Cumulative GPA: 1.45</span>
                <span>•</span>
                <span className="text-[#64748B]">College of Computer Studies (CCS)</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold font-mono">Status: Ready for Placement</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("credential")}
              className="px-3.5 py-2 rounded-lg bg-[#FFF3D6] hover:bg-[#FFE5A3] text-[#7A0016] text-xs font-bold border border-[#F5A623]/60 flex items-center gap-1.5 transition-colors btn-press shadow-xs"
            >
              <QrCode size={14} />
              <span>View Verified QR</span>
            </button>
            <button
              onClick={() => setActiveTab("careerfair")}
              className="px-3.5 py-2 rounded-lg bg-[#7A0016] hover:bg-[#9B0020] text-white text-xs font-bold flex items-center gap-1.5 transition-colors btn-press shadow-xs"
            >
              <Building2 size={14} />
              <span>Gym Career Fair</span>
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TAB 1: OVERVIEW
            ───────────────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Approved Resume Version</span>
                <div className="text-lg font-bold text-[#0F172A]">v3.2 Final (CHED Spec)</div>
                <p className="text-[11px] text-emerald-600 font-semibold">✓ Endorsed by Dr. Maria Santos</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Mock Tech Rubric Score</span>
                <div className="text-2xl font-black text-[#7A0016] font-mono-num">4.8 / 5.0</div>
                <p className="text-[11px] text-[#7A0016] font-semibold">Ranked Top 5% in CCS Cohort</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Career Fair Booth Passes</span>
                <div className="text-2xl font-black text-[#D97706] font-mono-num">{bookedBooths.length} Confirmed</div>
                <p className="text-[11px] text-[#64748B]">MSU-IIT Gymnasium Floor</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Enterprise Job Invites</span>
                <div className="text-2xl font-black text-[#0284C7] font-mono-num">3 Direct Leads</div>
                <p className="text-[11px] text-emerald-600 font-semibold">TechCorp, Ayala Labs</p>
              </div>
            </div>

            {/* Application Pipeline Banner (DocTracker style) */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
              <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0F172A] uppercase">Active Application Pipeline (DocTracker)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-[#64748B]">REQ #2026-TCP-0142</span>
                </div>
                <span className="text-xs text-[#7A0016] font-bold">TechCorp Philippines — Associate Cloud Architect</span>
              </div>

              {/* 5-step horizontal tracker */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                  <div className="text-[10px] font-mono text-emerald-600">STEP 1</div>
                  <span>CV Submitted</span>
                  <div className="text-[9px] text-emerald-700 font-normal">Oct 24, 2026</div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                  <div className="text-[10px] font-mono text-emerald-600">STEP 2</div>
                  <span>Faculty Endorsement</span>
                  <div className="text-[9px] text-emerald-700 font-normal">Dr. Maria Santos</div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                  <div className="text-[10px] font-mono text-emerald-600">STEP 3</div>
                  <span>Recruiter Shortlisted</span>
                  <div className="text-[9px] text-emerald-700 font-normal">Engr. Valdes</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FFF3D6] border border-[#F5A623] text-[#7A0016] font-bold">
                  <div className="text-[10px] font-mono text-[#D97706]">STEP 4 (CURRENT)</div>
                  <span>Gym Booth Interview</span>
                  <div className="text-[9px] text-[#7A0016] font-normal">Oct 30 • 10:15 AM</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-[#E2E8F0] text-[#94A3B8]">
                  <div className="text-[10px] font-mono">STEP 5</div>
                  <span>Placement / Offer</span>
                  <div className="text-[9px]">Pending Interview</div>
                </div>
              </div>
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Feature Highlights Left */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-2">
                    Official MSU-IIT Career Center Services Available
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div
                      onClick={() => setActiveTab("credential")}
                      className="p-3 rounded-lg border border-[#E2E8F0] hover:border-[#7A0016] bg-[#F8FAFC] flex items-center justify-between cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#7A0016] text-white flex items-center justify-center font-bold">
                          <QrCode size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0F172A]">Feature C: QR Verifiable Credentials</h4>
                          <p className="text-[11px] text-[#64748B]">Cryptographically verified academic badge for recruiters & employers.</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-[#94A3B8]" />
                    </div>

                    <div
                      onClick={() => setActiveTab("simulator")}
                      className="p-3 rounded-lg border border-[#E2E8F0] hover:border-[#7A0016] bg-[#F8FAFC] flex items-center justify-between cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#D97706] text-white flex items-center justify-center font-bold">
                          <Award size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0F172A]">Feature D: Mock Technical Rubric Simulator</h4>
                          <p className="text-[11px] text-[#64748B]">5-point standardized university grading rubric with counselor breakdown.</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-[#94A3B8]" />
                    </div>

                    <div
                      onClick={() => setActiveTab("careerfair")}
                      className="p-3 rounded-lg border border-[#E2E8F0] hover:border-[#7A0016] bg-[#F8FAFC] flex items-center justify-between cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0284C7] text-white flex items-center justify-center font-bold">
                          <Building2 size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0F172A]">Feature E: On-Campus Career Fair Booth Booking</h4>
                          <p className="text-[11px] text-[#64748B]">Interactive MSU-IIT Gymnasium floor plan and 15-minute speed interview booking.</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-[#94A3B8]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Competencies Right */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-[#0F172A]">Dean's Verified Academic Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-[#FFF3D6] text-[#7A0016] font-bold text-xs border border-[#F5A623]/60">
                      ★ Dean's Lister (1.45 GPA)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-[#334155] text-xs font-semibold border border-[#CBD5E1]">
                      Next.js 14 / TypeScript
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-[#334155] text-xs font-semibold border border-[#CBD5E1]">
                      PostgreSQL Architecture
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-[#334155] text-xs font-semibold border border-[#CBD5E1]">
                      AWS Cloud Practitioner
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      OJT Hours Complete (480 hrs)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            FEATURE C: CAREER CENTER VERIFICATION BADGE & QR
            ───────────────────────────────────────────────────────────── */}
        {activeTab === "credential" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex justify-between items-center border-l-4 border-l-[#7A0016]">
              <div>
                <span className="text-xs font-bold text-[#7A0016] uppercase font-mono">MSU-IIT Career Center Verification</span>
                <h3 className="text-lg font-bold text-[#0F172A]">Career Readiness & CV Review Badge</h3>
                <p className="text-xs text-[#64748B]">
                  Issued by the MSU-IIT Career Center upon completion of resume review and career orientation.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
                CAREER CENTER ENDORSED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left: Digital Badge Pass */}
              <div className="md:col-span-5 bg-gradient-to-b from-white to-[#F8FAFC] border-2 border-[#7A0016] rounded-2xl p-6 shadow-md space-y-5 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A0016] text-[#FFD700] text-xs font-bold font-mono">
                  CAREER CENTER BADGE
                </div>

                {/* Simulated SVG QR Code */}
                <div className="w-48 h-48 mx-auto bg-white p-3 rounded-xl border-2 border-[#E2E8F0] shadow-xs flex items-center justify-center relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Corner Position Targets */}
                    <rect x="5" y="5" width="26" height="26" rx="4" fill="#7A0016" />
                    <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                    <rect x="13" y="13" width="10" height="10" fill="#7A0016" />

                    <rect x="69" y="5" width="26" height="26" rx="4" fill="#7A0016" />
                    <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                    <rect x="77" y="13" width="10" height="10" fill="#7A0016" />

                    <rect x="5" y="69" width="26" height="26" rx="4" fill="#7A0016" />
                    <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                    <rect x="13" y="77" width="10" height="10" fill="#7A0016" />

                    {/* Matrix Mock Pattern */}
                    <rect x="36" y="8" width="6" height="6" fill="#0F172A" />
                    <rect x="46" y="8" width="8" height="6" fill="#0F172A" />
                    <rect x="58" y="12" width="6" height="6" fill="#F5A623" />
                    <rect x="36" y="20" width="10" height="6" fill="#0F172A" />
                    <rect x="50" y="22" width="6" height="12" fill="#0F172A" />

                    <rect x="10" y="36" width="6" height="8" fill="#0F172A" />
                    <rect x="22" y="38" width="12" height="6" fill="#F5A623" />
                    <rect x="40" y="36" width="8" height="8" fill="#7A0016" />
                    <rect x="54" y="40" width="8" height="6" fill="#0F172A" />
                    <rect x="68" y="36" width="10" height="8" fill="#0F172A" />
                    <rect x="84" y="38" width="8" height="6" fill="#0F172A" />

                    <rect x="36" y="52" width="8" height="6" fill="#0F172A" />
                    <rect x="48" y="50" width="6" height="10" fill="#0F172A" />
                    <rect x="60" y="54" width="8" height="6" fill="#F5A623" />
                    <rect x="74" y="50" width="12" height="6" fill="#0F172A" />

                    <rect x="36" y="68" width="8" height="8" fill="#0F172A" />
                    <rect x="48" y="70" width="12" height="6" fill="#0F172A" />
                    <rect x="66" y="68" width="8" height="10" fill="#7A0016" />
                    <rect x="80" y="72" width="10" height="6" fill="#0F172A" />

                    <rect x="38" y="84" width="12" height="8" fill="#F5A623" />
                    <rect x="56" y="84" width="10" height="6" fill="#0F172A" />
                    <rect x="72" y="86" width="14" height="6" fill="#0F172A" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-7 h-7 rounded bg-[#7A0016] text-[#FFD700] text-[9px] font-black flex items-center justify-center border-2 border-white shadow-xs">
                      IIT
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-xs font-bold text-[#0F172A] tracking-wider">
                    {verificationCode}
                  </div>
                  <p className="text-[11px] text-[#64748B]">Candidate: Alexandra Reyes (BSIT-4)</p>
                  <p className="text-[10px] text-emerald-700 font-bold">Career Center Verification Link Active</p>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => alert("Digital QR Badge downloaded as PNG for embedding into your CV header.")}
                    className="flex-1 py-2 rounded-lg bg-[#7A0016] hover:bg-[#9B0020] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs btn-press"
                  >
                    <Download size={14} />
                    <span>Download Badge QR</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText?.(`https://pace.msuiit.edu.ph/verify/${verificationCode}`);
                      alert("Career verification link copied to clipboard!");
                    }}
                    className="px-3 py-2 rounded-lg border border-[#CBD5E1] text-[#334155] hover:bg-slate-100 text-xs font-bold flex items-center gap-1"
                  >
                    <Share2 size={14} />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>

              {/* Right: Career Center Verification Details (No Registrar/Academics) */}
              <div className="md:col-span-7 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-5">
                <h4 className="text-sm font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-2">
                  Career Center Endorsement Status
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-[#64748B] font-mono block">RESUME REVIEW STATUS</span>
                      <strong className="text-sm text-[#0F172A]">CV Version 3.2 Approved</strong>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      VERIFIED BY COUNSELOR
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-[#64748B] font-mono block">CAREER ORIENTATION</span>
                      <strong className="text-sm text-[#0F172A]">Pre-Employment Seminar 2026</strong>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#FFF3D6] text-[#7A0016] text-[10px] font-bold border border-[#F5A623]/60">
                      COMPLETED
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-[#64748B] font-mono block">ASSIGNED CAREER COUNSELOR</span>
                      <strong className="text-sm text-[#0F172A]">Dr. Maria Santos (Career Placement Officer)</strong>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                      ENDORSED FOR HIRING
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#D97706]" />
                    <span>Scope of Career Center Verification:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    This verification is administered strictly by the MSU-IIT Career Center. It confirms that the student has undergone official career development coaching, resume standard formatting, and interview readiness preparation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            FEATURE D: INSTITUTIONAL MOCK TECHNICAL INTERVIEW SIMULATOR
            ───────────────────────────────────────────────────────────── */}
        {activeTab === "simulator" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-[#7A0016] uppercase font-mono">Standardized Faculty Scoring Rubric</span>
                <h3 className="text-lg font-bold text-[#0F172A]">Mock Technical Interview Simulation Suite</h3>
                <p className="text-xs text-[#64748B]">
                  Evaluated by licensed university career counselors following the ABET / CHED professional competency rubric.
                </p>
              </div>
              <button
                onClick={() => alert("Simulation scheduled! Your assigned counselor Dr. Maria Santos will conduct your evaluation tomorrow at 10:00 AM.")}
                className="px-4 py-2 rounded-lg bg-[#7A0016] hover:bg-[#9B0020] text-white text-xs font-bold shadow-xs btn-press"
              >
                + Request New Mock Session
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: 5-Point Rubric Cards */}
              <div className="lg:col-span-8 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-5">
                <h4 className="text-sm font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-2 flex items-center justify-between">
                  <span>Counselor Scoring Breakdown (Session #2026-MOCK-04)</span>
                  <span className="text-xs font-mono font-bold text-emerald-700">Overall: 4.8 / 5.0 (Distinction)</span>
                </h4>

                <div className="space-y-4 text-xs">
                  {/* Metric 1 */}
                  <div className="space-y-1.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#0F172A]">1. System Architecture & Scalability Design</span>
                      <span className="font-bold text-[#7A0016] font-mono">5.0 / 5.0 ★★★★★</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7A0016] rounded-full w-full"></div>
                    </div>
                    <p className="text-[11px] text-[#64748B]">Demonstrated excellent modular division, database normalization, and caching strategies.</p>
                  </div>

                  {/* Metric 2 */}
                  <div className="space-y-1.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#0F172A]">2. Coding Fundamentals & TypeScript Precision</span>
                      <span className="font-bold text-[#7A0016] font-mono">4.0 / 5.0 ★★★★☆</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7A0016] rounded-full w-[80%]"></div>
                    </div>
                    <p className="text-[11px] text-[#64748B]">Clean type safety and asynchronous handling. Recommendation: refine recursive edge case bounds.</p>
                  </div>

                  {/* Metric 3 */}
                  <div className="space-y-1.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#0F172A]">3. Algorithmic Problem Solving & Big-O Notation</span>
                      <span className="font-bold text-[#7A0016] font-mono">5.0 / 5.0 ★★★★★</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7A0016] rounded-full w-full"></div>
                    </div>
                    <p className="text-[11px] text-[#64748B]">Immediate recognition of $O(n \log n)$ divide-and-conquer solutions.</p>
                  </div>

                  {/* Metric 4 */}
                  <div className="space-y-1.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#0F172A]">4. Communication & Technical Articulation</span>
                      <span className="font-bold text-[#7A0016] font-mono">4.5 / 5.0 ★★★★★</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7A0016] rounded-full w-[90%]"></div>
                    </div>
                    <p className="text-[11px] text-[#64748B]">Articulate thoughts during whiteboarding; answered behavioral questions confidently.</p>
                  </div>

                  {/* Metric 5 */}
                  <div className="space-y-1.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#0F172A]">5. Institutional Professionalism & Ethics</span>
                      <span className="font-bold text-[#7A0016] font-mono">5.0 / 5.0 ★★★★★</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7A0016] rounded-full w-full"></div>
                    </div>
                    <p className="text-[11px] text-[#64748B]">Exemplifies IITian core values of integrity, commitment, and engineering diligence.</p>
                  </div>
                </div>
              </div>

              {/* Right: Counselor Notes & Certificate */}
              <div className="lg:col-span-4 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
                <div className="text-center space-y-2 border-b border-[#F1F5F9] pb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFF3D6] text-[#7A0016] flex items-center justify-center mx-auto border border-[#F5A623]">
                    <Award size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Official Career Readiness Endorsement</h4>
                  <p className="text-xs text-emerald-700 font-bold">Grade: High Distinction (A+)</p>
                </div>

                <div className="text-xs space-y-2 text-[#334155]">
                  <p className="font-bold text-[#0F172A]">Counselor Evaluation Remarks:</p>
                  <blockquote className="p-3 rounded-lg bg-[#F8FAFC] border-l-4 border-l-[#7A0016] text-[#475569] italic">
                    "Alexandra demonstrated industry-ready competence during the full-stack architecture defense. Her capstone demonstrates practical production reliability. She is endorsed for enterprise tech hiring without reservation."
                  </blockquote>
                  <p className="text-[11px] text-[#64748B] pt-1">
                    Evaluator: <strong className="text-[#0F172A]">Dr. Maria Santos, PhD</strong><br />
                    College of Computer Studies Placement Division
                  </p>
                </div>

                <button
                  onClick={() => alert("Downloading Official Evaluation PDF...")}
                  className="w-full py-2.5 rounded-lg border border-[#CBD5E1] text-[#334155] hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Download size={14} />
                  <span>Download Signed Rubric Report</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            FEATURE E: ON-CAMPUS CAREER FAIR & INTERVIEW BOOTH BOOKING
            ───────────────────────────────────────────────────────────── */}
        {activeTab === "careerfair" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-xs font-bold text-[#7A0016] uppercase font-mono">MSU-IIT Gymnasium Floor Map</span>
                <h3 className="text-lg font-bold text-[#0F172A]">Annual On-Campus Career & Technology Fair 2026</h3>
                <p className="text-xs text-[#64748B]">
                  Reserve 15-minute 1-on-1 interview slots with corporate partner booths at the university gymnasium.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-[#FFF3D6] text-[#7A0016] text-xs font-bold border border-[#F5A623]/60">
                  📅 Event Date: Nov 14, 2026 • 8:00 AM - 5:00 PM
                </span>
              </div>
            </div>

            {/* Split Screen: Floor Booth Cards & Booking Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left: Booth Selection Cards (5 Cols) */}
              <div className="lg:col-span-5 space-y-3 max-h-[620px] overflow-y-auto pr-1">
                {careerFairBooths.map((booth) => {
                  const isSelected = selectedBoothId === booth.id;
                  const isBooked = bookedBooths.includes(booth.id);
                  return (
                    <div
                      key={booth.id}
                      onClick={() => setSelectedBoothId(booth.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${booth.color} ${
                        isSelected
                          ? "bg-white border-[#7A0016] ring-2 ring-[#7A0016]/10 shadow-sm"
                          : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-[#0F172A]">{booth.company}</h4>
                          <p className="text-xs text-[#7A0016] font-semibold">{booth.location}</p>
                          <p className="text-[11px] text-[#64748B]">{booth.industry}</p>
                        </div>
                        {isBooked ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            PASS BOOKED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-[#FFF3D6] text-[#7A0016] text-[10px] font-bold">
                            {booth.slotsAvailable} slots left
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 pt-2">
                        {booth.hiringRoles.map((role, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#334155] text-[10px] font-medium">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Interactive Booking Pane (7 Cols) */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-5 sticky top-20">
                <div className="border-b border-[#F1F5F9] pb-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-[#7A0016] text-[#FFD700]">
                        GYMNASIUM EXHIBITOR BOOTH
                      </span>
                      <h3 className="text-xl font-bold text-[#0F172A] mt-1">{currentBooth.company}</h3>
                      <p className="text-xs text-[#7A0016] font-semibold">{currentBooth.location} • Lead Rep: {currentBooth.rep}</p>
                    </div>

                    {bookedBooths.includes(currentBooth.id) && (
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                        <Check size={16} />
                        <span>Pass Confirmed</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed pt-1">
                    {currentBooth.industry}. Open to graduating students and practicum candidates from:{" "}
                    <strong className="text-[#0F172A]">{currentBooth.targetColleges.join(", ")}</strong>.
                  </p>
                </div>

                {/* Speed Interview Slot Selector */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-[#0F172A]">
                    Select Speed Interview Time-Slot (Nov 14, 2026):
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      "09:00 AM - 09:15 AM",
                      "09:30 AM - 09:45 AM",
                      "10:15 AM - 10:30 AM",
                      "11:00 AM - 11:15 AM",
                      "01:30 PM - 01:45 PM",
                      "02:30 PM - 02:45 PM",
                    ].map((slot) => {
                      const isSelected = slotSelected === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSlotSelected(slot)}
                          className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all btn-press ${
                            isSelected
                              ? "bg-[#7A0016] text-white border-[#7A0016] shadow-xs"
                              : "bg-[#F8FAFC] text-[#334155] border-[#E2E8F0] hover:border-[#CBD5E1]"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Booking Trigger */}
                <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
                  <button
                    onClick={handleBookBoothSlot}
                    disabled={bookedBooths.includes(currentBooth.id)}
                    className="w-full py-3 rounded-lg bg-[#7A0016] hover:bg-[#9B0020] text-white font-bold text-xs shadow-md shadow-[#7A0016]/20 transition-all btn-press disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {bookedBooths.includes(currentBooth.id) ? (
                      <span>✓ Speed Interview Pass Confirmed ({slotSelected})</span>
                    ) : (
                      <>
                        <span>Reserve 1-on-1 Speed Interview Slot</span>
                        <ChevronRight size={14} className="text-[#FFD700]" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-[#64748B] text-center">
                    Present your digital QR credential at the MSU-IIT Gymnasium entrance for priority fast-track entry.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 5: CV CENTRAL & RESUME
            ───────────────────────────────────────────────────────────── */}
        {activeTab === "resume" && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0F172A]">Curriculum Vitae Repository</h3>
            <p className="text-xs text-[#64748B]">Upload new versions for counselor feedback and corporate recruiter viewing.</p>

            <div className="border-2 border-dashed border-[#CBD5E1] hover:border-[#7A0016] rounded-xl p-8 text-center space-y-2 bg-[#F8FAFC] cursor-pointer transition-colors">
              <Upload size={24} className="mx-auto text-[#7A0016]" />
              <div className="text-xs font-bold text-[#0F172A]">Drag and drop your updated PDF resume</div>
              <p className="text-[11px] text-[#64748B]">PDF files up to 10MB • Automatically encrypted and scanned</p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#0F172A]">Alexandra_Reyes_FullStack_v3.pdf</p>
                <p className="text-[10px] text-[#64748B]">Verified by Dr. Maria Santos • 2 days ago</p>
              </div>
              <button
                onClick={() => alert("Previewing verified PDF...")}
                className="px-3 py-1.5 rounded bg-white border border-[#CBD5E1] text-[#334155] font-bold text-xs"
              >
                Preview PDF
              </button>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 6: COUNSELOR MESSAGES
            ───────────────────────────────────────────────────────────── */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0F172A]">Direct Counselor Consultation Thread</h3>
            <div className="h-60 overflow-y-auto p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] max-w-md text-[#334155]">
                <strong className="text-[#7A0016] block mb-1">Dr. Maria Santos:</strong>
                Alexandra, your Mock Technical score (4.8/5.0) has been officially recorded in the Career Center database. Your speed interview at TechCorp is confirmed.
              </div>
              <div className="p-3 rounded-lg bg-[#7A0016] text-white max-w-md ml-auto">
                <strong className="text-[#FFD700] block mb-1">You:</strong>
                Thank you so much, Dr. Santos! I have downloaded the verified QR badge and embedded it into my CV.
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type response to Dr. Maria Santos..."
                className="flex-1 px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs focus:outline-none focus:border-[#7A0016]"
              />
              <button className="px-4 py-2 rounded-lg bg-[#7A0016] text-white text-xs font-bold">Send</button>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
