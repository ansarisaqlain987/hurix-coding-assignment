import { Hono } from "hono";
import {
  listBooks,
  placeOrder,
  restockBooks,
  getOrders,
} from "../controllers/bookController";
import { authMiddleware, isAdmin } from "@/middlewares/middleware";

const routes = new Hono();

routes.all("/", async (c) => {
  return c.text(
    "Hurix Assignment Backend with Hono, Typescript and Drizzle ORM"
  );
});
routes.get("/books", listBooks);
routes.post("/order", authMiddleware, placeOrder);
routes.get("/order", authMiddleware, getOrders);
routes.post("/admin/restock", isAdmin, restockBooks);

export default routes;
