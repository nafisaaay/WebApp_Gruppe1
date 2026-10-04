type AuthResult = { ok: true } | { ok: false; error: string };

 
export function validatePost(post: { id: number; text: string; user: { id: number } }): AuthResult {
  if (post.text === undefined) {
    return { ok: false, error: "Post must have a text property" };
  }

  if (post.text.length === 0) {
    return { ok: false, error: "Post text cannot be empty" };
  }

  if (post.text.length > 500) {
    return { ok: false, error: "Post text must not exceed 500 characters" };
  }

  return { ok: true };
}