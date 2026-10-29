"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GraduationCap,
  UserCog,
  Briefcase,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building2,
  Hash,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Globe,
  Phone,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import PaceLogo from "@/components/PaceLogo";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────── */
interface SelectOption { value: string; label: string; }

/* ─── Constants ──────────────────────────────────────────── */
const PROGRAMS: SelectOption[] = [
  { value: "bsit", label: "BSIT — Information Technology" },
  { value: "bscs", label: "BSCS — Computer Science" },
  { value: "bsece", label: "BSECE — Electronics & Communications Eng." },
  { value: "bsee", label: "BSEE — Electrical Engineering" },
  { value: "bsme", label: "BSME — Mechanical Engineering" },
  { value: "bsce", label: "BSCE — Civil Engineering" },
  { value: "bschem", label: "BSChem — Chemistry" },
  { value: "bsmath", label: "BSMath — Mathematics" },
  { value: "bsphys", label: "BSPhys — Physics" },
  { value: "bsba", label: "BSBA — Business Administration" },
];

const YEAR_LEVELS: SelectOption[] = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year" },
  { value: "grad", label: "Graduate / Alumni" },
];

const DEPARTMENTS: SelectOption[] = [
  { value: "cics", label: "College of Information Technology and Computing Sciences" },
  { value: "coe", label: "College of Engineering" },
  { value: "cns", label: "College of Natural Sciences & Mathematics" },
  { value: "cba", label: "College of Business & Economics" },
  { value: "osa", label: "Office of Student Affairs" },
  { value: "career", label: "Career Development & Placement Office" },
];

const INDUSTRIES: SelectOption[] = [
  { value: "technology", label: "Technology & Software" },
  { value: "finance", label: "Banking & Finance" },
  { value: "bpo", label: "BPO / Customer Service" },
  { value: "engineering", label: "Engineering & Construction" },
  { value: "healthcare", label: "Healthcare & Pharmaceuticals" },
  { value: "education", label: "Education & Training" },
  { value: "government", label: "Government & Public Sector" },
  { value: "manufacturing", label: "Manufacturing & Industry" },
  { value: "retail", label: "Retail & E-Commerce" },
  { value: "media", label: "Media & Communications" },
  { value: "other", label: "Other" },
];

const ROLES = [
  {
    id: "student",
    label: "Student",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "MSU-IIT student or recent graduate",
  },
  {
    id: "counselor",
    label: "Counselor",
    icon: <UserCog className="w-5 h-5" />,
    description: "Faculty or staff career advisor",
  },
  {
    id: "recruiter",
    label: "Recruiter",
    icon: <Briefcase className="w-5 h-5" />,
    description: "Company HR or hiring manager",
  },
];

