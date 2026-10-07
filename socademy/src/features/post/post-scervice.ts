import { Post } from "./postTypes";

export interface PostService{
    getPosts: () => Promise<Post[]>;  
    createPost: (userId: string, input: { text: string }) => Promise<Post>;
    updatePost: (postId: string, userId: string, input: { text: string }) => Promise<Post>;
    removePost: (postId: string, userId: string) => Promise<void>;
}