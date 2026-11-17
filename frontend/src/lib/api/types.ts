/**
 * PACE API contract types.
 *
 * Keep property names aligned with backend/src/schemas/auth.schemas.js and
 * backend/src/controllers/auth.controller.js. Do not rename these fields to
 * match UI labels; map UI labels at the component boundary instead.
 */
export type BackendRole = "student" | "counselor" | "recruiter" | "mentor" | "admin" | "superadmin";

export interface AuthUser {
  id: string;
  email: string;
  role: BackendRole;
  createdAt?: string;
}

export interface AuthUserResponse {
  user: AuthUser;
}

export interface CurrentUserResponse {
  user: AuthUser | null;
}

export interface ApiErrorBody {
  error?: string;
  message?: string;
  issues?: Array<{
    code?: string;
    path?: Array<string | number>;
    message?: string;
  }>;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface StudentRegistrationPayload extends LoginPayload {
  firstName: string;
  lastName: string;
  studentNumber: string;
  course: string;
  yearLevel: number;
  phone: string;
  address: string;
}

export interface CounselorRegistrationPayload extends LoginPayload {
  token: string;
  employeeId: string;
  department: string;
  phone: string;
}

export interface RecruiterRegistrationPayload extends LoginPayload {
  token: string;
  firstName: string;
  lastName: string;
  companyId: string;
  jobTitle: string;
  phone: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  studentNumber: string;
  firstName: string;
  lastName: string;
  course: string;
  yearLevel: number;
  gpa?: string | number | null;
  phone: string;
  address: string;
  bio?: string | null;
  location?: string | null;
  careerStatus?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type StudentProfileUpdate = Partial<Pick<
  StudentProfile,
  "firstName" | "lastName" | "studentNumber" | "course" | "yearLevel" | "phone" | "address"
>>;

export interface CounselorProfile {
  id: string;
  userId: string;
  employeeId: string;
  department: string;
  phone: string;
  isAvailable: boolean;
}

export type CounselorProfileUpdate = Partial<Pick<
  CounselorProfile,
  "department" | "phone" | "isAvailable"
>>;

export interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  description?: string | null;
  website?: string | null;
  location?: string | null;
  verificationStatus: string;
  createdAt?: string;
}

export interface RecruiterProfile {
  id: string;
  userId: string;
  companyId: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  phone: string;
  approvalStatus: string;
  company: CompanyProfile;
}

export type RecruiterProfileUpdate = Partial<Pick<
  RecruiterProfile,
  "firstName" | "lastName" | "jobTitle" | "phone"
>>;

export interface MentorProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  professionalTitle: string;
  companyName: string;
  industry: string;
  biography: string;
  expertise: string;
  phone: string;
  maxMentees: number;
  availabilityNotes?: string | null;
}

export type MentorProfileUpdate = Partial<Pick<
  MentorProfile,
  "firstName" | "lastName" | "professionalTitle" | "companyName" | "industry" |
  "biography" | "expertise" | "phone" | "maxMentees" | "availabilityNotes"
>>;
