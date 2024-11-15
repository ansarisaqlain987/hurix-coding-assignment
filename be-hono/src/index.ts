import { serve } from "@hono/node-server";
import { Hono } from "hono";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes";
import { swaggerUI } from "@hono/swagger-ui";
import { auth } from "./lib/auth";

dotenv.config();

const app = new Hono();
const port = 3000;

app.get("/api/auth/*", (c) => auth.handler(c.req.raw));
app.post("/api/auth/*", (c) => auth.handler(c.req.raw));
// Register routes
app.route("/api", bookRoutes);

// 404 handler
app.notFound((c) => c.json({ error: "Route not found" }, 404));

serve({
  fetch: app.fetch,
  port,
});
