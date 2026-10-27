import { z } from "zod";

export const postSchema = z.object({
  text: z.string().trim().min(1, "Post text cannot be empty").max(500, "Post text must not exceed 500 characters"),
  title: z.string().trim().min(1, "Title cannot be empty").max(50, "Title must not exceed 50 characters"),
  //event: EventSchema.optional(),
});

export const updatePostSchema = postSchema.partial();

export type CreatePostInput = z.infer<typeof postSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;