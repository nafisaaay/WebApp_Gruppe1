import { getMonthGrid, toDateKey } from "@/app/components/calendar/calendarUtils";

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
    month: number;
}

export function MonthGrid({ year, month }: MonthGridProps) {
    const grid = getMonthGrid(year, month);
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
                        <th key={day.short} className="p-3"><abbr title={day.long}>{day.short}</abbr> 
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {grid.map((week) => (
                    <tr key={toDateKey(week[0])}>
                        {week.map((day) => (
                            <td key={toDateKey(day)} 
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
