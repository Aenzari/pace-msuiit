/**
 * PACE API contract types.
 *
 * Keep property names aligned with backend/src/schemas/auth.schemas.js and
 * backend/src/controllers/auth.controller.js. Do not rename these fields to
 * match UI labels; map UI labels at the component boundary instead.
 */
export type BackendRole = "student" | "counselor" | "recruiter" | "admin" | "superadmin";

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
