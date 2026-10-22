'use client';

import { useState, useTransition } from "react";
import { loginSchema } from "../utils/loginSchema";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();


    function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);

    // Sjekker input med zod FØR noe sendes. Feilmelding ved feil, og ingenting sendes til server.
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError("Ugyldig e-post eller passord");
      return;
    }

    startTransition(async () => {
      // sender epost og pass til server. startTrans gjør at isPending blir true mens den venter, så knappen kan vise "logger inn...".
      const res = await fetch("/api/auth/sign-in/email", { //OBS!! LEGG inn path til din controller
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      //generell feilmelding ved feilet innlogging.  Hvis den lyktes har betterauth satt cookien og bruker sendes til forsiden.
      if (!res.ok) {
        // Generisk melding: avslør aldri om det var e-posten eller passordet.
        setError("Ugyldig e-post eller passord");
        return;
      }
      window.location.href = "/";
      });
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail..." required/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passord..." required/>
            <button type="submit" disabled={isPending}>{isPending ? "Logger inn..." : "Logg inn"}</button>
            {error && <p role="alert">{error}</p>}
        </form>
    );
}
