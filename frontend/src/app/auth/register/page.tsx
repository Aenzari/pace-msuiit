"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  GraduationCap,
  LockKeyhole,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import PaceLogo from "@/components/PaceLogo";
import { ApiError, authApi } from "@/lib/api/client";

type RegistrationRole = "student" | "counselor" | "recruiter";
type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  studentNumber: string;
  course: string;
  yearLevel: string;
  phone: string;
  address: string;
  token: string;
  employeeId: string;
  department: string;
  companyId: string;
  jobTitle: string;
};

const initialValues: FormValues = {
  email: "", password: "", confirmPassword: "", firstName: "", lastName: "",
  studentNumber: "", course: "", yearLevel: "1", phone: "", address: "",
  token: "", employeeId: "", department: "", companyId: "", jobTitle: "",
};

const roles = [
  { id: "student" as const, label: "Student", description: "MSU-IIT student or eligible graduate", icon: GraduationCap },
  { id: "counselor" as const, label: "Counselor", description: "Invited faculty or career staff", icon: Compass },
  { id: "recruiter" as const, label: "Recruiter", description: "Invited industry partner", icon: BriefcaseBusiness },
];

const inputClass = "h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#7A0016] focus:ring-4 focus:ring-[#7A0016]/[0.07]";
const labelClass = "mb-1.5 block text-xs font-semibold text-slate-700";

function Field({ label, name, value, onChange, type = "text", placeholder, required = true, autoComplete }: {
  label: string; name: string; value: string; onChange: (value: string) => void;
  type?: string; placeholder?: string; required?: boolean; autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} autoComplete={autoComplete} className={inputClass} />
    </div>
  );
}

