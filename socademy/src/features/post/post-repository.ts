import { posts, type CreatePost, type Post} from "@/db/schema"
import { BaseRepository } from "../base-repository";
import { DB } from "@/db";
import { POST, PostInput } from "./postTypes"



export interface PostRepoitory extends BaseRepository<Post, PostInput>{
  
}
 export function createPostRepository(_db : DB): PostRepoitory{
    
       
 } 