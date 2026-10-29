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
      <div className="flex flex-col gap-6 px-4 pb-6 sm:px-8 lg:flex-row lg:gap-9">
        <Sidebar active="kalender" />
        <main className="min-w-0 flex-1">
          <Calendar year={year} month={month} />
          {/* UpcomingEvents kommer her når den er klar */}
        </main>
      </div>
    </>
  );
};