export default function RegisterPage() {
  const [role, setRole] = useState<RegistrationRole>("student");
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (values.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }
    if (values.password !== values.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      if (role === "student") {
        await authApi.registerStudent({
          email: values.email.trim(),
          password: values.password,
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          studentNumber: values.studentNumber.trim(),
          course: values.course.trim(),
          yearLevel: Number(values.yearLevel),
          phone: values.phone.trim(),
          address: values.address.trim(),
        });
      } else if (role === "counselor") {
        await authApi.registerCounselor({
          email: values.email.trim(),
          password: values.password,
          token: values.token.trim(),
          employeeId: values.employeeId.trim(),
          department: values.department.trim(),
          phone: values.phone.trim(),
        });
      } else {
        await authApi.registerRecruiter({
          email: values.email.trim(),
          password: values.password,
          token: values.token.trim(),
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          companyId: values.companyId.trim(),
          jobTitle: values.jobTitle.trim(),
          phone: values.phone.trim(),
        });
      }
      // Registration creates the profile but does not create a session in the
      // current backend controller. The user must sign in separately.
      setSuccess(true);
    } catch (requestError) {
      if (requestError instanceof ApiError) {
        const issue = requestError.issues?.[0]?.message;
        setError(issue || requestError.message);
      } else {
        setError("We couldn't submit your registration. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-5 py-12">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/[0.04] sm:p-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><CheckCircle2 size={27} /></span>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6A20]">Registration submitted</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">You’re on your way.</h1>
          <p className="mt-3 text-sm leading-7 text-slate-500">Your {role} account has been created. Sign in using the email address you registered with to continue to PACE.</p>
          <Link href="/auth/login" className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#7A0016] text-sm font-semibold text-white transition hover:bg-[#5C0011]">Continue to sign in <ArrowRight size={16} /></Link>
          <p className="mt-5 text-[11px] text-slate-400">If your organization requires further verification, follow the instructions provided by the PACE team.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F6F3] text-slate-900">
      <header className="bg-[#4C0010] px-5 py-4 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1"><PaceLogo size={32} showText={false} /></span><span><span className="block text-sm font-bold tracking-[0.16em]">P.A.C.E.</span><span className="text-[9px] tracking-[0.14em] text-white/60">MSU–IIT</span></span></Link>
          <Link href="/auth/login" className="text-xs font-semibold text-white/80 transition hover:text-amber-300">Already registered? Sign in <ArrowRight size={13} className="ml-1 inline" /></Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-16">
        <aside className="lg:sticky lg:top-10 lg:self-start">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A6A20]">Join the community</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">Start your <span className="font-serif italic text-[#7A0016]">PACE</span> journey.</h1>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">Create your account to access the career development experience designed for the MSU-IIT community and its partners.</p>
          <div className="mt-9 hidden border-t border-slate-200 pt-6 lg:block">
            <div className="flex items-start gap-3"><span className="mt-0.5 text-[#7A0016]"><LockKeyhole size={17} /></span><div><p className="text-xs font-semibold">Account security</p><p className="mt-1 text-xs leading-5 text-slate-500">Your password is transmitted to the PACE authentication service over your configured API connection. Never share your password or invitation token.</p></div></div>
          </div>
        </aside>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.04] sm:p-8">
          <div className="mb-7"><h2 className="text-xl font-semibold tracking-tight">Create an account</h2><p className="mt-1 text-xs text-slate-500">Select the account type that applies to you.</p></div>

          <div className="mb-8 grid gap-2 sm:grid-cols-3">
            {roles.map(({ id, label, description, icon: Icon }) => {
              const active = role === id;
              return <button key={id} type="button" onClick={() => { setRole(id); setError(""); }} aria-pressed={active} className={`rounded-xl border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0016] ${active ? "border-[#7A0016] bg-[#7A0016]/[0.04] ring-1 ring-[#7A0016]/15" : "border-slate-200 hover:border-slate-300"}`}>
                <Icon size={19} className={active ? "text-[#7A0016]" : "text-slate-400"} />
                <span className="mt-3 block text-xs font-semibold">{label}</span>
                <span className="mt-1 block text-[10px] leading-4 text-slate-500">{description}</span>
              </button>;
            })}
          </div>

          {(role === "counselor" || role === "recruiter") && <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900"><strong>Invitation required.</strong> {role === "counselor" ? "Use the invitation token provided by your PACE administrator." : "Use your organization invitation token and the company ID supplied by PACE."}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {role !== "counselor" && <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" value={values.firstName} onChange={(v) => update("firstName", v)} placeholder="First name" autoComplete="given-name" />
              <Field label="Last name" name="lastName" value={values.lastName} onChange={(v) => update("lastName", v)} placeholder="Last name" autoComplete="family-name" />
            </div>}
            <Field label="Email address" name="email" type="email" value={values.email} onChange={(v) => update("email", v)} placeholder="you@example.com" autoComplete="email" />

            {role === "student" && <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Student number" name="studentNumber" value={values.studentNumber} onChange={(v) => update("studentNumber", v)} placeholder="Student number" />
                <div><label htmlFor="yearLevel" className={labelClass}>Year level</label><select id="yearLevel" value={values.yearLevel} onChange={(e) => update("yearLevel", e.target.value)} className={inputClass}>{Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={String(i + 1)}>{i + 1}{i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"} year / level</option>)}</select></div>
              </div>
              <Field label="Course / program" name="course" value={values.course} onChange={(v) => update("course", v)} placeholder="e.g. BS Information Technology" />
              <Field label="Complete address" name="address" value={values.address} onChange={(v) => update("address", v)} placeholder="Street, barangay, city, province" autoComplete="street-address" />
            </>}

            {role === "counselor" && <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Employee ID" name="employeeId" value={values.employeeId} onChange={(v) => update("employeeId", v)} placeholder="Employee ID" />
                <Field label="Department" name="department" value={values.department} onChange={(v) => update("department", v)} placeholder="Department / office" />
              </div>
              <Field label="Invitation token" name="token" value={values.token} onChange={(v) => update("token", v)} placeholder="Paste your invitation token" />
            </>}

            {role === "recruiter" && <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Job title" name="jobTitle" value={values.jobTitle} onChange={(v) => update("jobTitle", v)} placeholder="e.g. Talent Acquisition Lead" />
                <Field label="Company ID (UUID)" name="companyId" value={values.companyId} onChange={(v) => update("companyId", v)} placeholder="Provided by PACE" />
              </div>
              <Field label="Invitation token" name="token" value={values.token} onChange={(v) => update("token", v)} placeholder="Paste your invitation token" />
            </>}

            <Field label="Contact number" name="phone" type="tel" value={values.phone} onChange={(v) => update("phone", v)} placeholder="+63 9XX XXX XXXX" autoComplete="tel" />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Create password" name="password" type="password" value={values.password} onChange={(v) => update("password", v)} placeholder="At least 8 characters" autoComplete="new-password" />
              <Field label="Confirm password" name="confirmPassword" type="password" value={values.confirmPassword} onChange={(v) => update("confirmPassword", v)} placeholder="Re-enter password" autoComplete="new-password" />
            </div>

            {error && <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-xs leading-5 text-red-700"><AlertCircle size={16} className="mt-0.5 shrink-0" />{error}</div>}

            <button type="submit" disabled={isLoading} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#7A0016] px-5 text-sm font-semibold text-white transition hover:bg-[#5C0011] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0016] disabled:cursor-not-allowed disabled:opacity-60">
              {isLoading ? <><LoaderCircle size={17} className="animate-spin" /> Submitting registration…</> : <>Create {role} account <ArrowRight size={16} /></>}
            </button>
            <p className="text-center text-[10px] leading-5 text-slate-400">By creating an account, you acknowledge that your information will be processed by the PACE platform in accordance with applicable university policies.</p>
          </form>
        </section>
      </div>
    </main>
  );
}
