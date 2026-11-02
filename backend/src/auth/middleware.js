import { parse } from 'cookie';
import { getUserBySession } from './service.js';

export function createAuthMiddleware({ db }) {
  async function optionalAuth(req, res, next) {
    try {
      const token = parse(req.headers.cookie || '').pace_session;
      req.user = token ? await getUserBySession({ db, token }) : null;
      req.sessionToken = token;
      next();
    } catch (error) {
      next(error);
    }
  }

  function requireAuth(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'UNAUTHENTICATED', message: 'Authentication required' });
    }
    next();
  }

  function requireRole(...roles) {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'FORBIDDEN', message: 'Insufficient permissions' });
      }
      next();
    };
  }

  return { optionalAuth, requireAuth, requireRole };
}
