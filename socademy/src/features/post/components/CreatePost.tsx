"use client";

import { requestInfo } from "rwsdk/worker";
import { validatePost } from "../validation/validatePost";
import { canCreatePost } from "../authorization/authorizePost";
import { postSchema } from "../utils/post-schema";
import { z } from "zod";


type post = z.infer<typeof postSchema>;

//use client for validering av new post



export async function createPost(Post : post) {
  

  
}