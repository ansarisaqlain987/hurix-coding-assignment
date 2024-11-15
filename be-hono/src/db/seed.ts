import { auth } from "@/lib/auth";
import { db } from "./index";
import { books } from "./schema";

async function seed() {
  await db.insert(books).values([
    { id: "A", title: "Fellowship of the Book", price: 5, stock: 100 },
    { id: "B", title: "Books and the Chamber of Books", price: 10, stock: 100 },
    { id: "C", title: "The Return of the Book", price: 15, stock: 100 },
    {
      id: "D",
      title: "Limited Collectors Edition",
      price: 75,
      stock: 10,
      limited: true,
    },
  ]);

  console.log("Database seeded!");
}

seed().catch(console.error);
