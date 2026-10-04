type AuthResult = { ok: true } | { ok: false; error: string };

export function validateComment(comment: { id: number; text?: string , user: { id: number } | null }): AuthResult {
  if (comment.text === undefined) {
    return { ok: false, error: "Comment must have a text property" };
  }
  if (comment.text.length === 0) {
    return { ok: false, error: "Comment text cannot be empty" };
  }
  if (comment.text.length > 100) {
    return { ok: false, error: "Comment text must not exceed 100 characters" };
  }
  return { ok: true };
}