import { eq, SQL } from 'drizzle-orm';

import { db } from '@/db';
import { books } from '@/db/schema';

export const getBooks = ({ id }: { id?: string } = {}) => {
  if (id) {
    return db.select().from(books).where(eq(books.id, id));
  }
  return db.select().from(books);
};

export const updateBooks = (
  setCondition: {
    id?: string | SQL<unknown> | undefined;
    title?: string | SQL<unknown> | undefined;
    price?: number | SQL<unknown> | undefined;
    stock?: number | SQL<unknown> | undefined;
    limited?: boolean | SQL<unknown> | null | undefined;
  },
  id: string,
) => {
  return db.update(books).set(setCondition).where(eq(books.id, id));
};
