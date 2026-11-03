import { Router } from 'express';
import { createStudentController } from '../controllers/student.controller.js';

export function createStudentRouter({ db, auth }) {
  const router = Router();
  const controller = createStudentController({ db });

  router.patch(
    '/me/profile',
    auth.optionalAuth,
    auth.requireAuth,
    auth.requireRole('student'),
    controller.updateProfile
  );

  return router;
}
