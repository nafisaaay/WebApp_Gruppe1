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


export type Event = typeof events.$inferSelect;
export type CreateEvent = typeof events.$inferInsert;
