//LEKSJON 12
import { ErrorResponse, requestInfo } from "rwsdk/worker";
import type { Session } from "@/middleware/session";

// 401 - Vet ikke hvem du er.
export function requireUser(): Session {
  const { ctx } = requestInfo;
  if (!ctx.session?.isAuthenticated) {
    throw new ErrorResponse(401, "Innlogging kreves");
  }
  return ctx.session;
}

// 403: vi vet hvem du er, men du eier ikke ressursen.
export function requireOwner(ownerId: string): Session {
  const session = requireUser();
  if (session.userId !== ownerId) {
    throw new ErrorResponse(403, "Du eier ikke denne ressursen");
  }
  return session;
}

// 403 på rolle — krever at admin-pluginen er slått på.
export function requireRole(role: string) {
  const session = requireUser() as Session & { role?: string };
  if (session.role !== role) throw new ErrorResponse(403, `Krever rollen «${role}»`);
  return session;
}