import { PostInput, Post } from "./postTypes";
import { BaseRepository } from "../base-repository";

export interface PostRepoitory extends BaseRepository<Post, PostInput>{
  
}
