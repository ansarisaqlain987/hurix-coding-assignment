import { auth } from "@/lib/auth";
import { type ENV } from "@/lib/env";
import { Messages } from "@/lib/messages";
import { Context } from "hono";
import { env } from "hono/adapter";

export const authMiddleware = async (c: Context, next: () => any) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    return c.json({ error: Messages.UNAUTHORIZED }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
};

export const isAdmin = async (c: Context, next: () => any) => {
  const envVars = env<ENV>(c);
  const authHeader = (c.req.header("Authorization") ?? "").split(" ")[1];
  if (!authHeader) {
    return c.json({ error: Messages.UNAUTHORIZED }, 401);
  }
  const s = atob(authHeader);
  const [username, password] = s.split(":");

  if (username !== envVars.USERNAME || password !== envVars.PASSWORD) {
    return c.json({ error: Messages.INVALID_CREDENTIALS }, 403);
  }
  return next();
};

export const validateBody = async (c: Context, next: () => any) => {
  const body = await c.req.text();
  if (!body) {
    return c.json({ error: Messages.INVALID_INPUT }, 400);
  }
  return next();
};

export const validateRequestBody = () => {
  return async (c: Context, next: () => any) => {
    const body = await c.req.text();
    if (!body) {
      return c.json({ error: Messages.INVALID_INPUT }, 400);
    }
    return next();
  };
};
