import { Post, PostInput } from "./postTypes";

export interface PostService{
    get: () => Promise<]>;  
    create (userId: string, userName: string, input: nput) => Promise<;
    update (d: string, userId: string, input: nput) => Promise<;
    remove (d: string, userId: string) => Promise<void>;
}