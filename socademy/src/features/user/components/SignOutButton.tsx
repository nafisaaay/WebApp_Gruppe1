"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSignOut() {
        setError(null);

        try {
            await authClient.signOut({
                fetchOptions: {
                    onRequest: () => setIsPending(true),
                    onSuccess: () => {
                        window.location.href = "/login";
                    },
                    onError: (ctx) => {
                        setIsPending(false);
                        setError(ctx.error.message ?? "Kunne ikke logge ut. Prøv igjen.");
                    },
                },
            });
        } catch {
            setIsPending(false);
            setError("Fikk ikke kontakt med serveren. Sjekk nettet og prøv igjen.");
        }
    }

    return (
        <>
        <button
            type="button"
            onClick={handleSignOut}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white/70 px-4 py-2.5 text-[15px] font-medium whitespace-nowrap transition hover:border-danger/40 hover:bg-white hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
            <LogOut className="size-5" strokeWidth={1.75} aria-hidden />
            {isPending ? "Logger ut.." : "Logg ut"}
        </button>
        {error ? <p role="alert" className="error-text">{error}</p> : null}
        </>
    );
}