type AuthResult = { ok: true } | { ok: false; error: string };

export function canDeletePost(
  user: { user: { id: string } } | null,
  action: "delete",
  targetPost: { id: string; userId: string } | null
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
  user: { user: { id: string } } | null,
  action: "create",
  targetPost?: { text: string; userId?: string }
): AuthResult {
  if (!user || !user.user) {
    return { ok: false, error: "User must be logged in to create a post" };
  }

  if (targetPost && targetPost.userId && targetPost.userId !== user.user.id) {
    return { ok: false, error: "User does not have permission to create a post for another user" };
  }

  return { ok: true };
}