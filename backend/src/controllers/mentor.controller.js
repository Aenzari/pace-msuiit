import {
  getMentorProfile as getMentorProfileRecord,
  updateMentorProfile as updateMentorProfileRecord
} from '../services/mentor.service.js';
import { updateMentorProfileSchema } from '../schemas/mentor.schemas.js';

export function createMentorController({ db }) {
  async function getProfile(req, res, next) {
    try {
      const profile = await getMentorProfileRecord({ db, userId: req.user.id });
      res.json({ profile });
    } catch (error) {
      next(error);
    }
  }

  async function updateProfile(req, res, next) {
    try {
      const profile = updateMentorProfileSchema.parse(req.body);
      const updatedProfile = await updateMentorProfileRecord({
        db,
        userId: req.user.id,
        profile
      });
      res.json({ profile: updatedProfile });
    } catch (error) {
      next(error);
    }
  }

  return { getProfile, updateProfile };
}

