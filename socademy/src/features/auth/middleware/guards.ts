//LEKSJON 12
import { ErrorResponse, requestInfo } from "rwsdk/worker";
import type { Session } from "./session";
import { fail } from "@/shared/base-controller";
import { Errors } from "@/shared/results";
import type { RouteMiddleware } from "rwsdk/router";

// ============== Interruptors ================
// Settes FORAN controlleren i ruten: get: [requireUserRoute, controller.get]
// Returnerer et feilsvar -> forespørselen stoppes, controlleren kjøres aldri.
// Returnerer ingenting -> forespørselen går videre til neste funksjon i lista.

// 401: Ingen er logget inn
export const requireUserRoute: RouteMiddleware = ({ ctx }) => {
  if (!ctx.session.isAuthenticated) return fail(Errors.unauthorized);
};

// 401 hvis ikke logget inn, 403 hvis innlogget men ikke admin
export const requireAdminRoute: RouteMiddleware = ({ ctx }) => {
  if (!ctx.session.isAuthenticated) return fail(Errors.unauthorized);
  if (ctx.session.role !== "admin") return fail(Errors.forbidden);
};

// 302: ikke logget inn -> /login
export const requireUserPage: RouteMiddleware = ({ ctx }) => {
  if (!ctx.session.isAuthenticated) {
    return new Response(null, { status: 302, headers: { location: "/login" } });
  }
;}


// ============ Sjekker inni controller/service ============
// Kalles inne i koden når sjekken trenger data som ikke finnes før
// handleren kjører, f.eks. hvem som eier et innlegg.

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

// 403: du har ikke riktig rolle. Rollen kommer fra additionalFields i auth.ts.
export function requireRole(role: string): Session {
  const session = requireUser();
  if (session.role !== role) throw new ErrorResponse(403, `Krever rollen «${role}»`);
  return session;
}