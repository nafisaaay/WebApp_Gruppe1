import { MonthGrid } from "./MonthGrid";
import { addMonths, monthHref, type YearMonth } from "./calendarUtils";

/**
 * Viser en måned med knapper for å bla frem og tilbake
 * 
 * Navigasjonen er vanlige lenker (<a>) med måneden i URL-en, ikke useState.
 * Dette er en server-komp, så det trengs ingen JS i nettleseren,
 * tilbake-knappen fungerer, og lenker til en bestemt måned kan deles.
 * 
 * Komponenten leser ikke URL-en selv. Siden (home.tsx) gjør det og sender inn
 * year/month som props. Da kan Calendar gjenbrukes og testes enkelt.
 */
export function Calendar( { year, month }: YearMonth) {
    const prev = addMonths({ year, month }, -1);
    const next = addMonths({ year, month }, 1);

    return (
        <section>
            {/* flex + justify-between: Forrige til venstre, i dag i midten, neste til høyre. */}
            <nav className="flex justify-between">
                <a href={monthHref(prev)}>Forrige</a>
                <a href="/">I dag</a>
                <a href={monthHref(next)}>Neste</a>
            </nav>
            <MonthGrid year={year} month={month} />
        </section>
    );
}