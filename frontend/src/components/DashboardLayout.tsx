'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChevronLeft, ChevronRight, Menu, X, LogOut, User,
  LoaderCircle, ShieldCheck, AlertCircle, RefreshCw
} from 'lucide-react';
import PaceLogo from './PaceLogo';
import { ROLE_DASHBOARD_PATHS } from '@/lib/constants/roles';
import { ApiError, authApi } from '@/lib/api/client';
import type { AuthUser, BackendRole } from '@/lib/api/types';

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

function roleForPath(pathname: string): BackendRole | null {
  if (pathname.startsWith('/dashboard/student')) return 'student';
  if (pathname.startsWith('/dashboard/counselor')) return 'counselor';
  if (pathname.startsWith('/dashboard/recruiter')) return 'recruiter';
  if (pathname.startsWith('/dashboard/mentor')) return 'mentor';
  if (pathname.startsWith('/dashboard/superadmin')) return 'superadmin';
  return null;
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
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [sessionCheck, setSessionCheck] = useState(0);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState('');

  useEffect(() => {
    let active = true;
    setAuthLoading(true);
    setAuthError('');

    authApi.currentUser()
      .then(({ user }) => {
        if (!active) return;
        if (!user) {
          router.replace('/auth/login');
          return;
        }

        const expectedRole = roleForPath(pathname);
        const isAuthorized = expectedRole === null
          || user.role === expectedRole
          || (expectedRole === 'superadmin' && user.role === 'admin');

        if (!isAuthorized) {
          router.replace(ROLE_DASHBOARD_PATHS[user.role]);
          return;
        }

        setAuthUser(user);
        setAuthLoading(false);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setAuthError(error instanceof ApiError
          ? error.message
          : 'PACE could not verify your session. Check the API connection and try again.');
        setAuthLoading(false);
      });

    return () => { active = false; };
  }, [pathname, router, sessionCheck]);

  async function handleSignOut() {
    setIsSigningOut(true);
    setSignOutError('');
    try {
      await authApi.logout();
      router.replace('/auth/login');
    } catch {
      setSignOutError('We could not confirm sign out with the server. Please retry.');
      setIsSigningOut(false);
    }
  }

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-6">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#7A0016] text-white"><LoaderCircle size={22} className="animate-spin" /></span>
          <p className="mt-4 text-sm font-semibold text-slate-800">Verifying your PACE session</p>
          <p className="mt-1 text-xs text-slate-500">Securely checking your account access…</p>
        </div>
      </main>
    );
  }

  if (authError || !authUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-6">
        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/[0.04]">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700"><AlertCircle size={22} /></span>
          <h1 className="mt-5 text-xl font-semibold">Session verification unavailable</h1>
          <p role="alert" className="mt-2 text-sm leading-6 text-slate-500">{authError || 'Please sign in to access this workspace.'}</p>
          <button onClick={() => setSessionCheck((value) => value + 1)} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#7A0016] text-sm font-semibold text-white hover:bg-[#5C0011]"><RefreshCw size={15} /> Retry connection</button>
          <Link href="/auth/login" className="mt-4 inline-block text-xs font-semibold text-[#7A0016] hover:underline">Return to sign in</Link>
        </section>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F6F3] font-sans text-[#0F172A]">
      <header className="myiit-header-gradient flex items-center justify-between px-4 py-2.5 text-white shadow-sm sm:px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} className="rounded p-1 text-stone-200 hover:text-white focus-visible:outline-white md:hidden">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-white p-0.5"><PaceLogo size={28} showText={false} /></span>
            <span><span className="text-sm font-extrabold tracking-wide text-white">P.A.C.E. MSU-IIT</span><span className="ml-2 hidden font-mono text-[10px] text-[#FFD700] sm:inline">{portalTitle}</span></span>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden flex-col text-right leading-tight sm:flex">
            <span className="font-bold text-white">{authUser.email || userName}</span>
            <span className="text-[10px] capitalize text-stone-300">{authUser.role || userRole}</span>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white"><User size={15} /></span>
          <button onClick={handleSignOut} disabled={isSigningOut} title="Sign out" className="rounded p-1.5 text-stone-200 transition hover:bg-[#9B0020] hover:text-white disabled:opacity-60">
            {isSigningOut ? <LoaderCircle size={16} className="animate-spin" /> : <LogOut size={16} />}
          </button>
        </div>
      </header>

      <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-white px-4 py-2 text-xs text-[#64748B] sm:px-6">
        <span>{breadcrumb}</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700"><ShieldCheck size={13} /> Session verified</span>
      </div>

      {signOutError && <div role="alert" className="flex items-center justify-between border-b border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700 sm:px-6"><span>{signOutError}</span><button onClick={handleSignOut} className="font-semibold underline">Retry</button></div>}

      <div className="flex flex-1 overflow-hidden">
        {mobileOpen && <button aria-label="Close navigation overlay" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-950/40 md:hidden" />}
        <aside className={`z-50 flex flex-col justify-between border-r border-[#E2E8F0] bg-white transition-all duration-200 ${collapsed ? 'w-16' : 'w-60'} ${mobileOpen ? 'fixed inset-y-0 left-0 shadow-2xl' : 'hidden md:flex'}`}>
          <div className="space-y-3 p-3">
            <div className="border-b border-[#E5E7EB] px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">{!collapsed && 'Workspace navigation'}</div>
            <nav aria-label="Workspace navigation" className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button key={item.id} onClick={() => { onTabChange(item.id); setMobileOpen(false); }} aria-current={isActive ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0016] ${isActive ? 'bg-[#7A0016] text-white shadow-sm' : 'text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]'} ${collapsed ? 'justify-center' : ''}`} title={collapsed ? item.label : undefined}>
                    <span className={isActive ? 'text-[#FFD700]' : 'text-[#64748B]'}>{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="border-t border-[#E2E8F0] p-3">
            <button onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold text-[#64748B] transition-colors hover:bg-slate-100 hover:text-[#0F172A]">
              {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <p><strong>Workspace preview.</strong> Some dashboard records and activities are demonstration data until their corresponding backend services are connected. Do not treat sample metrics or actions as live institutional records.</p>
            </div>
            {children}
          </div>
        </main>
      </div>

      <div className="pointer-events-none fixed bottom-5 right-5 z-30 hidden sm:block">
        <div className="rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[10px] font-medium text-slate-500 shadow-sm backdrop-blur"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />Signed in as {authUser.role}</div>
      </div>
    </div>
  );
}
