import { DB } from "@/db"; 
import { postService } from "../post-scervice";

export async function PostList() {
  const result = await postService.getAll();

  if (!result.ok) {
    return (
      <main>
        <h1>Alle innlegg</h1>
        <p role="alert">{result.error.message}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Alle innlegg</h1>
      <ul>
        {result.data.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2><p>{post.text}</p></li>
        ))}
      </ul>
    </main>
  );
}