type AuthResult = { ok: true } | { ok: false; error: string };

 
export function validatePost(post: { text: string, title: string; }): AuthResult {
  if (post.text === undefined) {
    return { ok: false, error: "Post must have a text property" };
  }

  if (post.text.length === 0) {
    return { ok: false, error: "Post text cannot be empty" };
  }

  if (post.text.length > 500) {
    return { ok: false, error: "Post text must not exceed 500 characters" };
  }
  if(post.title === undefined){
    return { ok: false, error: "Post must have a title property" };
  }
  if(post.title.length === 0 ){
     return { ok: false, error: "Post title cannot be empty" };
  }
  if (post.title.length > 20) {
    return { ok: false, error: "Post title must not exceed 20 characters" };
  }

  return { ok: true };
}