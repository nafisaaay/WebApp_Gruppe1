import { Calendar } from "@/app/components/calendar/Calendar";
import { Header } from "@/app/components/layout/Header";
import { Sidebar } from "@/app/components/layout/Sidebar";
import { RequestInfo } from "rwsdk/worker";
import { parseYearMonth } from "@/app/components/calendar/calendarUtils";
import { eventsService } from "@/features/events/events-service";

/**
 * Det her er forsiden. Den kjører på serveren for hver forespørsel (React Server Component).
 * 
 * Siden har ansvaret for URL og data. Komponentene får det de trenger via props.
 */
export async function Home({ request }: RequestInfo) {
  // Leser ?year=..&month.. fra URL-en. Mangler disse, vises dagens måned.
  const url = new URL(request.url);
  const { year, month } = parseYearMonth(url.searchParams, new Date());

  const results = await eventsService.getAll();
  const events = results.ok ? results.data : []; 

  return (
    <>
    <Header />
    {/* 4 kolonner: sidepanel (1) | kalender (2) |  */}
    <div className="grid grid-cols-4 gap-4">
      <Sidebar />
      <main className="col-span-2">
        <Calendar year={year} month={month} events={events} />
      </main>
      {/* UpcomingEvents kommer her når den er klar */}
    </div>
    </>
  ); 

};
