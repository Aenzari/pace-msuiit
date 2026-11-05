import {
  getCounselorProfile as getCounselorProfileRecord,
  updateCounselorProfile as updateCounselorProfileRecord
} from '../services/counselor.service.js';
import { updateCounselorProfileSchema } from '../schemas/counselor.schemas.js';

export function createCounselorController({ db }) {
  async function getProfile(req, res, next) {
    try {
      const profile = await getCounselorProfileRecord({ db, userId: req.user.id });
      res.json({ profile });
    } catch (error) {
      next(error);
    }
  }

  async function updateProfile(req, res, next) {
    try {
      const profile = updateCounselorProfileSchema.parse(req.body);
      const updatedProfile = await updateCounselorProfileRecord({
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

