"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, BriefcaseBusiness,
  CalendarDays, Check, CheckCircle2, ChevronDown, ChevronRight,
  CircleHelp, Clock3, FileText, Filter, GraduationCap, Handshake,
  LayoutDashboard, MessageCircle, MoreHorizontal, Plus, Search,
  Send, ShieldCheck, Sparkles, Star, TrendingUp, UserRound,
  Users, WalletCards, X
} from "lucide-react";

type Role = "student" | "counselor" | "recruiter" | "superadmin" | "alumni";
type Notice = { id: number; text: string };

const roleConfig: Record<Role, { label: string; subtitle: string; initials: string; accent: string }> = {
  student: { label: "Student", subtitle: "Your career journey, in one place", initials: "AR", accent: "from-[#7B1E2B] to-[#B94B50]" },
  counselor: { label: "Counselor", subtitle: "Student support and career guidance", initials: "MS", accent: "from-[#145B50] to-[#268675]" },
  recruiter: { label: "Recruiter", subtitle: "Partner talent and hiring workspace", initials: "JT", accent: "from-[#344A86] to-[#647BC0]" },
  superadmin: { label: "SuperAdmin", subtitle: "Career Center oversight and impact", initials: "CO", accent: "from-[#8A5B16] to-[#C38C32]" },
  alumni: { label: "Alumni", subtitle: "Stay connected. Keep moving forward.", initials: "AR", accent: "from-[#5A4388] to-[#9272C7]" },
};

const modules: Record<Role, { id: string; label: string; icon: typeof LayoutDashboard }[]> = {
  student: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "appointments", label: "Appointments", icon: CalendarDays },
    { id: "resume", label: "Resume Studio & Feedback", icon: FileText },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "jobs", label: "Job Portal", icon: BriefcaseBusiness },
    { id: "progress", label: "Career Development", icon: TrendingUp },
    { id: "profile", label: "Career Profile", icon: UserRound },
  ],
  counselor: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "students", label: "My Students", icon: Users },
    { id: "appointments", label: "Appointments & Availability", icon: CalendarDays },
    { id: "reviews", label: "Resume Reviews", icon: FileText },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "endorsements", label: "Endorsements", icon: ShieldCheck },
    { id: "graduates", label: "Graduate Tracking", icon: GraduationCap },
  ],
  recruiter: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "jobs", label: "Job Management", icon: BriefcaseBusiness },
    { id: "applicants", label: "Applicants", icon: Users },
    { id: "pipeline", label: "Recruitment Pipeline", icon: Activity },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "company", label: "Company Profile", icon: WalletCards },
  ],
  superadmin: [
    { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
    { id: "accounts", label: "Account Approvals", icon: Users },
    { id: "analytics", label: "Institutional Analytics", icon: TrendingUp },
    { id: "partners", label: "Partner Companies", icon: BriefcaseBusiness },
    { id: "audit", label: "Audit Log", icon: ShieldCheck },
  ],
  alumni: [
    { id: "overview", label: "Alumni Overview", icon: LayoutDashboard },
    { id: "employment", label: "Employment Profile", icon: BriefcaseBusiness },
    { id: "journey", label: "Career Journey", icon: TrendingUp },
    { id: "followups", label: "Graduate Follow-ups", icon: CalendarDays },
    { id: "mentorship", label: "Mentorship", icon: Handshake },
    { id: "resources", label: "Career Resources", icon: FileText },
  ],
};

