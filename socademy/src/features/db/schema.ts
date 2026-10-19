import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm/_relations";
import { email } from "zod";

// -------------- USERS -----------------
export const user = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    role: text("role").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("updated_at", { mode: "timestamp" })
        .$onUpdateFn(() => new Date()),
});

// -------------- PROFILES -----------------
export const profile = sqliteTable("profile", {
    id: integer("id").primaryKey(),
    userId: integer("user_id").references(() => user.id, {
        onDelete: "cascade",
    }),
    bio: text("bio"),
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