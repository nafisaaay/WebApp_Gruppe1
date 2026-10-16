import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";


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

// -------- Innlegg -----------


export const posts = sqliteTable("posts", {
    id: int().primaryKey({ autoIncrement: true}),
    text: text().notNull(),
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



