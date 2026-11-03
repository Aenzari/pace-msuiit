import { Router } from 'express';
import { createAuthController } from '../controllers/auth.controller.js';

export function createAuthRouter({ db, config, auth }) {
  const router = Router();
  const controller = createAuthController({ db, config });

  router.post('/register/student', controller.registerStudent);
  router.post('/register/counselor', controller.registerCounselor);
  router.post('/register/recruiter', controller.registerRecruiter);
  router.post('/register/admin', controller.registerAdmin);
  router.post('/login', controller.login);
  router.post('/logout', auth.optionalAuth, controller.logout);
  router.get('/me', auth.optionalAuth, controller.getCurrentUser);
  router.post(
    '/invitations',
    auth.optionalAuth,
    auth.requireRole('admin', 'superadmin'),
    controller.createUserInvitation
  );
  router.get(
    '/admin-check',
    auth.optionalAuth,
    auth.requireRole('admin', 'superadmin'),
    controller.adminCheck
  );

  return router;
}
