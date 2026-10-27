'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell, ChevronLeft, ChevronRight, Menu, X, ChevronDown, LogOut, Settings,
  Search, User, ExternalLink
} from 'lucide-react';
import PaceLogo from './PaceLogo';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  userRole: string;
  userName: string;
  portalTitle: string;
  breadcrumb: string;
}

export default function DashboardLayout({
  children,
  navItems,
  activeTab,
  onTabChange,
  userRole,
  userName,
  portalTitle,
  breadcrumb,
}: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'New student application received from CCS', time: '5m ago', unread: true },
    { id: 2, text: 'Appointment confirmed with Dr. Maria Santos', time: '1h ago', unread: true },
    { id: 3, text: 'Career Fair registration window is open', time: '3h ago', unread: false },
  ];
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-[#EEF2F6] text-[#0F172A] flex flex-col font-sans">
      {/* ─────────────────────────────────────────────────────────
          1. AUTHENTIC MY.IIT HEADER
          ───────────────────────────────────────────────────────── */}
      <div className="myiit-header-gradient text-white px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 rounded text-stone-200 hover:text-white"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-white p-0.5 flex items-center justify-center">
              <PaceLogo size={28} showText={false} />
            </div>
            <div>
              <span className="font-extrabold tracking-wide text-white text-sm">
                P.A.C.E. MSU-IIT
              </span>
              <span className="text-[10px] text-[#FFD700] ml-2 font-mono hidden sm:inline">
                {portalTitle}
              </span>
            </div>
          </Link>
        </div>

        {/* Right user credentials */}
        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex flex-col text-right leading-tight">
            <span className="font-bold text-white">{userName}</span>
            <span className="text-[10px] text-stone-300 capitalize">{userRole}</span>
          </div>

          <Link
            href="/"
            title="Sign Out to My.IIT Gateway"
            className="p-1.5 rounded hover:bg-[#9B0020] text-stone-200 hover:text-white transition-colors"
          >
            <LogOut size={16} />
          </Link>
        </div>
      </div>

      {/* Sub-bar / Breadcrumb */}
      <div className="bg-white border-b border-[#D1D5DB] px-4 sm:px-6 py-2 flex items-center justify-between text-xs text-[#64748B] shadow-xs">
        <div className="flex items-center gap-2">
          <span>{breadcrumb}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>Single Sign-On Active</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-[#D1D5DB] flex flex-col justify-between transition-all duration-200 z-30 ${
            collapsed ? 'w-16' : 'w-60'
          } ${mobileOpen ? 'fixed inset-y-0 left-0 z-50 shadow-xl' : 'hidden md:flex'}`}
        >
          <div className="p-3 space-y-3">
            <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-wider text-[#64748B] border-b border-[#E5E7EB] pb-2">
              {!collapsed && 'Main Navigation'}
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#7A0016] text-white shadow-xs'
                        : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-100'
                    } ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className={isActive ? 'text-[#FFD700]' : 'text-[#64748B]'}>
                      {item.icon}
                    </span>
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-3 border-t border-[#D1D5DB]">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              {!collapsed && <span>Collapse</span>}
            </button>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
