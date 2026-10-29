"use client";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { createPost } from "../post-api";
import { Avatar } from "@/app/components/Avatar";
import { useUser } from "@/features/user/components/UserProvider";
import type { CreatePostInput } from "../utils/post-schema";

const initialData: CreatePostInput = {
  text: "",
  title: "",
};

export function PostForm() {
  const { user } = useUser();
  const [data, setData] = useState<CreatePostInput>(initialData);
  const [status, setStatus] = useState<"loading" | "error" | "idle" | "success">("idle");
  const [error, setError] = useState<null | string>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    setFieldErrors({});

    const result = await createPost(data);
    if (!result.ok) {
      setStatus("error");
      setError(result.error.message);
      setFieldErrors(result.error.fieldErrors ?? {});
      return;
    }

    window.location.reload();
  };

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    const key = event.target.name;

    setData((prev) => ({ ...prev, [key]: value }));
  };

  const isLoading = status === "loading";

  return (
    <form onSubmit={onSubmit} className="card p-5">
      <div className="flex gap-4">
        {user ? <Avatar name={user.name} size="lg" /> : null}

        <div className="min-w-0 flex-1">
          <input
            name="title"
            placeholder="Tittel"
            aria-label="Tittel"
            value={data.title}
            onChange={onInputChange}
            disabled={isLoading}
            className="w-full bg-transparent py-2 text-lg font-semibold outline-none placeholder:text-muted disabled:opacity-60"
            aria-invalid={fieldErrors.title ? true : undefined}
          />
          {fieldErrors.title ? <p className="error-text">{fieldErrors.title[0]}</p> : null}

          <textarea
            name="text"
            placeholder="Hva vil du dele?"
            aria-label="Tekst"
            value={data.text}
            onChange={onInputChange}
            disabled={isLoading}
            rows={3}
            className="mt-1 w-full resize-none bg-transparent leading-relaxed outline-none placeholder:text-muted disabled:opacity-60"
            aria-invalid={fieldErrors.text ? true : undefined}
          />
          {fieldErrors.text ? <p className="error-text">{fieldErrors.text[0]}</p> : null}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-3 border-t border-line pt-4">
        {status === "error" ? <p role="alert" className="error-text mr-auto">{error}</p> : null}
        {status === "success" ? <p className="mr-auto text-sm text-success">Innlegget er publisert</p> : null}

        <button type="submit" disabled={isLoading} className="btn-primary px-6 py-2.5">
          {isLoading ? "Lagrer..." : "Publiser innlegg"}
        </button>
      </div>
    </form>
  );
}