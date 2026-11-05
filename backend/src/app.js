//Import routes and required libraries
import { readFileSync } from 'node:fs';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { ZodError } from 'zod';
import { createAuthRouter } from './routes/auth.routes.js';
import { createStudentRouter } from './routes/student.routes.js';
import { createCounselorRouter } from './routes/counselor.routes.js';
import { createMentorRouter } from './routes/mentor.routes.js';
import { createRecruiterRouter } from './routes/recruiter.routes.js';
import { createAuthMiddleware } from './middleware/auth.middleware.js';
//swagger ui
const openApiSpec = JSON.parse(
  readFileSync(new URL('./docs/openapi.json', import.meta.url), 'utf-8')
);
// Regex to match local origins (e.g. http://localhost:3000 or http://127.0.0.1:5173) with any port.
const LOCALHOST_ORIGIN_REGEX = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

//create and configures server
export function createApp({ db, config }) {
  const app = express();
  const auth = createAuthMiddleware({ db, config });

  app.use(cors({
    origin(origin, callback) {
      if (
        !origin ||
        config.allowedOrigins.includes(origin) ||
        (process.env.NODE_ENV !== 'production' && LOCALHOST_ORIGIN_REGEX.test(origin))
      ) {
        return callback(null, true);
      }
      return callback(new Error('Origin is not allowed'));
    },
    credentials: true
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use(auth.csrfProtection);

  if (config.enableSwagger !== false) {
    app.get('/api-docs/json', (req, res) => {
      res.json(openApiSpec);
    });

    const swaggerUiOptions = {
      customSiteTitle: 'PACE MSU-IIT API Docs',
      swaggerOptions: {
        withCredentials: true,
        persistAuthorization: true
      }
    };

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec, swaggerUiOptions));
  }

  app.get('/api/health', async (req, res, next) => {
    try {
      await db.$queryRaw`SELECT 1`;
      res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  });

  app.use('/api/auth', createAuthRouter({ db, config, auth }));
  app.use('/api/students', createStudentRouter({ db, auth }));
  app.use('/api/counselors', createCounselorRouter({ db, auth }));
  app.use('/api/mentors', createMentorRouter({ db, auth }));
  app.use('/api/recruiters', createRecruiterRouter({ db, auth }));

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
