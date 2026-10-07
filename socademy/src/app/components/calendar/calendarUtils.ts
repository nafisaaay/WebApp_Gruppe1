
// ----- Datoformatering ---------

export function toDateKey(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export function formatDateNorwegian(date: Date): string {
    return date.toLocaleDateString("nb-NO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

// ------- Månedsrutenett -----------

export function getMonthGrid(year: number, month: number): Date[][] {
    const firstOfMonth = new Date(year, month, 1);
    const daysBack = (firstOfMonth.getDay() + 6) % 7;
    const startDay = 1 - daysBack;

    const weeks: Date[][] = [];

    for (let week = 0; week < 6; week++) {
        const days: Date[] = [];

        for (let day = 0; day < 7; day++) {
            const dayNumber = startDay + week * 7 + day;
            days.push(new Date(year, month, dayNumber));
        }
        weeks.push(days);
    }
    return weeks;
}

// ------- Månedsnavigasjon --------

export interface YearMonth {
    year: number;
    month: number;
}

export function addMonths({ year, month }: YearMonth, delta: number): YearMonth {
    const date = new Date(year, month + delta, 1);
    return {
        year: date.getFullYear(), month: date.getMonth()
    };
}

export function monthHref ({ year, month }: YearMonth): string {
    return `/?year=${year}&month=${month + 1}`;
}

export function parseYearMonth(params: URLSearchParams, now: Date): YearMonth {
    const year = Number(params.get("year"));
    const month = Number(params.get("month")) - 1;

    const valid =
        params.has("year") && params.has("month") 
        && Number.isInteger(year) && Number.isInteger(month)
        && month >= 0 && month <= 11;

    return valid ? { year, month } : { year: now.getFullYear(), month: now.getMonth() };
}
