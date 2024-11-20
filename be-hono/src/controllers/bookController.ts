import { Context } from "hono";
import { getBooks, updateBooks } from "@/services/book.service";
import {
  getOrdersByUserId,
  insertItems,
  insertOrder,
} from "@/services/order.service";

export const listBooks = async (c: Context) => {
  const allBooks = await getBooks();
  return c.json(allBooks);
};

export const placeOrder = async (c: Context) => {
  const body: { items: { bookId: string; quantity: number }[] } =
    await c.req.json();

  if (!body || !body.items || body.items.length === 0) {
    return c.json({ error: "No items in order" }, 400);
  }

  const { items } = body;

  let totalPrice = 0;
  let stock = 0;

  const orderPayload: {
    bookId: string;
    quantity: number;
    price: number;
  }[] = [];

  // Validate and calculate total price
  for (const { bookId, quantity } of items) {
    const bookList = await getBooks({ id: bookId });
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

  if (totalPrice > 120) {
    return c.json(
      { error: "Order exceeds maximum purchase limit of $120" },
      400
    );
  }

  const currentOrder = await insertOrder({
    userId: c.get("user")?.id,
  });
  const orderId = currentOrder[0].id;
  await insertItems(
    orderPayload.map((item) => ({
      orderId,
      ...item,
    }))
  );
  for (const { bookId, quantity } of items) {
    await updateBooks({ stock: stock - quantity }, bookId);
  }

  return c.json({ items, totalPrice });
};

export const getOrders = async (c: Context) => {
  const userOrders = await getOrdersByUserId(c.get("user")?.id);

  const groupedOrders = userOrders.reduce(
    (acc: Record<string | number, any>, order) => {
      const { orderId, items } = order;
      if (!acc[orderId]) {
        acc[orderId] = {
          orderId,
          items: [],
        };
      }
      acc[orderId].items.push(items);
      return acc;
    },
    {}
  );
  return c.json(groupedOrders);
};

export const restockBooks = async (c: Context) => {
  const { bookId, quantity }: { bookId: string; quantity: number } =
    await c.req.json();

  const bookList = await getBooks({ id: bookId });
  if (bookList.length === 0) {
    return c.json({ error: `Book with ID ${bookId} not found` }, 404);
  }
  const book = bookList[0];
  if (!book || book.limited) {
    return c.json({ error: `Cannot restock book with ID ${bookId}` }, 400);
  }

  const isMUltipleOf10 = quantity % 10 === 0;
  if (!isMUltipleOf10) {
    return c.json({ error: "Quantity must be a multiple of 10" }, 400);
  }

  const newStock = Number(book.stock) + Number(quantity);
  await updateBooks({ stock: newStock }, bookId);
  return c.json({
    message: `${book.title} restocked by ${quantity}`,
    newStock: newStock,
  });
};
