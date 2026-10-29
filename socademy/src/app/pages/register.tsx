import { Logo } from "@/app/components/Header";
import { RegisterForm } from "@/features/user/components/RegisterForm";


export function Register() {
    return (
        <main className="grid min-h-dvh w-full place-items-center px-4 py-10">            
            <div className="w-full max-w-md">
                <div className="card p-8">
                    <h1 className="text-2xl font-semibold">Registrer deg</h1>
                    <p className="mt-1 text-muted">Bruk e-postadressen din fra HiØ.</p>
                    <RegisterForm />
                </div>

                <p className="mt-6 text-center text-sm text-muted">
                    Har du allerede bruker? <a href="/login" className="link">Logg inn</a>
                </p>
            </div>
        </main>
    );
}