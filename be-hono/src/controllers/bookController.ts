import { Context } from "hono";
import { books, orderItems, orders } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";

// List all books
export const listBooks = async (c: Context) => {
  const allBooks = await db.select().from(books);
  return c.json(allBooks);
};

// Place an order
export const placeOrder = async (c: Context) => {
  const body: { items: { bookId: string; quantity: number }[] } =
    await c.req.json();

  console.log(body);
  if (!body || !body.items || body.items.length === 0) {
    return c.json({ error: "No items in order" }, 400);
  }

  const { items } = body;

  let totalPrice = 0;
  let stock = 0;

  const orderPayload: Record<string, any>[] = [];

  // Validate and calculate total price
  for (const { bookId, quantity } of items) {
    const bookList = await db
      .select()
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);
    if (bookList.length === 0) {
      return c.json({ error: `Book with ID ${bookId} not found` }, 404);
    }
    const book = bookList[0];
    if (book.stock < quantity) {
      return c.json({ error: `Not enough stock for ${book.title}` }, 400);
    }
    if (totalPrice + book.price * quantity > 120) {
      return c.json(
        { error: "Order exceeds maximum purchase limit of $120" },
        400
      );
    }
    totalPrice += book.price * quantity;
    stock = book.stock;
    orderPayload.push({
      bookId,
      quantity,
      price: book.price,
    });
  }

  // Deduct stock
  for (const { bookId, quantity } of items) {
    const currentOrder = await db
      .insert(orders)
      .values({
        userId: c.get("user")?.id,
      })
      .returning({
        id: orders.id,
      });
    await db.insert(orderItems).values(
      orderPayload.map((item) => ({
        orderId: currentOrder[0].id,
        bookId: item.bookId,
        quantity: item.quantity,
        price: item.price,
      }))
    );
    await db
      .update(books)
      .set({ stock: stock - quantity })
      .where(eq(books.id, bookId));
  }

  return c.json({ items, totalPrice });
};

// Restock books
export const restockBooks = async (c: Context) => {
  const { bookId, quantity }: { bookId: string; quantity: number } =
    await c.req.json();
  const adminUsername = c.req.header("x-admin-username");
  const adminPassword = c.req.header("x-admin-password");

  if (
    adminUsername !== "UncleBob1337" ||
    adminPassword !== "TomCruiseIsUnder170cm"
  ) {
    return c.json({ error: "Unauthorized admin credentials" }, 403);
  }

  const bookList = await db
    .select()
    .from(books)
    .where(eq(books.id, bookId))
    .limit(1);
  if (bookList.length === 0) {
    return c.json({ error: `Book with ID ${bookId} not found` }, 404);
  }
  const book = bookList[0];
  if (!book || book.limited) {
    return c.json({ error: `Cannot restock book with ID ${bookId}` }, 400);
  }

  await db
    .update(books)
    .set({ stock: book.stock + quantity })
    .where(eq(books.id, bookId));
  return c.json({
    message: `${book.title} restocked by ${quantity}`,
    newStock: book.stock + quantity,
  });
};
