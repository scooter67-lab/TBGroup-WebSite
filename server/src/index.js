import 'dotenv/config';
import 'express-async-errors';
import app from './app.js';
import connectDB from './config/db.js';
import { seedAdmin, runSeed } from './seeders/seed.js';

const PORT = process.env.PORT || 5000;

const assertSecureConfig = () => {
  const secret = process.env.JWT_SECRET;
  const insecure = ['change-this-to-a-long-random-secret-in-production'];
  if (!secret || secret.length < 32 || insecure.includes(secret)) {
    throw new Error(
      'JWT_SECRET не задан, слишком короткий (<32 символов) или используется значение по умолчанию. Задайте длинный случайный секрет.'
    );
  }
};

const start = async () => {
  assertSecureConfig();
  await connectDB();
  await seedAdmin();
  if (process.env.SEED_ON_START === 'true') await runSeed();
  app.listen(PORT, () => {
    console.log(`TB Group API running on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
