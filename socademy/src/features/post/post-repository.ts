import { PostInput, Post } from "./postTypes";
import { PostService } from "./post-scervice";
import { BaseRepository } from "../base-repository";

//

export interface PostRepoitory extends BaseRepository{
    getPosts(): Promise<Post[]>;
    createPost(userId: string, input: PostInput): Promise<Post>;
    updatePost(postId: string, userId: string, input: PostInput): Promise<Post>;
    removePost(postId: string, userId: string): Promise<void>;
}
