import { auth } from "@/lib/auth";
import { Context } from "hono";

export const authMiddleware = async (c: Context, next: () => any) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  console.log(session);
  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
};

export const isAdmin = async (c: Context, next: () => any) => {
  if (!c.get("user") || c.get("user")?.email !== "UncleBob1337") {
    return c.json({ error: "Unauthorized admin credentials" }, 403);
  }
  return next();
};
