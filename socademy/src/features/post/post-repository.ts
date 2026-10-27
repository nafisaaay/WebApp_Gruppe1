import { desc, eq, or, like } from "drizzle-orm";
import { posts, type CreatePost, type UpdatePost, type Post } from "@/db/schema/schema";
import type { BaseRepository } from "../../shared/base-repository";
import { db, type DB } from "@/db";
import { LIST_LIMIT_MAX, PostListParams } from "./utils/validate-post-params";

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
          .limit(params.limit ?? LIST_LIMIT_MAX)
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
    async update(id, data){
      try{
      const updatePost = await db
      .update(posts)
      .set(data)
      .where(eq(posts.id, Number(id)))
      .returning()
      .get();
      return({ok:true, data: updatePost})
      }
      catch(error){
        return dbError(error)
      }

    
  }
}
}
export const postRepository = createPostRepository(db);