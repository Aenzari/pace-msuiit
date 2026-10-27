"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  MessageSquare,
  Clock,
  Menu,
  X,
  Check,
  Star,
  Users,
  ClipboardList,
  Send,
  Bell,
  LogOut,
  ChevronRight,
  Award,
  RotateCcw,
  Minus,
  Plus,
  Circle,
} from "lucide-react";

// ─── TypeScript Interfaces ───────────────────────────────────────────────────

type AppointmentStatus = "pending" | "approved" | "rejected" | "rescheduled";

interface PendingAppointment {
  id: number;
  studentName: string;
  program: string;
  reason: string;
  requestedDate: string;
  requestedTime: string;
  status: AppointmentStatus;
  remarks: string;
}

interface StudentCV {
  id: number;
  studentName: string;
  program: string;
  submittedAt: string;
  status: "pending" | "reviewed" | "approved";
}

interface CVFeedback {
  contactInfo: string;
  education: string;
  workExperience: string;
  skills: string;
  rating: number;
}

interface Message {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  contact: string;
  role: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  messages: Message[];
}

interface TimeSlot {
  time: string;
  enabled: boolean;
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const PENDING_APPOINTMENTS_INIT: PendingAppointment[] = [
  { id: 1, studentName: "Alexandra Reyes", program: "BSIT-4", reason: "Resume Review", requestedDate: "Nov 4, 2026", requestedTime: "02:00 PM", status: "pending", remarks: "" },
  { id: 2, studentName: "James Villanueva", program: "BSCS-3", reason: "Career Coaching", requestedDate: "Nov 5, 2026", requestedTime: "09:00 AM", status: "pending", remarks: "" },
  { id: 3, studentName: "Maria Chua", program: "BSECE-4", reason: "Mock Interview", requestedDate: "Nov 5, 2026", requestedTime: "11:00 AM", status: "approved", remarks: "Confirmed via email." },
  { id: 4, studentName: "Pedro Manalo", program: "BSIT-3", reason: "Mental Health/Advising", requestedDate: "Nov 6, 2026", requestedTime: "10:00 AM", status: "pending", remarks: "" },
  { id: 5, studentName: "Christine Uy", program: "BSCS-4", reason: "General Inquiry", requestedDate: "Nov 7, 2026", requestedTime: "03:00 PM", status: "rescheduled", remarks: "Moved to Nov 10 due to conflict." },
  { id: 6, studentName: "Ramon dela Torre", program: "BSME-4", reason: "Resume Review", requestedDate: "Nov 8, 2026", requestedTime: "01:00 PM", status: "pending", remarks: "" },
];

const STUDENT_CVS_INIT: StudentCV[] = [
  { id: 1, studentName: "Alexandra Reyes", program: "BSIT-4", submittedAt: "Oct 25, 2026", status: "pending" },
  { id: 2, studentName: "James Villanueva", program: "BSCS-3", submittedAt: "Oct 24, 2026", status: "pending" },
  { id: 3, studentName: "Maria Chua", program: "BSECE-4", submittedAt: "Oct 22, 2026", status: "reviewed" },
  { id: 4, studentName: "Christine Uy", program: "BSCS-4", submittedAt: "Oct 20, 2026", status: "approved" },
];

const TODAY_SCHEDULE = [
  { time: "08:00 AM", student: "Maria Chua", type: "Mock Interview", status: "confirmed" },
  { time: "09:30 AM", student: "James Villanueva", type: "Career Coaching", status: "confirmed" },
  { time: "11:00 AM", student: "Ella Macaraeg", type: "Resume Review", status: "confirmed" },
  { time: "01:00 PM", student: "Ramon dela Torre", type: "General Inquiry", status: "confirmed" },
  { time: "02:30 PM", student: "Pedro Manalo", type: "Mental Health/Advising", status: "pending" },
  { time: "04:00 PM", student: "Christine Uy", type: "Resume Review", status: "pending" },
];

const WEEK_SCHEDULE_INIT: DaySchedule[] = [
  { day: "Monday", slots: [{ time: "8–9 AM", enabled: true }, { time: "9–10 AM", enabled: true }, { time: "10–11 AM", enabled: false }, { time: "1–2 PM", enabled: true }, { time: "2–3 PM", enabled: true }, { time: "3–4 PM", enabled: false }] },
  { day: "Tuesday", slots: [{ time: "8–9 AM", enabled: true }, { time: "9–10 AM", enabled: false }, { time: "10–11 AM", enabled: true }, { time: "1–2 PM", enabled: true }, { time: "2–3 PM", enabled: false }, { time: "3–4 PM", enabled: true }] },
  { day: "Wednesday", slots: [{ time: "8–9 AM", enabled: false }, { time: "9–10 AM", enabled: true }, { time: "10–11 AM", enabled: true }, { time: "1–2 PM", enabled: false }, { time: "2–3 PM", enabled: true }, { time: "3–4 PM", enabled: true }] },
  { day: "Thursday", slots: [{ time: "8–9 AM", enabled: true }, { time: "9–10 AM", enabled: true }, { time: "10–11 AM", enabled: false }, { time: "1–2 PM", enabled: true }, { time: "2–3 PM", enabled: true }, { time: "3–4 PM", enabled: false }] },
  { day: "Friday", slots: [{ time: "8–9 AM", enabled: true }, { time: "9–10 AM", enabled: false }, { time: "10–11 AM", enabled: true }, { time: "1–2 PM", enabled: false }, { time: "2–3 PM", enabled: false }, { time: "3–4 PM", enabled: true }] },
];

const STUDENT_CONVOS_INIT: Conversation[] = [
  {
    id: 1, contact: "Alexandra Reyes", role: "BSIT-4", avatar: "AR", lastMessage: "Sure! I'm available on Tuesday at 2PM.", unread: 1,
    messages: [
      { id: 1, sender: "them", text: "Hi Dr. Santos! I've made the changes you suggested.", time: "10:08 AM" },
      { id: 2, sender: "me", text: "Great job, Alexandra! Your resume looks much better.", time: "10:11 AM" },
      { id: 3, sender: "them", text: "Sure! I'm available on Tuesday at 2PM.", time: "10:15 AM" },
    ],
  },
  {
    id: 2, contact: "James Villanueva", role: "BSCS-3", avatar: "JV", lastMessage: "Thank you for the feedback po!", unread: 0,
    messages: [
      { id: 1, sender: "me", text: "James, please add more quantifiable achievements to your experience section.", time: "Yesterday" },
      { id: 2, sender: "them", text: "Understood po. I'll revise it right away.", time: "Yesterday" },
      { id: 3, sender: "them", text: "Thank you for the feedback po!", time: "Yesterday" },
    ],
  },
  {
    id: 3, contact: "Maria Chua", role: "BSECE-4", avatar: "MC", lastMessage: "I'm a bit nervous for the interview.", unread: 2,
    messages: [
      { id: 1, sender: "them", text: "Dr. Santos, is our mock interview still on for tomorrow?", time: "08:50 AM" },
      { id: 2, sender: "me", text: "Yes! We'll meet at the counseling room at 8 AM.", time: "09:00 AM" },
      { id: 3, sender: "them", text: "I'm a bit nervous for the interview.", time: "09:05 AM" },
    ],
  },
];

const RECRUITER_CONVOS_INIT: Conversation[] = [
  {
    id: 101, contact: "TechCorp PH — HR", role: "Recruiter", avatar: "TC", lastMessage: "Can you endorse students with React experience?", unread: 1,
    messages: [
      { id: 1, sender: "them", text: "Hi Dr. Santos! We're looking to hire fresh grads from MSU-IIT.", time: "09:00 AM" },
      { id: 2, sender: "me", text: "Hello! I'd be happy to help. What skills are you looking for?", time: "09:10 AM" },
      { id: 3, sender: "them", text: "Can you endorse students with React experience?", time: "09:15 AM" },
    ],
  },
  {
    id: 102, contact: "Accenture Davao", role: "Recruiter", avatar: "AC", lastMessage: "We'll send the JD shortly.", unread: 0,
    messages: [
      { id: 1, sender: "them", text: "Good day! We have openings for entry-level developers.", time: "Yesterday" },
      { id: 2, sender: "me", text: "Thank you for reaching out! Please send the job descriptions.", time: "Yesterday" },
      { id: 3, sender: "them", text: "We'll send the JD shortly.", time: "Yesterday" },
    ],
  },
  {
    id: 103, contact: "Globe Telecom Talent", role: "Recruiter", avatar: "GT", lastMessage: "Looking forward to our partnership!", unread: 0,
    messages: [
      { id: 1, sender: "them", text: "Hi! We'd like to post internship vacancies on your portal.", time: "Oct 20" },
      { id: 2, sender: "me", text: "Sure! Please send the vacancy details and requirements.", time: "Oct 20" },
      { id: 3, sender: "them", text: "Looking forward to our partnership!", time: "Oct 20" },
    ],
  },
];

const FEEDBACK_INIT: CVFeedback = { contactInfo: "", education: "", workExperience: "", skills: "", rating: 0 };

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  rescheduled: "bg-blue-100 text-blue-700",
  reviewed: "bg-purple-100 text-purple-700",
};

const tabVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.18 } },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function CounselorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Appointments
  const [appointments, setAppointments] = useState<PendingAppointment[]>(PENDING_APPOINTMENTS_INIT);
  const [remarksMap, setRemarksMap] = useState<Record<number, string>>({});

  // CV Review
  const [cvList] = useState<StudentCV[]>(STUDENT_CVS_INIT);
  const [selectedCV, setSelectedCV] = useState<StudentCV | null>(null);
  const [feedback, setFeedback] = useState<CVFeedback>(FEEDBACK_INIT);
  const [approvedCVs, setApprovedCVs] = useState<number[]>([4]);

  // Availability
  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>(WEEK_SCHEDULE_INIT);
  const [maxPerDay, setMaxPerDay] = useState(6);

  // Messages
  const [msgTab, setMsgTab] = useState<"students" | "recruiters">("students");
  const [studentConvos, setStudentConvos] = useState<Conversation[]>(STUDENT_CONVOS_INIT);
  const [recruiterConvos, setRecruiterConvos] = useState<Conversation[]>(RECRUITER_CONVOS_INIT);
  const [activeStudentConvo, setActiveStudentConvo] = useState<number>(1);
  const [activeRecruiterConvo, setActiveRecruiterConvo] = useState<number>(101);
  const [chatInput, setChatInput] = useState("");

  // Helpers
  const updateStatus = (id: number, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, remarks: remarksMap[id] ?? a.remarks } : a))
    );
  };

  const toggleSlot = (dayIdx: number, slotIdx: number) => {
    setWeekSchedule((prev) => {
      const next = prev.map((d, di) =>
        di === dayIdx
          ? { ...d, slots: d.slots.map((s, si) => (si === slotIdx ? { ...s, enabled: !s.enabled } : s)) }
          : d
      );
      return next;
    });
  };

  const activeConvos = msgTab === "students" ? studentConvos : recruiterConvos;
  const activeConvoId = msgTab === "students" ? activeStudentConvo : activeRecruiterConvo;
  const currentConvo = activeConvos.find((c) => c.id === activeConvoId)!;

  const sendMessage = () => {
    if (!chatInput.trim() || !currentConvo) return;
    const updater = (prev: Conversation[]) =>
      prev.map((c) =>
        c.id === activeConvoId
          ? { ...c, lastMessage: chatInput, messages: [...c.messages, { id: Date.now(), sender: "me" as const, text: chatInput, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }] }
          : c
      );
    if (msgTab === "students") setStudentConvos(updater);
    else setRecruiterConvos(updater);
    setChatInput("");
  };

  const issueApproval = () => {
    if (!selectedCV) return;
    setApprovedCVs((prev) => [...prev, selectedCV.id]);
    setFeedback(FEEDBACK_INIT);
  };

  const navItems = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "availability", label: "Availability", icon: CalendarDays },
    { key: "appointments", label: "Appointments", icon: ClipboardList },
    { key: "cvreview", label: "CV Review", icon: FileText },
    { key: "messages", label: "Messages", icon: MessageSquare },
  ];

  const totalUnread = [...studentConvos, ...recruiterConvos].reduce((s, c) => s + c.unread, 0);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 lg:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: 240, background: "linear-gradient(180deg, #7A0016 0%, #5C0011 100%)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: "#F5A623", color: "#7A0016" }}>
            P
          </div>
          <div>
            <div className="text-white font-bold text-base leading-tight">P.A.C.E.</div>
            <div className="text-white/50 text-xs">Counselor Portal</div>
          </div>
          <button className="ml-auto text-white/60 hover:text-white lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === key ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
              style={activeTab === key ? { background: "rgba(245,166,35,0.18)", color: "#F5A623" } : {}}
            >
              <Icon size={18} />
              {label}
              {key === "appointments" && appointments.filter((a) => a.status === "pending").length > 0 && (
                <span className="ml-auto text-xs rounded-full px-1.5 py-0.5 font-bold" style={{ background: "#F5A623", color: "#7A0016" }}>
                  {appointments.filter((a) => a.status === "pending").length}
                </span>
              )}
              {key === "messages" && totalUnread > 0 && (
                <span className="ml-auto text-xs rounded-full px-1.5 py-0.5 font-bold" style={{ background: "#F5A623", color: "#7A0016" }}>
                  {totalUnread}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#F5A623", color: "#7A0016" }}>
              MS
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">Dr. Maria Santos</div>
              <div className="text-white/40 text-xs truncate">Career Counselor</div>
            </div>
            <button className="text-white/40 hover:text-white/70">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 flex-shrink-0">
          <button className="text-gray-500 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-semibold text-gray-800 capitalize">
              {navItems.find((n) => n.key === activeTab)?.label}
            </h1>
          </div>
          <button className="relative text-gray-400 hover:text-gray-600">
            <Bell size={20} />
            {totalUnread > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[10px] flex items-center justify-center font-bold" style={{ background: "#7A0016", color: "#fff" }}>
                {totalUnread}
              </span>
            )}
          </button>
        </header>

        {/* Tab Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <AnimatePresence mode="wait">

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <motion.div key="overview" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
                {/* Welcome */}
                <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7A0016 0%, #5C0011 100%)" }}>
                  <div className="absolute right-0 top-0 w-40 h-40 rounded-full opacity-10" style={{ background: "#F5A623", transform: "translate(30%, -30%)" }} />
                  <p className="text-sm text-white/70 mb-1">Good morning,</p>
                  <h2 className="text-2xl font-bold mb-1">Dr. Maria Santos 👩‍💼</h2>
                  <p className="text-white/70 text-sm">Career Counselor · MSU-IIT</p>
                  <p className="text-white/50 text-xs mt-1">Tuesday, October 27, 2026</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Today's Appointments", value: 6, icon: CalendarDays, color: "#7A0016" },
                    { label: "Pending CV Reviews", value: 12, icon: FileText, color: "#F5A623" },
                    { label: "Active Students", value: 47, icon: Users, color: "#10b981" },
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                        <Icon size={22} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-800">{value}</p>
                        <p className="text-xs text-gray-500">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Today's Schedule */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800 text-sm">Today's Schedule</h3>
                    <button className="text-xs font-medium flex items-center gap-1" style={{ color: "#7A0016" }} onClick={() => setActiveTab("appointments")}>
                      Manage <ChevronRight size={12} />
                    </button>
                  </div>
                  <ul className="divide-y divide-gray-50">
                    {TODAY_SCHEDULE.map((s, i) => (
                      <li key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50">
                        <div className="w-16 text-xs font-medium" style={{ color: "#7A0016" }}>{s.time}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{s.student}</p>
                          <p className="text-xs text-gray-400">{s.type}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {s.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* ── AVAILABILITY ── */}
            {activeTab === "availability" && (
              <motion.div key="availability" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
                {/* Max per day */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Max Appointments Per Day</p>
                    <p className="text-sm text-gray-400">Set your daily capacity limit</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setMaxPerDay((v) => Math.max(1, v - 1))} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800 text-lg">{maxPerDay}</span>
                    <button onClick={() => setMaxPerDay((v) => Math.min(12, v + 1))} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Weekly grid */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800 text-sm">Weekly Availability (Mon – Fri)</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px]">
                      <thead>
                        <tr style={{ background: "rgba(122,0,22,0.04)" }}>
                          <th className="text-left px-5 py-2 text-xs font-semibold text-gray-500">Time</th>
                          {weekSchedule.map((d) => (
                            <th key={d.day} className="px-3 py-2 text-xs font-semibold text-gray-500 text-center">{d.day.slice(0, 3)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {weekSchedule[0].slots.map((slot, slotIdx) => (
                          <tr key={slotIdx} className="border-t border-gray-50">
                            <td className="px-5 py-2.5 text-xs text-gray-500 font-medium">{slot.time}</td>
                            {weekSchedule.map((day, dayIdx) => {
                              const enabled = day.slots[slotIdx].enabled;
                              return (
                                <td key={dayIdx} className="px-3 py-2.5 text-center">
                                  <button
                                    onClick={() => toggleSlot(dayIdx, slotIdx)}
                                    className={`w-10 h-6 rounded-full transition-colors relative inline-flex items-center ${enabled ? "" : "bg-gray-200"}`}
                                    style={enabled ? { background: "#7A0016" } : {}}
                                    title={`${day.day} ${slot.time}`}
                                  >
                                    <span className={`absolute w-4 h-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-1"}`} />
                                  </button>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{ background: "#7A0016" }} />Available</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block bg-gray-200" />Unavailable</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── APPOINTMENTS ── */}
            {activeTab === "appointments" && (
              <motion.div key="appointments" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-800">
                    Appointment Requests
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-700">
                      {appointments.filter((a) => a.status === "pending").length} pending
                    </span>
                  </h2>
                </div>
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "#7A0016", color: "#FFD700" }}>
                          {apt.studentName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-800 text-sm">{apt.studentName}</span>
                            <span className="text-xs text-gray-400">{apt.program}</span>
                            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[apt.status]}`}>{apt.status}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5">{apt.reason}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                            <Clock size={11} />
                            {apt.requestedDate} · {apt.requestedTime}
                          </div>
                        </div>
                      </div>

                      {/* Remarks */}
                      <div className="mb-3">
                        <textarea
                          rows={2}
                          placeholder="Add remarks (optional)..."
                          value={remarksMap[apt.id] ?? apt.remarks}
                          onChange={(e) => setRemarksMap((prev) => ({ ...prev, [apt.id]: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-red-400 resize-none text-gray-700 bg-gray-50"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => updateStatus(apt.id, "approved")}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                          style={{ background: "#15803d" }}
                          disabled={apt.status === "approved"}
                        >
                          <Check size={13} /> Approve
                        </button>
                        <button
                          onClick={() => updateStatus(apt.id, "rejected")}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-red-600"
                          disabled={apt.status === "rejected"}
                        >
                          <X size={13} /> Reject
                        </button>
                        <button
                          onClick={() => updateStatus(apt.id, "rescheduled")}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                          disabled={apt.status === "rescheduled"}
                        >
                          <RotateCcw size={13} /> Reschedule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── CV REVIEW ── */}
            {activeTab === "cvreview" && (
              <motion.div key="cvreview" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="flex gap-4 h-[calc(100vh-130px)]">
                {/* Left panel */}
                <div className="w-72 flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800 text-sm">Student CVs Awaiting Review</h3>
                    <p className="text-xs text-gray-400">{cvList.filter((c) => c.status === "pending").length} pending</p>
                  </div>
                  <ul className="flex-1 overflow-y-auto divide-y divide-gray-50">
                    {cvList.map((cv) => (
                      <li key={cv.id}>
                        <button
                          onClick={() => { setSelectedCV(cv); setFeedback(FEEDBACK_INIT); }}
                          className={`w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors ${selectedCV?.id === cv.id ? "bg-red-50" : ""}`}
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "#7A0016", color: "#FFD700" }}>
                            {cv.studentName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-gray-800 truncate">{cv.studentName}</span>
                              {approvedCVs.includes(cv.id) && <Award size={12} style={{ color: "#F5A623", flexShrink: 0 }} />}
                            </div>
                            <p className="text-xs text-gray-400">{cv.program}</p>
                            <p className="text-xs text-gray-400">{cv.submittedAt}</p>
                            <span className={`mt-1 inline-block text-[10px] px-1.5 py-0.5 rounded-full font-medium ${STATUS_BADGE[approvedCVs.includes(cv.id) ? "approved" : cv.status]}`}>
                              {approvedCVs.includes(cv.id) ? "approved" : cv.status}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right panel */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                  {!selectedCV ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-3">
                      <FileText size={48} />
                      <p className="text-sm font-medium">Select a student CV to review</p>
                    </div>
                  ) : (
                    <>
                      {/* PDF Preview */}
                      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm">{selectedCV.studentName}</h3>
                          <p className="text-xs text-gray-400">{selectedCV.program} · Submitted {selectedCV.submittedAt}</p>
                        </div>
                        {approvedCVs.includes(selectedCV.id) && (
                          <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(245,166,35,0.15)", color: "#D97706" }}>
                            <Award size={13} /> Badge Issued
                          </span>
                        )}
                      </div>
                      <div className="mx-5 my-4 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center" style={{ height: 180, background: "#fafafa" }}>
                        <div className="text-center text-gray-300">
                          <FileText size={36} className="mx-auto mb-2" />
                          <p className="text-sm font-medium">PDF Preview</p>
                          <p className="text-xs">{selectedCV.studentName}_CV.pdf</p>
                        </div>
                      </div>

                      {/* Feedback form */}
                      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3">
                        <h4 className="font-semibold text-gray-700 text-sm">Structured Feedback</h4>
                        {(["contactInfo", "education", "workExperience", "skills"] as const).map((field) => {
                          const labels: Record<string, string> = { contactInfo: "Contact Info", education: "Education", workExperience: "Work Experience", skills: "Skills" };
                          return (
                            <div key={field}>
                              <label className="text-xs font-medium text-gray-600 mb-1 block">{labels[field]}</label>
                              <textarea
                                rows={2}
                                value={feedback[field]}
                                onChange={(e) => setFeedback((prev) => ({ ...prev, [field]: e.target.value }))}
                                placeholder={`Feedback on ${labels[field].toLowerCase()}...`}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-red-400 resize-none"
                              />
                            </div>
                          );
                        })}

                        {/* Star Rating */}
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1 block">Overall Rating</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button key={star} onClick={() => setFeedback((prev) => ({ ...prev, rating: star }))}>
                                <Star
                                  size={22}
                                  fill={feedback.rating >= star ? "#F5A623" : "none"}
                                  style={{ color: feedback.rating >= star ? "#F5A623" : "#d1d5db" }}
                                />
                              </button>
                            ))}
                            <span className="ml-2 text-xs text-gray-400 self-center">{feedback.rating > 0 ? `${feedback.rating}/5` : "Not rated"}</span>
                          </div>
                        </div>

                        {/* Issue Badge */}
                        <button
                          onClick={issueApproval}
                          disabled={approvedCVs.includes(selectedCV.id)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                          style={
                            approvedCVs.includes(selectedCV.id)
                              ? { background: "#d1d5db", color: "#6b7280", cursor: "not-allowed" }
                              : { background: "#F5A623", color: "#7A0016" }
                          }
                        >
                          <Award size={16} />
                          {approvedCVs.includes(selectedCV.id) ? "Approval Badge Issued" : "Issue Approval Badge"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── MESSAGES ── */}
            {activeTab === "messages" && (
              <motion.div key="messages" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="h-[calc(100vh-130px)] flex flex-col gap-4">
                {/* Tabs */}
                <div className="flex gap-2">
                  {(["students", "recruiters"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setMsgTab(t)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${msgTab === t ? "text-white" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"}`}
                      style={msgTab === t ? { background: "#7A0016" } : {}}
                    >
                      {t === "students" ? "Student Chats" : "Recruiter Chats"}
                      {t === "students" && studentConvos.some((c) => c.unread > 0) && (
                        <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#F5A623", color: "#7A0016" }}>
                          {studentConvos.reduce((s, c) => s + c.unread, 0)}
                        </span>
                      )}
                      {t === "recruiters" && recruiterConvos.some((c) => c.unread > 0) && (
                        <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#F5A623", color: "#7A0016" }}>
                          {recruiterConvos.reduce((s, c) => s + c.unread, 0)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 flex-1 overflow-hidden">
                  {/* Conversation list */}
                  <div className="w-64 flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                    <ul className="flex-1 overflow-y-auto divide-y divide-gray-50">
                      {activeConvos.map((c) => (
                        <li key={c.id}>
                          <button
                            onClick={() => {
                              if (msgTab === "students") setActiveStudentConvo(c.id);
                              else setActiveRecruiterConvo(c.id);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${activeConvoId === c.id ? "bg-red-50" : ""}`}
                          >
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "#7A0016", color: "#FFD700" }}>
                              {c.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-800 truncate">{c.contact}</span>
                                {c.unread > 0 && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: "#7A0016", color: "#fff" }}>
                                    {c.unread}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400 truncate mt-0.5">{c.lastMessage}</p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chat window */}
                  <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                    {currentConvo && (
                      <>
                        <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#7A0016", color: "#FFD700" }}>
                            {currentConvo.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{currentConvo.contact}</p>
                            <p className="text-xs text-gray-400">{currentConvo.role}</p>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                          {currentConvo.messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                              <div
                                className="max-w-[70%] px-3.5 py-2.5 rounded-2xl text-sm"
                                style={
                                  msg.sender === "me"
                                    ? { background: "#7A0016", color: "#fff", borderBottomRightRadius: 4 }
                                    : { background: "#f3f4f6", color: "#1f2937", borderBottomLeftRadius: 4 }
                                }
                              >
                                <p>{msg.text}</p>
                                <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-white/60" : "text-gray-400"}`}>{msg.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-2">
                          <input
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-200"
                          />
                          <button onClick={sendMessage} className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: "#7A0016" }}>
                            <Send size={15} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
