"use client";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
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

  // Event-delen
  const [isEvent, setIsEvent] = useState(false);
  const [startsAt, setStartsAt] = useState("");
  const [location, setLocation] = useState("");



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

    // Hvis event er krysset av, lag også et event i kalender

    if (isEvent) {
      const res = await fetch("/api/v1/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          description: data.text,
          startsAt,
          location,
        }),
      });
      const eventResult = (await res.json()) as { ok: boolean; error: { message: string } };

      if (!eventResult.ok) {
        setStatus("error");
        setError(eventResult.error.message);
        return;
      }
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

            <label>
        <input
          type="checkbox"
          checked={isEvent}
          onChange={(e) => setIsEvent(e.target.checked)}
          disabled={isLoading}
        />
        Event
      </label>

      {isEvent && (
        <>
          <label>
            Dato og tid
            <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} disabled={isLoading} />
          </label>
          <label>
            Sted
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} disabled={isLoading} />
          </label>
        </>
      )}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Lagrer..." : "Publiser innlegg"} trykk her
      </button>

      {status === "error" ? <p role="alert">{error}</p> : null}
      {status === "success" ? <p>Innlegget er publisert</p> : null}
    </form>
  );
}