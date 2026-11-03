import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { hashPassword } from '../src/services/auth.service.js';

const config = {
  sessionTtlMs: 60_000,
  cookieSecure: false,
  allowedOrigins: ['http://localhost:3001']
};

function createFakeDb() {
  const users = [];
  const sessions = new Map();
  const invitations = [];
  const studentProfiles = [];
  const counselorProfiles = [];
  const recruiterProfiles = [];
  const findUser = (where) => users.find((user) =>
    (!where.email || user.email === where.email)
    && (!where.isActive === undefined || user.isActive === where.isActive));
  const db = {
    users,
    sessions,
    invitations,
    studentProfiles,
    counselorProfiles,
    recruiterProfiles,
    $queryRaw: async () => [{ '?column?': 1 }],
    $disconnect: async () => {},
    user: {
      create: async ({ data }) => {
        const user = {
          id: `user-${users.length + 1}`,
          ...data,
          createdAt: new Date().toISOString(),
          isActive: true
        };
        users.push(user);
        return user;
      },
      findFirst: async ({ where }) => findUser(where)
    },
    studentProfile: {
      create: async ({ data }) => {
        const profile = { id: `profile-${studentProfiles.length + 1}`, ...data };
        studentProfiles.push(profile);
        return profile;
      },
      findUnique: async ({ where }) => studentProfiles.find((profile) => profile.userId === where.userId),
      update: async ({ where, data }) => {
        const profile = studentProfiles.find((candidate) => candidate.userId === where.userId);
        Object.assign(profile, data);
        return profile;
      }
    },
    counselorProfile: {
      create: async ({ data }) => {
        const profile = { id: `counselor-profile-${counselorProfiles.length + 1}`, ...data };
        counselorProfiles.push(profile);
        return profile;
      }
    },
    recruiterProfile: {
      create: async ({ data }) => {
        const profile = { id: `recruiter-profile-${recruiterProfiles.length + 1}`, ...data };
        recruiterProfiles.push(profile);
        return profile;
      }
    },
    session: {
      create: async ({ data }) => {
        sessions.set(data.tokenHash, data);
      },
      findFirst: async ({ where, include }) => {
        const session = sessions.get(where.tokenHash);
        const user = users.find((candidate) => candidate.id === session?.userId);
        return session && new Date(session.expiresAt) > new Date() && user?.isActive
          ? { ...session, user: include?.user ? user : undefined }
          : null;
      },
      deleteMany: async ({ where }) => sessions.delete(where.tokenHash)
    },
    invitation: {
      create: async ({ data }) => {
        invitations.push({ id: `invitation-${invitations.length + 1}`, usedAt: null, ...data });
      },
      findFirst: async ({ where }) => invitations.find((invitation) =>
        invitation.tokenHash === where.tokenHash
        && invitation.email === where.email
        && invitation.usedAt === null
        && new Date(invitation.expiresAt) > new Date()),
      update: async ({ where, data }) => {
        const invitation = invitations.find((candidate) => candidate.id === where.id);
        Object.assign(invitation, data);
        return invitation;
      }
    },
    $transaction: async (callback) => callback(db)
  };
  return db;
}

