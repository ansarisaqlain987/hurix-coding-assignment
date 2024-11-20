import { auth } from "@/lib/auth";
import { Context } from "hono";

export const authMiddleware = async (c: Context, next: () => any) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
};

export const isAdmin = async (c: Context, next: () => any) => {
  const authHeader = (c.req.header("Authorization") ?? "").split(" ")[1];
  if (!authHeader) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const s = atob(authHeader);
  const [username, password] = s.split(":");

  if (username !== "UncleBob1337" || password !== "TomCruiseIsUnder170cm") {
    return c.json({ error: "Unauthorized admin credentials" }, 403);
  }
  return next();
};
