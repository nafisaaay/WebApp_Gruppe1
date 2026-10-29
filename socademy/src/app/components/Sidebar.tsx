import { Calendar, Settings, Users } from "lucide-react";
import { SignOutButton } from "@/features/user/components/SignOutButton";
import { SidebarUser } from "./SidebarUser";

export type SidebarPage = "kalender" | "forum" | "innstillinger";

// Legg til flere menyvalg her (Meldinger, Varsler, Min side, Hjelp ...) når sidene finnes.
const links = [
    { key: "kalender", label: "Kalender", href: "/", Icon: Calendar },
    { key: "forum", label: "Forum", href: "/forum", Icon: Users },
    { key: "innstillinger", label: "Innstillinger", href: "/innstillinger", Icon: Settings },
] as const;

// "active" sier hvilken side vi er på, så riktig menyvalg markeres.
export function Sidebar({ active }: { active?: SidebarPage }) {
    return (
        <aside className="flex shrink-0 flex-col overflow-x-auto rounded-2xl bg-sidebar lg:sticky lg:top-6 lg:h-[calc(100dvh-8.5rem)] lg:w-72 lg:overflow-visible lg:rounded-panel lg:py-8">
            <nav aria-label="Hovedmeny">
                <ul className="flex lg:flex-col">
                    {links.map(({ key, label, href, Icon }) => (
                        <li key={key}>
                            <a href={href} className="nav-item" aria-current={key === active ? "page" : undefined}>
                                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Nederst: innlogget bruker og Logg ut. mt-auto skyver blokken til bunnen. */}
            <div className="flex items-center gap-3 px-4 pb-3 lg:mt-auto lg:flex-col lg:items-stretch lg:gap-4 lg:border-t lg:border-ink/10 lg:px-6 lg:pt-6 lg:pb-0">
                <SidebarUser />
                <SignOutButton />
            </div>
        </aside>
    );
}