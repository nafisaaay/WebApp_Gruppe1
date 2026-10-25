import { createAuthClient } from "better-auth/react";

// Better Auth sin klient for nettleseren
// Sender forespørsler til /api/auth/* på samme adresse som appen,
// der auth.ts (serveren) tar seg av resten.
export const authClient = createAuthClient();