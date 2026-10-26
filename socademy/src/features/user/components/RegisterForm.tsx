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
        <form onSubmit={onSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Navn.." required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-post (@hiof.no).." required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passord (minst 8 tegn)..." required />
            <button type="submit" disabled={isPending}>
                {isPending ? "Registrerer..." : "Registrer"}
            </button>
            {error && <p role="alert">{error}</p>}
        </form>
    );
}