const metrics: Record<Role, { label: string; value: string; change: string; icon: typeof Activity }[]> = {
  student: [
    { label: "Career readiness", value: "78%", change: "+12% this month", icon: TrendingUp },
    { label: "Appointments", value: "3", change: "1 upcoming", icon: CalendarDays },
    { label: "Resume reviews", value: "2", change: "1 new comment", icon: FileText },
    { label: "Applications", value: "6", change: "2 in review", icon: BriefcaseBusiness },
  ],
  counselor: [
    { label: "Connected students", value: "48", change: "+6 this month", icon: Users },
    { label: "Pending requests", value: "8", change: "3 need attention", icon: CalendarDays },
    { label: "Resume reviews", value: "12", change: "4 awaiting review", icon: FileText },
    { label: "Follow-ups due", value: "5", change: "Next 7 days", icon: Clock3 },
  ],
  recruiter: [
    { label: "Active job posts", value: "4", change: "2 closing soon", icon: BriefcaseBusiness },
    { label: "Total applicants", value: "86", change: "+18 this week", icon: Users },
    { label: "Interviews", value: "9", change: "3 this week", icon: CalendarDays },
    { label: "Offers extended", value: "3", change: "1 awaiting response", icon: CheckCircle2 },
  ],
  superadmin: [
    { label: "Students supported", value: "1,284", change: "+14.8% this term", icon: Users },
    { label: "Counseling sessions", value: "642", change: "+9.2% this term", icon: CalendarDays },
    { label: "Employment outcomes", value: "218", change: "Verified + self-reported", icon: BriefcaseBusiness },
    { label: "Partner companies", value: "32", change: "4 pending review", icon: WalletCards },
  ],
  alumni: [
    { label: "Alumni profile", value: "92%", change: "Almost complete", icon: UserRound },
    { label: "Career updates", value: "4", change: "Last updated recently", icon: Activity },
    { label: "Follow-ups", value: "1", change: "Next check-in upcoming", icon: CalendarDays },
    { label: "Mentorship", value: "Opted in", change: "Profile visible to eligible students", icon: Handshake },
  ],
};

const sectionCopy: Record<string, { title: string; description: string }> = {
  overview: { title: "Good morning, Alexandra", description: "Here is what is happening across your PACE workspace today." },
  appointments: { title: "Appointments", description: "Manage requests, schedules, and upcoming conversations." },
  resume: { title: "Resume Studio", description: "Build, organize, and improve your professional story." },
  messages: { title: "Messages", description: "Keep conversations connected to the right career journey." },
  jobs: { title: "Career opportunities", description: "Explore opportunities from approved MSU-IIT partner companies." },
  progress: { title: "Your career development", description: "A clear view of the milestones that move you forward." },
  profile: { title: "Career profile", description: "Keep your career information accurate and ready to share." },
  students: { title: "My connected students", description: "Support the students who have established a counseling relationship with you." },
  reviews: { title: "Resume review queue", description: "Give students clear, actionable feedback on their resume versions." },
  endorsements: { title: "Student endorsements", description: "Recommend students for opportunities with appropriate sharing permissions." },
  graduates: { title: "Graduate tracking", description: "Monitor alumni outcomes using information shared with the Career Center." },
  applicants: { title: "Applicants", description: "Review candidates who applied or were appropriately endorsed." },
  pipeline: { title: "Recruitment pipeline", description: "Move candidates through a transparent recruitment process." },
  company: { title: "Company profile", description: "Show students who your organization is and what it offers." },
  accounts: { title: "Account approvals", description: "Review counselor and invited partner recruiter access." },
  analytics: { title: "Institutional analytics", description: "Understand Career Center reach, service utilization, and graduate outcomes." },
  partners: { title: "Partner companies", description: "Oversee approved employer relationships and recruitment activity." },
  audit: { title: "Administrative audit log", description: "Review important account and administrative actions." },
  employment: { title: "Employment profile", description: "Keep your current professional information up to date." },
  journey: { title: "Career journey", description: "Your milestones from graduation to professional growth." },
  followups: { title: "Graduate follow-ups", description: "Respond to Career Center check-ins and update your outcomes." },
  mentorship: { title: "Alumni mentorship", description: "Choose how you want to stay involved with the next generation." },
  resources: { title: "Career resources", description: "Continue learning with resources from the Career Center." },
};

function PreviewBadge() {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-amber-800"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Preview data</span>;
}

function MetricCard({ item, index }: { item: (typeof metrics.student)[number]; index: number }) {
  const Icon = item.icon;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .05 }} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_18px_rgba(15,23,42,.035)]">
      <div className="flex items-start justify-between"><span className="text-xs font-medium text-slate-500">{item.label}</span><span className="rounded-xl bg-slate-50 p-2 text-[#7B1E2B]"><Icon size={17} /></span></div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{item.value}</div>
      <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500"><ArrowUpRight size={12} className="text-emerald-600" />{item.change}</div>
    </motion.div>
  );
}

