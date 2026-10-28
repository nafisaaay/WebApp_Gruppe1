import { desc, eq, or, like } from "drizzle-orm";
import { posts, user, type CreatePost, type UpdatePost, type Post } from "@/db/schema/schema";
import type { BaseRepository } from "../../shared/base-repository";
import { db, type DB } from "@/db";
import { LIST_LIMIT_MAX, PostListParams } from "./utils/validate-post-params";
import { PostWithAuthor } from "./post-mapper";

export interface PostRepository extends BaseRepository<PostWithAuthor, CreatePost, UpdatePost, PostListParams> {}

const dbError = (error: unknown) => {
  console.error(error);
  return {
    ok: false as const,
    error: { code: 500, message: "Noe gikk galt med databasen" },
  };
};

const selectWithAuthor = (db: DB) => db
    .select({ post: posts, author: { id: user.id, name: user.name } })
    .from(posts)
    .innerJoin(user, eq(posts.userId, user.id));

const toPostWithAuthor = (row: { post: Post; author: { id: string; name: string }; }): PostWithAuthor => ({
  ...row.post,
  author: row.author,
});

export function createPostRepository(db: DB): PostRepository {
  // 
  const findById = async (id: number) => {
    const row = await selectWithAuthor(db).where(eq(posts.id, id)).get();
    return row ? toPostWithAuthor(row) : null;
  };


  return {
    async getAll(params = {}) {
      try {
        const search = params.q ? `%${params.q}%` : undefined;
        const rows = await selectWithAuthor(db)
          .where(search ? or(like(posts.title, search), like(posts.text, search)) : undefined)
          .orderBy(desc(posts.createdAt))
          .limit(params.limit ?? LIST_LIMIT_MAX)
          .all();
        return { ok: true, data: rows.map(toPostWithAuthor) };
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
        return { ok: true, data: (await findById(createdPost.id))! };
      } catch (error) {
        return dbError(error);
      }
    },

    async get(id) {
      try {
        return { ok: true, data: await findById(Number(id)) };
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
        return { ok: true };
      } catch (error) {
        return dbError(error);
      }
    },
    async update(id, data){
      try{ 
        await db
          .update(posts)
          .set({ ...data, updatedAt: new Date() })
          .where(eq(posts.id, Number(id)))
          .returning()
          .get();
        return({ ok:true, data: await findById(Number(id)) })
      }
      catch(error){
        return dbError(error)
      }
    }
  }
}
export const postRepository = createPostRepository(db);