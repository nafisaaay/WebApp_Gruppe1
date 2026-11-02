import type { Event } from "@/db/schema/schema";
import { toDateKey } from "@/features/calendar/calendarUtils";



// Beskriver hva hendelse inneholder

export function UpcomingEvents({ events, selectedDate}: { events: Event[]; selectedDate: string | null }) {
    const now = new Date();

        const upcomingEvents = selectedDate
        ? events.filter((event) => toDateKey(event.startsAt) === selectedDate)   // valgt dag
        : events
            .filter((event) => event.startsAt >= now)                            // ingen dag valgt
            .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())
            .slice(0, 3);

     if (upcomingEvents.length === 0) {
        return <p>{selectedDate ? "Ingen hendelser denne dagen" : "Ingen kommende hendelser"}</p>;
    }

    // Viser tittelen på hver hendelse, id som bruker key
    return (
        <ul className = "flex flex-col gap-3">
            {upcomingEvents.map((event) => (
                                <li
                    key={event.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-accent/15 px-4 py-3 text-sm text-accent"
                >
                    <span className="truncate font-medium">{event.title}</span>
                    <span className="shrink-0">
                        {event.startsAt.toLocaleString("nb-NO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </span>
                </li>
            ))}
        </ul>
    );


}

