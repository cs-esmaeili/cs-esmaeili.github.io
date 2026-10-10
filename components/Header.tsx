import Link from "next/link";

const LINKS = [
  { href: "/#about", label: "درباره" },
  { href: "/#skills", label: "مهارت‌ها" },
  { href: "/#projects", label: "نمونه‌کارها" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-2xl border border-border bg-surface/70 px-6 backdrop-blur-xl">
        <Link
          href="/"
          className="font-display text-sm font-bold tracking-tight text-foreground"
        >
          Portfolio<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-muted transition-colors duration-200 hover:bg-surface-2/60 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="mr-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition-colors duration-200 hover:bg-green-400"
          >
            تماس
          </Link>
        </div>
      </nav>
    </header>
  );
}
