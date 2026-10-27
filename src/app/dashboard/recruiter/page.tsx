'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Briefcase, MessageSquare, Building2, Search, Filter,
  Star, ExternalLink, Download, CheckCircle, Clock, ChevronRight,
  Plus, Edit, Eye, Trash2, Send, FileText, Check, X, Bookmark,
  Share2, MapPin, DollarSign, Calendar
} from 'lucide-react';
import DashboardLayout, { NavItem } from '@/components/DashboardLayout';

const navItems: NavItem[] = [
  { id: 'jobs', label: 'Job Portal & Feed', icon: <Briefcase size={18} /> },
  { id: 'talent', label: 'Talent Discovery', icon: <Users size={18} /> },
  { id: 'messages', label: 'Candidate Messages', icon: <MessageSquare size={18} /> },
  { id: 'company', label: 'Company Profile', icon: <Building2 size={18} /> },
];

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState('jobs');
  
  // LinkedIn Style Job Feed State
  const [selectedJobId, setSelectedJobId] = useState('job-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('All');
  const [savedJobs, setSavedJobs] = useState<string[]>(['job-1']);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const jobsList = [
    {
      id: 'job-1',
      title: 'Associate Cloud Solutions Architect',
      company: 'TechCorp Philippines',
      location: 'Iligan City / Remote Hybrid',
      type: 'Full-Time',
      posted: '2 hours ago',
      applicants: 18,
      salary: '₱45,000 - ₱65,000 / mo',
      targetColleges: ['College of Computer Studies', 'COET'],
      tags: ['Next.js', 'AWS', 'TypeScript', 'Docker'],
      description: 'TechCorp Philippines is actively looking for high-achieving MSU-IIT graduates (BSIT, BSCS, BSECE) with proven project experience in cloud architecture and modern web systems. Successful applicants will join our distributed enterprise cloud engineering pod.',
      requirements: [
        'Graduating student or alumnus of MSU-IIT (BSIT / BSCS / BSECE / BSCoE)',
        'Demonstrated competence in React, Next.js, and TypeScript',
        'Familiarity with AWS, Docker, or Kubernetes clusters',
        'Cumulative GPA of 1.75 or higher (Dean’s Lister preferred)',
      ],
      benefits: [
        'Hybrid setup with equipment stipend',
        'Comprehensive health insurance (HMO) on Day 1',
        'Annual tech certification sponsorship (AWS / GCP)',
      ],
    },
    {
      id: 'job-2',
      title: 'AI & Data Science Research Intern',
      company: 'Ayala Digital Labs',
      location: 'Cebu City / Hybrid',
      type: 'Internship (Paid)',
      posted: '1 day ago',
      applicants: 34,
      salary: '₱18,000 - ₱24,000 allowance',
      targetColleges: ['College of Computer Studies', 'CSM'],
      tags: ['Python', 'PyTorch', 'Data Analysis', 'FastAPI'],
      description: 'Join Ayala Digital Labs in advancing machine learning models for customer intelligence. Open to 3rd and 4th-year students completing undergraduate practicum requirements.',
      requirements: [
        'Solid background in Python, NumPy, Pandas, and PyTorch',
        'Strong academic grounding in statistics and discrete mathematics',
        'Active capstone project or GitHub portfolio demonstration',
      ],
      benefits: [
        'Mentorship under principal data scientists',
        'Direct fast-track to full-time employment upon graduation',
      ],
    },
    {
      id: 'job-3',
      title: 'Embedded Systems & Hardware Engineer',
      company: 'Mindanao Silicon Ventures',
      location: 'Iligan Tech Park (On-site)',
      type: 'Full-Time',
      posted: '3 days ago',
      applicants: 12,
      salary: '₱40,000 - ₱55,000 / mo',
      targetColleges: ['College of Engineering & Tech'],
      tags: ['C/C++', 'FPGA', 'Microcontrollers', 'PCB Design'],
      description: 'Collaborate with FabLab Mindanao and our engineering team developing industrial IoT sensor arrays and edge computing modules.',
      requirements: [
        'Degree in BSECE, BSEp, or BSME from MSU-IIT',
        'Hands-on experience with microcontroller architecture (ARM, ESP32)',
        'Schematic capture and PCB prototyping skills',
      ],
      benefits: [
        'Direct access to FabLab prototyping infrastructure',
        'Patent filing bonuses and project incentives',
      ],
    },
  ];

  const selectedJob = jobsList.find(j => j.id === selectedJobId) || jobsList[0];

  const toggleSaveJob = (id: string) => {
    setSavedJobs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <DashboardLayout
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userRole="Verified Corporate Recruiter"
      userName="TechCorp Philippines"
      portalTitle="Recruiter Management Hub"
      breadcrumb="Recruiter Portal / Job Hub & Talent Match"
    >
      <div className="space-y-6">
        
        {/* Top Metric Strip (Clean Off-White UI) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Active Job Postings</span>
            <div className="text-2xl font-black text-[#0F172A] font-mono-num">{jobsList.length}</div>
            <p className="text-[11px] text-emerald-600 font-semibold">+2 new this week</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Total Candidate Leads</span>
            <div className="text-2xl font-black text-[#7A0016] font-mono-num">234</div>
            <p className="text-[11px] text-[#64748B]">Vetted MSU-IIT students</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Interviews Scheduled</span>
            <div className="text-2xl font-black text-[#D97706] font-mono-num">18</div>
            <p className="text-[11px] text-emerald-600 font-semibold">4 happening today</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Enterprise Access Token</span>
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-block mt-1">
              ✓ VERIFIED PARTNER
            </div>
            <p className="text-[10px] text-[#64748B]">Valid for AY 2026-2027</p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TAB 1: LINKEDIN-STYLE DUAL-PANE JOB PORTAL
            ───────────────────────────────────────────────────────────── */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search size={14} className="absolute left-3 top-3 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Filter role, title, or skills (e.g. Next.js, Python)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#CBD5E1] text-xs text-[#0F172A] focus:border-[#7A0016] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => alert("Modal opened: Create and publish a new job opportunity for MSU-IIT students.")}
                  className="px-4 py-2 rounded-lg bg-[#7A0016] hover:bg-[#9B0020] text-white text-xs font-bold shadow-xs btn-press flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Plus size={14} />
                  <span>Post New Job</span>
                </button>
              </div>
            </div>

            {/* LinkedIn Split View Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* Left Pane: Job List (5 Cols) */}
              <div className="lg:col-span-5 space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
                {jobsList
                  .filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
                  .map((job) => {
                    const isSelected = selectedJob.id === job.id;
                    const isSaved = savedJobs.includes(job.id);
                    return (
                      <div
                        key={job.id}
                        onClick={() => setSelectedJobId(job.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-white border-[#7A0016] ring-2 ring-[#7A0016]/10 shadow-sm'
                            : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] shadow-xs'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-[#0F172A] leading-snug">{job.title}</h4>
                            <p className="text-xs font-semibold text-[#7A0016]">{job.company}</p>
                            <p className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                              <MapPin size={12} /> {job.location}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveJob(job.id);
                            }}
                            className={`p-1.5 rounded-lg border text-xs transition-colors ${
                              isSaved ? 'bg-[#FFF3D6] text-[#7A0016] border-[#F5A623]' : 'text-[#94A3B8] border-transparent hover:border-[#CBD5E1]'
                            }`}
                          >
                            <Bookmark size={14} />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-3">
                          <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#334155] text-[10px] font-semibold">
                            {job.type}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            {job.salary}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-3 mt-2 border-t border-[#F1F5F9]">
                          <span>{job.posted}</span>
                          <span className="font-bold text-[#7A0016]">{job.applicants} IITian Applicants</span>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Right Pane: Selected Job Detailed View (7 Cols) */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-6 space-y-6 sticky top-20">
                <div className="border-b border-[#E2E8F0] pb-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-[#FFF3D6] text-[#7A0016] text-[10px] font-bold border border-[#F5A623]/50">
                        OFFICIAL CAREER OPENING
                      </span>
                      <h2 className="text-xl font-black text-[#0F172A] mt-2">{selectedJob.title}</h2>
                      <p className="text-xs font-bold text-[#7A0016]">{selectedJob.company} • {selectedJob.location}</p>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(selectedJob.id)}
                      className="p-2 rounded-lg border border-[#CBD5E1] text-[#64748B] hover:text-[#7A0016] transition-colors"
                      title="Bookmark Job"
                    >
                      <Bookmark size={16} className={savedJobs.includes(selectedJob.id) ? "fill-[#7A0016] text-[#7A0016]" : ""} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] pt-1">
                    <span className="flex items-center gap-1">
                      <DollarSign size={14} className="text-emerald-600" />
                      <strong className="text-[#0F172A]">{selectedJob.salary}</strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {selectedJob.type}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#7A0016] font-bold">
                      <Users size={14} />
                      {selectedJob.applicants} student candidates applied
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => alert(`Reviewing candidate pipeline for ${selectedJob.title}`)}
                      className="px-5 py-2 rounded-lg bg-[#7A0016] hover:bg-[#9B0020] text-white text-xs font-bold shadow-xs btn-press"
                    >
                      View Candidate Applications ({selectedJob.applicants})
                    </button>
                    <button
                      onClick={() => alert(`Job link copied to clipboard!`)}
                      className="px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[#334155] hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Share2 size={14} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Job Description */}
                <div className="space-y-4 text-xs text-[#334155] leading-relaxed">
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm mb-1.5">Role Overview</h4>
                    <p>{selectedJob.description}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm mb-1.5">Academic & Technical Requirements</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      {selectedJob.requirements.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm mb-1.5">Target Colleges in MSU-IIT</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedJob.targetColleges.map((c, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[11px] font-semibold text-[#0F172A]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm mb-1.5">Key Technical Proficiencies</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedJob.tags.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#FFF3D6] text-[#7A0016] text-[11px] font-bold border border-[#F5A623]/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 2: TALENT DISCOVERY FEED
            ───────────────────────────────────────────────────────────── */}
        {activeTab === 'talent' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">MSU-IIT Verified Candidate Pool</h3>
                <p className="text-xs text-[#64748B]">LinkedIn-style student profiles with counselor-reviewed resumes</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#7A0016] bg-[#FFF3D6] px-2.5 py-1 rounded border border-[#F5A623]/60">
                100% Verified Accounts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Alexandra Reyes', program: 'BS Information Technology', year: '4th Year Standing', gpa: '1.45', skills: ['Next.js 14', 'TypeScript', 'PostgreSQL'], badge: "Dean's Lister", verified: true, counselor: 'Dr. Maria Santos', email: 'alexandra.reyes@g.msuiit.edu.ph' },
                { name: 'Kyle Fernandez', program: 'BS Computer Science', year: '3rd Year Standing', gpa: '1.38', skills: ['PyTorch', 'Distributed Systems', 'Python'], badge: "AI Fellow", verified: true, counselor: 'Prof. Roberto Gomez', email: 'kyle.fernandez@g.msuiit.edu.ph' },
                { name: 'Bea Clarisse Ong', program: 'BS Electronics Engineering', year: '4th Year Standing', gpa: '1.52', skills: ['Embedded C', 'FPGA', 'IoT Sensors'], badge: "FabLab Lead", verified: false, counselor: 'Not yet assigned', email: 'bea.ong@g.msuiit.edu.ph' },
              ].map((student, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#D1D5DB] flex items-center justify-center text-[#94A3B8]">
                        <Users size={19} />
                      </div>
                      <div>
                      <h4 className="text-sm font-bold text-[#0F172A]">{student.name}</h4>
                      <p className="text-[11px] text-[#64748B]">{student.program}</p>
                      <p className="text-[10px] text-[#94A3B8] font-mono">{student.year}</p>
                      <p className="text-[10px] text-[#64748B] mt-1">{student.email}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#7A0016] bg-[#FFF3D6] px-2 py-0.5 rounded border border-[#F5A623]/60">
                      GPA {student.gpa}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold border ${student.verified ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-[#64748B] border-[#E2E8F0]'}`}>
                    <CheckCircle size={12} />
                    {student.verified ? `COUNSELOR-VERIFIED RESUME • ${student.counselor}` : 'RESUME NOT YET COUNSELOR-VERIFIED'}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {student.skills.map((s, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#334155] text-[10px] font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#F1F5F9] flex gap-2">
                    <button
                      onClick={() => setSelectedCandidate(student.name)}
                      className="flex-1 py-1.5 rounded-lg border border-[#CBD5E1] text-[#334155] hover:bg-slate-50 text-xs font-bold"
                    >
                      View Profile & CV
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('messages');
                      }}
                      className="flex-1 py-1.5 rounded-lg bg-[#7A0016] hover:bg-[#9B0020] text-white text-xs font-bold shadow-xs"
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {selectedCandidate && (
              <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedCandidate(null)}>
                <div className="w-full max-w-lg bg-white rounded-xl border border-[#D1D5DB] shadow-xl p-6 space-y-4" onClick={(event) => event.stopPropagation()}>
                  <div className="flex items-start justify-between">
                    <div><p className="text-[10px] font-bold uppercase tracking-wider text-[#7A0016]">Student profile</p><h3 className="text-xl font-black text-[#0F172A]">{selectedCandidate}</h3><p className="text-xs text-[#64748B]">MSU-IIT student talent profile</p></div>
                    <button onClick={() => setSelectedCandidate(null)} className="text-[#64748B] hover:text-[#0F172A]"><X size={18} /></button>
                  </div>
                  <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
                    <p className="font-bold text-[#334155]">Resume access</p>
                    <p className="text-[#64748B]">This CV is available for viewing because the student has completed proper career counseling and received a counselor verification.</p>
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[10px]"><CheckCircle size={12} /> COUNSELOR-VERIFIED RESUME</span>
                  </div>
                  <div className="flex gap-2"><button onClick={() => alert(`Opening ${selectedCandidate}'s counselor-verified resume preview.`)} className="flex-1 px-3 py-2 rounded-lg bg-[#7A0016] text-white text-xs font-bold">Preview CV</button><button onClick={() => setSelectedCandidate(null)} className="px-4 py-2 rounded-lg border border-[#CBD5E1] text-[#334155] text-xs font-bold">Close</button></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 3: MESSAGES
            ───────────────────────────────────────────────────────────── */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden h-[540px] flex">
            {/* Conversations list */}
            <div className="w-80 border-r border-[#E2E8F0] p-3 space-y-2 bg-[#F8FAFC]">
              <div className="font-bold text-xs text-[#0F172A] px-2 py-1">Candidate Conversations</div>
              <div className="p-2.5 rounded-lg bg-white border border-[#CBD5E1] shadow-xs cursor-pointer">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0F172A]">Alexandra Reyes</span>
                  <span className="text-[10px] text-[#94A3B8]">10m ago</span>
                </div>
                <p className="text-[11px] text-[#64748B] truncate mt-0.5">Thank you! I look forward to the technical assessment.</p>
              </div>
            </div>

            {/* Chat Pane */}
            <div className="flex-1 flex flex-col justify-between p-4">
              <div className="border-b border-[#E2E8F0] pb-2 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Alexandra Reyes (BSIT-4)</h4>
                  <p className="text-[11px] text-[#7A0016] font-semibold">Applied for: Associate Cloud Architect</p>
                </div>
                <button className="px-3 py-1 rounded bg-slate-100 text-xs font-bold text-[#334155]">View Profile</button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-[#F1F5F9] max-w-md text-[#334155]">
                  Hi Alexandra! We reviewed your thesis portfolio on P.A.C.E. and would like to invite you for a 30-minute technical evaluation.
                </div>
                <div className="p-3 rounded-lg bg-[#7A0016] text-white max-w-md ml-auto">
                  Thank you! I look forward to the technical assessment.
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-[#E2E8F0]">
                <input
                  type="text"
                  placeholder="Type message to candidate..."
                  className="flex-1 px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs focus:outline-none focus:border-[#7A0016]"
                />
                <button className="px-4 py-2 rounded-lg bg-[#7A0016] text-white text-xs font-bold">Send</button>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 4: COMPANY PROFILE
            ───────────────────────────────────────────────────────────── */}
        {activeTab === 'company' && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-6 max-w-2xl space-y-4">
            <h3 className="text-base font-bold text-[#0F172A]">Corporate Partner Profile</h3>
            <p className="text-xs text-[#64748B]">Showcased on the MSU-IIT student portal directory</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#334155] mb-1">Company Name</label>
                <input type="text" value="TechCorp Philippines" readOnly className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] bg-slate-50 text-[#0F172A] font-semibold" />
              </div>
              <div>
                <label className="block font-bold text-[#334155] mb-1">Industry Sector</label>
                <input type="text" value="Fintech, Distributed Systems & Cloud Infrastructure" readOnly className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] bg-slate-50 text-[#0F172A]" />
              </div>
              <div>
                <label className="block font-bold text-[#334155] mb-1">Corporate Headquarters / Office</label>
                <input type="text" value="Cebu IT Park / Iligan Liaison Hub" readOnly className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] bg-slate-50 text-[#0F172A]" />
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
