"use client";
import { useRef, useState, type MouseEvent, type SubmitEvent } from "react";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  MapPin,
  Plus,
  Sun,
  X,
} from "lucide-react";

const CATEGORIES = [
  {
    value: "social",
    label: "Sosialt",
    emoji: "🎉",
    color:
      "peer-checked:bg-[#d3d6fb] peer-checked:border-[#3b3fd8] peer-checked:text-[#2b2fa8]",
  },
  {
    value: "study",
    label: "Akademisk",
    emoji: "📚",
    color:
      "peer-checked:bg-[#ccecd8] peer-checked:border-[#15803d] peer-checked:text-[#15693a]",
  },
  {
    value: "sports",
    label: "Sport",
    emoji: "⚽",
    color:
      "peer-checked:bg-[#fed7c3] peer-checked:border-[#ea580c] peer-checked:text-[#9a3412]",
  },
  {
    value: "other",
    label: "Annet",
    emoji: "✨",
    color:
      "peer-checked:bg-[#fcc8ef] peer-checked:border-[#c026a3] peer-checked:text-[#a3168a]",
  },
];

export function CreateEvent() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) close();
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const res = await fetch("/api/v1/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        location,
        category, //
        isOutdoor, //
        startsAt: `${date}T${time}`,
      }),
    });

    const result = (await res.json()) as {
      ok: boolean;
      error: { message: string };
    };

    if (!result.ok) {
      setError(result.error.message);
      return;
    }

    window.location.reload();
  };

  return (
    <>
      <button type="button" onClick={open} className="btn-pill">
        <Plus className="size-4" aria-hidden />
        Nytt event
      </button>

      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        aria-labelledby="create-event-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl bg-surface p-0 text-ink shadow-2xl backdrop:bg-ink/40 backdrop:backdrop-blur-sm open:animate-pop"
      >
        <div className="relative max-h-[90dvh] overflow-y-auto p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="Lukk"
            className="icon-btn absolute top-4 right-4"
          >
            <X className="size-5" aria-hidden />
          </button>

          <h2
            id="create-event-title"
            className="pr-10 text-2xl font-bold tracking-tight"
          >
            Nytt event
          </h2>
          <p className="mt-1 text-muted">
            Fyll inn detaljene, så dukker det opp i kalenderen.
          </p>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="title" className="label">
                Tittel
              </label>{" "}
              <input
                id="title"
                placeholder="Skriv en tittel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="field"
              />
            </div>

            <div>
              <label htmlFor="description" className="label">
                Beskrivelse
              </label>
              <textarea
                id="description"
                placeholder="Skriv en beskrivelse"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="field h-auto resize-y py-3 leading-relaxed"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date"
                  className="label flex items-center gap-1.5"
                >
                  <CalendarDays className="size-4 text-brand" aria-hidden />{" "}
                  Dato
                </label>{" "}
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="field"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="label flex items-center gap-1.5"
                >
                  <Clock className="size-4 text-brand" aria-hidden /> Tid
                </label>{" "}
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="field"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="label flex items-center gap-1.5"
              >
                <MapPin className="size-4 text-brand" aria-hidden /> Sted
              </label>{" "}
              <input
                id="location"
                placeholder="Skriv et sted"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="field"
              />
            </div>

            <fieldset>
              <legend className="label">Kategori</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CATEGORIES.map((c) => (
                  <label key={c.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={c.value}
                      checked={category === c.value}
                      onChange={(e) => setCategory(e.target.value)}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex flex-col items-center gap-1 rounded-2xl border-2 border-line bg-surface px-2 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:border-faint peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 ${c.color}`}
                    >
                      <span className="text-2xl" aria-hidden>
                        {c.emoji}
                      </span>
                      {c.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label
              htmlFor="isOutdoor"
              className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-line px-4 py-3 transition hover:bg-field has-checked:border-[#f5c542] has-checked:bg-sun/40"
            >
              <Sun className="size-5 text-[#d99a00]" aria-hidden />
              <span className="flex-1 text-[15px] font-medium">Utendørs</span>
              <input
                id="isOutdoor"
                type="checkbox"
                checked={isOutdoor}
                onChange={(e) => setIsOutdoor(e.target.checked)}
                className="size-5 cursor-pointer accent-[#d99a00]"
              />
            </label>

            <button
              type="submit"
              disabled={
                title.trim() === "" ||
                description.trim() === "" ||
                date === "" ||
                time === "" ||
                location.trim() === "" ||
                category === ""
              }
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-ink text-base font-semibold text-white shadow-md transition hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              Lagre
            </button>
            {error ? (
              <p role="alert" className="error-text">
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </dialog>
    </>
  );
}
