type AuthResult = { ok: true } | { ok: false; error: string };

export function canCommentOnPost(
  user: { user: { id: string } } | null,
  action: "comment",
  targetPost: { id: string } | null
): AuthResult {
  if (!user || !user.user) {
    return { ok: false, error: "User must be logged in to comment" };
  }
  if (!targetPost) {
    return { ok: false, error: "Target post is required for commenting" };
  }
  return { ok: true };
}