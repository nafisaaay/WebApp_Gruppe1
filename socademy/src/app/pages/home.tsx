import { Calendar } from "@/app/components/calendar/Calendar";
import { Header } from "@/app/components/layout/Header";
import { SettingsSidebar } from "@/app/components/layout/SettingsSidebar";
import { RequestInfo } from "rwsdk/worker";
import { parseYearMonth } from "@/app/components/calendar/calendarUtils";

/**
 * Det her er forsiden. Den kjører på serveren for hver forespørsel (React Server Component).
 * 
 * Siden har ansvaret for URL og data. Komponentene får det de trenger via props.
 */
export function Home({ request }: RequestInfo) {
  // Leser ?year=..&month.. fra URL-en. Mangler disse, vises dagens måned.
  const url = new URL(request.url);
  const { year, month } = parseYearMonth(url.searchParams, new Date());

  return (
    <>
    <Header />
    {/* 4 kolonner: sidepanel (1) | kalender (2) |  */}
    <div className="grid grid-cols-4 gap-4">
      <SettingsSidebar />
      <main className="col-span-2">
        <Calendar year={year} month={month} />
      </main>
      {/* UpcomingEvents kommer her når den er klar */}
    </div>
    </>
  ); 

};
