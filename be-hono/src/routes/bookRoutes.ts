import { Hono } from "hono";
import {
  listBooks,
  placeOrder,
  restockBooks,
} from "../controllers/bookController";
import { authMiddleware, isAdmin } from "@/middlewares/middleware";

const bookRoutes = new Hono();

bookRoutes.get("/books", listBooks);
bookRoutes.post("/order", authMiddleware, placeOrder);
bookRoutes.post("/admin/restock", authMiddleware, isAdmin, restockBooks);

export default bookRoutes;
