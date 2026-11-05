import { z } from 'zod';

export const updateMentorProfileSchema = z.object({
  firstName: z.string().trim().min(1).max(100).optional(),
  lastName: z.string().trim().min(1).max(100).optional(),
  professionalTitle: z.string().trim().min(1).max(150).optional(),
  companyName: z.string().trim().min(1).max(200).optional(),
  industry: z.string().trim().min(1).max(150).optional(),
  biography: z.string().trim().min(1).max(2000).optional(),
  expertise: z.string().trim().min(1).max(1000).optional(),
  phone: z.string().trim().min(7).max(30).optional(),
  maxMentees: z.number().int().min(1).max(50).optional(),
  availabilityNotes: z.string().trim().min(1).max(500).nullable().optional()
}).strict().refine((profile) => Object.keys(profile).length > 0, {
  message: 'At least one profile field is required'
});

