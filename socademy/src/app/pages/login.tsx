import { LoginForm } from "@/features/user/components/LoginForm";

export function Login() {
    return (
        // Kun innloggingsskjemaet, sentrert midt på siden (samme oppsett som Register).
        <main className="grid min-h-dvh w-full place-items-center px-4 py-10">
            <section className="card mx-auto w-full max-w-lg p-8 sm:p-12">
                <h1 className="text-3xl font-semibold tracking-tight">Velkommen tilbake!</h1>
                <p className="mt-2 text-lg text-muted">Logg inn</p>

                <LoginForm />

                <p className="mt-8 border-t border-line pt-6 text-center text-sm text-muted">
                    Har du ikke bruker? <a href="/register" className="link">Registrer deg her</a>
                </p>
            </section>
        </main>
    );
}