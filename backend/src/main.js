// src/main.js
import express from 'express';
import cors from 'cors';
import { ZodError } from 'zod';
import { pool } from './database/client.js';

const app = express();

app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// GET /api/health for service monitoring[cite: 1]
app.get('/api/health', async (req, res, next) => {
  try {
    // Test the raw SQL connection
    await pool.query('SELECT 1');
    res.json({ 
      status: 'ok', 
      database: 'connected', 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    next(error);
  }
});

// Centralized error handling[cite: 1]
app.use((err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Validation failed',
      issues: err.errors
    });
  }

  console.error(err);
  res.status(err.status || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});