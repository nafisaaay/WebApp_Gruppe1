import type { Event } from "@/db/schema/schema";
import { getMonthGrid, toDateKey } from "./calendarUtils";

// short vises i tabellen, long vises som tooltip og leses opp av skjermlesere
// Universell utforming you know
const WEEKDAYS = [
    { short: "MAN", long: "Mandag" },
    { short: "TIR", long: "Tirsdag" },
    { short: "ONS", long: "Onsdag" },
    { short: "TOR", long: "Torsdag" },
    { short: "FRE", long: "Fredag" },
    { short: "LØR", long: "Lørdag" },
    { short: "SØN", long: "Søndag" }
];

interface MonthGridProps {
    year: number;
    month: number; // 0-11
    today?: Date; // kan sendes inn i tester, ellers brukes dagens dato
    events?: Event[];
    selectedDate?: string | null;
}


// Tegner rutenettet for en måned som en HTML-tabell.
export function MonthGrid({ year, month, today = new Date(), events = [], selectedDate = null }: MonthGridProps) {
    const grid = getMonthGrid(year, month);
    const todayKey = toDateKey(today);

    // F.eks. "oktober 2026"
    const monthName = new Date(year, month).toLocaleDateString("nb-NO", {
        month: "long",
        year: "numeric",

    });

    return (
        <table className="mt-6 w-full table-fixed text-center">
            {/* Overskriften vises over i Calendar, så her er den bare for skjermlesere */}
            <caption className="sr-only">{monthName}</caption>

            <thead>
                <tr>
                    {WEEKDAYS.map((day) => (
                        <th key={day.short} className="pb-3 text-xs font-medium tracking-wide text-muted">
                            {/* <abbr> viser hele navnet når man hovrer over med musa (universell utf.) */}
                            <abbr title={day.long} className="cursor-help no-underline">{day.short}</abbr> 
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {/* Datoen brukes her som key, fordi den er unik for hver uke og hver dag */}
                {grid.map((week) => (
                    <tr key={toDateKey(week[0])}>
                        {week.map((day) => {
                            const key = toDateKey(day);
                            const isToday = key === todayKey;
                            const isSelected = key === selectedDate;
                            const isOtherMonth = day.getMonth() !== month;


                            const dayEvents = events.filter(
                                (event) => toDateKey(event.startsAt) === key
                            );

                            return (
                                <td key={key} className="p-1">
                                    <a
                                        href={`/?year=${day.getFullYear()}&month=${day.getMonth() + 1}&date=${key}`}
                                        aria-current={isToday ? "date" : undefined}
                                        // Dager fra forrige/neste måned vises i grått, i dag får blå ramme
                                        className={`mx-auto flex h-14 max-w-21 items-center justify-center rounded-xl border text-base hover:bg-line/40
                                            ${isToday ? "border-accent font-semibold text-accent" : "border-transparent"}
                                            ${isSelected ? "bg-accent text-white" : ""}
                                            ${isOtherMonth ? "text-faint" : ""}`}
                                    >
                                        <time dateTime={key}>{day.getDate()}</time>
                                    </a>

                                    {dayEvents.length > 0 ? (
                                        <span
                                            className="mx-auto mt-1 block size-1.5 rounded-full bg-accent"
                                            aria-label={`${dayEvents.length} event(er)`}
                                        />
                                    ) : null}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>

        </table>
    );
}