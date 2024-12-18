import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: './.env' });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: process.env.DB_HOST ?? '',
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASS ?? '',
    database: process.env.DB_NAME ?? '',
    ssl: false,
  },
});
