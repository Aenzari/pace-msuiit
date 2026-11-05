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

  const defaultAllowedOrigins = `http://localhost:${port},http://127.0.0.1:${port},http://localhost:3001,http://127.0.0.1:3001`;
  const allowedOrigins = (env.ALLOWED_ORIGINS || defaultAllowedOrigins)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    port,
    databaseUrl: env.DATABASE_URL,
    sessionTtlMs,
    cookieSecure: env.NODE_ENV === 'production',
    allowedOrigins,
    enableSwagger: env.ENABLE_SWAGGER !== undefined
      ? env.ENABLE_SWAGGER === 'true'
      : env.NODE_ENV !== 'production'
  };
}
