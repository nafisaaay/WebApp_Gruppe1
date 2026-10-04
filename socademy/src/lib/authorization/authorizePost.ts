type AuthResult = { ok: true } | { ok: false; error: string };

export function canDeletePost(
  user: { user: { id: number } } | null,
  action: "delete",
  targetPost: { id: number; userId: number } | null
): AuthResult {
  if (!user || !user.user) {
    return { ok: false, error: "User must be logged in to delete a post" };
  }

  if (!targetPost) {
    return { ok: false, error: "Target post is required for deletion" };
  }

  if (user.user.id !== targetPost.userId) {
    return { ok: false, error: "User does not have permission to delete this post" };
  }

  return { ok: true };
}

export function canCreatePost(
  user: { user: { id: number } } | null,
  action: "create",
  targetPost?: { text: string; userId?: number }
): AuthResult {
  if (!user || !user.user) {
    return { ok: false, error: "User must be logged in to create a post" };
  }

  if (targetPost && targetPost.userId && targetPost.userId !== user.user.id) {
    return { ok: false, error: "User does not have permission to create a post for another user" };
  }

  return { ok: true };
}