import crypto from 'crypto';

const passwordKeyLength = 64;

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, passwordKeyLength).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  const [salt, expected] = storedHash.split(':');
  if (!salt || !expected) return false;
  const actual = crypto.scryptSync(password, salt, passwordKeyLength).toString('hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  const actualBuffer = Buffer.from(actual, 'hex');
  return expectedBuffer.length === actualBuffer.length
    && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

export function createSessionToken() {
  return crypto.randomBytes(32).toString('base64url');
}

export function hashSessionToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function publicUser(row) {
  return {
    id: row.id,
    email: row.email,
    role: row.role,
    createdAt: row.createdAt
  };
}

export async function registerStudent({ db, email, password, profile }) {
  const user = await db.user.create({
    data: { email, passwordHash: hashPassword(password), role: 'student' }
  });
  const studentProfile = await db.studentProfile.create({
    data: { userId: user.id, ...profile }
  });
  return { ...publicUser(user), profile: studentProfile };
}

export async function registerInvitedProfile({ db, email, password, token, role, profile }) {
  const invitation = await db.invitation.findFirst({
    where: {
      tokenHash: hashSessionToken(token),
      email,
      role,
      expiresAt: { gt: new Date() },
      usedAt: null
    }
  });
  if (!invitation) {
    const error = new Error('Invalid or expired invitation');
    error.status = 400;
    error.code = 'INVALID_INVITATION';
    throw error;
  }

  const user = await db.user.create({
    data: { email, passwordHash: hashPassword(password), role }
  });
  const profileRecord = role === 'counselor'
    ? await db.counselorProfile.create({ data: { userId: user.id, ...profile } })
    : await db.recruiterProfile.create({ data: { userId: user.id, ...profile } });
  await db.invitation.update({
    where: { id: invitation.id },
    data: { usedAt: new Date() }
  });
  return { ...publicUser(user), profile: profileRecord };
}

export async function authenticate({ db, email, password }) {
  const user = await db.user.findFirst({
    where: { email, isActive: true }
  });
  if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash)) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }
  return publicUser(user);
}

export async function createSession({ db, userId, ttlMs }) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + ttlMs);
  await db.session.create({
    data: { userId, tokenHash: hashSessionToken(token), expiresAt }
  });
  return { token, expiresAt };
}

export async function getUserBySession({ db, token }) {
  const session = await db.session.findFirst({
    where: { tokenHash: hashSessionToken(token), expiresAt: { gt: new Date() }, user: { isActive: true } },
    include: { user: true }
  });
  return session ? publicUser(session.user) : null;
}

export async function destroySession({ db, token }) {
  await db.session.deleteMany({ where: { tokenHash: hashSessionToken(token) } });
}

export async function createInvitation({ db, email, role, invitedBy, ttlMs }) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + ttlMs);
  await db.invitation.create({
    data: { email, role, tokenHash: hashSessionToken(token), invitedById: invitedBy, expiresAt }
  });
  return { token, expiresAt, email, role };
}

export async function registerInvitedUser({ db, token, email, password }) {
  const invitation = await db.invitation.findFirst({
    where: {
      tokenHash: hashSessionToken(token),
      email,
      expiresAt: { gt: new Date() },
      usedAt: null
    }
  });
  if (!invitation || invitation.email !== email) {
    const error = new Error('Invalid or expired invitation');
    error.status = 400;
    error.code = 'INVALID_INVITATION';
    throw error;
  }

  const user = await db.$transaction(async (transaction) => {
    const createdUser = await transaction.user.create({
      data: { email, passwordHash: hashPassword(password), role: invitation.role }
    });
    await transaction.invitation.update({
      where: { id: invitation.id },
      data: { usedAt: new Date() }
    });
    return createdUser;
  });
  return publicUser(user);
}
