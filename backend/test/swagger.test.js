import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('Swagger UI and OpenAPI documentation', () => {
  const dummyDb = {
    $queryRaw: async () => [{ '?column?': 1 }]
  };

  const baseConfig = {
    sessionTtlMs: 60_000,
    cookieSecure: false,
    allowedOrigins: ['http://localhost:3000', 'http://localhost:3001'],
    enableSwagger: true
  };

  it('serves the OpenAPI JSON specification at /api-docs/json', async () => {
    const app = createApp({ db: dummyDb, config: baseConfig });
    const response = await request(app).get('/api-docs/json');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.openapi).toBe('3.0.3');
    expect(response.body.info.title).toBe('PACE MSU-IIT API');
    expect(response.body.paths).toHaveProperty('/api/health');
    expect(response.body.paths).toHaveProperty('/api/auth/login');
    expect(response.body.paths).toHaveProperty('/api/auth/register/student');
    expect(response.body.paths).toHaveProperty('/api/students/me/profile');
    expect(response.body.paths).toHaveProperty('/api/counselors/me/profile');
    expect(response.body.paths).toHaveProperty('/api/mentors/me/profile');
    expect(response.body.paths).toHaveProperty('/api/recruiters/me/profile');
  });

  it('serves Swagger UI HTML at /api-docs/', async () => {
    const app = createApp({ db: dummyDb, config: baseConfig });
    const response = await request(app).get('/api-docs/');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
    expect(response.text).toContain('swagger-ui');
    expect(response.text).toContain('PACE MSU-IIT API Docs');
  });

  it('does not serve Swagger UI when enableSwagger is false', async () => {
    const app = createApp({ db: dummyDb, config: { ...baseConfig, enableSwagger: false } });
    const response = await request(app).get('/api-docs/json');

    expect(response.status).toBe(404);
  });
});

