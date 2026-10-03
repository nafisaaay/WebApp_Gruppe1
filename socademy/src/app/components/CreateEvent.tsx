"use client";
import { useState } from "react";

export function CreateEvent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    return (
        <form>
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

            <label htmlFor="time">Tid</label>¨
             <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
        
            <button 
                type="submit" 
                disabled={title.trim() === "" || description.trim() === "" || date ===  "" || time === ""} 
                >
                Lagre
            </button>
        </form>
    );
}