import { zValidator } from '@hono/zod-validator';
import { Context, Next } from 'hono';
import { env } from 'hono/adapter';
import { ZodType } from 'zod';

import { auth } from '@/lib/auth';
import { type ENV } from '@/lib/env';
import { Messages } from '@/lib/messages';
export const authMiddleware = async (c: Context, next: Next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    return c.json({ error: Messages.UNAUTHORIZED }, 401);
  }

  c.set('user', session.user);
  c.set('session', session.session);
  return next();
};

export const isAdmin = async (c: Context, next: Next) => {
  const envVars = env<ENV>(c);
  const authHeader = (c.req.header('Authorization') ?? '').split(' ')[1];
  if (!authHeader) {
    return c.json({ error: Messages.UNAUTHORIZED }, 401);
  }
  const s = atob(authHeader);
  const [username, password] = s.split(':');

  if (username !== envVars.USERNAME || password !== envVars.PASSWORD) {
    return c.json({ error: Messages.INVALID_CREDENTIALS }, 403);
  }
  return next();
};

export const validateRequestBody = (schema: ZodType) => {
  return zValidator('json', schema, (result, c: Context) => {
    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }
  });
};
