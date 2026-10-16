import { z } from "zod";

export const postSchema = z.object({
  text: z.string().min(1, "Post text cannot be empty").max(500, "Post text must not exceed 500 characters"),
  title: z.string().min(1, "Title cannot be empty").max(20, "Title must not exceed 20 characters"),
  user: z.object({
    id: z.uuid(),
    name: z.string().min(1, "User name cannot be empty"),
  }),
  //event: EventSchema.optional(),
});