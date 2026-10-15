import { getMonthGrid, toDateKey } from "@/app/components/calendar/calendarUtils";

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
}


// Tegner rutenettet for en måned som en HTML-tabell.
export function MonthGrid({ year, month }: MonthGridProps) {
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
                        {week.map((day) => (
                            <td key={toDateKey(day)} 
                            // Dager fra forrige/neste måned vises i grått
                            className={`p-3 text-center
                                ${day.getMonth() !== month ? "text-gray-400" : ""}`}>
                                    {day.getDate()}
                                </td>
                        ))}
                    </tr>
                ))}
            </tbody>

        </table>
    );
}
