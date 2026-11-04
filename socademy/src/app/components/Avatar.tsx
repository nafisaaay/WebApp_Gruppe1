const sizes = {
  md: "size-11 text-sm",
  lg: "size-12 text-base",
};

export function Avatar({ name, size = "md" }: { name: string; size?: keyof typeof sizes }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full bg-mint font-semibold ${sizes[size]}`}
    >
      {initials}
    </span>
  );
}
