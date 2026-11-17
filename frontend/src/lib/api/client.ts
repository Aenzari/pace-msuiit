import type {
  ApiErrorBody,
  AuthUserResponse,
  CounselorRegistrationPayload,
  CurrentUserResponse,
  LoginPayload,
  RecruiterRegistrationPayload,
  StudentRegistrationPayload,
  StudentProfile,
  StudentProfileUpdate,
  CounselorProfile,
  CounselorProfileUpdate,
  RecruiterProfile,
  RecruiterProfileUpdate,
  MentorProfile,
  MentorProfileUpdate,
} from "./types";

/**
 * API origin, not an endpoint path.
 *
 * Local backend default follows backend/src/config.js (port 3000), while the
 * Next.js frontend commonly runs on port 3001. Set
 * NEXT_PUBLIC_API_BASE_URL to the deployed backend origin in each environment.
 */
const API_ORIGIN = (process.env.NEXT_PUBLIC_API_BASE_URL || (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "")).replace(/\/$/, "");
const API_PREFIX = "/api";

export class ApiError extends Error {
  status: number;
  code?: string;
  issues?: ApiErrorBody["issues"];

  constructor(message: string, status: number, body?: ApiErrorBody) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = body?.error;
    this.issues = body?.issues;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;

  try {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");
    if (init.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    response = await fetch(`${API_ORIGIN}${API_PREFIX}${path}`, {
      ...init,
      credentials: "include",
      headers,
    });
  } catch {
    throw new ApiError(
      "Unable to reach PACE services. Check your connection and try again.",
      0
    );
  }

  if (response.status === 204) return undefined as T;

  const body = await response.json().catch(() => ({})) as ApiErrorBody & T;
  if (!response.ok) {
    throw new ApiError(
      body.message || "The request could not be completed.",
      response.status,
      body
    );
  }

  return body as T;
}

export const authApi = {
  login(payload: LoginPayload) {
    return request<AuthUserResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  logout() {
    return request<void>("/auth/logout", { method: "POST" });
  },

  currentUser() {
    return request<CurrentUserResponse>("/auth/me", { method: "GET" });
  },

  registerStudent(payload: StudentRegistrationPayload) {
    return request<AuthUserResponse>("/auth/register/student", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  registerCounselor(payload: CounselorRegistrationPayload) {
    return request<AuthUserResponse>("/auth/register/counselor", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  registerRecruiter(payload: RecruiterRegistrationPayload) {
    return request<AuthUserResponse>("/auth/register/recruiter", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  studentProfile() {
    return request<{ profile: StudentProfile }>("/students/me/profile");
  },
  updateStudentProfile(payload: StudentProfileUpdate) {
    return request<{ profile: StudentProfile }>("/students/me/profile", {
      method: "PATCH", body: JSON.stringify(payload),
    });
  },
  counselorProfile() {
    return request<{ profile: CounselorProfile }>("/counselors/me/profile");
  },
  updateCounselorProfile(payload: CounselorProfileUpdate) {
    return request<{ profile: CounselorProfile }>("/counselors/me/profile", {
      method: "PATCH", body: JSON.stringify(payload),
    });
  },
  recruiterProfile() {
    return request<{ profile: RecruiterProfile }>("/recruiters/me/profile");
  },
  updateRecruiterProfile(payload: RecruiterProfileUpdate) {
    return request<{ profile: RecruiterProfile }>("/recruiters/me/profile", {
      method: "PATCH", body: JSON.stringify(payload),
    });
  },
  mentorProfile() {
    return request<{ profile: MentorProfile }>("/mentors/me/profile");
  },
  updateMentorProfile(payload: MentorProfileUpdate) {
    return request<{ profile: MentorProfile }>("/mentors/me/profile", {
      method: "PATCH", body: JSON.stringify(payload),
    });
  },
};
