import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm/_relations";
import { user } from "./auth-schema";

export * from "./auth-schema";

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

/*
// -------------- USERS -----------------
export const user = sqliteTable("users", {
    id: int("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    role: text("role").notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: int("updated_at", { mode: "timestamp" })
        .$onUpdateFn(() => new Date()),
});


// -------------- RELATIONS -----------------
export const userToProfileRelation = relations(user, ({ one }) => ({
    profile: one(profile)
}));

export const profileToUserRelation = relations(profile, ({ one }) => ({
    user: one(user, {
        fields: [profile.userId],
        references: [user.id],
    }),
}));


export type User = typeof user.$inferSelect;
export type CreateUser = typeof user.$inferInsert;
*/

/* Legge inn felt for relasjon mellom bruker og innlegg??
Denne burde ligge her:
export const userRelations = relations(users, ({ many }) => ({
    posts: many(posts), // en bruker kan ha mange innlegg
})); 

Denne burde ligge på post-schema:
export const postsRelations = relations(posts, ({ one }) => ({
  createdBy: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

NB! Dette er også kode for hvis bruker slettes, slik at alle innlegg/info som tilhører den iden slettes også med FK-restraints og cascade actions.
// Referensiell integritet - sikrer gyldig data relasjon
authorId: integer("author_id").references(() => users.id, {
  onDelete: "cascade",    // Slett relaterte records når parent slettes
  onUpdate: "cascade",    // Oppdater FKs når parent PK endres
})


**/

/**
 Forklaring av schema elementer:
integer() med autoIncrement: Auto-incrementing primary key
text().notNull(): Påkrevd tekstfelt
unique(): Sikrer unike verdier (email kan ikke duplikeres)
mode: "timestamp": Konverterer mellom JavaScript Date og SQLite integer
$defaultFn(): Setter default verdi når rad opprettes
$onUpdateFn(): Oppdaterer verdi automatisk ved endringer
$inferSelect/$inferInsert: Genererer TypeScript types
 */
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



