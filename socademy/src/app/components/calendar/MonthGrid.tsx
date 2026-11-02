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
    today?: Date;
    events: Event[];
}

// Tegner rutenettet for en måned som en HTML-tabell.
export function MonthGrid({ year, month, events }: MonthGridProps) {
    const grid = getMonthGrid(year, month);

    // F.eks. "oktober 2026"
    const monthName = new Date(year, month).toLocaleDateString("nb-NO", {
        month: "long",
        year: "numeric",
    });

    return (
        <table className="w-full">
            <caption>{monthName}</caption>

            <thead>
                <tr>
                    {WEEKDAYS.map((day) => (
                        <th key={day.short} className="p-3">
                            {/* <abbr> viser hele navnet når man hovrer over med musa (universell utf.) */}
                            <abbr title={day.long}>{day.short}</abbr>
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {/* Datoen brukes her som key, fordi den er unik for hver uke og hver dag */}
                {grid.map((week) => (
                    <tr key={toDateKey(week[0])}>
                        {week.map((day) => {
                            const dayEvents = events.filter(
                                (event) => toDateKey(event.startsAt) === toDateKey(day)
                            );
                            return (
                                <td key={toDateKey(day)}
                                    // Dager fra forrige/neste måned vises i grått
                                    className={`p-3 text-center
                                ${day.getMonth() !== month ? "text-gray-400" : ""}`}>
                                    {day.getDate()}


                                {/* En prikk hvis det finnes events denne dagen */}
                                    {dayEvents.length > 0 ? (
                                        <span
                                            className="mx-auto mt-1 block size-1.5 rounded-full bg-red-500"
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