import { z } from 'zod';

export const updateCounselorProfileSchema = z.object({
  department: z.string().trim().min(1).max(150).optional(),
  phone: z.string().trim().min(7).max(30).optional(),
  isAvailable: z.boolean().optional()
}).strict().refine((profile) => Object.keys(profile).length > 0, {
  message: 'At least one profile field is required'
});

