import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm/_relations";
import { user } from "../schema/auth-schema";

export * from "../schema/auth-schema";

// -------- Kalenderhendelser -----------
export const events = sqliteTable("events", {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    description: text(),
    location: text(),
    startsAt: int({ mode: "timestamp" }).notNull(),
    endsAt: int({ mode: "timestamp" }),
    createdAt: int({ mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
})

// -------------- PROFILES -----------------
// Én profil per bruker. userId er TEKST fordi Better Auth bruker tekst-id-er.
export const profile = sqliteTable("profile", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .unique() // én profil per bruker
        .references(() => user.id, { onDelete: "cascade" }),
    bio: text("bio"),
});

export type Profile = typeof profile.$inferSelect;


// -------- Innlegg -----------
export const posts = sqliteTable("posts", {
    id: int().primaryKey({ autoIncrement: true}),
    text: text().notNull(),
    title: text().notNull(),
    userId: text().notNull(),
    userName: text().notNull(),
    createdAt: int({ mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
    updatedAt: int({ mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
})

// -------- Kommentarer -----------
export const comments = sqliteTable("comments", {
    id: int().primaryKey({ autoIncrement: true}),
    text: text().notNull(),
    userId: text().notNull(),
    userName: text().notNull(),
    postId: int().notNull(),
    createdAt: int({ mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
    updatedAt: int({ mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
})

export type Post = typeof posts.$inferSelect;
export type CreatePost = typeof posts.$inferInsert;
export type UpdatePost = Partial<CreatePost>

export type Comment = typeof comments.$inferSelect;
export type CreateComment = typeof comments.$inferInsert;



