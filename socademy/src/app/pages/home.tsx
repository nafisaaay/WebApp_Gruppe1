import { Calendar } from "@/features/calendar/Calendar";
import { Header } from "@/app/components/Header";
import { Sidebar } from "@/app/components/Sidebar";
import type { RequestInfo } from "rwsdk/worker";
import { parseYearMonth } from "@/features/calendar/calendarUtils";


// Forsiden. Innlogget bruker kommer fra AppLayout (UserProvider), så klientkomponenter
// her kan bruke useUser().

export function Home({ request }: RequestInfo) {
  // Leser ?year=..&month.. fra URL-en. Mangler disse, vises dagens måned.
  const url = new URL(request.url);
  const { year, month } = parseYearMonth(url.searchParams, new Date());

  return (
    <>
      <Header />
      {/* 4 kolonner: sidepanel (1) | kalender (2) |  */}
      <div className="grid grid-cols-4 gap-4">
        <Sidebar />
        <main className="col-span-2">
          <Calendar year={year} month={month} />
        </main>
        {/* UpcomingEvents kommer her når den er klar */}
      </div>
    </>
  ); 
};
