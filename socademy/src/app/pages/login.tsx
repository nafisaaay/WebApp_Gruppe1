import { LoginForm } from "@/features/user/components/LoginForm";

export function Login() {
    return (
        <main>
            <h1>Logg inn</h1>
            <LoginForm />
            <p>Har du ikke bruker? <a href="/register">Registrer deg her</a></p>
        </main>
    );
}