
import type { User } from "@/db/auth-schema";
import type { Session } from "@/features/user/middleware/session";

// Det klienten får vite om innlogget bruker.
// Tar KUN med det komponentene trenger, fordi alt her kan leses i nettleseren!
export type SessionUser = {
    id: string;
    name: string;
    role: User["role"];
}

export const isAdmin = (user: SessionUser | null) => user?.role === "admin";

// Her gjør vi ctx.session (serverens versjon) om til SessionUser (klientens versjon).
export function toSessionUser(session: Session): SessionUser | null {
    if (!session.isAuthenticated || !session.userId) return null;
    
    return {
        id: session.userId,
        name: session.name ?? "",
        role: session.role === "admin" ? "admin" : "user",
    }
}