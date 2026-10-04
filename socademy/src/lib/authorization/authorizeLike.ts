type AuthResult = { ok: true } | { ok: false; error: string };

export function canLikePost(
  user: { user: { id: number } } | null,
  action: "like",
  targetPost: { id: number; userId: number; likedBy: number[] } | null
): AuthResult {
  if (!user || !user.user) {
    return { ok: false, error: "User must be logged in to like a post" };
  }

  if (!targetPost) {
    return { ok: false, error: "Target post is required for liking" };
  }

  if (targetPost.likedBy.includes(user.user.id)) {
    return { ok: false, error: "User has already liked this post" };
  }

  return { ok: true };
}