/* ─── Select Input ───────────────────────────────────────── */
function SelectInput({
  label,
  value,
  onChange,
  options,
  error,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  error?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-white/70">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">{icon}</div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all duration-300 appearance-none ${
            icon ? "pl-10" : ""
          } ${
            error
              ? "border-red-500/60 focus:ring-red-500/20"
              : "border-white/15 focus:border-[#F5A623]/60 focus:ring-[#F5A623]/20"
          }`}
          style={{ colorScheme: "light" }}
        >
          <option value="" disabled className="bg-white text-[#0F172A]">
            Select {label}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-white text-[#0F172A]">
              {o.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 10.5L3 5.5h10L8 10.5z" />
          </svg>
        </div>
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

/* ─── Student Fields ─────────────────────────────────────── */
interface StudentForm {
  firstName: string;
  lastName: string;
  studentId: string;
  program: string;
  yearLevel: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function StudentFields({
  form,
  setForm,
  errors,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: {
  form: StudentForm;
  setForm: React.Dispatch<React.SetStateAction<StudentForm>>;
  errors: Partial<StudentForm>;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (v: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First Name"
          placeholder="Juan"
          value={form.firstName}
          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
          error={errors.firstName}
          icon={<User className="w-4 h-4" />}
        />
        <Input
          label="Last Name"
          placeholder="dela Cruz"
          value={form.lastName}
          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          error={errors.lastName}
          icon={<User className="w-4 h-4" />}
        />
      </div>
      <Input
        label="Student ID"
        placeholder="2021-1234"
        value={form.studentId}
        onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))}
        error={errors.studentId}
        icon={<Hash className="w-4 h-4" />}
        hint="Format: YYYY-XXXX"
      />
      <SelectInput
        label="Program"
        value={form.program}
        onChange={(v) => setForm((f) => ({ ...f, program: v }))}
        options={PROGRAMS}
        error={errors.program}
        icon={<BookOpen className="w-4 h-4" />}
      />
      <SelectInput
        label="Year Level"
        value={form.yearLevel}
        onChange={(v) => setForm((f) => ({ ...f, yearLevel: v }))}
        options={YEAR_LEVELS}
        error={errors.yearLevel}
        icon={<Layers className="w-4 h-4" />}
      />
      <Input
        label="MSU-IIT Email"
        type="email"
        placeholder="juandelacruz@g.msuiit.edu.ph"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        error={errors.email}
        icon={<Mail className="w-4 h-4" />}
        hint="Must end with @g.msuiit.edu.ph"
      />
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Create a strong password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        error={errors.password}
        icon={<Lock className="w-4 h-4" />}
        hint="At least 8 characters"
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-white/40 hover:text-white/70 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />
      <Input
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Repeat your password"
        value={form.confirmPassword}
        onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
        error={errors.confirmPassword}
        icon={<Lock className="w-4 h-4" />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-white/40 hover:text-white/70 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />
    </div>
  );
}

/* ─── Counselor Fields ───────────────────────────────────── */
interface CounselorForm {
  firstName: string;
  lastName: string;
  employeeId: string;
  department: string;
  specialization: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function CounselorFields({
  form,
  setForm,
  errors,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: {
  form: CounselorForm;
  setForm: React.Dispatch<React.SetStateAction<CounselorForm>>;
  errors: Partial<CounselorForm>;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (v: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First Name"
          placeholder="Maria"
          value={form.firstName}
          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
          error={errors.firstName}
          icon={<User className="w-4 h-4" />}
        />
        <Input
          label="Last Name"
          placeholder="Santos"
          value={form.lastName}
          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          error={errors.lastName}
          icon={<User className="w-4 h-4" />}
        />
      </div>
      <Input
        label="Employee ID"
        placeholder="MSU-EMP-0001"
        value={form.employeeId}
        onChange={(e) => setForm((f) => ({ ...f, employeeId: e.target.value }))}
        error={errors.employeeId}
        icon={<Hash className="w-4 h-4" />}
      />
      <SelectInput
        label="Department / College"
        value={form.department}
        onChange={(v) => setForm((f) => ({ ...f, department: v }))}
        options={DEPARTMENTS}
        error={errors.department}
        icon={<Building2 className="w-4 h-4" />}
      />
      <Input
        label="Specialization / Expertise"
        placeholder="e.g. Career Counseling, IT Careers, Engineering"
        value={form.specialization}
        onChange={(e) => setForm((f) => ({ ...f, specialization: e.target.value }))}
        error={errors.specialization}
        icon={<BookOpen className="w-4 h-4" />}
      />
      <Input
        label="Institutional Email"
        type="email"
        placeholder="name@msuiit.edu.ph"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        error={errors.email}
        icon={<Mail className="w-4 h-4" />}
        hint="Must be an @msuiit.edu.ph address"
      />
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Create a strong password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        error={errors.password}
        icon={<Lock className="w-4 h-4" />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-white/40 hover:text-white/70 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />
      <Input
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Repeat your password"
        value={form.confirmPassword}
        onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
        error={errors.confirmPassword}
        icon={<Lock className="w-4 h-4" />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-white/40 hover:text-white/70 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />
    </div>
  );
}

/* ─── Recruiter Fields ───────────────────────────────────── */
interface RecruiterForm {
  firstName: string;
  lastName: string;
  companyName: string;
  position: string;
  companyEmail: string;
  industry: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

function RecruiterFields({
  form,
  setForm,
  errors,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: {
  form: RecruiterForm;
  setForm: React.Dispatch<React.SetStateAction<RecruiterForm>>;
  errors: Partial<RecruiterForm>;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (v: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First Name"
          placeholder="Carlo"
          value={form.firstName}
          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
          error={errors.firstName}
          icon={<User className="w-4 h-4" />}
        />
        <Input
          label="Last Name"
          placeholder="Reyes"
          value={form.lastName}
          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          error={errors.lastName}
          icon={<User className="w-4 h-4" />}
        />
      </div>
      <Input
        label="Company Name"
        placeholder="TechCorp Philippines Inc."
        value={form.companyName}
        onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
        error={errors.companyName}
        icon={<Building2 className="w-4 h-4" />}
      />
      <Input
        label="Your Position / Role"
        placeholder="HR Manager / Senior Recruiter"
        value={form.position}
        onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
        error={errors.position}
        icon={<Briefcase className="w-4 h-4" />}
      />
      <Input
        label="Company Email"
        type="email"
        placeholder="hr@techcorp.com.ph"
        value={form.companyEmail}
        onChange={(e) => setForm((f) => ({ ...f, companyEmail: e.target.value }))}
        error={errors.companyEmail}
        icon={<Mail className="w-4 h-4" />}
        hint="Use your official company email"
      />
      <SelectInput
        label="Industry"
        value={form.industry}
        onChange={(v) => setForm((f) => ({ ...f, industry: v }))}
        options={INDUSTRIES}
        error={errors.industry}
        icon={<Globe className="w-4 h-4" />}
      />
      <Input
        label="Phone Number (Optional)"
        type="tel"
        placeholder="+63 9XX XXX XXXX"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        icon={<Phone className="w-4 h-4" />}
      />
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Create a strong password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        error={errors.password}
        icon={<Lock className="w-4 h-4" />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-white/40 hover:text-white/70 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />
      <Input
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Repeat your password"
        value={form.confirmPassword}
        onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
        error={errors.confirmPassword}
        icon={<Lock className="w-4 h-4" />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-white/40 hover:text-white/70 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />
    </div>
  );
}

/* ─── Register Page ──────────────────────────────────────── */
export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const [activeRole, setActiveRole] = useState<string>(
    ROLES.find((r) => r.id === roleParam)?.id ?? "student"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Student form state
  const [studentForm, setStudentForm] = useState<StudentForm>({
    firstName: "", lastName: "", studentId: "", program: "",
    yearLevel: "", email: "", password: "", confirmPassword: "",
  });
  const [studentErrors, setStudentErrors] = useState<Partial<StudentForm>>({});

  // Counselor form state
  const [counselorForm, setCounselorForm] = useState<CounselorForm>({
    firstName: "", lastName: "", employeeId: "", department: "",
    specialization: "", email: "", password: "", confirmPassword: "",
  });
  const [counselorErrors, setCounselorErrors] = useState<Partial<CounselorForm>>({});

  // Recruiter form state
  const [recruiterForm, setRecruiterForm] = useState<RecruiterForm>({
    firstName: "", lastName: "", companyName: "", position: "",
    companyEmail: "", industry: "", phone: "", password: "", confirmPassword: "",
  });
  const [recruiterErrors, setRecruiterErrors] = useState<Partial<RecruiterForm>>({});

  useEffect(() => {
    setStudentErrors({});
    setCounselorErrors({});
    setRecruiterErrors({});
  }, [activeRole]);

  const validateStudent = (): boolean => {
    const errors: Partial<StudentForm> = {};
    if (!studentForm.firstName) errors.firstName = "Required";
    if (!studentForm.lastName) errors.lastName = "Required";
    if (!studentForm.studentId) errors.studentId = "Student ID is required";
    else if (!/^\d{4}-\d{4,}$/.test(studentForm.studentId)) errors.studentId = "Format: YYYY-XXXX";
    if (!studentForm.program) errors.program = "Select a program";
    if (!studentForm.yearLevel) errors.yearLevel = "Select year level";
    if (!studentForm.email) errors.email = "Email is required";
    else if (!studentForm.email.endsWith("@g.msuiit.edu.ph")) errors.email = "Must be @g.msuiit.edu.ph";
    if (!studentForm.password) errors.password = "Password is required";
    else if (studentForm.password.length < 8) errors.password = "At least 8 characters";
    if (studentForm.confirmPassword !== studentForm.password) errors.confirmPassword = "Passwords do not match";
    setStudentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCounselor = (): boolean => {
    const errors: Partial<CounselorForm> = {};
    if (!counselorForm.firstName) errors.firstName = "Required";
    if (!counselorForm.lastName) errors.lastName = "Required";
    if (!counselorForm.employeeId) errors.employeeId = "Employee ID is required";
    if (!counselorForm.department) errors.department = "Select a department";
    if (!counselorForm.specialization) errors.specialization = "Specialization is required";
    if (!counselorForm.email) errors.email = "Email is required";
    else if (!counselorForm.email.endsWith("@msuiit.edu.ph")) errors.email = "Must be @msuiit.edu.ph";
    if (!counselorForm.password) errors.password = "Password is required";
    else if (counselorForm.password.length < 8) errors.password = "At least 8 characters";
    if (counselorForm.confirmPassword !== counselorForm.password) errors.confirmPassword = "Passwords do not match";
    setCounselorErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRecruiter = (): boolean => {
    const errors: Partial<RecruiterForm> = {};
    if (!recruiterForm.firstName) errors.firstName = "Required";
    if (!recruiterForm.lastName) errors.lastName = "Required";
    if (!recruiterForm.companyName) errors.companyName = "Company name is required";
    if (!recruiterForm.position) errors.position = "Position is required";
    if (!recruiterForm.companyEmail) errors.companyEmail = "Company email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recruiterForm.companyEmail)) errors.companyEmail = "Invalid email";
    if (!recruiterForm.industry) errors.industry = "Select an industry";
    if (!recruiterForm.password) errors.password = "Password is required";
    else if (recruiterForm.password.length < 8) errors.password = "At least 8 characters";
    if (recruiterForm.confirmPassword !== recruiterForm.password) errors.confirmPassword = "Passwords do not match";
    setRecruiterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = false;
    if (activeRole === "student") valid = validateStudent();
    else if (activeRole === "counselor") valid = validateCounselor();
    else if (activeRole === "recruiter") valid = validateRecruiter();

    if (!valid) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsLoading(false);
    router.push(`/auth/login?role=${activeRole}&registered=true`);
  };

  const currentRole = ROLES.find((r) => r.id === activeRole)!;

  return (
    <div className="register-page min-h-screen relative flex items-center justify-center overflow-hidden bg-[#EEF2F6] text-[#0F172A]">
      {/* Background */}
    <div className="myiit-header-gradient absolute inset-x-0 top-0 h-20" />

      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-4 sm:left-8 z-20"
      >
        <Link
          href="/auth/login"
          className="flex items-center gap-2 text-stone-200 hover:text-white text-xs font-bold transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Sign In
        </Link>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20"
      >
        <PaceLogo size={42} variant="dark" />
      </motion.div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-28 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8 space-y-2">
            <Badge variant="gold" className="flex items-center gap-2 mx-auto w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Create Account
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Create your <span className="text-[#7A0016]">PACE</span> account
            </h1>
            <p className="text-[#64748B] text-sm">
              Register as {currentRole.label} — {currentRole.description}
            </p>
          </div>

          <div className="myiit-card p-6 sm:p-8 space-y-6">
            {/* Role Tabs (no superadmin for self-registration) */}
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-3">
                I am a...
              </div>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setActiveRole(role.id)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-xs font-medium transition-all duration-300 border ${
                      activeRole === role.id
                        ? "bg-[#7A0016] text-white border-[#9B0020] shadow-lg shadow-[#7A0016]/20"
                        : "text-[#475569] border-[#D1D5DB] bg-[#F8FAFC] hover:border-[#9B0020] hover:text-[#7A0016] hover:bg-white"
                    }`}
                  >
                    {role.icon}
                    <span>{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Fields */}
            <AnimatePresence mode="wait">
              <motion.form
                key={activeRole}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {activeRole === "student" && (
                  <StudentFields
                    form={studentForm}
                    setForm={setStudentForm}
                    errors={studentErrors}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                  />
                )}
                {activeRole === "counselor" && (
                  <CounselorFields
                    form={counselorForm}
                    setForm={setCounselorForm}
                    errors={counselorErrors}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                  />
                )}
                {activeRole === "recruiter" && (
                  <RecruiterFields
                    form={recruiterForm}
                    setForm={setRecruiterForm}
                    errors={recruiterErrors}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                  />
                )}

                {/* Terms */}
                <p className="text-xs text-white/35 text-center">
                  By registering, you agree to the{" "}
                  <a href="#" className="text-[#F5A623] hover:underline">Terms of Use</a>{" "}
                  and{" "}
                  <a href="#" className="text-[#F5A623] hover:underline">Privacy Policy</a>{" "}
                  of PACE MSU-IIT.
                </p>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    <>
                      Create {currentRole.label} Account
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.form>
            </AnimatePresence>

            <div className="text-center text-sm text-white/50">
              Already have an account?{" "}
              <Link
                href={`/auth/login?role=${activeRole}`}
                className="text-[#F5A623] hover:text-[#FFD700] font-medium transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
