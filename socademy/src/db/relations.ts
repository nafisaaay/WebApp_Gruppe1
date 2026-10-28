import { defineRelations } from "drizzle-orm";
import * as schema from "./schema/schema";

export const relations = defineRelations(schema, (r) => ({
    user: {
        posts: r.many.posts(),
    },
    posts: {
        author: r.one.user({
            from: r.posts.userId,
            to: r.user.id,
            optional: false, // sier ifra til drizzle at en post ALLTID har en author.
        }),
    }
}));
