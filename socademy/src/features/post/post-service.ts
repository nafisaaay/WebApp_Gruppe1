import type { BaseService } from "@/shared/base-service";
import { postRepository, type PostRepository } from "./post-repository";
import type { Params } from "./utils/parse-params"
import { validatePostParams } from "./utils/validate-post-params";
import { PostDTO, toPostDTO } from "./post-mapper";
import { postSchema, updatePostSchema } from "./utils/post-schema";
import { z } from "zod";

export interface PostService extends BaseService<PostDTO, Params, number>{}

export function createPostService(_repository : PostRepository): PostService{
    const getPost = (id:number) => _repository.get(id);

    return{
        async getAll(params = {}){
            const paramsValidateResult = validatePostParams(params);
            if(!paramsValidateResult.ok){
                return{
                    ok:false,
                    error:{
                        code: 400,
                        message: "invalid parameter",
                        fieldErrors:{
                            [paramsValidateResult.field]: [paramsValidateResult.error],
                        }
                    }
                    
                }
            }
            const result = await _repository.getAll(paramsValidateResult.params)
            if(!result.ok){
                return result;
            }
            return{
                ok:true,
                data: result.data.map(toPostDTO)
            };
        },
        async create(input, userId){
            const parsed = postSchema.safeParse(input);
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
                data: toPostDTO(result.data)
            };
        
        },
        async get(id){
            const result = await _repository.get(id);
            if(!result.ok) return result;
            if(!result.data){
                return{
                    ok:false,
                    error:{
                        code:404,
                        message: "post doesnt exist",
                        fieldErrors:{}
                    }
                }
            }
            return{
                ok:true, 
                data: toPostDTO(result.data),
            }
        },
        async remove(id){
            const postExists = await getPost(id);
            if(!postExists.ok) return postExists;
            if(!postExists.data){
                return{
                    ok:false, 
                    error: {
                        code: 404,
                        message: "post doesnt exist",
                        fieldErrors: {}
                    }
                }
            }
            const result = await _repository.remove(id);
            if(!result.ok) return result;

            return{
                ok:true
            }
        },
        async update(id, input, userId){
            const parsed = updatePostSchema.safeParse(input);
            const currentUser = await getPost(id);
         if (!currentUser.ok) return currentUser;
         if (!currentUser.data) {
            return {
                 ok: false,
                error:{ 
                    code: 404,
                     message: "post doesn't exist", 
                     fieldErrors: {} 
                    },
                 };
            }
        if (currentUser.data.userId !== userId) {
            return {
                 ok: false,
                 error: { 
                    code: 403, 
                    message: "you can only edit your own posts", 
                    fieldErrors: {} 
                },
            };
        }
            if(!parsed.success){
                return {
                    ok: false,
                    error: {
                        code: 400,
                        message: "something went wrong with the data",
                        fieldErrors: z.flattenError(parsed.error).fieldErrors
                    }
                }
            }
            if(Object.keys(parsed.data).length === 0){
                return{
                    ok: false,
                    error: {
                        code: 400,
                        message: "theres nothing to update",
                        fieldErrors: {}
                    }
                }
        }
        const result = await _repository.update(id, parsed.data, userId);
        if(!result.ok) return result;
        if(!result.data){
            return{
                ok: false,
                error:{
                    code: 404,
                    message: "post doesnt exist",
                    fieldErrors: {}
                }
            }
        }
        return{
            ok: true,
            data: toPostDTO(result.data)
        }
       
    }
    }
}
export const postService = createPostService(postRepository);