import { serialize } from 'cookie';
import {
  authenticate as authenticateUser,
  createInvitation as createInvitationRecord,
  createSession as createUserSession,
  destroySession as destroyUserSession,
  registerInvitedProfile as registerInvitedUserProfile,
  registerInvitedUser as registerInvitedUserRecord,
  registerStudent as registerStudentRecord
} from '../services/auth.service.js';
import {
  adminRegistrationSchema,
  counselorRegistrationSchema,
  createInvitationSchema,
  credentialsSchema,
  recruiterRegistrationSchema,
  studentRegistrationSchema
} from '../schemas/auth.schemas.js';

function mapUniqueConstraintError(error) {
  if (error.code !== '23505' && error.code !== 'P2002') return error;

  const target = Array.isArray(error.meta?.target)
    ? error.meta.target.join(',')
    : `${error.constraint || ''} ${error.detail || ''}`;
  const duplicate = target.toLowerCase();
  const field = duplicate.includes('email')
    ? ['EMAIL_ALREADY_REGISTERED', 'Email is already registered']
    : duplicate.includes('school_id') || duplicate.includes('schoolid')
      ? ['SCHOOL_ID_ALREADY_REGISTERED', 'School ID is already registered']
      : duplicate.includes('employee_id') || duplicate.includes('employeeid')
        ? ['EMPLOYEE_ID_ALREADY_REGISTERED', 'Employee ID is already registered']
        : ['DUPLICATE_RESOURCE', 'A resource with these details already exists'];
  error.status = 409;
  [error.code, error.message] = field;
  return error;
}

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

export function createAuthController({ db, config }) {
  async function registerStudent(req, res, next) {
    try {
      const input = studentRegistrationSchema.parse(req.body);
      const {
        firstName,
        lastName,
        schoolId,
        course,
        yearLevel,
        phone,
        address,
        resumeUrl,
        ...credentials
      } = input;
      const user = await registerStudentRecord({
        db,
        ...credentials,
        profile: { firstName, lastName, schoolId, course, yearLevel, phone, address, resumeUrl }
      });
      res.status(201).json({ user });
    } catch (error) {
      next(mapUniqueConstraintError(error));
    }
  }

  async function login(req, res, next) {
    try {
      const input = credentialsSchema.parse(req.body);
      const user = await authenticateUser({ db, ...input });
      const session = await createUserSession({ db, userId: user.id, ttlMs: config.sessionTtlMs });
      setSessionCookie(res, session.token, session.expiresAt, config.cookieSecure);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  function createInvitedRegistration(role, schema, profileFields) {
    return async (req, res, next) => {
      try {
        const input = schema.parse(req.body);
        const { token, ...values } = input;
        const profile = Object.fromEntries(profileFields.map((field) => [field, values[field]]));
        const credentials = { email: values.email, password: values.password };
        const user = await registerInvitedUserProfile({ db, ...credentials, token, role, profile });
        res.status(201).json({ user });
      } catch (error) {
        next(mapUniqueConstraintError(error));
      }
    };
  }

  async function registerAdmin(req, res, next) {
    try {
      const input = adminRegistrationSchema.parse(req.body);
      const user = await registerInvitedUserRecord({ db, ...input, role: 'admin' });
      res.status(201).json({ user });
    } catch (error) {
      next(mapUniqueConstraintError(error));
    }
  }

  async function logout(req, res, next) {
    try {
      if (req.sessionToken) await destroyUserSession({ db, token: req.sessionToken });
      clearSessionCookie(res, config.cookieSecure);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  function getCurrentUser(req, res) {
    res.json({ user: req.user });
  }

  async function createUserInvitation(req, res, next) {
    try {
      const input = createInvitationSchema.parse(req.body);
      const invitation = await createInvitationRecord({
        db,
        ...input,
        invitedBy: req.user.id,
        ttlMs: config.sessionTtlMs
      });
      res.status(201).json({ invitation });
    } catch (error) {
      next(error);
    }
  }

  function adminCheck(req, res) {
    res.json({ authorized: true });
  }

  return {
    registerStudent,
    login,
    registerCounselor: createInvitedRegistration(
      'counselor',
      counselorRegistrationSchema,
      ['firstName', 'lastName', 'employeeId', 'phone']
    ),
    registerRecruiter: createInvitedRegistration(
      'recruiter',
      recruiterRegistrationSchema,
      ['firstName', 'lastName', 'companyName', 'companyId', 'jobTitle', 'phone']
    ),
    registerAdmin,
    logout,
    getCurrentUser,
    createUserInvitation,
    adminCheck
  };
}
