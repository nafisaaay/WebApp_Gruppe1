import { posts, type CreatePost, type UpdatePost, type Post} from "@/db/schema"
import { BaseRepository } from "../base-repository";
import { DB } from "@/db";
import { POST, PostInput } from "./postTypes"



export interface PostRepository extends BaseRepository<POST, CreatePost, UpdatePost>{
  
}
 export function createPostRepository(_db : DB): PostRepository{
    return {
        async create(data){
            try{
                const createdTask = await _db
                .insert(posts)
                .values(data)
                .returning()
                .get();
            
            return{
                ok:true,
                data:createdTask,
            };
        }
        catch(error){
            console.error(error);
            return{
                ok:false,
                error:{
                    code:"500",
                    message:"Noe gikk galt med databasen",
                    fieldErrors:{},
                }
            }
        }
        }

    }
    
       
 } 