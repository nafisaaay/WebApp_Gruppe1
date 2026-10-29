"use client";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { updatePost, removePost } from "../post-api";
import type { PostDTO } from "../post-mapper";
import type { UpdatePostInput } from "../utils/post-schema";

export function EditPostForm({ post, onCancel }: { post: PostDTO; onCancel: () => void }) {
  const [data, setData] = useState<UpdatePostInput>({ title: post.title, text: post.text });
  const [status, setStatus] = useState<"loading" | "error" | "idle" | "success">("idle");
  const [error, setError] = useState<null | string>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    setFieldErrors({});

    const result = await updatePost(post.id, data);
    if (!result.ok) {
      setStatus("error");
      setError(result.error.message);
      setFieldErrors(result.error.fieldErrors ?? {});
      return;
    }

    setStatus("success");
    window.location.reload();
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const isLoading = status === "loading";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <input
        name="title"
        aria-label="Tittel"
        value={data.title ?? ""}
        onChange={onInputChange}
        disabled={isLoading}
        aria-invalid={fieldErrors.title ? true : undefined}
        className="w-full bg-transparent py-2 text-lg font-semibold outline-none disabled:opacity-60"
      />
      {fieldErrors.title ? <p className="error-text">{fieldErrors.title[0]}</p> : null}

      <textarea
        name="text"
        aria-label="Tekst"
        value={data.text ?? ""}
        onChange={onInputChange}
        disabled={isLoading}
        rows={4}
        aria-invalid={fieldErrors.text ? true : undefined}
        className="w-full resize-none bg-transparent leading-relaxed outline-none disabled:opacity-60"
      />
      {fieldErrors.text ? <p className="error-text">{fieldErrors.text[0]}</p> : null}

        <div className="flex items-center justify-end gap-3">
            {status === "error" ? <p role="alert" className="error-text mr-auto">{error}</p> : null}
            <button type="button" onClick={onCancel} disabled={isLoading} className="text-sm text-muted">Avbryt</button>
            <button type="submit" disabled={isLoading} className="btn-primary px-6 py-2.5">{isLoading ? "Lagrer..." : "Lagre"}</button>
      </div>
    </form>
  );
}

export function DeletePostButton({ post }: { post: PostDTO }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (!confirm("Vil du slette innlegget?")) return;
    setIsLoading(true);
    setError(null);

    const result = await removePost(post.id);
    if (!result.ok) {
      setError(result.error.message);
      setIsLoading(false);
      return;
    }
    window.location.reload();
  };

  return (
    <>
      <button type="button" onClick={onClick} disabled={isLoading}>
        {isLoading ? "Sletter..." : "Slett"}
      </button>
      {error ? <p role="alert" className="error-text">{error}</p> : null}
    </>
  );
}