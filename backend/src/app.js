import express from 'express';
import cors from 'cors';
import { ZodError } from 'zod';
import { createAuthRouter } from './routes/auth.routes.js';
import { createAuthMiddleware } from './middleware/auth.middleware.js';

export function createApp({ db, config }) {
  const app = express();
  const auth = createAuthMiddleware({ db, config });

  app.use(cors({
    origin(origin, callback) {
      if (!origin || config.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Origin is not allowed'));
    },
    credentials: true
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use(auth.csrfProtection);

  app.get('/api/health', async (req, res, next) => {
    try {
      await db.$queryRaw`SELECT 1`;
      res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  });

  app.use('/api/auth', createAuthRouter({ db, config, auth }));

  app.use((err, req, res, next) => {
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Validation failed',
        issues: err.issues
      });
    }

    console.error(err);
    const status = Number.isInteger(err.status) ? err.status : 500;
    res.status(status).json({
      error: status >= 500 ? 'Internal Server Error' : (err.code || 'Request Error'),
      message: status >= 500 ? 'An unexpected error occurred' : err.message
    });
  });

  return app;
}
