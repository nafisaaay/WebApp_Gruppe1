import { int, text, sqliteTable, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
// Tabellene Better Auth trenger: user, session, account, verification.
// Generert med Better Auth sin CLI (npx auth generate) og ryddet litt.
// IKKE endre kolonnenavnene her uten å vite hva du gjør: Better Auth forventer dem.
// Egne felter på brukeren legges til her OG i `user.additionalFields` i auth.ts.


// -------------- USERS -----------------
export const user = sqliteTable("users", {
    id: int("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: int("email_verified", { mode: "boolean"})
        .default(false)
        .notNull(),
    Image: text("image"),
    role: text({ enum: ["admin", "user"]})
        .notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: int("updated_at", { mode: "timestamp" })
        .$onUpdateFn(() => new Date()),
});

// -------------- SESSION -----------------
export const session = sqliteTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: int("expires_at", { mode: "timestamp_ms" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: int("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

// -------------- ACCOUNT -----------------
export const account = sqliteTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: int("access_token_expires_at", {
      mode: "timestamp_ms",
    }),
    refreshTokenExpiresAt: int("refresh_token_expires_at", {
      mode: "timestamp_ms",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: int("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

// -------------- VERIFICATION -----------------
export const verification = sqliteTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: int("expires_at", { mode: "timestamp_ms" }).notNull(),
    createdAt: int("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export type User = typeof user.$inferSelect;