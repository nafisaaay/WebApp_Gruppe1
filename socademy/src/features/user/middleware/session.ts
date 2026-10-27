import type { RequestInfo } from "rwsdk/worker";
import { auth } from "@/features/auth/auth";

// Type Session: Beskriver hva appen vet om brukeren. 
// Er man ikke logget inn, er alt null OG isAuthenticated er false.
export type Session = {
  userId: string | null;
  name: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
  isAuthenticated: boolean;
};

// Ctx = en objekt rwsdk sender med til alle ruter og controllere. 
// Koden under sier til TS at ctx også har en session nå.
// Den endrer ingenting når appen kjører, den gjør bare at du får autofullføring og ingen røde linjer når du skriver ctx.session.
declare module "rwsdk/worker" {
  interface DefaultAppContext {
    session: Session;
  }
}

export async function sessionMiddleware({ request, ctx }: RequestInfo) {
    // Leser cookien fra forespørselen og spør Better-Auth om cookien hører til en gyldig innlogging.
    // Svar er enten { session, user } eller null
  const result = await auth.api.getSession({ headers: request.headers });
  // hvis bruker er logget inn, fylles ctx.sessionen med info. Hvis ikke, null-verdier.
  ctx.session = result?.user
    ? {
        userId: result.user.id,
        name: result.user.name,
        username: result.user.email.split("@")[0],
        email: result.user.email,
        role: result.user.role ?? "user",
        isAuthenticated: true,
      }
    : { userId: null, name: null, username: null, email: null, role: null, isAuthenticated: false };
}