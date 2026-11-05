import {
  getRecruiterProfile as getRecruiterProfileRecord,
  updateRecruiterProfile as updateRecruiterProfileRecord
} from '../services/recruiter.service.js';
import { updateRecruiterProfileSchema } from '../schemas/recruiter.schemas.js';

export function createRecruiterController({ db }) {
  async function getProfile(req, res, next) {
    try {
      const profile = await getRecruiterProfileRecord({ db, userId: req.user.id });
      res.json({ profile });
    } catch (error) {
      next(error);
    }
  }

  async function updateProfile(req, res, next) {
    try {
      const profile = updateRecruiterProfileSchema.parse(req.body);
      const updatedProfile = await updateRecruiterProfileRecord({
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

