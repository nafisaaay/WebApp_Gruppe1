// Beskriver hva hendelse inneholder

export type Event = {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
};

export function UpcomingEvents( { events } : { events: Event [] }) {
    const today = new Date().toISOString().slice(0,10)  // bruker slice kun for datoen så den kan sammenlignes med event.date

    const upcomingEvents = events
        .filter((event) => event.date >= today) // Filtrerer ut hendelser som er i fremtiden
        .sort((a, b) => a.date.localeCompare(b.date)) // Sorterer hendelser etter dato
        .slice(0, 3); // Viser kun de tre nærmeste hendelsene 
    
    
        
    if (upcomingEvents.length === 0) {
        return <p>Ingen kommende hendelser</p>;
    }

    // Viser tittelen på hver hendelse, id som bruker key
    return (
        <ul>
            {upcomingEvents.map((event) => (
                <li key={event.id}>{event.title}</li>
            ))}
        </ul>
    );


}

