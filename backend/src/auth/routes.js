import { Router } from 'express';
import { z } from 'zod';
import { serialize } from 'cookie';
import {
  authenticate,
  createInvitation,
  createSession,
  destroySession,
  registerInvitedProfile,
  registerStudent
} from './service.js';

const credentialsSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(128)
});
const studentRegistrationSchema = credentialsSchema.extend({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  schoolId: z.string().trim().min(1).max(50),
  course: z.string().trim().min(1).max(150),
  yearLevel: z.number().int().min(1).max(10),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(1).max(300)
});
const counselorRegistrationSchema = credentialsSchema.extend({
  token: z.string().min(20),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  employeeId: z.string().trim().min(1).max(50),
  phone: z.string().trim().min(7).max(30)
});
const recruiterRegistrationSchema = credentialsSchema.extend({
  token: z.string().min(20),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  companyName: z.string().trim().min(1).max(150),
  companyId: z.string().trim().min(1).max(50),
  jobTitle: z.string().trim().min(1).max(150),
  phone: z.string().trim().min(7).max(30)
});
const createInvitationSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase()),
  role: z.enum(['counselor', 'recruiter', 'admin'])
});

function setSessionCookie(res, token, expiresAt, secure) {
  res.setHeader('Set-Cookie', serialize('pace_session', token, {
    httpOnly: true,
    secure,
    sameSite: secure ? 'none' : 'lax',
    expires: expiresAt,
    path: '/'
  }));
}

function clearSessionCookie(res, secure) {
  res.setHeader('Set-Cookie', serialize('pace_session', '', {
    httpOnly: true,
    secure,
    sameSite: secure ? 'none' : 'lax',
    expires: new Date(0),
    path: '/'
  }));
}

function mapUniqueConstraintError(error) {
  if (error.code === '23505' || error.code === 'P2002') {
    error.status = 409;
    error.code = 'EMAIL_ALREADY_REGISTERED';
    error.message = 'Email is already registered';
  }
  return error;
}

export function createAuthRouter({ db, config, auth }) {
  const router = Router();

  router.post('/register/student', async (req, res, next) => {
    try {
      const input = studentRegistrationSchema.parse(req.body);
      const { firstName, lastName, schoolId, course, yearLevel, phone, address, ...credentials } = input;
      const user = await registerStudent({
        db,
        ...credentials,
        profile: { firstName, lastName, schoolId, course, yearLevel, phone, address }
      });
      res.status(201).json({ user });
    } catch (error) {
      mapUniqueConstraintError(error);
      next(error);
    }
  });

  router.post('/login', async (req, res, next) => {
    try {
      const input = credentialsSchema.parse(req.body);
      const user = await authenticate({ db, ...input });
      const session = await createSession({ db, userId: user.id, ttlMs: config.sessionTtlMs });
      setSessionCookie(res, session.token, session.expiresAt, config.cookieSecure);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  });

  router.post('/register/counselor', async (req, res, next) => {
    try {
      const input = counselorRegistrationSchema.parse(req.body);
      const { firstName, lastName, employeeId, phone, ...credentials } = input;
      const user = await registerInvitedProfile({
        db,
        ...credentials,
        role: 'counselor',
        profile: { firstName, lastName, employeeId, phone }
      });
      res.status(201).json({ user });
    } catch (error) {
      mapUniqueConstraintError(error);
      next(error);
    }
  });

  router.post('/register/recruiter', async (req, res, next) => {
    try {
      const input = recruiterRegistrationSchema.parse(req.body);
      const { firstName, lastName, companyName, companyId, jobTitle, phone, ...credentials } = input;
      const user = await registerInvitedProfile({
        db,
        ...credentials,
        role: 'recruiter',
        profile: { firstName, lastName, companyName, companyId, jobTitle, phone }
      });
      res.status(201).json({ user });
    } catch (error) {
      mapUniqueConstraintError(error);
      next(error);
    }
  });

  router.post('/logout', auth.optionalAuth, async (req, res, next) => {
    try {
      if (req.sessionToken) await destroySession({ db, token: req.sessionToken });
      clearSessionCookie(res, config.cookieSecure);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  router.get('/me', auth.optionalAuth, (req, res) => {
    res.json({ user: req.user });
  });

  router.post('/invitations', auth.optionalAuth, auth.requireRole('admin', 'superadmin'), async (req, res, next) => {
    try {
      const input = createInvitationSchema.parse(req.body);
      const invitation = await createInvitation({
        db,
        ...input,
        invitedBy: req.user.id,
        ttlMs: config.sessionTtlMs
      });
      res.status(201).json({ invitation });
    } catch (error) {
      next(error);
    }
  });

  router.get('/admin-check', auth.optionalAuth, auth.requireRole('admin', 'superadmin'), (req, res) => {
    res.json({ authorized: true });
  });

  return router;
}
