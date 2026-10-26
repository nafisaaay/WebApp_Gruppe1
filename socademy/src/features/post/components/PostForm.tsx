"use client";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { createPost } from "../post-api";
import type { CreatePostInput } from "../utils/post-schema";

const initialData: CreatePostInput = {
  text: "",
  title: "",
};

export function PostForm() {
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

    setStatus("success");
    setData(initialData);
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
    <form onSubmit={onSubmit}>
      <label>
        Tittel
        <input
          name="title"
          placeholder="Tittel"
          value={data.title}
          onChange={onInputChange}
          disabled={isLoading}
        />
      </label>
      {fieldErrors.title ? <p>{fieldErrors.title[0]}</p> : null}

      <label>
        Tekst
        <textarea
          name="text"
          placeholder="Hva vil du dele?"
          value={data.text}
          onChange={onInputChange}
          disabled={isLoading}
          rows={5}
        />
      </label>
      {fieldErrors.text ? <p>{fieldErrors.text[0]}</p> : null}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Lagrer..." : "Publiser innlegg"} trykk her
      </button>

      {status === "error" ? <p role="alert">{error}</p> : null}
      {status === "success" ? <p>Innlegget er publisert</p> : null}
    </form>
  );
}