import { desc, eq, or, like, sql } from "drizzle-orm";
import { posts, user, type CreatePost, type UpdatePost, type Post, likes } from "@/db/schema/schema";
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

const selectWithAuthor = (db: DB, viewerId?: string | null) => db
    .select({ post: posts, author: { id: user.id, name: user.name }, 
    likeCount: sql<number>`(select count(*) from ${likes} where ${likes.postId} = ${posts.id})`.mapWith(Number),
    likedByMe: sql<boolean>`exists(select 1 from ${likes} where ${likes.postId} = ${posts.id} and ${likes.userId} = ${viewerId ?? ""})`.mapWith(Boolean),})
    .from(posts)
    .innerJoin(user, eq(posts.userId, user.id));

const toPostWithAuthor = (row: {
  post: Post;
  author: { id: string; name: string };
  likeCount: number;
  likedByMe: boolean;
}): PostWithAuthor => ({
  ...row.post,
  author: row.author,
  likeCount: row.likeCount,
  likedByMe: row.likedByMe,
});

export function createPostRepository(db: DB): PostRepository {
 const findById = async (id: number, viewerId?: string) => {
  const row = await selectWithAuthor(db, viewerId).where(eq(posts.id, id)).get();
  return row ? toPostWithAuthor(row) : null;
};


  return {
    async getAll(params = {}, userId) {
      try {
        const search = params.q ? `%${params.q}%` : undefined;
        const rows = await selectWithAuthor(db, userId)
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
    return { ok: true, data: (await findById(createdPost.id, data.userId))! };
  } catch (error) {
    return dbError(error);
  }
},

    async get(id, userId) {
      try {
        return { ok: true, data: await findById(Number(id),userId) };
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
    async update(id, data, userId,){
      try{ 
        await db
          .update(posts)
          .set({ ...data, updatedAt: new Date() })
          .where(eq(posts.id, Number(id)))
          .returning()
          .get();
        return({ ok:true, data: await findById(Number(id),userId) })
      }
      catch(error){
        return dbError(error)
      }
    }
  }
}
export const postRepository = createPostRepository(db);