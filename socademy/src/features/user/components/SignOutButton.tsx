"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

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
        <button type="button" onClick={handleSignOut} disabled={isPending}>
            {isPending ? "Logger ut.." : "Logg ut"}
        </button>
        {error ? <p role="alert">{error}</p> : null}
        </>
    );
}