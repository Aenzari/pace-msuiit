import type { BackendRole } from "@/lib/api/types";

/** Backend role identifiers and their corresponding frontend workspace routes. */
export const ROLE_DASHBOARD_PATHS: Record<BackendRole, string> = {
  student: "/dashboard/student",
  counselor: "/dashboard/counselor",
  recruiter: "/dashboard/recruiter",
  mentor: "/dashboard/mentor",
  admin: "/dashboard/superadmin",
  superadmin: "/dashboard/superadmin",
};

export const ROLE_LABELS: Record<BackendRole, string> = {
  student: "Student",
  counselor: "Career Counselor",
  recruiter: "Recruiter",
  mentor: "Industry Mentor",
  admin: "Administrator",
  superadmin: "Super Administrator",
};
