import { Construction } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Sidebar, type SidebarPage } from "@/app/components/Sidebar";

type UnderConstructionProps = {
  title?: string;
  active?: SidebarPage;
};

// Felles "under arbeid"-side. Denne kan brukes for alle sider som ikke er gjort ferdig enda istedenfor å bare få opp en feilmelding om "not found".
export function UnderConstruction({ title = "Denne siden", active }: UnderConstructionProps) {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-6 px-4 pb-6 sm:px-8 lg:flex-row lg:gap-9">
        <Sidebar active={active} />
        <main className="min-w-0 flex-1">
          <section className="card mx-auto mt-6 flex max-w-xl flex-col items-center p-10 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-sun text-sun-ink">
              <Construction className="size-8" strokeWidth={1.75} aria-hidden />
            </span>
            <h1 className="mt-6 text-2xl font-bold tracking-tight">{title} er under arbeid</h1>
            <p className="mt-2 text-muted">Denne siden kommer snart. Kom gjerne tilbake senere!</p>
            <a href="/" className="btn-primary mt-8 px-6 py-2.5">Tilbake til kalenderen</a>
          </section>
        </main>
      </div>
    </>
  );
}