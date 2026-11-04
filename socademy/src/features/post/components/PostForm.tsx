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

// Funk for å få opp nøyaktig dato/tid
function nowDateTime() {
  const now = new Date();
  now.setSeconds(0, 0);
  const localTimeDiffms = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - localTimeDiffms).toISOString().slice(0, 16);
}

export function PostForm() {
  const { user } = useUser();
  const [data, setData] = useState<CreatePostInput>(initialData);
  const [status, setStatus] = useState<
    "loading" | "error" | "idle" | "success"
  >("idle");
  const [error, setError] = useState<null | string>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Event-delen (er innlegget en event-checkbox)
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

    // Hvis "Event" er krysset av, lag også et event i kalenderen
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
      const eventResult = (await res.json()) as {
        ok: boolean;
        error: { message: string };
      };

      if (!eventResult.ok) {
        setStatus("error");
        setError(eventResult.error.message);
        return;
      }
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
          {fieldErrors.title ? (
            <p className="error-text">{fieldErrors.title[0]}</p>
          ) : null}

          <textarea
            name="text"
            placeholder="Hva vil du dele?"
            aria-label="Tekst"
            value={data.text}
            onChange={onInputChange}
            disabled={isLoading}
            rows={3}
            className="mt-1 pt-4 pb-4 w-full min-h-32 border-t border-line resize-none bg-transparent leading-relaxed outline-none placeholder:text-muted disabled:opacity-60"
            aria-invalid={fieldErrors.text ? true : undefined}
          />
          {fieldErrors.text ? (
            <p className="error-text">{fieldErrors.text[0]}</p>
          ) : null}

          {/* Event-checkbox */}
          <label className="mt-3 inline-flex cursor-pointer select-none items-center gap-2 text-sm has-disabled:cursor-not-allowed has-disabled:opacity-60">
            <input
              type="checkbox"
              checked={isEvent}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsEvent(checked);
                if (checked && !startsAt) {
                  setStartsAt(nowDateTime());
                }
              }}
              disabled={isLoading}
              className="size-4 cursor-pointer accent-primary disabled:cursor-not-allowed"
            />
            Event?
          </label>
        </div>
      </div>

      {/* Vises bare når "Event" er krysset av */}
      {isEvent && (
        <div className="mt-4 p-4 grid animate-pop grid-cols-2 gap-4 rounded-2xl bg-canvas shadow-sm sm:grid-cols-2">
          <div className="flex flex-col">
            <label htmlFor="event-date-time" className="label">
              Dato og tid
            </label>
            <input
              id="event-datetime"
              type="datetime-local"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              disabled={isLoading}
              required
              className="field block"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="event-location" className="label">
              Sted
            </label>
            <input
              id="event-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isLoading}
              className="field block"
            />
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-end gap-3  pt-4">
        {status === "error" ? (
          <p role="alert" className="error-text mr-auto">
            {error}
          </p>
        ) : null}
        {status === "success" ? (
          <p className="mr-auto text-sm text-success">
            Innlegget er publisert!
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary px-6 py-2.5"
        >
          {isLoading ? "Lagrer..." : "Publiser innlegg"}
        </button>
      </div>
    </form>
  );
}
