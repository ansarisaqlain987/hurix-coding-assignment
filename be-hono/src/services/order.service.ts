import { db } from "@/db";
import { books, orderItems, orders } from "@/db/schema";
import { SQL, Placeholder, eq } from "drizzle-orm";

export const insertOrder = (values: {
  userId: string | SQL<unknown> | Placeholder<string, any>;
  id?: number | SQL<unknown> | Placeholder<string, any> | undefined;
}) => {
  return db.insert(orders).values(values).returning();
};

export const insertItems = (
  values: {
    orderId: number | SQL<unknown> | Placeholder<string, any>;
    bookId: string | SQL<unknown> | Placeholder<string, any>;
    price: number | SQL<unknown> | Placeholder<string, any>;
    quantity: number | SQL<unknown> | Placeholder<string, any>;
  }[]
) => {
  return db.insert(orderItems).values(values).returning();
};

export const getOrdersByUserId = (userId: string) => {
  return db
    .select({
      orderId: orders.id,
      items: {
        bookId: books.id,
        bookTitle: books.title,
        quantity: orderItems.quantity,
        price: orderItems.price,
      },
    })
    .from(orders)
    .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
    .leftJoin(books, eq(orderItems.bookId, books.id))
    .where(eq(orders.userId, userId));
};
