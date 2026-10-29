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
        try {
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
        } catch {
          setError("Fikk ikke kontakt med serveren. Sjekk nettet og prøv igjen.");
        }
    });
  }
    return (
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
          <label className="block">
              <span className="label">E-post</span>
              <input type="email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="navn@hiof.no" className="field h-14 text-base" required/>
          </label>
          <label className="block">
              <span className="label">Passord</span>
              <input type="password" name="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passord" className="field h-14 text-base" required/>
          </label>

          <button
              type="submit"
              disabled={isPending}
              className="mt-3 flex h-14 w-full items-center justify-center rounded-xl bg-ink text-base font-semibold text-white shadow-md transition hover:bg-ink/90 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
              {isPending ? "Logger inn..." : "Logg inn"}
          </button>
          {error && <p role="alert" className="error-text">{error}</p>}
      </form>
  );
}