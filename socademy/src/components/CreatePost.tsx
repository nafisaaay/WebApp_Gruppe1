import { requestInfo } from "rwsdk/worker";
import { validatePost } from "../lib/validation/validatePost";
import { canCreatePost } from "../features/post/authorization/authorizePost";
import { postSchema } from "../features/post/utils/post-schema";
import { z } from "zod";

type post = z.infer<typeof postSchema>;

//use client for validering av new post

export async function createPost(Post : post) {
  const { ctx } = requestInfo;
  const text = Post.text;

    const currentUser = ctx?.user;

  const validation = validatePost(post);
  if (!validation.ok) {
    throw new Error(validation.error);
  }

  const authorization = canCreatePost(
    { user: currentUser },
    "create",
    { text, userId: currentUser?.id }
  );
  if (!authorization.ok) {
    throw new Error(authorization.error);
  }

  
}