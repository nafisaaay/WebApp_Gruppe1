import { z } from "zod";
import { postSchema } from "./utils/post-schema";

export type PostInput = z.infer<typeof postSchema>;

export interface Post{
    id: string;
    text: string;
    user: {
        id: string;
    }; 
}
