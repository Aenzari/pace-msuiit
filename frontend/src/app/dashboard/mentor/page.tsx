"use client";

import { useState } from "react";
import { BriefcaseBusiness, UserRound } from "lucide-react";
import DashboardLayout, { NavItem } from "@/components/DashboardLayout";
import MentorProfilePanel from "@/components/mentor/MentorProfilePanel";

const navItems: NavItem[] = [
  { id: "profile", label: "Professional profile", icon: <UserRound size={18} /> },
];

export default function MentorDashboardPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <DashboardLayout
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userRole="Industry Mentor"
      userName="Mentor"
      portalTitle="Industry Mentor Portal"
      breadcrumb="PACE / Industry Mentor"
    >
      <div className="mx-auto w-full max-w-[1440px] space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="rounded-2xl border border-[#E8D7B2] bg-gradient-to-br from-[#FFFDF8] to-white p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6A20]">Industry partnership</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Welcome to your mentor workspace.</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">Manage your professional profile and mentoring capacity as part of the MSU-IIT career development community.</p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#7A0016] text-[#FFD700]"><BriefcaseBusiness size={25} /></span>
          </div>
        </div>
        {activeTab === "profile" && <MentorProfilePanel />}
      </div>
    </DashboardLayout>
  );
}
