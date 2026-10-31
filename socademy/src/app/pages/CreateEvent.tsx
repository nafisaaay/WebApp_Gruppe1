"use client";
import { useRef, useState, type MouseEvent, type SubmitEvent } from "react";
import { X } from "lucide-react";




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


        const res = await fetch ("/api/v1/events", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                title,
                description,
                location,
                startsAt: `${date}T${time}`
            }),
        });
        
        const result = (await res.json()) as { ok: boolean; error: { message: string } };

        if (!result.ok) {
            setError(result.error.message);
            return;
        }

        window.location.reload();

    };

    return (
        <>
        <button type= "button" onClick={open} className="btn-pill">
            + Nytt event
            </button>

        <dialog
             ref={dialogRef}
             onClick = {onDialogClick}
             className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl bg-surface p-0 text-ink shadow-2xl backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
        >
            <div className ="relative p-6 sm:p-8">
                <button type="button" onClick={close} aria-label="Lukk" className="icon-btn absolute top-4 right-4">
                    <X className="size-5" aria-hidden />
                </button>

        
            <form onSubmit = {onSubmit}>
            <label htmlFor="title">Tittel</label>
            <input
                id="title"
                placeholder="Skriv en tittel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

        <label htmlFor="description">Beskrivelse</label>
            <textarea
                id="description"
                placeholder="Skriv en beskrivelse"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="date">Dato</label>
            <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="time">Tid</label>
             <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />

            <label htmlFor="location">Sted</label>
            <input
                id="location"
                placeholder="Skriv et sted"
                value={location}
                onChange={(e) => setLocation(e.target.value)}

            />

            <label htmlFor="category">Kategori</label>
            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
            {/* Kan legge til flere kategorier her om dere ønsker btw */}
                <option value="">Velg en kategori</option>
                <option value="social">Sosialt</option>
                <option value="study">Akademisk</option>
                <option value="sports">Sport</option>
                <option value="other">Annet</option>        
            </select>

            <label htmlFor="isOutdoor">Utendørs</label>
            <input
                id="isOutdoor"
                type="checkbox"
                checked={isOutdoor}
                onChange={(e) => setIsOutdoor(e.target.checked)}
            />

        
            <button 
                type="submit" 
                disabled={title.trim() === "" || description.trim() === "" || date ===  "" || time === "" || location.trim() === ""
                    || category === ""
                } 
                >
                Lagre
            </button>
            {error ? <p role="alert" className="error-text">{error}</p> : null}
        </form>
            </div>
        </dialog>
        </>
    );
}