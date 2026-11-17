"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Save, UserRound } from "lucide-react";
import { ApiError, authApi } from "@/lib/api/client";
import type { MentorProfile } from "@/lib/api/types";

type MentorForm = Pick<MentorProfile, "firstName" | "lastName" | "professionalTitle" | "companyName" | "industry" | "biography" | "expertise" | "phone" | "maxMentees" | "availabilityNotes">;

const inputClass = "mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal text-slate-900 outline-none transition focus:border-[#7A0016] focus:ring-2 focus:ring-[#7A0016]/10";
const emptyForm: MentorForm = { firstName: "", lastName: "", professionalTitle: "", companyName: "", industry: "", biography: "", expertise: "", phone: "", maxMentees: 5, availabilityNotes: "" };

export default function MentorProfilePanel() {
  const [profile, setProfile] = useState<MentorProfile | null>(null);
  const [form, setForm] = useState<MentorForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    authApi.mentorProfile().then(({ profile: current }) => {
      if (!active) return;
      setProfile(current);
      setForm({
        firstName: current.firstName,
        lastName: current.lastName,
        professionalTitle: current.professionalTitle,
        companyName: current.companyName,
        industry: current.industry,
        biography: current.biography,
        expertise: current.expertise,
        phone: current.phone,
        maxMentees: current.maxMentees,
        availabilityNotes: current.availabilityNotes ?? "",
      });
      setLoading(false);
    }).catch((requestError: unknown) => {
      if (!active) return;
      setError(requestError instanceof ApiError ? requestError.message : "Unable to load your mentor profile.");
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  function update<K extends keyof MentorForm>(key: K, value: MentorForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const payload = {
        ...form,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        professionalTitle: form.professionalTitle.trim(),
        companyName: form.companyName.trim(),
        industry: form.industry.trim(),
        biography: form.biography.trim(),
        expertise: form.expertise.trim(),
        phone: form.phone.trim(),
        availabilityNotes: form.availabilityNotes?.trim() || null,
      };
      const { profile: updated } = await authApi.updateMentorProfile(payload);
      setProfile(updated);
      setSaved(true);
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : "Unable to save your mentor profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl space-y-5">
      <div className="rounded-xl border border-slate-200 border-l-4 border-l-[#7A0016] bg-white p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A6A20]">Industry mentor account</p>
        <h2 className="mt-2 text-xl font-bold text-slate-900">Professional profile</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">Keep your professional background and mentoring capacity up to date for the PACE community.</p>
      </div>
      {loading && <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500"><LoaderCircle size={18} className="animate-spin text-[#7A0016]" />Loading your mentor profile…</div>}
      {error && <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700"><AlertCircle size={16} className="mt-0.5 shrink-0" />{error}</div>}
      {!loading && profile && <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7A0016]/[0.07] text-[#7A0016]"><UserRound size={22} /></span>
          <div><p className="text-sm font-bold text-slate-900">{profile.firstName} {profile.lastName}</p><p className="mt-1 text-xs text-slate-500">{profile.professionalTitle} · {profile.companyName}</p></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700">First name<input required maxLength={100} value={form.firstName} onChange={e => update("firstName", e.target.value)} className={inputClass} /></label>
          <label className="text-xs font-semibold text-slate-700">Last name<input required maxLength={100} value={form.lastName} onChange={e => update("lastName", e.target.value)} className={inputClass} /></label>
          <label className="text-xs font-semibold text-slate-700">Professional title<input required maxLength={150} value={form.professionalTitle} onChange={e => update("professionalTitle", e.target.value)} className={inputClass} /></label>
          <label className="text-xs font-semibold text-slate-700">Company<input required maxLength={200} value={form.companyName} onChange={e => update("companyName", e.target.value)} className={inputClass} /></label>
          <label className="text-xs font-semibold text-slate-700">Industry<input required maxLength={150} value={form.industry} onChange={e => update("industry", e.target.value)} className={inputClass} /></label>
          <label className="text-xs font-semibold text-slate-700">Contact number<input required minLength={7} maxLength={30} value={form.phone} onChange={e => update("phone", e.target.value)} className={inputClass} /></label>
          <label className="text-xs font-semibold text-slate-700">Maximum mentees<input type="number" min={1} max={50} required value={form.maxMentees} onChange={e => update("maxMentees", Number(e.target.value))} className={inputClass} /></label>
          <label className="text-xs font-semibold text-slate-700">Availability notes<input maxLength={500} value={form.availabilityNotes ?? ""} onChange={e => update("availabilityNotes", e.target.value)} className={inputClass} placeholder="e.g. Weekday evenings" /></label>
        </div>
        <label className="block text-xs font-semibold text-slate-700">Professional biography<textarea required maxLength={2000} rows={4} value={form.biography} onChange={e => update("biography", e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 p-3 text-sm font-normal outline-none focus:border-[#7A0016] focus:ring-2 focus:ring-[#7A0016]/10" /></label>
        <label className="block text-xs font-semibold text-slate-700">Areas of expertise<textarea required maxLength={1000} rows={3} value={form.expertise} onChange={e => update("expertise", e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 p-3 text-sm font-normal outline-none focus:border-[#7A0016] focus:ring-2 focus:ring-[#7A0016]/10" /></label>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p aria-live="polite" className="inline-flex items-center gap-1.5 text-xs text-emerald-700">{saved && <CheckCircle2 size={14} />} {saved ? "Mentor profile updated." : "Your profile changes are saved to PACE."}</p>
          <button type="submit" disabled={saving} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#7A0016] px-5 text-xs font-bold text-white transition hover:bg-[#5C0011] disabled:opacity-60">{saving ? <LoaderCircle size={15} className="animate-spin" /> : <Save size={15} />}{saving ? "Saving…" : "Save profile changes"}</button>
        </div>
      </form>}
    </section>
  );
}
