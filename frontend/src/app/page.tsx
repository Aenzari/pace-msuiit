"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Compass,
  GraduationCap,
  Handshake,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import PaceLogo from "@/components/PaceLogo";

const audiences = [
  {
    icon: GraduationCap,
    eyebrow: "FOR IITIANS",
    title: "Build your next move.",
    description: "Discover opportunities, prepare your professional profile, and take confident steps from campus to career.",
  },
  {
    icon: Compass,
    eyebrow: "FOR CAREER COUNSELORS",
    title: "Make guidance go further.",
    description: "Support student growth with a more connected view of career readiness, advising, and development.",
  },
  {
    icon: BriefcaseBusiness,
    eyebrow: "FOR INDUSTRY PARTNERS",
    title: "Meet emerging talent.",
    description: "Connect with motivated candidates and strengthen your relationship with the MSU-IIT community.",
  },
];

const pillars = [
  { icon: Target, number: "01", title: "Discover direction", text: "Understand strengths, explore pathways, and make informed career decisions." },
  { icon: BookOpenCheck, number: "02", title: "Develop readiness", text: "Build the skills, experiences, and professional materials needed for what comes next." },
  { icon: Handshake, number: "03", title: "Create connections", text: "Bring students, career support, and industry opportunities closer together." },
];

