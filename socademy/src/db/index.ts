import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
export type DB = typeof db;
export const db = drizzle(env.DB);