import { z } from "zod";


/**
 * Inne her ligger hjelpefunksjoner for kalenderen.
 * Alt her er rene funksjona uten React, slik at de kan testes med Vitest
 * uten nettleser. 
 * NB: JS teller måneder fra 0 (0 = januar, 11 = desember)
 */


// ----- Datoformatering ---------

/**
 * Gjør en dato om til en unik tekstnøkkel, f.eks "2026-10-05".
 * Brukes som "key" i React-lister, og senere til å koble hendelser til riktig dag.  
 */
export function toDateKey(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

/**
 * Viser en dato på norsk format, f.eks. "14.10.2026".
 */
export function formatDateNorwegian(date: Date): string {
    return date.toLocaleDateString("nb-NO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

// ------- Månedsrutenett -----------

/**
 * Lager rutenettet for en måned: 6 uker x 7 dager (man - søn).
 * Inkluderer dager fra forrige og neste måned, så rutenettet alltid er fullt.
 * 
 * Alltid 6 uker, slik at kalenderen har samme høyde hver måned.
 * (noen måneder strekker seg over 6 uker)
 */
export function getMonthGrid(year: number, month: number): Date[][] {
    const firstOfMonth = new Date(year, month, 1);

    // getDay() gir 0 = søndag, 1 = mandag ... 6 = lørdag.
    // (+ 6) % 7 gjør det om til 0 = mandag ... 6 = søndag,
    // altså hvor mange dager vi må gå tilbake for å nå mandagen før.
    const daysBack = (firstOfMonth.getDay() + 6) % 7;

    // Dagsnummeret til første rute, regnet i denne måneden.
    // Eks. oktober 2026 starter på torsdag -> første rute er 3 dager før den 1. -> startday = - 2.
    // 0 og negative tall betyr dager i forrige måned.
    const startDay = 1 - daysBack; 

    const weeks: Date[][] = [];

    // 6 rader (uker) med 7 ruter (man-søn) i hver = 42 ruter
    for (let week = 0; week < 6; week++) {
        const days: Date[] = [];

        for (let day = 0; day < 7; day++) {
            // hvilken dag i måneden denne ruta er.
            // starter på startDay og øker med 1 for hver rute:
            // -2, -1, 0, 1, 2 ... (week * 7 hopper over radene over)
            const dayNumber = startDay + week * 7 + day;
            days.push(new Date(year, month, dayNumber));
        }
        weeks.push(days); // en ferdig rad
    }
    return weeks;
}

// ------- Månedsnavigasjon --------

/** Month er 0-11, som i JS. */
export interface YearMonth {
    year: number;
    month: number;
}

/**
 * Delta er hvor mange måneder vi flytter
 * Flytter frem (positivt tall) eller tilbake (neg tall).
 * Date håndterer årsskiftet: new Date(2026, 12, 1) blir 1. januar 2027.
 * Dag 1 brukes med vilje, så f.eks. 31. januar + 1 ikke ruller over til mars.
 */
export function addMonths({ year, month }: YearMonth, delta: number): YearMonth {
    const date = new Date(year, month + delta, 1);
    return {
        year: date.getFullYear(), month: date.getMonth()
    };
}

/**
 * Lager lenken til en måned, f.eks. "/?year=2026&month=10" for oktober.
 * I URL-en bruker vi 1-12 så den er lesbar for folk, derfor + 1.
 * Motsatt vei: se parseYearMonth.
 */
export function monthHref ({ year, month }: YearMonth): string {
    return `/?year=${year}&month=${month + 1}`;
}

const yearMonthSchema = z.object({
    year: z.coerce.number().int().min(1900).max(2200),
    month: z.coerce.number().int().min(1).max(12), // 1-12 i URL-en
});


/**
 * Leser ?year=...&month=.. fra URL-en og gjør det om til tall.
 * Brukeren kan skrive hva som helst i URL-en, så alt valideres.
 * Ugyldige eller manglende verdier gir dagens måned i stedet for feil.
 * 
 * "now" sendes inn i stedet for å bruke new Date() her inne,
 * slik at testene kan bestemme "dagen dato" selv og alltid gi samme resultat.
 */
export function parseYearMonth(params: URLSearchParams, now: Date): YearMonth {
    const result = yearMonthSchema.safeParse({
        year: params.get("year"),
        month: params.get("month"),
    })
    
    // ugyldig/manglende -> vis dagens måned
    if (!result.success) {
        return { year: now.getFullYear(), month: now.getMonth() };
    }

    // URL: 1-12 -> JS: 0-11
    return { year: result.data.year, month: result.data.month - 1 };
}
