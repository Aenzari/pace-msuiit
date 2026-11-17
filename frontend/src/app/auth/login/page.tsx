"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Handshake,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Compass,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import PaceLogo from "@/components/PaceLogo";
import { authApi, ApiError } from "@/lib/api/client";
import { ROLE_DASHBOARD_PATHS } from "@/lib/constants/roles";

const roleOptions = [
  { id: "student", label: "Student", detail: "Explore your career pathway", icon: GraduationCap },
  { id: "counselor", label: "Counselor", detail: "Guide student development", icon: Compass },
  { id: "recruiter", label: "Recruiter", detail: "Connect with emerging talent", icon: BriefcaseBusiness },
  { id: "mentor", label: "Industry mentor", detail: "Share experience and guide talent", icon: Handshake },
  { id: "superadmin", label: "Administrator", detail: "Manage the platform", icon: ShieldCheck },
] as const;

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    setIsLoading(true);

    try {
      const { user } = await authApi.login({ email: email.trim(), password });
      // The backend role is authoritative. The selected card is only a visual
      // aid and is never used to grant access or decide the destination.
      router.replace(ROLE_DASHBOARD_PATHS[user.role] || "/");
    } catch (error) {
      if (error instanceof ApiError) {
        setAuthError(
          error.status === 401
            ? "The email or password you entered is incorrect."
            : error.message
        );
      } else {
        setAuthError("We couldn't sign you in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F6F3] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.05fr)_minmax(460px,0.95fr)]">
        <section className="relative hidden overflow-hidden bg-[#4C0010] px-12 py-10 text-white lg:flex lg:flex-col xl:px-20">
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <div className="absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full border border-amber-200/40" />
            <div className="absolute -right-16 top-8 h-[25rem] w-[25rem] rounded-full border border-amber-200/30" />
            <div className="absolute -bottom-56 -left-40 h-[38rem] w-[38rem] rounded-full border border-white/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_80%,rgba(245,166,35,0.22),transparent_35%)]" />
          </div>

          <Link href="/" className="relative z-10 inline-flex w-fit items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5">
              <PaceLogo size={38} showText={false} />
            </span>
            <span>
              <span className="block text-sm font-bold tracking-[0.18em]">P.A.C.E.</span>
              <span className="block text-[10px] tracking-[0.12em] text-white/65">MSU–IIT</span>
            </span>
          </Link>

          <div className="relative z-10 my-auto max-w-xl py-20">
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
              <span className="h-px w-8 bg-amber-300" />
              Professional Advancement & Career Enhancement
            </p>
            <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight xl:text-6xl">
              Your next chapter starts <span className="font-serif italic text-amber-300">here.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-8 text-white/72">
              A connected career development experience bringing IITian talent,
              guidance, and industry opportunities into one university platform.
            </p>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-white/15 pt-6">
              <div><p className="text-2xl font-semibold">01</p><p className="mt-1 text-xs text-white/55">Discover</p></div>
              <div><p className="text-2xl font-semibold">02</p><p className="mt-1 text-xs text-white/55">Develop</p></div>
              <div><p className="text-2xl font-semibold">03</p><p className="mt-1 text-xs text-white/55">Advance</p></div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-5 text-[11px] text-white/55">
            <span>Mindanao State University – Iligan Institute of Technology</span>
            <span>Est. institutional platform</span>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-[440px]">
            <div className="mb-10 flex items-center justify-between lg:hidden">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white p-1 shadow-sm">
                  <PaceLogo size={36} showText={false} />
                </span>
                <span><span className="block text-sm font-bold tracking-[0.15em]">P.A.C.E.</span><span className="text-[10px] text-slate-500">MSU–IIT</span></span>
              </Link>
              <Link href="/" className="text-xs font-semibold text-[#7A0016] hover:underline">Home</Link>
            </div>

            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A6A20]">Welcome back</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Sign in to PACE</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Use your registered email address and password to continue.</p>
            </div>

            <div className="mb-7">
              <p className="mb-3 text-xs font-semibold text-slate-700">Choose your portal</p>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.map(({ id, label, detail, icon: Icon }) => {
                  const active = selectedRole === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedRole(id)}
                      aria-pressed={active}
                      className={`group flex min-h-[76px] items-start gap-3 rounded-xl border p-3 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0016] ${
                        active ? "border-[#7A0016] bg-[#7A0016]/[0.045] ring-1 ring-[#7A0016]/15" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`mt-0.5 rounded-lg p-2 ${active ? "bg-[#7A0016] text-white" : "bg-slate-100 text-slate-500 group-hover:text-[#7A0016]"}`}><Icon size={16} /></span>
                      <span className="min-w-0"><span className={`block text-xs font-semibold ${active ? "text-[#7A0016]" : "text-slate-800"}`}>{label}</span><span className="mt-1 block text-[10px] leading-4 text-slate-500">{detail}</span></span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[11px] text-slate-400">Portal selection helps orient you. Your account permissions are determined by PACE.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold text-slate-700">University or registered email</label>
                <div className="relative">
                  <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="email" name="email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#7A0016] focus:ring-4 focus:ring-[#7A0016]/[0.08]" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold text-slate-700">Password</label>
                </div>
                <div className="relative">
                  <LockKeyhole size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#7A0016] focus:ring-4 focus:ring-[#7A0016]/[0.08]" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-400 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7A0016]">
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {authError && <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700"><AlertCircle size={16} className="mt-0.5 shrink-0" />{authError}</div>}

              <button type="submit" disabled={isLoading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#7A0016] px-5 text-sm font-semibold text-white shadow-lg shadow-[#7A0016]/15 transition hover:bg-[#5C0011] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0016] disabled:cursor-not-allowed disabled:opacity-65">
                {isLoading ? <><LoaderCircle size={17} className="animate-spin" /> Signing you in…</> : <>Sign in securely <ArrowRight size={17} /></>}
              </button>
            </form>

            <p className="mt-7 text-center text-xs text-slate-500">New to PACE? <Link href="/auth/register" className="font-semibold text-[#7A0016] hover:underline">Create an account</Link></p>
            {process.env.NODE_ENV === "development" && <p className="mt-4 text-center text-xs text-slate-500">Just exploring? <Link href="/preview" className="font-semibold text-[#7A0016] hover:underline">Open the PACE role preview</Link></p>}
            <div className="mt-10 border-t border-slate-200 pt-5 text-center text-[10px] leading-5 text-slate-400">
              <p>Protected university platform · MSU–IIT</p>
              <p>For account assistance, please contact the Career Development and Placement Office.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
