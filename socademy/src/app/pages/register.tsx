import { RegisterForm } from "@/features/user/components/RegisterForm";


export function Register() {
    return (
        <main>
            <h1>Registrer deg</h1>
            <RegisterForm />
            <p>Har du allerede bruker? <a href="/login">Logg inn</a></p>
        </main>
    );
}