import { z } from "zod";

export const commentSchema = z.object({
  text: z.string().min(1, "Comment text cannot be empty").max(100, "Comment text must not exceed 100 characters"),
  user: z.object({
    id: z.uuid(),
  }),
});