import type { Event } from "@/db/schema/schema";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

type CalendarProps = YearMonth & { events: Event[] };

export function Calendar( { year, month,events }: CalendarProps) {
    const prev = addMonths({ year, month }, -1);
    const next = addMonths({ year, month }, 1);

    // F.eks. "oktober 2026" (stor forbokstav gjøres med CSS: first-letter:uppercase)
    const monthName = new Date(year, month).toLocaleDateString("nb-NO", {
        month: "long",
        year: "numeric",
    });

    return (
        <section aria-labelledby="calendar-title" className="card mt-6 p-5 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
                <div>
                    <p className="text-xs font-semibold tracking-widest text-brand uppercase">Kalender</p>
                    <h2 id="calendar-title" className="mt-1 text-3xl font-bold tracking-tight first-letter:uppercase sm:text-4xl">
                        {monthName}
                    </h2>
                </div>
                <nav aria-label="Bla i måneder" className="flex items-center gap-2">
                    <a href={monthHref(prev)} className="icon-btn" aria-label="Forrige måned">
                        <ChevronLeft className="size-5" aria-hidden />
                    </a>
                    <a href="/" className="btn-pill">I dag</a>
                    <a href={monthHref(next)} className="icon-btn" aria-label="Neste måned">
                        <ChevronRight className="size-5" aria-hidden />
                    </a>
                </nav>
            </div>
            <MonthGrid year={year} month={month} events = {events}/>
        </section>
    );
}