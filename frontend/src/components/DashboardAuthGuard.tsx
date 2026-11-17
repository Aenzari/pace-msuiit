"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, LoaderCircle, RefreshCw, ShieldCheck } from "lucide-react";
import { ApiError, authApi } from "@/lib/api/client";
import type { AuthUser, BackendRole } from "@/lib/api/types";

const dashboardByRole: Record<BackendRole, string> = {
  student: "/dashboard/student",
  counselor: "/dashboard/counselor",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/superadmin",
  superadmin: "/dashboard/superadmin",
};

export default function DashboardAuthGuard({ children, allowedRoles }: {
  children: React.ReactNode;
  allowedRoles: BackendRole[];
}) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    authApi.currentUser()
      .then(({ user: currentUser }) => {
        if (!active) return;
        if (!currentUser) {
          router.replace("/auth/login");
          return;
        }
        if (!allowedRoles.includes(currentUser.role)) {
          router.replace(dashboardByRole[currentUser.role]);
          return;
        }
        setUser(currentUser);
        setLoading(false);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setError(requestError instanceof ApiError
          ? requestError.message
          : "PACE could not verify your session. Check the API connection and try again.");
        setLoading(false);
      });
    return () => { active = false; };
  }, [allowedRoles, attempt, router]);

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center bg-[#0D0B0E] text-white"><div className="text-center"><LoaderCircle size={25} className="mx-auto animate-spin text-amber-400" /><p className="mt-4 text-sm font-semibold">Verifying administrator access…</p></div></main>;
  }

  if (error || !user) {
    return <main className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-6"><section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center"><AlertCircle size={25} className="mx-auto text-amber-600" /><h1 className="mt-4 text-xl font-semibold">Access verification unavailable</h1><p role="alert" className="mt-2 text-sm leading-6 text-slate-500">{error || "Please sign in to continue."}</p><button onClick={() => setAttempt((value) => value + 1)} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#7A0016] text-sm font-semibold text-white"><RefreshCw size={15} /> Retry</button><button onClick={() => router.replace("/auth/login")} className="mt-4 text-xs font-semibold text-[#7A0016]">Return to sign in</button></section></main>;
  }

  return <>{children}</>;
}
