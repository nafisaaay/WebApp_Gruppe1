import { SignOutButton } from "@/features/user/components/SignOutButton";

export function Sidebar() {
    return (
        <nav>
            <ul>
                <li><a href="/innstillinger">Innstillinger</a></li>
                <li><SignOutButton /></li>
            </ul>
        </nav>
    );
}