"use client";
import { useState } from "react";

export function CreateEvent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");

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
                // Kan legge til flere kategorier her om dere ønsker btw
                <option value="">Velg en kategori</option>
                <option value="study">Sosialt</option>
                <option value="social">Akademisk</option>
                <option value="sports">Sport</option>
                <option value="other">Annet</option>        
            </select>

    
        
            <button 
                type="submit" 
                disabled={title.trim() === "" || description.trim() === "" || date ===  "" || time === "" || location.trim() === ""
                    || category === ""
                } 
                >
                Lagre
            </button>
        </form>
    );
}