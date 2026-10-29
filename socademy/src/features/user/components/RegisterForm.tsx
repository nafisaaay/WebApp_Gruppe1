"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { validateEmail, validatePassword } from "../validation/validateLogin";

export function RegisterForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    async function onSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setError(null);

        if (name.trim() === "") return setError("Navn er påkrevd");
        const emailCheck = validateEmail(email.trim());
        if (!emailCheck.ok) return setError(emailCheck.error);
        const passwordCheck = validatePassword(password);
        if (!passwordCheck.ok) return setError(passwordCheck.error);

        try {
            
            setIsPending(true);
            const { error: signUpError } = await authClient.signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
            });
        
            if (signUpError) {
                setIsPending(false);
                setError(signUpError.message ?? "Kunne ikke registrere bruker.");
                return;
            }
            window.location.href = "/";

        } catch {
            setIsPending(false);
            setError("Fikk ikke kontakt med serveren. Sjekk nettet og prøv igjen.");
        } 
    }

        return (
        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
            <label className="block">
                <span className="label">Navn</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Kari Nordmann" autoComplete="name" className="field h-14 text-base" required />
            </label>
            <label className="block">
                <span className="label">E-post</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="navn@hiof.no" autoComplete="email" className="field h-14 text-base" required />
            </label>
            <label className="block">
                <span className="label">Passord</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minst 8 tegn" autoComplete="new-password" className="field h-14 text-base" required />
            </label>

            <button
                type="submit"
                disabled={isPending}
                className="mt-3 flex h-14 w-full items-center justify-center rounded-xl bg-ink text-base font-semibold text-white shadow-md transition hover:bg-ink/90 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? "Registrerer..." : "Registrer"}
            </button>
            {error && <p role="alert" className="error-text">{error}</p>}
        </form>
    );
}