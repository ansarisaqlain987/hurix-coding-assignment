import { serve } from '@hono/node-server';
import dotenv from 'dotenv';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { trimTrailingSlash } from 'hono/trailing-slash';

import { auth } from './lib/auth';
import routes from './routes/bookRoutes';

dotenv.config();

const app = new Hono({ strict: true });
const port = 3000;

app.use(csrf());
app.use(trimTrailingSlash());
app.use('*', requestId());
app.use('/api/*', cors());
app.use(logger());
app.all('/', async (c) => {
  return c.text(
    'Hurix Assignment Backend with Hono, Typescript and Drizzle ORM',
  );
});
app.get('/api/auth/*', (c) => auth.handler(c.req.raw));
app.post('/api/auth/*', (c) => auth.handler(c.req.raw));
// Register routes
app.route('/api', routes);

// 404 handler
app.notFound((c) => c.json({ error: 'Route not found' }, 404));

serve({
  fetch: app.fetch,
  port,
});
