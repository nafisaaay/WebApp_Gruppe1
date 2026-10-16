import { useState, useTransition } from "react";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();


    function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError("Ugyldig e-post eller passord");
      return;
    }

    startTransition(async () => {
      // fetche 
      });
      if (!res.ok) {
        setError("Ugyldig e-post eller passord");
        return;
      }
      window.location.href = "/";
    };


    return (
        <form onSubmit={onSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail..." required/>
            <input type="password" value={{password}} onChange={(e) => setPassword(e.target.value)} placeholder="Passord..." required minLength={8} />
            <button type="submit" disabled={isPending}>{isPending ? "Logger inn..." : "Logg inn"}</button>
            {error && <p role="alert">{error}</p>}
        </form>
    );
}
