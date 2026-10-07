import { Post } from "./postTypes";
import { z } from "zod";
import { commentSchema } from "./utils/comment-schema";

export type CommentInput = z.infer<typeof commentSchema>;

export interface Comment {
  id: string;
    text: string;
    user: {
        id: string;
    };
    postId: Post["id"];
}