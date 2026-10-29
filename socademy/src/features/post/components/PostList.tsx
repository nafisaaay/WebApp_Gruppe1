import { DB } from "@/db"; 
import { postService } from "../post-service";
import { PostCard } from "./PostCard";

export async function PostList() {
  const result = await postService.getAll();

  if (!result.ok) {
    return (
      <section aria-labelledby="posts-title">
        <h2 id="posts-title" className="sr-only">Alle innlegg</h2>
        <p role="alert" className="card error-text">{result.error.message}</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="posts-title">
      <h2 id="posts-title" className="sr-only">Alle innlegg</h2>

      {result.data.length === 0 ? (
        <p className="card text-center text-muted">
          Ingen innlegg ennå. Bli den første!
        </p>) : null}

      <ul className="flex flex-col gap-4">
        {result.data.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}