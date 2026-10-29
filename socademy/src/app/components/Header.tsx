export function Logo({ className = "text-3xl sm:text-4xl" }: { className?: string }) {
    return (
        <a href="/" className={`font-display font-semibold tracking-tight ${className}`}>
            <span className="text-ink">Soc</span>
            <span className="text-brand">Ademy</span>
        </a>
    );
}

export function Header() {
    return (
        <header className="flex items-end justify-between px-4 pt-6 pb-6 sm:px-8">
            <Logo />

            <a href="/myPage" className="flex flex-col items-end">
                <span className="flex items-center gap-3">
                    <span className="font-display text-2xl font-semibold sm:text-3xl">min side</span>
                    <Flower />
                </span>
            </a>
        </header>
    );
}

export function Flower({ className = "size-12" }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden>
            {Array.from({ length: 8 }).map((_, i) => (
                <ellipse
                    key={i}
                    cx="24"
                    cy="10"
                    rx="6"
                    ry="9"
                    transform={`rotate(${i * 45} 24 24)`}
                    fill={i % 2 ? "#93c5ef" : "#4fa3e3"}
                />
            ))}
            <circle cx="24" cy="24" r="9" fill="#fde68a" />
        </svg>
    );
}
