"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  FileText,
  Calendar,
  CalendarDays,
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
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
  Building2,
  BriefcaseBusiness,
  Newspaper,
  UserRound,
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
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "appointments", label: "Appointments", icon: <CalendarDays size={18} /> },
  { id: "opportunities", label: "Career Opportunities", icon: <BriefcaseBusiness size={18} /> },
  { id: "resume", label: "Resume & CV Checker", icon: <FileText size={18} /> },
  { id: "messages", label: "Messages & Feedback", icon: <MessageSquare size={18} /> },
  { id: "profile", label: "My Career Profile", icon: <UserRound size={18} /> },
];

type CounselorWalkInAvailability = {
  name: string;
  role: string;
  dates: Record<string, string[]>;
};

const WALK_IN_STORAGE_KEY = "pace-walk-in-schedule";
const WALK_IN_UPDATED_EVENT = "pace-walk-in-schedule-updated";
const INITIAL_WALK_IN_SCHEDULE: Record<string, { start: string; end: string }> = {
  "2026-11-04": { start: "10:00", end: "12:00" },
  "2026-11-06": { start: "09:00", end: "11:00" },
  "2026-11-10": { start: "13:00", end: "15:00" },
};

const counselorWalkInAvailability: CounselorWalkInAvailability[] = [
  {
    name: "Dr. Maria Santos",
    role: "Career Placement Officer",
    dates: {
      "2026-11-04": ["10:00 AM", "11:00 AM"],
      "2026-11-06": ["09:00 AM", "10:00 AM"],
      "2026-11-10": ["01:00 PM", "02:00 PM"],
    },
  },
  {
    name: "Mr. Paolo Dela Cruz",
    role: "Career Guidance Counselor",
    dates: {
      "2026-11-04": ["02:00 PM", "03:00 PM"],
      "2026-11-12": ["09:00 AM", "10:00 AM"],
      "2026-11-17": ["01:00 PM", "02:00 PM"],
    },
  },
  {
    name: "Ms. Elena Macaraeg",
    role: "Resume & Career Advisor",
    dates: {
      "2026-11-06": ["01:00 PM"],
      "2026-11-13": ["09:00 AM", "10:00 AM"],
      "2026-11-19": ["03:00 PM", "04:00 PM"],
    },
  },
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 10, 1));
  const [selectedWalkInDate, setSelectedWalkInDate] = useState("2026-11-04");
  const [sharedWalkInSchedule, setSharedWalkInSchedule] = useState(INITIAL_WALK_IN_SCHEDULE);

  useEffect(() => {
    const storedSchedule = window.localStorage.getItem(WALK_IN_STORAGE_KEY);
    if (storedSchedule) {
      try {
        setSharedWalkInSchedule(JSON.parse(storedSchedule));
      } catch {
        window.localStorage.removeItem(WALK_IN_STORAGE_KEY);
      }
    }

    const syncWalkInSchedule = () => {
      const nextSchedule = window.localStorage.getItem(WALK_IN_STORAGE_KEY);
      if (!nextSchedule) return;
      try {
        setSharedWalkInSchedule(JSON.parse(nextSchedule));
      } catch {
        window.localStorage.removeItem(WALK_IN_STORAGE_KEY);
      }
    };
    window.addEventListener("storage", syncWalkInSchedule);
    window.addEventListener(WALK_IN_UPDATED_EVENT, syncWalkInSchedule);
    return () => {
      window.removeEventListener("storage", syncWalkInSchedule);
      window.removeEventListener(WALK_IN_UPDATED_EVENT, syncWalkInSchedule);
    };
  }, []);

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

  const formatDateKey = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  };

  const formatWalkInTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return new Date(2026, 0, 1, hours, minutes).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const calendarDays = (() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: Math.ceil((firstDay + daysInMonth) / 7) * 7 }, (_, index) => {
      const day = index - firstDay + 1;
      return day > 0 && day <= daysInMonth ? new Date(year, month, day) : null;
    });
  })();

  const currentCounselorAvailability = counselorWalkInAvailability.map((counselor) => {
    if (counselor.name !== "Dr. Maria Santos") return counselor;
    const dates = Object.fromEntries(
      Object.entries(sharedWalkInSchedule).map(([date, window]) => [
        date,
        [`${formatWalkInTime(window.start)} – ${formatWalkInTime(window.end)}`],
      ])
    );
    return { ...counselor, dates };
  });
  const availableCounselors = currentCounselorAvailability.filter(
    (counselor) => counselor.dates[selectedWalkInDate]
  );

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
            <div
              className="w-14 h-14 rounded-full bg-[#F8FAFC] text-[#94A3B8] flex items-center justify-center border-2 border-[#D1D5DB] shadow-xs"
              aria-label="Profile picture placeholder"
            >
              <User size={28} strokeWidth={1.5} />
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
              onClick={() => setActiveTab("appointments")}
              className="px-3.5 py-2 rounded-lg bg-[#FFF3D6] hover:bg-[#FFE5A3] text-[#7A0016] text-xs font-bold border border-[#F5A623]/60 flex items-center gap-1.5 transition-colors btn-press shadow-xs"
            >
              <CalendarDays size={14} />
              <span>Book Counseling</span>
            </button>
            <button
              onClick={() => setActiveTab("opportunities")}
              className="px-3.5 py-2 rounded-lg bg-[#7A0016] hover:bg-[#9B0020] text-white text-xs font-bold flex items-center gap-1.5 transition-colors btn-press shadow-xs"
            >
              <BriefcaseBusiness size={14} />
              <span>View Opportunities</span>
            </button>
          </div>
        </div>

        {/* CareerConnect+ student overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs border-l-4 border-l-[#7A0016]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#7A0016]">CareerConnect+ Student Workspace</p>
                  <h1 className="text-2xl font-black text-[#0F172A] mt-1">Good morning, Alexandra.</h1>
                  <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
                    Manage your career guidance journey, connect with your counselor, and stay informed about opportunities.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("appointments")}
                  className="px-4 py-2.5 rounded-lg bg-[#7A0016] hover:bg-[#9B0020] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
                >
                  <CalendarDays size={15} />
                  Book an appointment
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Upcoming appointment", value: "Oct 30, 10:00 AM", note: "Dr. Maria Santos", icon: CalendarDays, color: "text-[#7A0016]", tab: "appointments" },
                { label: "Resume status", value: "Needs review", note: "Last updated 2 days ago", icon: FileText, color: "text-[#D97706]", tab: "resume" },
                { label: "New opportunities", value: "8 available", note: "3 posted this week", icon: BriefcaseBusiness, color: "text-[#0284C7]", tab: "opportunities" },
                { label: "Unread feedback", value: "2 messages", note: "From your counselor", icon: MessageSquare, color: "text-emerald-700", tab: "messages" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.label} onClick={() => setActiveTab(item.tab)} className="bg-white rounded-xl border border-[#E2E8F0] p-4 text-left shadow-xs hover:border-[#9B0020] transition-colors">
                    <Icon size={18} className={`${item.color} mb-3`} />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">{item.label}</p>
                    <p className="text-base font-black text-[#0F172A] mt-1">{item.value}</p>
                    <p className="text-[11px] text-[#64748B] mt-1">{item.note}</p>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                  <div>
                    <h2 className="text-sm font-bold text-[#0F172A]">Career guidance checklist</h2>
                    <p className="text-[11px] text-[#64748B] mt-1">Complete these steps to prepare for counseling.</p>
                  </div>
                  <span className="text-xs font-bold text-[#7A0016]">3 of 5 complete</span>
                </div>
                <div className="space-y-3 mt-4">
                  {[
                    ["Complete your career profile", true, "profile"],
                    ["Upload your latest resume", true, "resume"],
                    ["Request counselor feedback", false, "messages"],
                    ["Book a guidance appointment", false, "appointments"],
                    ["Review current opportunities", false, "opportunities"],
                  ].map(([label, complete, tab]) => (
                    <button key={label as string} onClick={() => setActiveTab(tab as string)} className="w-full flex items-center gap-3 text-left group">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${complete ? "bg-emerald-600 border-emerald-600 text-white" : "border-[#CBD5E1] text-transparent group-hover:border-[#7A0016]"}`}>
                        <Check size={12} />
                      </span>
                      <span className={`text-xs ${complete ? "text-[#64748B] line-through" : "font-semibold text-[#334155]"}`}>{label as string}</span>
                      {!complete && <ChevronRight size={14} className="ml-auto text-[#94A3B8]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
                <div className="flex items-center gap-2 border-b border-[#F1F5F9] pb-3">
                  <Newspaper size={17} className="text-[#7A0016]" />
                  <div>
                    <h2 className="text-sm font-bold text-[#0F172A]">Career updates</h2>
                    <p className="text-[11px] text-[#64748B]">From the Career Center</p>
                  </div>
                </div>
                <div className="divide-y divide-[#F1F5F9]">
                  {[
                    ["Career Center orientation", "New student orientation sessions open for November.", "Today"],
                    ["Internship opportunities", "Partner companies posted 3 new internships.", "Yesterday"],
                    ["Resume workshop", "Registration is open for the next CV clinic.", "Oct 24"],
                  ].map(([title, text, date]) => (
                    <button key={title} onClick={() => setActiveTab("opportunities")} className="w-full text-left py-3 hover:bg-[#F8FAFC]">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-[#334155]">{title}</span>
                        <span className="text-[10px] text-[#94A3B8] whitespace-nowrap">{date}</span>
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-1">{text}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#7A0016]">Appointment Scheduling</p>
                <h2 className="text-xl font-black text-[#0F172A] mt-1">Connect with a counselor</h2>
                <p className="text-xs text-[#64748B] mt-1">View availability and request a career guidance session.</p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">Counselor availability updated</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3 bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A]">Walk-in availability calendar</h3>
                    <p className="text-[11px] text-[#64748B] mt-1">Select a date to see counselors accepting walk-ins.</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}
                      className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F8FAFC]"
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <h4 className="w-32 text-center text-xs font-bold text-[#334155]">
                      {calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
                      className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F8FAFC]"
                      aria-label="Next month"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-[#94A3B8] mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((date, index) => {
                    if (!date) return <span key={`empty-${index}`} className="min-h-12" />;
                    const dateKey = formatDateKey(date);
                    const counselorsAvailable = currentCounselorAvailability.filter((counselor) => counselor.dates[dateKey]).length;
                    const isSelected = selectedWalkInDate === dateKey;
                    return (
                      <button
                        type="button"
                        key={dateKey}
                        onClick={() => setSelectedWalkInDate(dateKey)}
                        className={`min-h-12 rounded-lg border p-1.5 text-left transition-colors ${isSelected ? "border-[#7A0016] bg-[#FFF3D6]" : "border-transparent hover:border-[#E2E8F0] hover:bg-[#F8FAFC]"}`}
                      >
                        <span className={`text-xs font-bold ${isSelected ? "text-[#7A0016]" : "text-[#334155]"}`}>{date.getDate()}</span>
                        {counselorsAvailable > 0 && (
                          <span className="mt-1 block truncate text-[9px] font-bold text-emerald-700">
                            {counselorsAvailable} counselor{counselorsAvailable === 1 ? "" : "s"} open
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-[#64748B]">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Walk-in periods available
                </div>
              </div>
              <div className="lg:col-span-2 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A0016]">Selected date</p>
                <h3 className="text-base font-black text-[#0F172A] mt-1">
                  {new Date(`${selectedWalkInDate}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </h3>
                <div className="mt-4 space-y-3">
                  {availableCounselors.length > 0 ? availableCounselors.map((counselor) => (
                    <div key={counselor.name} className="rounded-lg border border-[#E2E8F0] bg-white p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D1D5DB] bg-[#F8FAFC] text-[#94A3B8]"><UserRound size={16} /></div>
                        <div>
                          <p className="text-xs font-bold text-[#0F172A]">{counselor.name}</p>
                          <p className="text-[10px] text-[#64748B]">{counselor.role}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-[10px] font-bold uppercase text-emerald-700">Walk-in periods</p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {counselor.dates[selectedWalkInDate].map((time) => (
                          <span key={time} className="rounded bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 border border-emerald-200">{time}</span>
                        ))}
                      </div>
                    </div>
                  )) : (
                    <div className="rounded-lg border border-dashed border-[#CBD5E1] bg-white p-4 text-center">
                      <Clock size={20} className="mx-auto text-[#94A3B8]" />
                      <p className="mt-2 text-xs font-semibold text-[#475569]">No walk-in counselors listed</p>
                      <p className="mt-1 text-[10px] text-[#64748B]">Try another date or request a scheduled appointment.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[
                ["Dr. Maria Santos", "Career Placement Officer", "Available this week", "Oct 30 • 10:00 AM"],
                ["Mr. Paolo Dela Cruz", "Career Guidance Counselor", "Available next week", "Nov 4 • 2:00 PM"],
                ["Ms. Elena Macaraeg", "Resume & Career Advisor", "Limited availability", "Nov 6 • 9:30 AM"],
              ].map(([name, role, status, slot]) => (
                <div key={name} className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#D1D5DB] flex items-center justify-center text-[#94A3B8]"><UserRound size={20} /></div>
                    <div><h3 className="text-sm font-bold text-[#0F172A]">{name}</h3><p className="text-[11px] text-[#64748B]">{role}</p></div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]"><p className="text-[10px] font-bold uppercase text-emerald-700">{status}</p><p className="text-xs font-semibold text-[#334155] mt-1">{slot}</p></div>
                  <button onClick={() => alert(`Appointment request sent to ${name}.`)} className="w-full mt-4 px-3 py-2 rounded-lg bg-[#7A0016] text-white text-xs font-bold hover:bg-[#9B0020]">Request appointment</button>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs"><h3 className="text-sm font-bold text-[#0F172A]">Your upcoming sessions</h3><div className="mt-3 p-4 rounded-lg border-l-4 border-l-[#7A0016] bg-[#F8FAFC]"><p className="text-xs font-bold text-[#334155]">Career planning consultation with Dr. Maria Santos</p><p className="text-[11px] text-[#64748B] mt-1">October 30, 2026 • 10:00 AM • Career Center Office</p><span className="inline-block mt-2 text-[10px] font-bold text-emerald-700">CONFIRMED</span></div></div>
          </div>
        )}

        {activeTab === "opportunities" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs"><p className="text-[11px] font-bold uppercase tracking-wider text-[#7A0016]">Career News & Opportunities</p><h2 className="text-xl font-black text-[#0F172A] mt-1">Explore your next opportunity</h2><p className="text-xs text-[#64748B] mt-1">Browse verified postings and career announcements shared by the Career Center.</p></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                ["Junior Frontend Developer", "TechCorp Philippines", "Full-time • Iligan / Hybrid", "Posted 2 days ago"],
                ["Software Engineering Intern", "Ayala Digital Labs", "Internship • Makati / Remote", "Posted 3 days ago"],
                ["IT Support Associate", "MSU-IIT Partner Network", "Full-time • Iligan City", "Posted 5 days ago"],
                ["Data Analyst Graduate Associate", "Mindanao Silicon Ventures", "Graduate role • Cagayan de Oro", "Posted 1 week ago"],
              ].map(([title, company, details, date]) => (
                <div key={title} className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs hover:border-[#9B0020] transition-colors"><div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-bold text-[#0F172A]">{title}</h3><p className="text-xs text-[#7A0016] font-semibold mt-1">{company}</p></div><span className="px-2 py-1 rounded bg-[#FFF3D6] text-[#7A0016] text-[10px] font-bold">VERIFIED</span></div><p className="text-xs text-[#475569] mt-4">{details}</p><div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F1F5F9]"><span className="text-[11px] text-[#64748B]">{date}</span><button onClick={() => alert("This posting is view-only. Contact the Career Center for application guidance.")} className="text-xs font-bold text-[#7A0016] hover:underline">View posting <ChevronRight size={13} className="inline" /></button></div></div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs"><p className="text-[11px] font-bold uppercase tracking-wider text-[#7A0016]">Student Account</p><h2 className="text-xl font-black text-[#0F172A] mt-1">My career profile</h2><p className="text-xs text-[#64748B] mt-1">Keep your information current so your counselor can provide relevant guidance.</p></div>
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4"><div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full bg-[#F8FAFC] border-2 border-[#D1D5DB] flex items-center justify-center text-[#94A3B8]"><User size={30} /></div><div><h3 className="text-lg font-bold text-[#0F172A]">Alexandra Reyes</h3><p className="text-xs text-[#64748B]">BS Information Technology • 4th Year</p></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"><div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]"><span className="text-[10px] uppercase font-bold text-[#64748B]">Student ID</span><p className="font-semibold text-[#334155] mt-1">2021-0142</p></div><div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]"><span className="text-[10px] uppercase font-bold text-[#64748B]">Email</span><p className="font-semibold text-[#334155] mt-1">alexandra.reyes@g.msuiit.edu.ph</p></div></div><button onClick={() => alert("Profile editing will be connected to the student account service.")} className="px-4 py-2 rounded-lg border border-[#7A0016] text-[#7A0016] text-xs font-bold hover:bg-[#FFF3D6]">Edit profile</button></div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            LEGACY FEATURE VIEWS
            ───────────────────────────────────────────────────────────── */}
        {activeTab === "legacy-overview" && (
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
                onClick={() => setPdfViewerOpen(true)}
                className="px-3 py-1.5 rounded bg-white border border-[#CBD5E1] text-[#334155] font-bold text-xs"
              >
                Preview PDF
              </button>
            </div>

            {pdfViewerOpen && (
              <div
                className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="resume-viewer-title"
                onClick={() => setPdfViewerOpen(false)}
              >
                <div
                  className="w-full max-w-5xl h-[92vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#D1D5DB] bg-white">
                    <div className="min-w-0">
                      <h4 id="resume-viewer-title" className="text-sm font-bold text-[#0F172A] truncate">
                        Alexandra_Reyes_FullStack_v3.pdf
                      </h4>
                      <p className="text-[11px] text-[#64748B]">Counselor-verified resume • All pages</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href="/sample-resume-alexandra-reyes.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-[#334155] text-xs font-bold hover:bg-[#F8FAFC]"
                      >
                        <ExternalLink size={13} />
                        Open
                      </a>
                      <a
                        href="/sample-resume-alexandra-reyes.pdf"
                        download="Alexandra_Reyes_FullStack_v3.pdf"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7A0016] text-white text-xs font-bold hover:bg-[#9B0020]"
                      >
                        <Download size={13} />
                        Download
                      </a>
                      <button
                        type="button"
                        onClick={() => setPdfViewerOpen(false)}
                        aria-label="Close PDF viewer"
                        className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  <iframe
                    src="/sample-resume-alexandra-reyes.pdf#view=FitH"
                    title="Alexandra Reyes counselor-verified resume"
                    className="w-full flex-1 border-0 bg-[#525659]"
                  />
                </div>
              </div>
            )}
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
