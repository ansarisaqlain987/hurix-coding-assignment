import { Hono } from "hono";
import {
  listBooks,
  placeOrder,
  restockBooks,
  getOrders,
} from "../controllers/bookController";
import { authMiddleware, isAdmin } from "@/middlewares/middleware";

const bookRoutes = new Hono();

bookRoutes.get("/books", listBooks);
bookRoutes.post("/order", authMiddleware, placeOrder);
bookRoutes.get("/order", authMiddleware, getOrders);
bookRoutes.post("/admin/restock", isAdmin, restockBooks);

export default bookRoutes;
