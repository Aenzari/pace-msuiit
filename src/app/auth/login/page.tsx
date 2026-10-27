"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Compass,
  Briefcase,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronLeft,
  AlertCircle
} from "lucide-react";
import PaceLogo from "@/components/PaceLogo";

interface RoleConfig {
  id: string;
  label: string;
  affiliation: string;
  icon: any;
  emailHint: string;
  emailPlaceholder: string;
  dashboardRoute: string;
}

const roles: RoleConfig[] = [
  {
    id: "student",
    label: "College Student",
    affiliation: "Undergraduate / Graduate",
    icon: GraduationCap,
    emailHint: "Format: givenname.lastname@g.msuiit.edu.ph",
    emailPlaceholder: "alexandra.reyes@g.msuiit.edu.ph",
    dashboardRoute: "/dashboard/student",
  },
  {
    id: "counselor",
    label: "Career Counselor",
    affiliation: "Guidance & Faculty Staff",
    icon: Compass,
    emailHint: "Official MSU-IIT faculty account",
    emailPlaceholder: "maria.santos@g.msuiit.edu.ph",
    dashboardRoute: "/dashboard/counselor",
  },
  {
    id: "recruiter",
    label: "Corporate Recruiter",
    affiliation: "Industry Hiring Partner",
    icon: Briefcase,
    emailHint: "Verified corporate enterprise email",
    emailPlaceholder: "s.jenkins@techcorp.ph",
    dashboardRoute: "/dashboard/recruiter",
  },
  {
    id: "superadmin",
    label: "Super Administrator",
    affiliation: "Career Center Executive",
    icon: ShieldCheck,
    emailHint: "Executive administrative credentials",
    emailPlaceholder: "director.santos@g.msuiit.edu.ph",
    dashboardRoute: "/dashboard/superadmin",
  },
];

const DEMO_SUPERADMIN = {
  email: "superadmin@msuiit.edu.ph",
  password: "PACEadmin2026!",
};

export default function AuthenticMyIITLoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("student");
  const [email, setEmail] = useState<string>("alexandra.reyes@g.msuiit.edu.ph");
  const [password, setPassword] = useState<string>("••••••••••••");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const currentRole = roles.find((r) => r.id === selectedRole) || roles[0];

  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId);
    setAuthError("");
    const target = roles.find((r) => r.id === roleId);
    if (target) {
      setEmail(roleId === "superadmin" ? DEMO_SUPERADMIN.email : target.emailPlaceholder);
      setPassword(roleId === "superadmin" ? DEMO_SUPERADMIN.password : "");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      selectedRole === "superadmin" &&
      (email !== DEMO_SUPERADMIN.email || password !== DEMO_SUPERADMIN.password)
    ) {
      setAuthError("Use the generated demo SuperAdmin credentials shown below.");
      return;
    }

    setAuthError("");
    setIsLoading(true);
    setTimeout(() => {
      router.push(currentRole.dashboardRoute);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#EEF2F6] text-[#0F172A] flex flex-col justify-between font-sans selection:bg-[#F5A623] selection:text-white">
      {/* Top Header */}
      <header className="myiit-header-gradient text-white px-4 sm:px-8 py-3 shadow-md flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-stone-200 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Career Portal Gateway</span>
        </Link>
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#FFD700]">
          <span>My.IIT Central Authentication Gateway</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-white border border-[#D1D5DB] rounded-xl shadow-md p-6 sm:p-8 space-y-6">
          
          <div className="text-center space-y-2 border-b border-[#E2E8F0] pb-5">
            <div className="w-14 h-14 mx-auto rounded-lg bg-white p-1 shadow-xs border border-[#D1D5DB] flex items-center justify-center">
              <PaceLogo size={44} showText={false} />
            </div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">
              Sign In to P.A.C.E.
            </h1>
            <p className="text-xs text-[#64748B]">
              Mindanao State University – Iligan Institute of Technology
            </p>
          </div>

          {/* Affiliation Selector */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Select Designated Affiliation:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {roles.map((r) => {
                const isSelected = selectedRole === r.id;
                const IconComponent = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleChange(r.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all btn-press flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#7A0016] text-white border-[#5C0011] shadow-xs"
                        : "bg-[#F8FAFC] text-[#334155] border-[#D1D5DB] hover:border-[#9CA3AF] hover:bg-white"
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 mb-2 ${isSelected ? "text-[#FFD700]" : "text-[#7A0016]"}`} />
                    <div>
                      <div className="text-xs font-bold leading-tight">{r.label}</div>
                      <div className={`text-[9px] truncate ${isSelected ? "text-stone-200" : "text-[#64748B]"}`}>
                        {r.affiliation}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="block font-bold text-[#334155]">
                Username or University Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={currentRole.emailPlaceholder}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#D1D5DB] bg-white text-[#0F172A] font-medium focus:border-[#7A0016] focus:ring-1 focus:ring-[#7A0016] focus:outline-none transition-all"
                />
              </div>
              <p className="text-[11px] text-[#7A0016] font-medium flex items-center gap-1 pt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {selectedRole === "superadmin"
                  ? `Demo account: ${DEMO_SUPERADMIN.email}`
                  : currentRole.emailHint}
              </p>
              {selectedRole === "superadmin" && (
                <p className="text-[11px] text-[#64748B]">
                  Password: <span className="font-mono font-semibold text-[#334155]">{DEMO_SUPERADMIN.password}</span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#334155]">Password</label>
                <a href="#" className="text-[11px] font-semibold text-[#7A0016] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-[#D1D5DB] bg-white text-[#0F172A] font-medium focus:border-[#7A0016] focus:ring-1 focus:ring-[#7A0016] focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#94A3B8] hover:text-[#334155]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {authError && (
              <p role="alert" className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-myiit-primary w-full py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <span>Validating credentials...</span>
              ) : (
                <>
                  <span>Sign In as {currentRole.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#FFD700]" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#64748B] border-t border-[#E2E8F0]">
            {selectedRole === "superadmin" ? (
              <span>Super Administrator accounts are generated by the MSU-IIT Career Center.</span>
            ) : (
              <>
                Don't have an active account?{" "}
                <Link href="/auth/register" className="font-bold text-[#7A0016] hover:underline">
                  Register as New {currentRole.label}
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-[#64748B] border-t border-[#D1D5DB] bg-white">
        © 2026 Mindanao State University – Iligan Institute of Technology. All Rights Reserved.
      </footer>
    </div>
  );
}
