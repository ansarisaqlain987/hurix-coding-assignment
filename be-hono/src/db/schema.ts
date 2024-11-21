import {
  pgTable,
  varchar,
  integer,
  boolean,
  text,
  date,
  serial,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().notNull().default(false),
  image: text(),
  createdAt: date().notNull(),
  updatedAt: date().notNull(),
});

export const session = pgTable('session', {
  id: text().primaryKey().notNull(),
  expiresAt: date().notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id),
});

export const account = pgTable('account', {
  id: text().primaryKey().notNull(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  expiresAt: date(),
  password: text(),
});

export const verification = pgTable('verification', {
  id: text().primaryKey().notNull(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: date().notNull(),
});

// Books table schema
export const books = pgTable('books', {
  id: varchar('id', { length: 1 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  price: integer('price').notNull(),
  stock: integer('stock').notNull(),
  limited: boolean('limited').default(false),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export const orderItems = pgTable('orderItems', {
  id: serial('id').primaryKey(),
  orderId: integer('orderId')
    .notNull()
    .references(() => orders.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  bookId: varchar('bookId', { length: 1 })
    .notNull()
    .references(() => books.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
});
