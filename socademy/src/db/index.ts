import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import { SQLiteAsyncDatabase } from "drizzle-orm/sqlite-core";

import * as schema from "./schema";

import * as schema from "./schema/schema"

import { relations } from "./relations";

export const db = drizzle(env.DB, { relations });

export { schema, relations };

export type DB = SQLiteAsyncDatabase<any, any, typeof relations>;