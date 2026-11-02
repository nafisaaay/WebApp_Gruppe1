"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import type { PostDTO } from "@/features/post/post-mapper";
import { likePost, unlikePost } from "../likes-actions";

export function LikeButton({ post }: { post: PostDTO }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    setError(null);

    startTransition(async () => {
      const result = post.likedByMe
        ? await unlikePost(post.id)
        : await likePost(post.id);

      if (!result.ok) setError(result.error);
    });
  };

  return (
    <div className="relative z-10 flex items-center gap-2">
      <button
        type="button"
        onClick={toggle}
        disabled={isPending}
        aria-pressed={post.likedByMe}
        aria-label={post.likedByMe ? "Fjern like" : "Lik innlegget"}
        className="flex items-center gap-1.5 text-sm disabled:opacity-50"
      >
        <Heart
          className={post.likedByMe ? "size-5 fill-red-500 text-red-500" : "size-5"}
          aria-hidden
        />
        <span>{post.likeCount}</span>
      </button>
      {error ? <p role="alert" className="error-text">{error}</p> : null}
    </div>
  );
}