import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // No sslmode flag here
  ssl: {
    rejectUnauthorized: true, 
    ca: fs.readFileSync(path.resolve('ca.pem')).toString() 
  }
});