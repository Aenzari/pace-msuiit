"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Compass,
  GraduationCap,
  Handshake,
  Menu,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import PaceLogo from "@/components/PaceLogo";
import "./landing.css";

const audiences = [
  {
    icon: GraduationCap,
    eyebrow: "FOR IITIANS",
    title: "Build your next move.",
    description:
      "Discover opportunities, prepare your professional profile, and take confident steps from campus to career.",
  },
  {
    icon: Compass,
    eyebrow: "FOR CAREER COUNSELORS",
    title: "Make guidance go further.",
    description:
      "Support student growth with a more connected view of career readiness, advising, and development.",
  },
  {
    icon: BriefcaseBusiness,
    eyebrow: "FOR INDUSTRY PARTNERS",
    title: "Meet emerging talent.",
    description:
      "Connect with motivated candidates and strengthen your relationship with the MSU-IIT community.",
  },
  {
    icon: Handshake,
    eyebrow: "FOR INDUSTRY MENTORS",
    title: "Share what experience teaches.",
    description:
      "Contribute professional insight and help emerging IITian talent navigate their career journeys.",
  },
];

const pillars = [
  {
    icon: Target,
    number: "01",
    title: "Discover direction",
    text: "Understand strengths, explore pathways, and make informed career decisions.",
  },
  {
    icon: BookOpenCheck,
    number: "02",
    title: "Develop readiness",
    text: "Build the skills, experiences, and professional materials needed for what comes next.",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Create connections",
    text: "Bring students, career support, and industry opportunities closer together.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(7px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function HeroExperience() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), {
    stiffness: 140,
    damping: 18,
    mass: 0.7,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-9, 9]), {
    stiffness: 140,
    damping: 18,
    mass: 0.7,
  });
  const floatY = useTransform(pointerY, [-0.5, 0.5], [7, -7]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      className="pace-hero-stage relative mx-auto w-full max-w-[590px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.div
        aria-hidden="true"
        className="pace-orbit pace-orbit-one"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden="true"
        className="pace-orbit pace-orbit-two"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 62, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden="true"
        className="pace-orbit-dot"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <span />
      </motion.div>

      <motion.div
        className="pace-hero-tilt relative z-10"
        style={reduceMotion ? undefined : { rotateX, rotateY, y: floatY, transformStyle: "preserve-3d" }}
        initial={reduceMotion ? false : { opacity: 0, y: 42, rotateX: 9, rotateY: -8, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
        transition={{ duration: 1.15, delay: 0.18, ease }}
      >
        <div className="pace-dashboard-shell">
          <div className="pace-dashboard-topbar">
            <div className="flex items-center gap-2.5">
              <span className="pace-mini-logo"><PaceLogo size={25} showText={false} /></span>
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.18em] text-white">P.A.C.E.</p>
                <p className="mt-0.5 text-[8px] tracking-[0.14em] text-white/45">CAREER JOURNEY, CONNECTED</p>
              </div>
            </div>
            <span className="pace-live-pill"><span /> YOUR NEXT CHAPTER</span>
          </div>

          <div className="pace-dashboard-content">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#EFC16D]">A clearer way forward</p>
                <h3 className="mt-2 text-[clamp(1.45rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.045em] text-white">Your career, in motion.</h3>
                <p className="mt-2 max-w-[245px] text-[10px] leading-5 text-white/55">Small steps. Meaningful progress. A future shaped by you.</p>
              </div>
              <div className="pace-progress-ring" aria-label="Illustrative career journey progress">
                <div><strong>01</strong><span>START</span></div>
              </div>
            </div>

            <div className="pace-journey-track">
              {pillars.map(({ icon: Icon, number, title, text }, index) => (
                <motion.div
                  key={number}
                  className={`pace-journey-step ${index === 0 ? "is-current" : ""}`}
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.72 + index * 0.16, ease }}
                >
                  <span className="pace-step-icon"><Icon size={17} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[8px] font-bold tracking-[0.15em] text-[#EFC16D]/80">{number} / 03</span>
                    <span className="mt-1 block text-[12px] font-semibold text-white">{title}</span>
                    <span className="mt-1 block text-[9px] leading-4 text-white/45">{text}</span>
                  </span>
                  <ArrowUpRight size={15} className="mt-1 shrink-0 text-white/30" />
                </motion.div>
              ))}
            </div>

            <div className="pace-dashboard-footer">
              <span><ShieldCheck size={13} /> MSU–IIT COMMUNITY</span>
              <span>MOVE WITH PURPOSE <MoveUpRight size={12} /></span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="pace-float-note pace-float-note-left"
        animate={reduceMotion ? undefined : { y: [0, -9, 0], rotate: [-2, -1, -2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="pace-float-icon"><Sparkles size={15} /></span>
        <span><strong>Discover</strong><small>What moves you</small></span>
      </motion.div>
      <motion.div
        className="pace-float-note pace-float-note-right"
        animate={reduceMotion ? undefined : { y: [0, 8, 0], rotate: [2, 1, 2] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="pace-float-icon gold"><Check size={15} /></span>
        <span><strong>Keep growing</strong><small>One step at a time</small></span>
      </motion.div>
    </div>
  );
}

export default function PaceLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <main id="pace-landing" className="min-h-screen overflow-hidden bg-[#F7F5F1] text-slate-900">
      <header className="pace-site-header sticky top-0 z-50 border-b border-white/10 text-white">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" aria-label="PACE MSU-IIT home" className="group flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
            <span className="pace-brand-mark"><PaceLogo size={35} showText={false} /></span>
            <span><span className="block text-sm font-bold tracking-[0.18em]">P.A.C.E.</span><span className="mt-0.5 block text-[9px] tracking-[0.17em] text-white/55">MSU–IIT</span></span>
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-9 text-[11px] font-semibold tracking-wide text-white/65 md:flex">
            <a href="#about" className="pace-nav-link">About PACE</a>
            <a href="#experience" className="pace-nav-link">The experience</a>
            <a href="#community" className="pace-nav-link">Our community</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="pace-header-cta hidden sm:inline-flex">Portal sign in <ArrowUpRight size={15} /></Link>
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="pace-menu-toggle md:hidden"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="pace-mobile-menu md:hidden"
          >
            <a href="#about" onClick={() => setMenuOpen(false)}>About PACE <ArrowUpRight size={14} /></a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>The experience <ArrowUpRight size={14} /></a>
            <a href="#community" onClick={() => setMenuOpen(false)}>Our community <ArrowUpRight size={14} /></a>
            <Link href="/auth/login" onClick={() => setMenuOpen(false)}>Portal sign in <ArrowUpRight size={14} /></Link>
          </motion.nav>
        )}
      </header>

      <section className="pace-hero relative isolate overflow-hidden text-white">
        <div className="pace-hero-grid" aria-hidden="true" />
        <div className="pace-hero-glow pace-hero-glow-one" aria-hidden="true" />
        <div className="pace-hero-glow pace-hero-glow-two" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[690px] max-w-[1480px] items-center gap-12 px-5 py-20 sm:px-8 lg:min-h-[760px] lg:grid-cols-[1fr_1fr] lg:gap-5 lg:px-12 lg:py-24">
          <div className="relative z-20 max-w-[690px]">
            <motion.p
              className="mb-7 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F5C878] sm:text-[10px]"
              initial={reduceMotion ? false : { opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease }}
            >
              <span className="h-px w-8 bg-[#F5C878]" /> MINDANAO STATE UNIVERSITY – ILIGAN INSTITUTE OF TECHNOLOGY
            </motion.p>
            <motion.h1
              className="max-w-[720px] text-[clamp(3.3rem,7.5vw,7.25rem)] font-semibold leading-[0.91] tracking-[-0.075em]"
              initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            >
              Your future is a journey.
              <span className="pace-hero-emphasis mt-2 block font-serif font-normal italic tracking-[-0.055em]">Make it yours.</span>
            </motion.h1>
            <motion.p
              className="mt-8 max-w-[540px] text-[15px] leading-8 text-white/65 sm:text-[17px]"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38, ease }}
            >
              Professional Advancement &amp; Career Enhancement brings the MSU-IIT community together around one purpose: helping every IITian move forward with clarity, capability, and connection.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
            >
              <Link href="/auth/login" className="pace-primary-cta">Enter the PACE portal <ArrowRight size={17} /></Link>
              <a href="#about" className="pace-secondary-cta">Explore the platform <ChevronDown size={16} /></a>
            </motion.div>
            <motion.div
              className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-[10px] text-white/50 sm:text-[11px]"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.72 }}
            >
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#F5C878]" /> University-centered experience</span>
              <span className="inline-flex items-center gap-2"><Sparkles size={15} className="text-[#F5C878]" /> Built around career growth</span>
            </motion.div>
          </div>
          <div className="relative z-10 mt-5 lg:mt-0">
            <HeroExperience />
          </div>
        </div>
        <div className="pace-hero-bottomline" aria-hidden="true" />
      </section>

      <div className="pace-trust-strip">
        <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-center gap-x-9 gap-y-3 px-5 py-5 text-[9px] font-bold tracking-[0.17em] text-[#77666A] sm:px-8 lg:justify-between lg:px-12">
          <span>ONE UNIVERSITY COMMUNITY</span><span className="hidden h-1 w-1 rounded-full bg-[#D5A34F] sm:block" />
          <span>ONE CONNECTED EXPERIENCE</span><span className="hidden h-1 w-1 rounded-full bg-[#D5A34F] sm:block" />
          <span>MORE POSSIBILITIES AHEAD</span>
        </div>
      </div>

      <section id="about" className="pace-about-section mx-auto grid max-w-[1480px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-12 lg:py-32">
        <Reveal>
          <p className="pace-eyebrow">ABOUT THE PLATFORM</p>
          <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl lg:text-[3.6rem]">Career growth, <span className="font-serif font-normal italic text-[#8D1830]">connected.</span></h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="max-w-3xl text-[17px] leading-8 text-[#70666A]">PACE is designed as a shared digital space for career development at MSU-IIT. It brings together the people and experiences that help students prepare for meaningful work and lifelong professional growth.</p>
          <div className="mt-10 grid gap-6 border-t border-[#E8DEDA] pt-8 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Students", "A clearer path from academic experience to professional opportunity."],
              ["Counselors", "A connected way to support guidance and career readiness."],
              ["Employers", "A meaningful bridge to emerging talent and university partnership."],
              ["Mentors", "Experienced professionals sharing insight and practical guidance."],
            ].map(([title, text], index) => (
              <motion.div key={title} initial={reduceMotion ? false : { opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.55, ease }}>
                <p className="text-xl font-semibold tracking-tight text-[#741329]">{title}</p>
                <p className="mt-2 text-xs leading-6 text-[#85797C]">{text}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="experience" className="pace-experience-section relative overflow-hidden py-24 lg:py-28">
        <div className="pace-section-orb" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <p className="pace-eyebrow">A PURPOSEFUL EXPERIENCE</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl lg:text-[3.6rem]">From potential to <span className="font-serif font-normal italic text-[#8D1830]">possibility.</span></h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-md text-sm leading-7 text-[#817579]">A thoughtful career journey is more than a job search. It is the continuous work of discovering, developing, and connecting.</p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {pillars.map(({ icon: Icon, number, title, text }, index) => (
              <Reveal key={number} delay={index * 0.12}>
                <motion.article
                  whileHover={reduceMotion ? undefined : { y: -9, rotateX: 2, rotateY: index === 1 ? 0 : index === 0 ? 2 : -2, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 230, damping: 18 }}
                  className="pace-pillar-card group h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-center justify-between"><span className="font-mono text-[10px] tracking-widest text-[#A99A9B]">{number} / 03</span><span className="pace-pillar-icon"><Icon size={20} /></span></div>
                  <h3 className="mt-14 text-xl font-semibold tracking-tight text-[#34252B]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#83777A]">{text}</p>
                  <div className="mt-8 flex items-center justify-between border-t border-[#EEE5E1] pt-4 text-[9px] font-bold tracking-[0.16em] text-[#9B8589]"><span>YOUR JOURNEY</span><ArrowUpRight size={15} className="transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#7A0016]" /></div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="mx-auto max-w-[1480px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <p className="pace-eyebrow">A PLATFORM FOR THE COMMUNITY</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl lg:text-[3.6rem]">Different roles. <span className="font-serif font-normal italic text-[#8D1830]">One shared direction.</span></h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {audiences.map(({ icon: Icon, eyebrow, title, description }, index) => (
            <Reveal key={eyebrow} delay={index * 0.08}>
              <motion.article whileHover={reduceMotion ? undefined : { y: -7, rotateY: index % 2 === 0 ? 2 : -2 }} transition={{ type: "spring", stiffness: 220, damping: 19 }} className="pace-audience-card h-full">
                <div className="flex items-center justify-between"><span className="text-[9px] font-bold tracking-[0.16em] text-[#A17B49]">{eyebrow}</span><span className="pace-audience-icon"><Icon size={20} /></span></div>
                <h3 className="mt-9 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em] text-[#34252B]">{title}</h3>
                <p className="mt-3 min-h-[84px] text-sm leading-7 text-[#83777A]">{description}</p>
                <Link href="/auth/login" className="mt-7 inline-flex items-center gap-2 text-[11px] font-bold text-[#7A0016] transition-all hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A0016]">Continue to portal <ArrowRight size={15} /></Link>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-28">
        <Reveal>
          <div className="pace-final-cta relative mx-auto max-w-[1480px] overflow-hidden rounded-[2rem] px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
            <div className="pace-cta-orbit pace-cta-orbit-one" aria-hidden="true" />
            <div className="pace-cta-orbit pace-cta-orbit-two" aria-hidden="true" />
            <div className="relative flex flex-col justify-between gap-9 md:flex-row md:items-center">
              <div className="max-w-2xl"><p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#F5C878]">YOUR NEXT STEP STARTS HERE</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">Make your potential count.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/60">Sign in to continue your PACE journey and access the tools available to your account.</p></div>
              <Link href="/auth/login" className="pace-primary-cta shrink-0">Access PACE <ArrowRight size={17} /></Link>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-[#E6DCD8] bg-[#F1EEEA]">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-5 px-5 py-8 text-xs text-[#827579] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E9DFDA] bg-white p-1"><PaceLogo size={29} showText={false} /></span><span><span className="block font-bold tracking-[0.14em] text-[#34252B]">P.A.C.E. · MSU–IIT</span><span className="text-[10px]">Professional Advancement &amp; Career Enhancement</span></span></div>
          <p>Mindanao State University – Iligan Institute of Technology</p>
          <Link href="/auth/login" className="font-semibold text-[#7A0016] hover:underline">Portal sign in</Link>
        </div>
      </footer>
    </main>
  );
}
