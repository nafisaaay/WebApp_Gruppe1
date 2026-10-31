import { Header } from "@/app/components/Header";
import { Sidebar } from "@/app/components/Sidebar";
import { CreateEvent } from "@/app/pages/CreateEvent";
import { Calendar } from "@/features/calendar/Calendar";
import { parseYearMonth } from "@/features/calendar/calendarUtils";
import { eventsService } from "@/features/events/events-service";
import type { RequestInfo } from "rwsdk/worker";


// Forsiden. Innlogget bruker kommer fra AppLayout (UserProvider), så klientkomponenter
// her kan bruke useUser().

export async function Home({ request }: RequestInfo) {
  // Leser ?year=..&month.. fra URL-en. Mangler disse, vises dagens måned.
  const url = new URL(request.url);
  const { year, month } = parseYearMonth(url.searchParams, new Date());

  const results = await eventsService.getAll();
  const events = results.ok ? results.data : [];

  return (
    <>
      <Header />
      <div className="flex flex-col gap-6 px-4 pb-6 sm:px-8 lg:flex-row lg:gap-9">
        <Sidebar active="kalender" />
        <main className="min-w-0 flex-1">
          <div className="flex justify-end">
            <CreateEvent />
          </div>
          <Calendar year={year} month={month} events={events}/>
          {/* UpcomingEvents kommer her når den er klar */}

        </main>
      </div>
    </>
  );
};
