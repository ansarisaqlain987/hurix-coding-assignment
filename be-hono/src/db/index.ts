import { getDatabaseUrl } from "@/lib/utils";
import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";

dotenv.config();

export const db = drizzle(getDatabaseUrl());