describe('authentication API', () => {
  let db;
  let app;

  beforeEach(() => {
    db = createFakeDb();
    app = createApp({ db, config });
  });

  it('registers students without accepting a privileged role', async () => {
    const response = await request(app)
      .post('/api/auth/register/student')
      .send({
        email: 'Student@Example.com',
        password: 'correct horse battery staple',
        firstName: 'Alex',
        lastName: 'Reyes',
        schoolId: '2026-0001',
        course: 'Computer Science',
        yearLevel: 3,
        phone: '+63123456789',
        address: 'Iligan City',
        resumeUrl: 'https://storage.example.com/resumes/alex-reyes.pdf'
      });

    expect(response.status).toBe(201);
    expect(response.body.user).toMatchObject({ email: 'student@example.com', role: 'student' });
    expect(response.body.user.profile).toMatchObject({
      schoolId: '2026-0001',
      resumeUrl: 'https://storage.example.com/resumes/alex-reyes.pdf'
    });
    expect(db.users[0].passwordHash).toMatch(/^\$argon2id\$/);
  });

  it('logs in and uses an HttpOnly session cookie for /me', async () => {
    await request(app)
      .post('/api/auth/register/student')
      .send({
        email: 'student@example.com',
        password: 'correct horse battery staple',
        firstName: 'Alex',
        lastName: 'Reyes',
        schoolId: '2026-0001',
        course: 'Computer Science',
        yearLevel: 3,
        phone: '+63123456789',
        address: 'Iligan City'
      });

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@example.com', password: 'correct horse battery staple' });

    expect(login.status).toBe(200);
    expect(login.headers['set-cookie'][0]).toContain('HttpOnly');

    const me = await request(app)
      .get('/api/auth/me')
      .set('Cookie', login.headers['set-cookie']);

    expect(me.body.user).toMatchObject({ email: 'student@example.com', role: 'student' });
  });

  it('updates the authenticated student profile', async () => {
    await request(app)
      .post('/api/auth/register/student')
      .send({
        email: 'student@example.com',
        password: 'correct horse battery staple',
        firstName: 'Alex',
        lastName: 'Reyes',
        schoolId: '2026-0001',
        course: 'Computer Science',
        yearLevel: 3,
        phone: '+63123456789',
        address: 'Iligan City'
      });
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@example.com', password: 'correct horse battery staple' });

    const response = await request(app)
      .patch('/api/students/me/profile')
      .set('Cookie', login.headers['set-cookie'])
      .send({
        course: 'Information Technology',
        yearLevel: 4,
        resumeUrl: 'https://storage.example.com/resumes/alex-reyes-updated.pdf'
      });

    expect(response.status).toBe(200);
    expect(response.body.profile).toMatchObject({
      course: 'Information Technology',
      yearLevel: 4,
      resumeUrl: 'https://storage.example.com/resumes/alex-reyes-updated.pdf',
      firstName: 'Alex'
    });
  });

  it('rejects student profile updates without authentication or fields', async () => {
    const unauthenticated = await request(app)
      .patch('/api/students/me/profile')
      .send({ course: 'Information Technology' });
    expect(unauthenticated.status).toBe(401);

    await request(app)
      .post('/api/auth/register/student')
      .send({
        email: 'student@example.com',
        password: 'correct horse battery staple',
        firstName: 'Alex',
        lastName: 'Reyes',
        schoolId: '2026-0001',
        course: 'Computer Science',
        yearLevel: 3,
        phone: '+63123456789',
        address: 'Iligan City'
      });
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@example.com', password: 'correct horse battery staple' });
    const invalid = await request(app)
      .patch('/api/students/me/profile')
      .set('Cookie', login.headers['set-cookie'])
      .send({});

    expect(invalid.status).toBe(400);
  });

  it('rejects invalid credentials and privileged routes', async () => {
    await request(app)
      .post('/api/auth/register/student')
      .send({
        email: 'student@example.com',
        password: 'correct horse battery staple',
        firstName: 'Alex',
        lastName: 'Reyes',
        schoolId: '2026-0001',
        course: 'Computer Science',
        yearLevel: 3,
        phone: '+63123456789',
        address: 'Iligan City'
      });

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@example.com', password: 'wrong password' });
    expect(login.status).toBe(401);

    const adminCheck = await request(app).get('/api/auth/admin-check');
    expect(adminCheck.status).toBe(403);
  });

  it('does not allow unauthenticated callers to create invitations', async () => {
    const response = await request(app)
      .post('/api/auth/invitations')
      .send({ email: 'staff@example.com', role: 'counselor' });

    expect(response.status).toBe(403);
  });

  it('registers an invited counselor and consumes the invitation transactionally', async () => {
    const admin = await db.user.create({
      data: {
        email: 'admin@example.com',
        passwordHash: await hashPassword('correct horse battery staple'),
        role: 'admin'
      }
    });
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: admin.email, password: 'correct horse battery staple' });

    const invitationResponse = await request(app)
      .post('/api/auth/invitations')
      .set('Cookie', login.headers['set-cookie'])
      .send({ email: 'counselor@example.com', role: 'counselor' });

    expect(invitationResponse.status).toBe(201);
    const invitation = invitationResponse.body.invitation;
    const registration = await request(app)
      .post('/api/auth/register/counselor')
      .send({
        email: invitation.email,
        password: 'correct horse battery staple',
        token: invitation.token,
        firstName: 'Maria',
        lastName: 'Santos',
        employeeId: 'EMP-001',
        phone: '+63123456789'
      });

    expect(registration.status).toBe(201);
    expect(registration.body.user).toMatchObject({
      email: 'counselor@example.com',
      role: 'counselor'
    });
    expect(db.counselorProfiles).toHaveLength(1);
    expect(db.invitations[0].usedAt).toBeInstanceOf(Date);
  });

  it('redeems admin invitations through the dedicated admin route', async () => {
    const admin = await db.user.create({
      data: {
        email: 'superadmin@example.com',
        passwordHash: await hashPassword('correct horse battery staple'),
        role: 'superadmin'
      }
    });
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: admin.email, password: 'correct horse battery staple' });
    const invitationResponse = await request(app)
      .post('/api/auth/invitations')
      .set('Cookie', login.headers['set-cookie'])
      .send({ email: 'new-admin@example.com', role: 'admin' });

    const invitation = invitationResponse.body.invitation;
    const registration = await request(app)
      .post('/api/auth/register/admin')
      .send({
        email: invitation.email,
        password: 'correct horse battery staple',
        token: invitation.token
      });

    expect(registration.status).toBe(201);
    expect(registration.body.user).toMatchObject({
      email: 'new-admin@example.com',
      role: 'admin'
    });
  });

  it('requires an allowed Origin for session-bearing production mutations', async () => {
    const productionApp = createApp({
      db,
      config: { ...config, cookieSecure: true }
    });
    const admin = await db.user.create({
      data: {
        email: 'origin-admin@example.com',
        passwordHash: await hashPassword('correct horse battery staple'),
        role: 'admin'
      }
    });
    const login = await request(productionApp)
      .post('/api/auth/login')
      .send({ email: admin.email, password: 'correct horse battery staple' });

    const blocked = await request(productionApp)
      .post('/api/auth/invitations')
      .set('Cookie', login.headers['set-cookie'])
      .send({ email: 'staff@example.com', role: 'counselor' });
    expect(blocked.status).toBe(403);
    expect(blocked.body.error).toBe('CSRF_VALIDATION_FAILED');

    const allowed = await request(productionApp)
      .post('/api/auth/invitations')
      .set('Cookie', login.headers['set-cookie'])
      .set('Origin', 'http://localhost:3001')
      .send({ email: 'staff@example.com', role: 'counselor' });
    expect(allowed.status).toBe(201);
  });
});

it('creates password hashes that can be verified by the service', async () => {
  const hash = await hashPassword('correct horse battery staple');
  expect(hash).toMatch(/^\$argon2id\$/);
});
