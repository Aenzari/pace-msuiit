import crypto from "crypto";
import argon2 from "argon2";

const SESSION_CACHE_TTL_MS = 30_000;
const SESSION_CACHE_MAX_SIZE = 1000;
const sessionCache = new Map();

function cacheGet(key) {
  const entry = sessionCache.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    sessionCache.delete(key);
    return undefined;
  }
  sessionCache.delete(key);
  sessionCache.set(key, entry);
  return entry.value;
}

function cacheSet(key, value) {
  if (sessionCache.size >= SESSION_CACHE_MAX_SIZE) {
    const firstKey = sessionCache.keys().next().value;
    sessionCache.delete(firstKey);
  }
  sessionCache.set(key, { value, expiresAt: Date.now() + SESSION_CACHE_TTL_MS });
}

function cacheDel(key) {
  sessionCache.delete(key);
}

export function hashPassword(password) {
  return argon2.hash(password, {
    type: argon2.argon2id
  });
}

export function verifyPassword(password, storedHash) {
  return argon2.verify(storedHash, password);
}

export function createSessionToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export function hashSessionToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function publicUser(row) {
  return {
    id: row.id,
    email: row.email,
    role: row.role?.name ?? row.role,
    createdAt: row.createdAt
  };
}

export async function registerStudent({ db, email, password, profile }) {
  const passwordHash = await hashPassword(password);
  return db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        passwordHash,
        role: { connect: { name: "student" } }
      },
      include: { role: true }
    });
    const studentProfile = await tx.studentProfile.create({
      data: { userId: user.id, ...profile }
    });
    return { ...publicUser(user), profile: studentProfile };
  });
}

export async function registerInvitedProfile({ db, email, password, token, role, profile }) {
  const passwordHash = await hashPassword(password);
  return db.$transaction(async (tx) => {
    const invitation = await tx.invitation.findFirst({
      where: {
        tokenHash: hashSessionToken(token),
        email,
        role: { name: role },
        expiresAt: { gt: new Date() },
        usedAt: null
      }
    });
    if (!invitation) {
      const error = new Error("Invalid or expired invitation");
      error.status = 400;
      error.code = "INVALID_INVITATION";
      throw error;
    }

    const user = await tx.user.create({
      data: {
        email,
        passwordHash,
        role: { connect: { name: role } }
      },
      include: { role: true }
    });

    const profileRecord = role === "counselor"
      ? await tx.counselorProfile.create({ data: { userId: user.id, ...profile } })
      : await tx.recruiterProfile.create({ data: { userId: user.id, ...profile } });

    await tx.invitation.update({
      where: { id: invitation.id },
      data: { usedAt: new Date() }
    });

    return { ...publicUser(user), profile: profileRecord };
  });
}

export async function authenticate({ db, email, password }) {
  const user = await db.user.findFirst({
    where: { email, isActive: true },
    include: { role: true }
  });
  if (!user || !user.passwordHash || !(await verifyPassword(password, user.passwordHash))) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    error.code = "INVALID_CREDENTIALS";
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
  const tokenHash = hashSessionToken(token);

  const cached = cacheGet(tokenHash);
  if (cached !== undefined) return cached;

  const session = await db.session.findFirst({
    where: { tokenHash, expiresAt: { gt: new Date() }, user: { isActive: true } },
    select: {
      user: {
        select: {
          id: true,
          email: true,
          createdAt: true,
          role: true
        }
      }
    }
  });
  const user = session ? publicUser(session.user) : null;
  if (user) {
    cacheSet(tokenHash, user);
  }
  return user;
}

export async function destroySession({ db, token }) {
  const tokenHash = hashSessionToken(token);
  cacheDel(tokenHash);
  await db.session.deleteMany({ where: { tokenHash } });
}

export async function createInvitation({ db, email, role, invitedBy, ttlMs }) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + ttlMs);
  await db.invitation.create({
    data: {
      email,
      role: { connect: { name: role } },
      tokenHash: hashSessionToken(token),
      invitedById: invitedBy,
      expiresAt
    }
  });
  return { token, expiresAt, email, role };
}

export async function registerInvitedUser({ db, token, email, password, role }) {
  const passwordHash = await hashPassword(password);
  return db.$transaction(async (tx) => {
    const invitation = await tx.invitation.findFirst({
      where: {
        tokenHash: hashSessionToken(token),
        email,
        ...(role ? { role: { name: role } } : {}),
        expiresAt: { gt: new Date() },
        usedAt: null
      }
    });
    if (!invitation || invitation.email !== email) {
      const error = new Error("Invalid or expired invitation");
      error.status = 400;
      error.code = "INVALID_INVITATION";
      throw error;
    }

    const createdUser = await tx.user.create({
      data: {
        email,
        passwordHash,
        role: { connect: { id: invitation.roleId } }
      },
      include: { role: true }
    });
    await tx.invitation.update({
      where: { id: invitation.id },
      data: { usedAt: new Date() }
    });
    return publicUser(createdUser);
  });
}

export async function cleanupExpiredSessions({ db }) {
  const result = await db.session.deleteMany({
    where: { expiresAt: { lt: new Date() } }
  });
  return result.count;
}
