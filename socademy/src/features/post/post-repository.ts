import { desc, eq, or, like } from "drizzle-orm";
import { posts, type CreatePost, type UpdatePost, type Post } from "@/db/schema";
import type { BaseRepository } from "../base-repository";
import { db, type DB } from "@/db";
import { PostListParams } from "./utils/validate-post-params";
import { Params } from "./utils/parse-params";

export interface PostRepository extends BaseRepository<Post, CreatePost, UpdatePost, PostListParams> {}

const dbError = (error: unknown) => {
  console.error(error);
  return {
    ok: false as const,
    error: { code: 500, message: "Noe gikk galt med databasen" },
  };
};

export function createPostRepository(db: DB): PostRepository {
  return {
    async getAll(params = {}) {
      try {
        const search = params.q ? `%${params.q}%` : undefined;
        const rows = await db
          .select()
          .from(posts)
          .where(search ? or(like(posts.title, search), like(posts.text, search)) : undefined)
          .orderBy(desc(posts.createdAt))
          .all();
        return { ok: true, data: rows };
      } catch (error) {
        return dbError(error);
      }
    },

    async create(data) {
      try {
        const createdPost = await db
        .insert(posts)
        .values(data)
        .returning()
        .get();
        return { 
          ok: true, 
          data: createdPost 
        };
      } catch (error) {
        return dbError(error);
      }
    },

    async get(id) {
      try {
        const post = await db
          .select()
          .from(posts)
          .where(eq(posts.id, Number(id)))
          .get();
        return { ok: true, data: post ?? null };
      } catch (error) {
        return dbError(error);
      }
    },

    async remove(id) {
      try {
        await db
        .delete(posts)
        .where(eq(posts.id, Number(id)))
        .run();
        return { 
          ok: true 
        };
      } catch (error) {
        return dbError(error);
      }
    },
  };
}
export const postRepository = createPostRepository(db);