type AuthResult = { ok: true } | { ok: false; error: string };

export function canUnlikePost(
    user: { user: { id: number } } | null,  
      action: "unlike",
      targetPost: { id: number; userId: number; likedBy: number[] } | null
): AuthResult {
    if (!user || !user.user) {
        return { ok: false, error: "User must be logged in to unlike a post" };
    }

    if (!targetPost) {
        return { ok: false, error: "Target post is required for unliking" };
    }

    if (!targetPost.likedBy.includes(user.user.id)) {
        return { ok: false, error: "User has not liked this post yet" };
    }

    return { ok: true };
}