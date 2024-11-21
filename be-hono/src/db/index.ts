import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';

import { getDatabaseUrl } from '@/lib/utils';

dotenv.config();

export const db = drizzle(getDatabaseUrl());
