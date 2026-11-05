import { parse } from "cookie";
import { getUserBySession } from "../services/auth.service.js";

export function createAuthMiddleware({ db, config }) {
  function parseCookies(req) {
    if (!req._parsedCookies) {
      req._parsedCookies = parse(req.headers.cookie || "");
    }
    return req._parsedCookies;
  }

  function csrfProtection(req, res, next) {
    const isStateChanging = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);
    const hasSessionCookie = Boolean(parseCookies(req).pace_session);
    if (!config.cookieSecure || !isStateChanging || !hasSessionCookie) {
      return next();
    }

    const origin = req.headers.origin;
    if (!origin || !config.allowedOrigins.includes(origin)) {
      return res.status(403).json({
        error: "CSRF_VALIDATION_FAILED",
        message: "A valid request origin is required"
      });
    }
    next();
  }

  async function optionalAuth(req, res, next) {
    try {
      const token = parseCookies(req).pace_session;
      req.user = token ? await getUserBySession({ db, token }) : null;
      req.sessionToken = token;
      next();
    } catch (error) {
      next(error);
    }
  }

  function requireAuth(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: "UNAUTHENTICATED", message: "Authentication required" });
    }
    next();
  }

  function requireRole(...roles) {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "FORBIDDEN", message: "Insufficient permissions" });
      }
      next();
    };
  }

  return { csrfProtection, optionalAuth, requireAuth, requireRole };
}
