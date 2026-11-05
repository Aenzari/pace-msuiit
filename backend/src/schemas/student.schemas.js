import { z } from "zod";

export const updateStudentProfileSchema = z.object({
  firstName: z.string().trim().min(1).max(100).optional(),
  lastName: z.string().trim().min(1).max(100).optional(),
  studentNumber: z.string().trim().min(1).max(50).optional(),
  course: z.string().trim().min(1).max(150).optional(),
  yearLevel: z.number().int().min(1).max(10).optional(),
  phone: z.string().trim().min(7).max(30).optional(),
  address: z.string().trim().min(1).max(300).optional()
}).strict().refine((profile) => Object.keys(profile).length > 0, {
  message: "At least one profile field is required"
});
