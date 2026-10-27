import { z } from "zod";
import { postSchema } from "./utils/post-schema";

export type PostInput = z.infer<typeof postSchema>;

export interface POST{
    id: string;
    title: string;
    text: string;
    user: {
        id: string;
        name: string;
    }; 
}
