import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { hashPassword } from '../src/auth/service.js';

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
  const findUser = (where) => users.find((user) =>
    (!where.email || user.email === where.email)
    && (!where.isActive === undefined || user.isActive === where.isActive));
  const db = {
    users,
    sessions,
    invitations,
    studentProfiles,
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
        invitations.push({ id: `invitation-${invitations.length + 1}`, ...data });
      },
      findFirst: async ({ where }) => invitations.find((invitation) =>
        invitation.tokenHash === where.tokenHash
        && invitation.email === where.email
        && invitation.usedAt === null
        && new Date(invitation.expiresAt) > new Date()),
      update: async () => {}
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
        address: 'Iligan City'
      });

    expect(response.status).toBe(201);
    expect(response.body.user).toMatchObject({ email: 'student@example.com', role: 'student' });
    expect(response.body.user.profile).toMatchObject({ schoolId: '2026-0001' });
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
});

it('creates password hashes that can be verified by the service', async () => {
  const hash = await hashPassword('correct horse battery staple');
  expect(hash).toMatch(/^\$argon2id\$/);
});
