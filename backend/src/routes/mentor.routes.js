import { Router } from 'express';
import { createMentorController } from '../controllers/mentor.controller.js';

export function createMentorRouter({ db, auth }) {
  const router = Router();
  const controller = createMentorController({ db });

  router.get(
    '/me/profile',
    auth.optionalAuth,
    auth.requireAuth,
    auth.requireRole('mentor'),
    controller.getProfile
  );

  router.patch(
    '/me/profile',
    auth.optionalAuth,
    auth.requireAuth,
    auth.requireRole('mentor'),
    controller.updateProfile
  );

  return router;
}

