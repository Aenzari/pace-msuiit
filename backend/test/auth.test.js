import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { hashPassword, getUserBySession } from '../src/services/auth.service.js';

const config = {
  sessionTtlMs: 60_000,
  cookieSecure: false,
  allowedOrigins: ['http://localhost:3001']
};

function createFakeDb() {
  const roles = [
    { id: "role-student", name: "student" },
    { id: "role-counselor", name: "counselor" },
    { id: "role-recruiter", name: "recruiter" },
    { id: "role-admin", name: "admin" },
    { id: "role-superadmin", name: "superadmin" }
  ];
  const users = [];
  const sessions = new Map();
  const invitations = [];
  const studentProfiles = [];
  const counselorProfiles = [];
  const recruiterProfiles = [];
  const findUser = (where) => users.find((user) =>
    (!where.email || user.email === where.email)
    && (where.isActive === undefined || user.isActive === where.isActive));
  const db = {
    roles,
    users,
    sessions,
    invitations,
    studentProfiles,
    counselorProfiles,
    recruiterProfiles,
    $queryRaw: async () => [{ "?column?": 1 }],
    $disconnect: async () => {},
    user: {
      create: async ({ data, include }) => {
        let roleName = typeof data.role === "string" ? data.role : data.role?.connect?.name;
        if (!roleName && data.role?.connect?.id) {
          const found = roles.find((r) => r.id === data.role.connect.id);
          roleName = found ? found.name : "student";
        }
        const roleObj = roles.find((r) => r.name === (roleName || "student"));
        const user = {
          id: `user-${users.length + 1}`,
          ...data,
          roleId: roleObj.id,
          role: roleObj,
          createdAt: new Date().toISOString(),
          isActive: true
        };
        users.push(user);
        return user;
      },
      findFirst: async ({ where, include }) => {
        const user = findUser(where);
        return user ? { ...user, role: user.role } : null;
      }
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
        if (!profile) {
          const err = new Error("Record not found");
          err.code = "P2025";
          throw err;
        }
        Object.assign(profile, data);
        return profile;
      }
    },
    counselorProfile: {
      create: async ({ data }) => {
        const profile = { id: `counselor-profile-${counselorProfiles.length + 1}`, ...data };
        counselorProfiles.push(profile);
        return profile;
      },
      findUnique: async ({ where }) => counselorProfiles.find((profile) => profile.userId === where.userId),
      update: async ({ where, data }) => {
        const profile = counselorProfiles.find((candidate) => candidate.userId === where.userId);
        if (!profile) {
          const err = new Error("Record not found");
          err.code = "P2025";
          throw err;
        }
        Object.assign(profile, data);
        return profile;
      }
    },
    recruiterProfile: {
      create: async ({ data }) => {
        const profile = { id: `recruiter-profile-${recruiterProfiles.length + 1}`, ...data };
        recruiterProfiles.push(profile);
        return profile;
      },
      findUnique: async ({ where }) => recruiterProfiles.find((profile) => profile.userId === where.userId),
      update: async ({ where, data }) => {
        const profile = recruiterProfiles.find((candidate) => candidate.userId === where.userId);
        if (!profile) {
          const err = new Error("Record not found");
          err.code = "P2025";
          throw err;
        }
        Object.assign(profile, data);
        return profile;
      }
    },
    mentorProfile: {
      create: async ({ data }) => {
        const profile = { id: `mentor-profile-${counselorProfiles.length + 1}`, ...data };
        return profile;
      },
      findUnique: async ({ where }) => null,
      update: async ({ where, data }) => {
        const err = new Error("Record not found");
        err.code = "P2025";
        throw err;
      }
    },
    session: {
      create: async ({ data }) => {
        sessions.set(data.tokenHash, data);
      },
      findFirst: async ({ where, include, select }) => {
        const session = sessions.get(where.tokenHash);
        const user = users.find((candidate) => candidate.id === session?.userId);
        const userSelection = include?.user || select?.user;
        return session && new Date(session.expiresAt) > new Date() && user?.isActive
          ? { ...session, user: userSelection ? { ...user, role: user.role } : undefined }
          : null;
      },
      deleteMany: async ({ where }) => {
        let count = 0;
        if (where.tokenHash) {
          if (sessions.delete(where.tokenHash)) count++;
        } else if (where.expiresAt && where.expiresAt.lt) {
          for (const [key, val] of sessions.entries()) {
            if (new Date(val.expiresAt) < where.expiresAt.lt) {
              sessions.delete(key);
              count++;
            }
          }
        }
        return { count };
      }
    },
    invitation: {
      create: async ({ data }) => {
        const roleName = data.role?.connect?.name;
        const roleObj = roles.find((r) => r.name === roleName);
        const inv = {
          id: `invitation-${invitations.length + 1}`,
          usedAt: null,
          ...data,
          roleId: roleObj?.id,
          role: roleObj
        };
        invitations.push(inv);
        return inv;
      },
      findFirst: async ({ where }) => {
        return invitations.find((invitation) => {
          const matchToken = invitation.tokenHash === where.tokenHash;
          const matchEmail = !where.email || invitation.email === where.email;
          const matchRole = !where.role?.name || invitation.role?.name === where.role.name;
          const notUsed = invitation.usedAt === null;
          const notExpired = new Date(invitation.expiresAt) > new Date();
          return matchToken && matchEmail && matchRole && notUsed && notExpired;
        }) || null;
      },
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
        studentNumber: '2026-0001',
        course: 'Computer Science',
        yearLevel: 3,
        phone: '+63123456789',
        address: 'Iligan City',
              });

    expect(response.status).toBe(201);
    expect(response.body.user).toMatchObject({ email: 'student@example.com', role: 'student' });
    expect(response.body.user.profile).toMatchObject({
      studentNumber: '2026-0001',
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
        studentNumber: '2026-0001',
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

  it('reads the authenticated student profile', async () => {
    await request(app)
      .post('/api/auth/register/student')
      .send({
        email: 'student@example.com',
        password: 'correct horse battery staple',
        firstName: 'Alex',
        lastName: 'Reyes',
        studentNumber: '2026-0001',
        course: 'Computer Science',
        yearLevel: 3,
        phone: '+63123456789',
        address: 'Iligan City'
      });
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@example.com', password: 'correct horse battery staple' });

    const response = await request(app)
      .get('/api/students/me/profile')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.status).toBe(200);
    expect(response.body.profile).toMatchObject({
      firstName: 'Alex',
      lastName: 'Reyes',
      studentNumber: '2026-0001',
      course: 'Computer Science',
      yearLevel: 3
    });
  });

  it('rejects unauthenticated access to student profile', async () => {
    const response = await request(app).get('/api/students/me/profile');
    expect(response.status).toBe(401);
  });

  it('updates the authenticated student profile', async () => {
    await request(app)
      .post('/api/auth/register/student')
      .send({
        email: 'student@example.com',
        password: 'correct horse battery staple',
        firstName: 'Alex',
        lastName: 'Reyes',
        studentNumber: '2026-0001',
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
        yearLevel: 4
      });

    expect(response.status).toBe(200);
    expect(response.body.profile).toMatchObject({
      course: 'Information Technology',
      yearLevel: 4,
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
        studentNumber: '2026-0001',
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
        studentNumber: '2026-0001',
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
        employeeId: 'EMP-001',
        department: 'Guidance and Counseling',
        phone: '+63123456789'
      });
    if (registration.status !== 201) console.log("counselor reg response:", registration.status, registration.body);

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

  it('does not poison session cache with negative null lookups', async () => {
    let queryCount = 0;
    const trackingDb = {
      ...db,
      session: {
        ...db.session,
        findFirst: async (...args) => {
          queryCount++;
          return db.session.findFirst(...args);
        }
      }
    };

    const firstLookup = await getUserBySession({ db: trackingDb, token: 'nonexistent-token-1' });
    expect(firstLookup).toBeNull();
    expect(queryCount).toBe(1);

    const secondLookup = await getUserBySession({ db: trackingDb, token: 'nonexistent-token-1' });
    expect(secondLookup).toBeNull();
    // Because null is not cached, DB is queried again instead of cache poisoning
    expect(queryCount).toBe(2);
  });
});

it('creates password hashes that can be verified by the service', async () => {
  const hash = await hashPassword('correct horse battery staple');
  expect(hash).toMatch(/^\$argon2id\$/);
});
