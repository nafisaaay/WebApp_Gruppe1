import { MonthGrid } from "./MonthGrid";
import { addMonths, monthHref, type YearMonth } from "./calendarUtils";

export function Calendar( { year, month }: YearMonth) {
    const prev = addMonths({ year, month }, -1);
    const next = addMonths({ year, month }, 1);

    return (
        <section>
            <nav className="flex justify-between">
                <a href={monthHref(prev)}>Forrige</a>
                <a href="/">I dag</a>
                <a href={monthHref(next)}>Neste</a>
            </nav>
            <MonthGrid year={year} month={month} />
        </section>
    );
}