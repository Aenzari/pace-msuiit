"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Save, UserRound } from "lucide-react";
import { ApiError, authApi } from "@/lib/api/client";
import type { StudentProfile } from "@/lib/api/types";

type ProfileForm = {
  firstName: string;
  lastName: string;
  studentNumber: string;
  course: string;
  yearLevel: string;
  phone: string;
  address: string;
};

const emptyForm: ProfileForm = {
  firstName: "",
  lastName: "",
  studentNumber: "",
  course: "",
  yearLevel: "1",
  phone: "",
  address: "",
};

const fieldClass = "mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal text-slate-900 outline-none transition focus:border-[#7A0016] focus:ring-2 focus:ring-[#7A0016]/10";

export default function StudentProfilePanel() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    authApi.studentProfile()
      .then(({ profile: currentProfile }) => {
        if (!active) return;
        setProfile(currentProfile);
        setForm({
          firstName: currentProfile.firstName,
          lastName: currentProfile.lastName,
          studentNumber: currentProfile.studentNumber,
          course: currentProfile.course,
          yearLevel: String(currentProfile.yearLevel),
          phone: currentProfile.phone,
          address: currentProfile.address,
        });
        setLoading(false);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setError(requestError instanceof ApiError
          ? requestError.message
          : "Unable to load your student profile.");
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  function update<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const { profile: updatedProfile } = await authApi.updateStudentProfile({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        studentNumber: form.studentNumber.trim(),
        course: form.course.trim(),
        yearLevel: Number(form.yearLevel),
        phone: form.phone.trim(),
        address: form.address.trim(),
      });
      setProfile(updatedProfile);
      setSaved(true);
    } catch (requestError) {
      setError(requestError instanceof ApiError
        ? requestError.message
        : "Unable to save your profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-5">
      <div className="rounded-xl border border-[#E2E8F0] border-l-4 border-l-[#7A0016] bg-white p-6 shadow-xs">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#7A0016]">Student account</p>
        <h2 className="mt-1 text-xl font-black text-[#0F172A]">My career profile</h2>
        <p className="mt-1 text-xs text-[#64748B]">Your profile is retrieved from your authenticated PACE account.</p>
      </div>

      {loading && <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500"><LoaderCircle size={18} className="animate-spin text-[#7A0016]" />Loading your student profile…</div>}

      {error && <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700"><AlertCircle size={16} className="mt-0.5 shrink-0" />{error}</div>}

      {!loading && profile && (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7A0016]/[0.07] text-[#7A0016]"><UserRound size={22} /></span>
            <div><p className="text-sm font-bold text-slate-900">{profile.firstName} {profile.lastName}</p><p className="mt-1 text-xs text-slate-500">{profile.course} · Year {profile.yearLevel}</p></div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold text-slate-700">First name<input required maxLength={100} value={form.firstName} onChange={(event) => update("firstName", event.target.value)} className={fieldClass} /></label>
            <label className="text-xs font-semibold text-slate-700">Last name<input required maxLength={100} value={form.lastName} onChange={(event) => update("lastName", event.target.value)} className={fieldClass} /></label>
            <label className="text-xs font-semibold text-slate-700">Student number<input required maxLength={50} value={form.studentNumber} onChange={(event) => update("studentNumber", event.target.value)} className={fieldClass} /></label>
            <label className="text-xs font-semibold text-slate-700">Course / program<input required maxLength={150} value={form.course} onChange={(event) => update("course", event.target.value)} className={fieldClass} /></label>
            <label className="text-xs font-semibold text-slate-700">Year level<select value={form.yearLevel} onChange={(event) => update("yearLevel", event.target.value)} className={fieldClass}>{Array.from({ length: 10 }, (_, index) => <option key={index + 1} value={String(index + 1)}>{index + 1}</option>)}</select></label>
            <label className="text-xs font-semibold text-slate-700">Contact number<input required minLength={7} maxLength={30} value={form.phone} onChange={(event) => update("phone", event.target.value)} className={fieldClass} /></label>
          </div>

          <label className="block text-xs font-semibold text-slate-700">Address<input required maxLength={300} value={form.address} onChange={(event) => update("address", event.target.value)} className={fieldClass} /></label>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p aria-live="polite" className="inline-flex items-center gap-1.5 text-xs text-emerald-700">{saved && <CheckCircle2 size={14} />} {saved ? "Profile updated successfully." : "Changes are saved to your PACE account."}</p>
            <button type="submit" disabled={saving} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#7A0016] px-5 text-xs font-bold text-white transition hover:bg-[#5C0011] disabled:cursor-not-allowed disabled:opacity-60">{saving ? <LoaderCircle size={15} className="animate-spin" /> : <Save size={15} />}{saving ? "Saving…" : "Save profile changes"}</button>
          </div>
        </form>
      )}
    </section>
  );
}
