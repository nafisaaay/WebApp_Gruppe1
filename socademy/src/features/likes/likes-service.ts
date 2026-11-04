import { Like } from "@/db/schema/schema";
import { BaseService } from "@/shared/base-service";
import { likesRepository, LikesRepository } from "./likes-repository";
import { likesSchema } from "./utils/likes-schema";
import { z } from "zod";
import { Errors } from "@/shared/results";

export interface LikesService extends BaseService<Like,number,number>{}

export function createLikesService(_repository: LikesRepository): LikesService{
    return{
        async getAll(postId){
            const result = await _repository.getAll(postId)
            if(!result.ok){
                return result;
            }
            return{
                ok: true,
                data: result.data
            }
        },
        async create(input, userId){
        const parsed = likesSchema.safeParse(input);
        if (!userId) {
             return { ok: false, 
                error: { 
                    code: 401, 
                    message: "you have to be logged in", 
                    fieldErrors: {} 
                } };
            }
            if(!parsed.success)
                return{
            ok:false,
            error:{
                code: 400,
                message: "errors in the data",
                fieldErrors: z.flattenError(parsed.error).fieldErrors,
            },

        };
          const result = await _repository.create({...parsed.data, userId});
            if(!result.ok) return result;
            
            return {
                ok: true,
                data: result.data
            };
        },
       async remove(postId, userId) {
        if (!userId) {
            return { 
                ok: false, 
                error: { 
                    code: 401, 
                    message: "You have to be logged in", 
                    fieldErrors: {} 
                } };
        }
        return _repository.remove(postId, userId);
    },
        get: async () => ({ ok: false, error: Errors.notSupported }),
        update: async () => ({ ok: false, error: Errors.notSupported }),
    }
}
export const likesService = createLikesService(likesRepository);