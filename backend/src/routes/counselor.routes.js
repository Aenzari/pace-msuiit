import { Router } from 'express';
import { createCounselorController } from '../controllers/counselor.controller.js';

export function createCounselorRouter({ db, auth }) {
  const router = Router();
  const controller = createCounselorController({ db });

  router.get(
    '/me/profile',
    auth.optionalAuth,
    auth.requireAuth,
    auth.requireRole('counselor'),
    controller.getProfile
  );

  router.patch(
    '/me/profile',
    auth.optionalAuth,
    auth.requireAuth,
    auth.requireRole('counselor'),
    controller.updateProfile
  );

  return router;
}

