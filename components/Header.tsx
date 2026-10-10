import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-white"
        >
          Portfolio<span className="text-emerald-400">.</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          <Link href="/" className="transition-colors hover:text-white">
            خانه
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-white">
            تماس
          </Link>
        </nav>
      </div>
    </header>
  );
}
