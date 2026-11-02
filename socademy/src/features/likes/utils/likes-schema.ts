import {z} from "zod";

export const likesSchema = z.object({
    postId: z.number().int().positive(), 
})
    

