import { Calendar } from "@/app/components/calendar/Calendar";
import { Header } from "@/app/components/layout/Header";
import { SettingsSidebar } from "@/app/components/layout/SettingsSidebar";
import { RequestInfo } from "rwsdk/worker";
import { parseYearMonth } from "@/app/components/calendar/calendarUtils";

export function Home({ request }: RequestInfo) {
  const url = new URL(request.url);
  const { year, month } = parseYearMonth(url.searchParams, new Date());

  return (
    <>
    <Header />
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