function Overview({ role, onNavigate }: { role: Role; onNavigate: (id: string) => void }) {
  const cards = metrics[role];
  const tasks: Record<Role, string[]> = {
    student: ["Review counselor feedback on Resume v2", "Confirm Thursday's career consultation", "Complete your career interests profile"],
    counselor: ["Review 4 newly submitted resumes", "Respond to 3 appointment requests", "Follow up with 5 connected students"],
    recruiter: ["Review 12 new applications", "Confirm 3 interview schedules", "Update the status of 2 shortlisted candidates"],
    superadmin: ["Review 4 recruiter account requests", "Check graduate outcome reporting coverage", "Review this month's Career Center activity"],
    alumni: ["Update your current employment details", "Respond to your 6-month graduate follow-up", "Review your mentorship availability"],
  };
  const quick: Record<Role, { label: string; target: string; icon: typeof CalendarDays }[]> = {
    student: [{ label: "Book an appointment", target: "appointments", icon: CalendarDays }, { label: "Improve my resume", target: "resume", icon: FileText }, { label: "Explore jobs", target: "jobs", icon: BriefcaseBusiness }],
    counselor: [{ label: "Review resumes", target: "reviews", icon: FileText }, { label: "View students", target: "students", icon: Users }, { label: "Manage schedule", target: "appointments", icon: CalendarDays }],
    recruiter: [{ label: "Post a job", target: "jobs", icon: Plus }, { label: "Review applicants", target: "applicants", icon: Users }, { label: "View pipeline", target: "pipeline", icon: Activity }],
    superadmin: [{ label: "Review accounts", target: "accounts", icon: Users }, { label: "View analytics", target: "analytics", icon: TrendingUp }, { label: "Check audit log", target: "audit", icon: ShieldCheck }],
    alumni: [{ label: "Update employment", target: "employment", icon: BriefcaseBusiness }, { label: "View follow-ups", target: "followups", icon: CalendarDays }, { label: "Mentor settings", target: "mentorship", icon: Handshake }],
  };
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{cards.map((item, i) => <MetricCard key={item.label} item={item} index={i} />)}</div>
      <div className="grid gap-5 xl:grid-cols-[1.35fr_.85fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between"><div><h3 className="font-semibold text-slate-900">Your next steps</h3><p className="mt-1 text-xs text-slate-500">A focused list of actions for this workspace.</p></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">3 items</span></div>
          <div className="mt-4 space-y-3">{tasks[role].map((task, i) => <div key={task} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-500">{i + 1}</span><span className="flex-1 text-sm text-slate-700">{task}</span><ChevronRight size={16} className="text-slate-400" /></div>)}</div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">Quick actions</h3><p className="mt-1 text-xs text-slate-500">Jump directly into a common task.</p>
          <div className="mt-4 space-y-2">{quick[role].map((item) => { const Icon = item.icon; return <button key={item.label} onClick={() => onNavigate(item.target)} className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left text-sm font-medium text-slate-700 transition hover:border-[#D8B4A8] hover:bg-[#FFF9F6]"><span className="rounded-lg bg-[#F8ECE9] p-2 text-[#7B1E2B]"><Icon size={16} /></span>{item.label}<ChevronRight size={15} className="ml-auto text-slate-400" /></button>; })}</div>
        </section>
      </div>
    </div>
  );
}

function ModuleContent({ role, active, notify }: { role: Role; active: string; notify: (text: string) => void }) {
  const [search, setSearch] = useState("");
  const [mentorChoice, setMentorChoice] = useState<"opt-in" | "later" | "declined">("later");
  const [checked, setChecked] = useState<string[]>([]);
  const [filter, setFilter] = useState("All");
  const rows: Record<string, string[]> = {
    appointments: ["Career consultation · Dr. Maria Santos · Thu, 10:00 AM", "Resume discussion · Dr. Maria Santos · Mon, 2:00 PM", "Career planning · Prof. Roberto Gomez · Completed"],
    students: ["Alexandra Reyes · BS Computer Science · Active case", "Daniel Cruz · BS Information Systems · Follow-up due", "Mika Tan · BS Computer Science · Resume improvement"],
    reviews: ["Alexandra Reyes · Resume v2 · Submitted today", "Daniel Cruz · Resume v1 · 2 days ago", "Mika Tan · Resume v3 · Awaiting feedback"],
    applicants: ["Alexandra Reyes · Associate Cloud Engineer · Applied today", "Daniel Cruz · Junior Data Analyst · Under review", "Mika Tan · UX Design Intern · Shortlisted"],
    jobs: ["Associate Cloud Engineer · Northstar Digital · Full-time", "Junior Data Analyst · Meridian Labs · Hybrid", "UX Design Intern · Studio Form · Internship"],
    graduates: ["Class of 2026 · Employment update due", "BS Computer Science · 82% response rate", "Graduate follow-up · 6 responses pending"],
    accounts: ["Mabuhay Tech · Recruiter invitation · Pending", "Career Counselor · Counselor invitation · Pending", "Northstar Digital · Recruiter access · Approved"],
    partners: ["Northstar Digital · Information Technology · Approved", "Meridian Labs · Analytics · Approved", "Mabuhay Tech · Software Services · Pending"],
    followups: ["6-month career check-in · Due this week", "Employment status confirmation · Due next week", "Career progression update · Completed"],
    messages: ["Dr. Maria Santos · Your resume feedback is ready", "Northstar Digital HR · Interview availability", "Career Center · Upcoming career workshop"],
    endorsements: ["Junior Data Analyst · Meridian Labs · Student approval needed", "Cloud Support Associate · Northstar Digital · Shared with recruiter", "Graduate Trainee · Mabuhay Tech · Draft"],
    pipeline: ["Applied · 18 candidates", "Under review · 12 candidates", "Interview · 6 candidates", "Offer · 2 candidates"],
    audit: ["Recruiter invitation created · Career Center Admin · 10:42 AM", "Counselor account approved · Career Center Admin · Yesterday", "Partner profile reviewed · Career Center Admin · Yesterday"],
  };
  const currentRows = rows[active] || ["Profile information · Sample record", "Career interests · Sample record", "Recent activity · Sample record"];
  const filtered = currentRows.filter((row) => row.toLowerCase().includes(search.toLowerCase()));
  const titles: Record<string, string> = {
    appointments: "Upcoming and recent appointments", students: "Connected student caseload", reviews: "Pending resume reviews", applicants: "Recent candidate activity", jobs: "Partner opportunities", graduates: "Graduate outcomes follow-up", accounts: "Account review queue", partners: "Approved partner directory", followups: "Your follow-up schedule", messages: "Recent conversations", endorsements: "Endorsement activity", pipeline: "Candidate stage overview", audit: "Recent administrative actions",
  };
  const isTableModule = Boolean(rows[active]);
  return (
    <div className="space-y-5">
      {active === "mentorship" && role === "alumni" ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3"><span className="rounded-xl bg-violet-50 p-3 text-violet-700"><Handshake size={22} /></span><div><h3 className="font-semibold text-slate-900">Your mentorship preference</h3><p className="text-xs text-slate-500">Your Alumni access remains active whichever option you choose.</p></div></div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[{id:"opt-in" as const,title:"Become a mentor",desc:"Share your experience and guide current students."},{id:"later" as const,title:"Maybe later",desc:"Keep Alumni access and decide another time."},{id:"declined" as const,title:"Decline mentorship",desc:"Do not participate, while retaining Alumni access."}].map((option) => <button key={option.id} onClick={() => { setMentorChoice(option.id); notify("Preview preference updated. No account or server record was changed."); }} className={`rounded-xl border p-4 text-left transition ${mentorChoice === option.id ? "border-violet-400 bg-violet-50 ring-2 ring-violet-100" : "border-slate-200 hover:border-violet-200"}`}><span className="text-sm font-semibold text-slate-900">{option.title}</span><p className="mt-2 text-xs leading-5 text-slate-500">{option.desc}</p>{mentorChoice === option.id && <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-700"><Check size={13} /> Selected</span>}</button>)}
          </div>
          <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900"><CheckCircle2 size={16} className="mr-2 inline" />Alumni account access stays active. Mentorship and graduate follow-up preferences are separate.</div>
        </section>
      ) : active === "resume" ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold text-slate-900">Resume Studio</h3><p className="mt-1 text-xs text-slate-500">Create a draft, organize versions, and submit for counselor review.</p></div><button onClick={() => notify("A new resume draft was added to this local preview.")} className="inline-flex items-center gap-2 rounded-xl bg-[#7B1E2B] px-3 py-2 text-xs font-semibold text-white"><Plus size={14}/> New resume</button></div><div className="mt-5 grid gap-3 md:grid-cols-2"><div className="rounded-xl border border-slate-200 p-4"><div className="flex items-center gap-2 text-sm font-semibold"><FileText size={17} className="text-[#7B1E2B]"/> Resume v2.1</div><p className="mt-2 text-xs text-slate-500">Updated 2 days ago · Current version</p><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 w-[82%] rounded-full bg-emerald-500"/></div><p className="mt-2 text-xs text-slate-500">Profile completeness · 82%</p><button onClick={() => notify("Resume preview opened in this demo experience.")} className="mt-4 text-xs font-semibold text-[#7B1E2B]">Preview resume <ChevronRight size={13} className="inline"/></button></div><div className="rounded-xl border border-dashed border-slate-300 p-4"><Sparkles size={19} className="text-amber-600"/><h4 className="mt-2 text-sm font-semibold">AI Resume Assistant</h4><p className="mt-1 text-xs leading-5 text-slate-500">Use guided prompts to draft achievement-focused content. Review every suggestion before sharing.</p><button onClick={() => notify("AI generation is a preview placeholder; no external AI service was called.")} className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold">Try guided draft</button></div></div><div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">Demo only: uploads, AI generation, and counselor submissions are not connected to backend services.</div></section>
      ) : active === "appointments" ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-semibold text-slate-900">{role === "counselor" ? "Appointment requests and availability" : "Your appointment schedule"}</h3><p className="mt-1 text-xs text-slate-500">Choose an available service and keep every appointment in one place.</p></div><button onClick={() => notify("Appointment request simulated. It was not sent to a counselor.")} className="rounded-xl bg-[#7B1E2B] px-3 py-2 text-xs font-semibold text-white"><Plus size={13} className="mr-1 inline"/> {role === "counselor" ? "Add availability" : "Request appointment"}</button></div><div className="mt-5 grid gap-3 md:grid-cols-3">{["Career Talk","Resume Consultation","Interview Preparation"].map((kind,i)=><div key={kind} className="rounded-xl border border-slate-200 p-4"><div className="text-sm font-semibold text-slate-900">{kind}</div><p className="mt-2 text-xs text-slate-500">{["30 minutes · Online or onsite","45 minutes · Resume review","30 minutes · Practice session"][i]}</p><div className="mt-4 flex items-center gap-1 text-xs text-emerald-700"><CheckCircle2 size={13}/> {i===1?"Available Friday":"Available this week"}</div></div>)}</div><div className="mt-5 space-y-2">{["Thu, Nov 19 · 10:00 AM · Career consultation · Confirmed","Fri, Nov 20 · 1:30 PM · Resume discussion · Pending","Mon, Nov 23 · 2:00 PM · Career planning · Completed"].map((x)=><div key={x} className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700">{x}</div>)}</div></section>
      ) : active === "messages" ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6"><div className="grid gap-4 md:grid-cols-[.75fr_1.25fr]"><div className="space-y-2">{["Dr. Maria Santos","Career Center","Northstar Digital HR"].map((name,i)=><button key={name} className={`w-full rounded-xl p-3 text-left ${i===0?"bg-[#F8ECE9]":"bg-slate-50"}`}><div className="text-sm font-semibold text-slate-800">{name}</div><p className="mt-1 text-xs text-slate-500">{["Your resume feedback is ready","Workshop registration confirmed","Interview availability request"][i]}</p></button>)}</div><div className="flex min-h-[260px] flex-col rounded-xl border border-slate-200 p-4"><div className="border-b border-slate-100 pb-3 text-sm font-semibold text-slate-900">Dr. Maria Santos <span className="ml-2 text-[10px] font-normal text-emerald-700">Connected counselor</span></div><div className="flex-1 space-y-3 py-4 text-xs"><div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 p-3 text-slate-700">I've reviewed your latest resume. The project descriptions are stronger now. Let's refine the impact statements next.</div><div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#7B1E2B] p-3 text-white">Thank you! I'll work on those before our next session.</div></div><div className="flex gap-2"><input aria-label="Preview message" placeholder="Write a message..." className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#7B1E2B]"/><button onClick={() => notify("Message sending is simulated in preview mode.")} className="rounded-xl bg-[#7B1E2B] p-2.5 text-white"><Send size={15}/></button></div></div></div><p className="mt-4 text-[11px] text-amber-800">Messages are fictional preview content. Student-to-student messaging is not available.</p></section>
      ) : active === "progress" || active === "journey" ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="font-semibold text-slate-900">Career development milestones</h3><div className="mt-5 space-y-4">{["Career profile completed","Resume reviewed by counselor","Career consultation completed","Interview preparation","Employment opportunity"].map((item,i)=><div key={item} className="flex gap-3"><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${i<3?"bg-emerald-100 text-emerald-700":"bg-slate-100 text-slate-400"}`}>{i<3?<Check size={15}/>:i+1}</div><div className="flex-1 border-b border-slate-100 pb-3"><div className="text-sm font-semibold text-slate-800">{item}</div><p className="mt-1 text-xs text-slate-500">{i<3?"Completed · Sample milestone":"Upcoming · Suggested next step"}</p></div></div>)}</div></section>
      ) : active === "employment" ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="font-semibold text-slate-900">Professional information</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{[["Employment status","Employed"],["Current employer","Northstar Digital"],["Position","Associate Software Engineer"],["Industry","Information Technology"],["Employment start","August 2026"],["General location","Iligan City (self-reported)"]].map(([k,v])=><div key={k} className="rounded-xl bg-slate-50 p-3"><p className="text-[11px] text-slate-500">{k}</p><p className="mt-1 text-sm font-semibold text-slate-800">{v}</p></div>)}</div><button onClick={() => notify("Employment profile edit opened in this local preview.")} className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold">Edit employment information</button><p className="mt-3 text-[11px] text-slate-500">Information is self-reported in this fictional preview. General location is optional; no GPS tracking.</p></section>
      ) : active === "analytics" ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><div><h3 className="font-semibold text-slate-900">Career Center impact</h3><p className="mt-1 text-xs text-slate-500">Illustrative values, not institutional reporting.</p></div><PreviewBadge/></div><div className="mt-6 grid gap-5 md:grid-cols-2">{[["Students supported",[42,56,63,72,86,94]],["Graduate follow-up response",[35,48,52,61,73,82]]].map(([label,values])=><div key={String(label)}><p className="mb-3 text-xs font-semibold text-slate-600">{label}</p><div className="flex h-36 items-end gap-2">{(values as number[]).map((v,i)=><div key={i} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-md bg-gradient-to-t from-[#7B1E2B] to-[#C98C75]" style={{height:`${v}%`}}/><span className="text-[10px] text-slate-400">M{i+1}</span></div>)}</div></div>)}</div></section>
      ) : active === "mentorship" ? null : (
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-semibold text-slate-900">{titles[active] || "Workspace records"}</h3><p className="mt-1 text-xs text-slate-500">Fictional records for interaction and layout review.</p></div><div className="flex gap-2"><div className="relative"><Search size={14} className="absolute left-3 top-2.5 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search records" className="w-44 rounded-xl border border-slate-200 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#7B1E2B]"/></div><button onClick={()=>notify("Filter panel opened in preview mode.")} className="rounded-xl border border-slate-200 p-2 text-slate-500"><Filter size={15}/></button></div></div>
          <div className="mt-4 space-y-2">{filtered.map((row,i)=><div key={row} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 p-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-xs font-semibold text-slate-500">{i+1}</span><span className="min-w-0 flex-1 text-xs font-medium text-slate-700">{row}</span><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">Sample</span><button onClick={()=>notify("Record details opened in preview mode.")} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={16}/></button></div>)}</div>
          {filtered.length===0 && <div className="py-10 text-center text-sm text-slate-500">No sample records match your search.</div>}
          <div className="mt-4 rounded-xl bg-amber-50 p-3 text-[11px] text-amber-900">All actions in this workspace are simulated. No backend request or database change is made.</div>
        </section>
      )}
    </div>
  );
}

export default function PreviewWorkspace() {
  const [role, setRole] = useState<Role>("student");
  const [active, setActive] = useState("overview");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const config = roleConfig[role];
  const activeModule = modules[role].find((m) => m.id === active) || modules[role][0];
  const copy = sectionCopy[active] || sectionCopy.overview;
  const notify = (text: string) => {
    const id = Date.now();
    setNotices((old) => [...old, { id, text }]);
    window.setTimeout(() => setNotices((old) => old.filter((n) => n.id !== id)), 3600);
  };
  const switchRole = (next: Role) => {
    setRole(next);
    setActive("overview");
    setShowRoleMenu(false);
  };
  const today = "Career Center workspace";
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-slate-900">
      <div className="sticky top-0 z-40 border-b border-amber-200 bg-[#FFF8E8] px-4 py-2.5 text-center text-[11px] font-medium text-amber-950 sm:text-xs">
        <Sparkles size={13} className="mr-1.5 inline-block" /> DEVELOPMENT PREVIEW · Fictional data and simulated actions only · No real accounts or backend records are changed
      </div>
      <div className="mx-auto flex min-h-[calc(100vh-38px)] max-w-[1600px]">
        <aside className="hidden w-[250px] shrink-0 flex-col border-r border-slate-200 bg-white p-5 lg:flex">
          <div className="flex items-center gap-3 px-1"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B1E2B] text-sm font-black text-white">P</div><div><div className="text-lg font-black tracking-tight text-[#651925]">PACE</div><div className="text-[9px] font-semibold uppercase tracking-[.16em] text-slate-400">MSU-IIT Career Center</div></div></div>
          <div className="mt-8"><p className="px-2 text-[9px] font-bold uppercase tracking-[.18em] text-slate-400">Workspace</p><div className="mt-3 space-y-1">{modules[role].map((item)=>{const Icon=item.icon;return <button key={item.id} onClick={()=>setActive(item.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition ${active===item.id?"bg-[#F8ECE9] text-[#7B1E2B]":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}><Icon size={16}/>{item.label}{active===item.id&&<ChevronRight size={13} className="ml-auto"/>}</button>})}</div></div>
          <div className="mt-auto rounded-2xl bg-gradient-to-br from-[#651925] to-[#9D3E48] p-4 text-white"><Sparkles size={18}/><p className="mt-3 text-xs font-semibold">Career growth, connected.</p><p className="mt-1 text-[10px] leading-4 text-white/70">A shared journey from guidance to opportunity and beyond.</p></div>
        </aside>
        <main className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-7">
            <div className="flex items-center gap-3 lg:hidden"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7B1E2B] font-black text-white">P</div><span className="font-black tracking-tight text-[#651925]">PACE</span></div>
            <div className="hidden text-xs text-slate-400 sm:block">MSU-IIT <span className="mx-1 text-slate-300">/</span> Career Center <span className="mx-1 text-slate-300">/</span> {config.label}</div>
            <div className="ml-auto flex items-center gap-2"><button onClick={()=>notify("You are viewing sample notifications.")} className="relative rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"><Bell size={17}/><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500"/></button><div className="relative"><button onClick={()=>setShowRoleMenu(!showRoleMenu)} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-left hover:bg-slate-50"><span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${config.accent} text-[10px] font-bold text-white`}>{config.initials}</span><span className="hidden sm:block"><span className="block text-xs font-semibold text-slate-800">{config.label} Preview</span><span className="block text-[10px] text-slate-400">Switch workspace</span></span><ChevronDown size={14} className="text-slate-400"/></button>{showRoleMenu&&<div className="absolute right-0 top-14 z-50 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">{(Object.keys(roleConfig) as Role[]).map((key)=><button key={key} onClick={()=>switchRole(key)} className={`w-full rounded-lg px-3 py-2 text-left text-xs ${role===key?"bg-[#F8ECE9] font-semibold text-[#7B1E2B]":"text-slate-600 hover:bg-slate-50"}`}>{roleConfig[key].label}</button>)}</div>}</div></div>
          </header>
          <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden"><div className="flex gap-2 overflow-x-auto pb-1">{modules[role].map((item)=>{const Icon=item.icon;return <button key={item.id} onClick={()=>setActive(item.id)} className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-[11px] font-medium ${active===item.id?"bg-[#7B1E2B] text-white":"bg-slate-100 text-slate-600"}`}><Icon size={13}/>{item.label}</button>})}</div></div>
          <div className="p-4 sm:p-7">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><div className="mb-2 flex items-center gap-2"><PreviewBadge/><span className="text-[10px] text-slate-400">{today}</span></div><motion.h1 key={active} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[28px]">{active==="overview"?"Welcome back, Alexandra":copy.title}</motion.h1><p className="mt-1.5 text-sm text-slate-500">{active==="overview"?config.subtitle:copy.description}</p></div><div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 md:flex"><CircleHelp size={14}/> Help & guidance</div></div>
            {active==="overview"?<Overview role={role} onNavigate={setActive}/>:<ModuleContent role={role} active={active} notify={notify}/>}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4 text-[10px] text-slate-400"><span>PACE · Professional Advancement and Career Enhancement</span><span>Preview workspace · Not connected to live university data</span></div>
          </div>
        </main>
      </div>
      <div className="fixed bottom-4 right-4 z-[60] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">{notices.map((notice)=><motion.div key={notice.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 shadow-xl"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600"/><span className="flex-1">{notice.text}</span><button onClick={()=>setNotices(old=>old.filter(n=>n.id!==notice.id))} aria-label="Dismiss notification"><X size={13}/></button></motion.div>)}</div>
    </div>
  );
}
