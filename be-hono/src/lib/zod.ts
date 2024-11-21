import { z } from 'zod';

export const RestockInput = z.object({
  bookId: z.string(),
  quantity: z.number(),
});

export const OrderInput = z.object({
  items: z.array(RestockInput),
});
