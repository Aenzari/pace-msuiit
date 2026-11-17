"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AlertCircle, Building2, CheckCircle2, LoaderCircle, Save } from "lucide-react";
import { ApiError, authApi } from "@/lib/api/client";
import type { RecruiterProfile } from "@/lib/api/types";

type RecruiterForm = { firstName: string; lastName: string; jobTitle: string; phone: string };
const inputClass = "mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal text-slate-900 outline-none transition focus:border-[#7A0016] focus:ring-2 focus:ring-[#7A0016]/10";

export default function RecruiterProfilePanel() {
  const [profile, setProfile] = useState<RecruiterProfile | null>(null);
  const [form, setForm] = useState<RecruiterForm>({ firstName: "", lastName: "", jobTitle: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    authApi.recruiterProfile()
      .then(({ profile: current }) => {
        if (!active) return;
        setProfile(current);
        setForm({ firstName: current.firstName, lastName: current.lastName, jobTitle: current.jobTitle, phone: current.phone });
        setLoading(false);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setError(requestError instanceof ApiError ? requestError.message : "Unable to load your recruiter profile.");
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  function update<K extends keyof RecruiterForm>(key: K, value: RecruiterForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const { profile: updated } = await authApi.updateRecruiterProfile({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        jobTitle: form.jobTitle.trim(),
        phone: form.phone.trim(),
      });
      setProfile(updated);
      setSaved(true);
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : "Unable to save your recruiter profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="max-w-4xl space-y-5">
      <div className="rounded-xl border border-[#E2E8F0] border-l-4 border-l-[#7A0016] bg-white p-6 shadow-xs">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A6A20]">Industry partner account</p>
        <h2 className="mt-2 text-xl font-bold text-slate-900">Company and recruiter profile</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">Company details are retrieved from the linked company record. Update only the recruiter profile fields available to your account.</p>
      </div>

      {loading && <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500"><LoaderCircle size={18} className="animate-spin text-[#7A0016]" />Loading your company profile…</div>}
      {error && <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700"><AlertCircle size={16} className="mt-0.5 shrink-0" />{error}</div>}

      {!loading && profile && (
        <>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7A0016]/[0.07] text-[#7A0016]"><Building2 size={20} /></span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-900">{profile.company.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{profile.company.industry}</p>
              </div>
              <div className="flex flex-col items-end gap-1"><span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold capitalize text-slate-600">Company: {profile.company.verificationStatus}</span><span className="text-[10px] text-slate-500">Recruiter: {profile.approvalStatus}</span></div>
            </div>
            <dl className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
              <div><dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Company location</dt><dd className="mt-1 text-sm text-slate-700">{profile.company.location || "Not provided"}</dd></div>
              <div><dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Company website</dt><dd className="mt-1 break-all text-sm text-slate-700">{profile.company.website || "Not provided"}</dd></div>
              <div className="sm:col-span-2"><dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Company description</dt><dd className="mt-1 text-sm leading-6 text-slate-600">{profile.company.description || "No company description has been added."}</dd></div>
            </dl>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <div><h3 className="text-sm font-bold text-slate-900">Recruiter contact details</h3><p className="mt-1 text-xs text-slate-500">These fields are editable through the current recruiter profile API.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-slate-700">First name<input required maxLength={100} value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} /></label>
              <label className="text-xs font-semibold text-slate-700">Last name<input required maxLength={100} value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} /></label>
              <label className="text-xs font-semibold text-slate-700">Job title<input required maxLength={150} value={form.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} className={inputClass} /></label>
              <label className="text-xs font-semibold text-slate-700">Contact number<input required minLength={7} maxLength={30} value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} /></label>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <p aria-live="polite" className="inline-flex items-center gap-1.5 text-xs text-emerald-700">{saved && <CheckCircle2 size={14} />} {saved ? "Recruiter profile updated." : "Company details are managed by the linked company record."}</p>
              <button type="submit" disabled={saving} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#7A0016] px-5 text-xs font-bold text-white transition hover:bg-[#5C0011] disabled:opacity-60">{saving ? <LoaderCircle size={15} className="animate-spin" /> : <Save size={15} />}{saving ? "Saving…" : "Save recruiter details"}</button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
