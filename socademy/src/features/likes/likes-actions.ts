"use server";

import { requestInfo } from "rwsdk/worker";
import { likesService } from "./likes-service";

export async function likePost(postId: number) {
  const { ctx } = requestInfo;
  const result = await likesService.create({ postId }, ctx.session.userId ?? "");

  return result.ok
    ? { ok: true as const, data: result.data }
    : { ok: false as const, error: result.error.message };
}

export async function unlikePost(postId: number) {
  const { ctx } = requestInfo;
  const result = await likesService.remove(postId, ctx.session.userId ?? undefined);

  return result.ok
    ? { ok: true as const }
    : { ok: false as const, error: result.error.message };
}