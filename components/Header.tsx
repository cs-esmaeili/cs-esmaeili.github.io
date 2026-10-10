import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-pixel text-sm tracking-wide text-accent">
          PORTFOLIO
          <span className="pixel-cursor">_</span>
        </Link>

        <nav className="font-pixel flex items-center gap-6 text-[11px] text-muted">
          <Link href="/" className="transition-colors hover:text-accent">
            خانه
          </Link>
          <Link href="/#about" className="transition-colors hover:text-accent">
            درباره
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-accent">
            تماس
          </Link>
        </nav>
      </div>
    </header>
  );
}
