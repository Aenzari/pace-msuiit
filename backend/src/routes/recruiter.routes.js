import { Router } from 'express';
import { createRecruiterController } from '../controllers/recruiter.controller.js';

export function createRecruiterRouter({ db, auth }) {
  const router = Router();
  const controller = createRecruiterController({ db });

  router.get(
    '/me/profile',
    auth.optionalAuth,
    auth.requireAuth,
    auth.requireRole('recruiter'),
    controller.getProfile
  );

  router.patch(
    '/me/profile',
    auth.optionalAuth,
    auth.requireAuth,
    auth.requireRole('recruiter'),
    controller.updateProfile
  );

  return router;
}

