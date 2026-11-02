import { db } from '../src/database/client.js';
import { hashPassword } from '../src/auth/service.js';

const email = process.env.SUPERADMIN_EMAIL?.toLowerCase();
const password = process.env.SUPERADMIN_PASSWORD;

if (!email || !password) {
  throw new Error('SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD are required');
}

if (password.length < 8) {
  throw new Error('SUPERADMIN_PASSWORD must be at least 8 characters');
}

try {
  await db.user.create({
    data: { email, passwordHash: hashPassword(password), role: 'superadmin' }
  });
  console.log(`Created superadmin account for ${email}`);
} finally {
  await db.$disconnect();
}
