import {
  getStudentProfile as getStudentProfileRecord,
  updateStudentProfile as updateStudentProfileRecord
} from '../services/student.service.js';
import { updateStudentProfileSchema } from '../schemas/student.schemas.js';

function mapUniqueConstraintError(error) {
  if (error.code !== '23505' && error.code !== 'P2002') return error;

  const target = Array.isArray(error.meta?.target)
    ? error.meta.target.join(',')
    : `${error.constraint || ''} ${error.detail || ''}`;
  if (target.toLowerCase().includes('school_id') || target.toLowerCase().includes('schoolid')) {
    error.status = 409;
    error.code = 'SCHOOL_ID_ALREADY_REGISTERED';
    error.message = 'School ID is already registered';
  }
  return error;
}

export function createStudentController({ db }) {
  async function getProfile(req, res, next) {
    try {
      const profile = await getStudentProfileRecord({ db, userId: req.user.id });
      res.json({ profile });
    } catch (error) {
      next(error);
    }
  }

  async function updateProfile(req, res, next) {
    try {
      const profile = updateStudentProfileSchema.parse(req.body);
      const updatedProfile = await updateStudentProfileRecord({
        db,
        userId: req.user.id,
        profile
      });
      res.json({ profile: updatedProfile });
    } catch (error) {
      next(mapUniqueConstraintError(error));
    }
  }

  return { getProfile, updateProfile };
}
