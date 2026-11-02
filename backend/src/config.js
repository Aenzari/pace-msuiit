import dotenv from 'dotenv';

dotenv.config();

export function getConfig(env = process.env) {
  const port = Number(env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid TCP port');
  }

  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }

  const sessionTtlMs = Number(env.SESSION_TTL_MS || 1000 * 60 * 60 * 24 * 7);
  if (!Number.isFinite(sessionTtlMs) || sessionTtlMs <= 0) {
    throw new Error('SESSION_TTL_MS must be a positive number');
  }

  return {
    port,
    databaseUrl: env.DATABASE_URL,
    sessionTtlMs,
    cookieSecure: env.NODE_ENV === 'production',
    allowedOrigins: (env.ALLOWED_ORIGINS || 'http://localhost:3001')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)
  };
}