export default function PaceLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F6F3] text-slate-900">
      <header className="relative z-20 border-b border-white/10 bg-[#4C0010] text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" aria-label="PACE MSU-IIT home" className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white p-1.5"><PaceLogo size={36} showText={false} /></span>
            <span><span className="block text-sm font-bold tracking-[0.18em]">P.A.C.E.</span><span className="mt-0.5 block text-[9px] tracking-[0.17em] text-white/60">MSU–IIT</span></span>
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-xs font-medium text-white/75 md:flex">
            <a href="#about" className="transition hover:text-white">About PACE</a>
            <a href="#experience" className="transition hover:text-white">The experience</a>
            <a href="#community" className="transition hover:text-white">Our community</a>
          </nav>
          <Link href="/auth/login" className="inline-flex items-center gap-2 rounded-lg bg-[#F5A623] px-4 py-2.5 text-xs font-bold text-[#3B000B] transition hover:bg-[#FFD27A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Portal sign in <ArrowUpRight size={15} />
          </Link>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#4C0010] text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-48 -top-64 h-[52rem] w-[52rem] rounded-full border border-white/[0.08]" />
          <div className="absolute -right-20 -top-32 h-[39rem] w-[39rem] rounded-full border border-white/[0.1]" />
          <div className="absolute right-[12%] top-[18%] h-[25rem] w-[25rem] rounded-full bg-[#9B0020]/35 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_42%,rgba(245,166,35,0.07)_100%)]" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[650px] max-w-[1440px] items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-7 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.23em] text-amber-300 sm:text-xs">
              <span className="h-px w-8 bg-amber-300" /> Mindanao State University – Iligan Institute of Technology
            </p>
            <h1 className="max-w-3xl text-[clamp(3.25rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
              Your future is a journey. <span className="font-serif font-normal italic text-amber-300">Make it yours.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
              Professional Advancement & Career Enhancement brings the MSU-IIT
              community together around one purpose: helping every IITian move
              forward with clarity, capability, and connection.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/login" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#F5A623] px-6 text-sm font-bold text-[#3B000B] shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#FFD27A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Enter the PACE portal <ArrowRight size={17} />
              </Link>
              <a href="#about" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/[0.06]">
                Explore the platform
              </a>
            </div>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-[11px] text-white/55">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-amber-300" /> University-centered experience</span>
              <span className="inline-flex items-center gap-2"><Sparkles size={15} className="text-amber-300" /> Built around career growth</span>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[520px] lg:block">
            <div className="absolute -inset-8 rounded-[2rem] border border-white/[0.08] rotate-6" />
            <div className="absolute -inset-3 rounded-[2rem] border border-amber-300/20 -rotate-3" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/15 bg-gradient-to-br from-[#7A0016] via-[#5C0011] to-[#31000A] p-7 shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between border-b border-white/15 pb-5">
                <div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-300">The PACE framework</p><p className="mt-1 text-sm font-semibold">One connected career journey</p></div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-300"><Sparkles size={19} /></span>
              </div>
              <div className="space-y-3 py-7">
                {pillars.map(({ icon: Icon, number, title, text }) => (
                  <div key={number} className="group flex gap-4 rounded-xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-amber-300/40 hover:bg-white/[0.08]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-300/10 text-amber-300"><Icon size={19} /></span>
                    <div className="min-w-0"><div className="flex items-center gap-2"><span className="font-mono text-[9px] text-amber-300/70">{number}</span><p className="text-sm font-semibold">{title}</p></div><p className="mt-1 text-xs leading-5 text-white/55">{text}</p></div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-white/15 pt-5 text-[10px] text-white/45"><span>MSU–IIT · Iligan City</span><span>Professional growth, connected.</span></div>
            </div>
            <div className="absolute -bottom-7 -left-10 rounded-xl border border-white/10 bg-[#F5A623] px-5 py-4 text-[#3B000B] shadow-xl">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em]">Move forward</p><p className="mt-1 text-lg font-semibold">With purpose.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-12 lg:py-28">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A6A20]">About the platform</p>
          <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">Career growth, <span className="font-serif italic text-[#7A0016]">connected.</span></h2>
        </div>
        <div className="max-w-3xl">
          <p className="text-lg leading-8 text-slate-600">PACE is designed as a shared digital space for career development at MSU-IIT. It brings together the people and experiences that help students prepare for meaningful work and lifelong professional growth.</p>
          <div className="mt-9 grid gap-6 border-t border-slate-200 pt-7 sm:grid-cols-3">
            <div><p className="text-2xl font-semibold text-[#7A0016]">Students</p><p className="mt-2 text-xs leading-5 text-slate-500">A clearer path from academic experience to professional opportunity.</p></div>
            <div><p className="text-2xl font-semibold text-[#7A0016]">Counselors</p><p className="mt-2 text-xs leading-5 text-slate-500">A connected way to support guidance and career readiness.</p></div>
            <div><p className="text-2xl font-semibold text-[#7A0016]">Employers</p><p className="mt-2 text-xs leading-5 text-slate-500">A meaningful bridge to emerging talent and university partnership.</p></div>
          </div>
        </div>
      </section>

      <section id="experience" className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A6A20]">A purposeful experience</p><h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">From potential to <span className="font-serif italic text-[#7A0016]">possibility.</span></h2></div>
            <p className="max-w-md text-sm leading-7 text-slate-500">A thoughtful career journey is more than a job search. It is the continuous work of discovering, developing, and connecting.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {pillars.map(({ icon: Icon, number, title, text }) => (
              <article key={number} className="group rounded-2xl border border-slate-200 bg-[#FAFAF8] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#7A0016]/30 hover:shadow-xl hover:shadow-slate-900/[0.05]">
                <div className="flex items-center justify-between"><span className="font-mono text-xs text-slate-400">{number} / 03</span><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7A0016]/[0.07] text-[#7A0016] transition group-hover:bg-[#7A0016] group-hover:text-white"><Icon size={20} /></span></div>
                <h3 className="mt-12 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A6A20]">A platform for the community</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Different roles. <span className="font-serif italic text-[#7A0016]">One shared direction.</span></h2></div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {audiences.map(({ icon: Icon, eyebrow, title, description }) => (
            <article key={eyebrow} className="flex min-h-[250px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between"><span className="text-[9px] font-bold tracking-[0.18em] text-[#9A6A20]">{eyebrow}</span><Icon size={21} className="text-[#7A0016]" /></div>
              <h3 className="mt-9 text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">{description}</p>
              <Link href="/auth/login" className="mt-7 inline-flex w-fit items-center gap-2 text-xs font-bold text-[#7A0016] hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A0016]">Continue to portal <ArrowRight size={15} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[1.75rem] bg-[#4C0010] px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-16">
          <div className="absolute -right-16 -top-36 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -right-2 -top-20 h-72 w-72 rounded-full border border-amber-300/20" />
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-300">Your next step</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Make your potential count.</h2><p className="mt-3 text-sm leading-7 text-white/65">Sign in to continue your PACE journey and access the tools available to your account.</p></div>
            <Link href="/auth/login" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-lg bg-[#F5A623] px-6 text-sm font-bold text-[#3B000B] transition hover:bg-[#FFD27A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Access PACE <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-[#F1F0EC]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-8 text-xs text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1"><PaceLogo size={30} showText={false} /></span><span><span className="block font-bold tracking-[0.14em] text-slate-800">P.A.C.E. · MSU–IIT</span><span className="text-[10px]">Professional Advancement & Career Enhancement</span></span></div>
          <p>Mindanao State University – Iligan Institute of Technology</p>
          <Link href="/auth/login" className="font-semibold text-[#7A0016] hover:underline">Portal sign in</Link>
        </div>
      </footer>
    </main>
  );
}
