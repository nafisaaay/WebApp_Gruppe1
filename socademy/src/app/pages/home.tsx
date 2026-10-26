import { Calendar } from "@/app/components/calendar/Calendar";
import { Header } from "@/app/components/layout/Header";
import { Sidebar } from "@/app/components/layout/Sidebar";
import type { RequestInfo } from "rwsdk/worker";
import { parseYearMonth } from "@/app/components/calendar/calendarUtils";
import { UserProvider } from "@/features/user/components/UserProvider";
import { toSessionUser } from "@/features/user/user-types";

/**
 * Det her er forsiden. Den kjører på serveren for hver forespørsel (React Server Component).
 * 
 * Siden har ansvaret for URL og data. Komponentene får det de trenger via props.
 */
export function Home({ request, ctx }: RequestInfo) {
  // Leser ?year=..&month.. fra URL-en. Mangler disse, vises dagens måned.
  const url = new URL(request.url);
  const { year, month } = parseYearMonth(url.searchParams, new Date());

  // Serveren vet hvem som er logget inn (ctx.session, fra sessionMiddleware).
  // Vi gjør det om til det klienten trenger, og gir det videre til UserProvider.
  const user = toSessionUser(ctx.session);

  return (
    <UserProvider user={user}>
      <Header />
      {/* 4 kolonner: sidepanel (1) | kalender (2) |  */}
      <div className="grid grid-cols-4 gap-4">
        <Sidebar />
        <main className="col-span-2">
          <Calendar year={year} month={month} />
        </main>
        {/* UpcomingEvents kommer her når den er klar */}
      </div>
    </UserProvider>
  ); 

};
