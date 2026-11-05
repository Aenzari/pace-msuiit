import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(128)
});

export const studentRegistrationSchema = credentialsSchema.extend({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  studentNumber: z.string().trim().min(1).max(50),
  course: z.string().trim().min(1).max(150),
  yearLevel: z.number().int().min(1).max(10),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(1).max(300)
});

export const counselorRegistrationSchema = credentialsSchema.extend({
  token: z.string().min(20),
  employeeId: z.string().trim().min(1).max(50),
  department: z.string().trim().min(1).max(150),
  phone: z.string().trim().min(7).max(30)
});

export const recruiterRegistrationSchema = credentialsSchema.extend({
  token: z.string().min(20),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  companyId: z.string().uuid(),
  jobTitle: z.string().trim().min(1).max(150),
  phone: z.string().trim().min(7).max(30)
});

export const adminRegistrationSchema = credentialsSchema.extend({
  token: z.string().min(20)
});

export const createInvitationSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase()),
  role: z.enum(["counselor", "recruiter", "admin"])
});
