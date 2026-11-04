import { BaseRepository } from "@/shared/base-repository";
import { CreateLike, Like, likes } from "@/db/schema/schema";
import { db, type DB } from "@/db";
import { Errors } from "@/shared/results";
import { and, eq } from "drizzle-orm";

export interface LikesRepository extends BaseRepository<Like, CreateLike, never, number>{}

const dbError = (error: unknown) => {
  console.error(error);
  return {
    ok: false as const,
    error: { code: 500, message: "Noe gikk galt med databasen" },
  };
};

export function createLikesRepository(db:DB): LikesRepository{
    return{
        async getAll(postId) {
            if (postId === undefined) {
                return { ok: false, error: { code: 400, message: "postId mangler" } };
}
            try{
                const rows = await db
                .select()
                .from(likes)
                .where(eq(likes.postId, Number(postId)));
                return{ ok: true, data: rows}
               
            }
            catch (error) {
                return dbError(error);
             }
        },
        async create(data){
            try{
                const createdLike = await db
                .insert(likes)
                .values(data)
                .returning()
                .get();
                return{ok: true, data: createdLike};
            }
            catch (error) {
                return dbError(error);
            }

        }
        ,
        async remove(postId, userId) {
  if (!userId) {
    return { ok: false, error: { code: 401, message: "Du må være logget inn" } };
  }
  try {
    await db
      .delete(likes)
      .where(and(eq(likes.postId, Number(postId)), eq(likes.userId, userId)))
      .run();
    return { ok: true };
  } catch (error) {
    return dbError(error);
  }
},
        get: async() => ({ ok: false, error: Errors.notSupported }),
        update:async() => ({ ok: false, error: Errors.notSupported }),
        
    }
    
}

export const likesRepository = createLikesRepository(db);