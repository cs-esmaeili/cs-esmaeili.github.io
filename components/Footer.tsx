import { Suspense } from "react";
import { io } from "next/cache";

async function CopyrightYear() {
  await io();
  return <>© {new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t-2 border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <p className="font-pixel text-[11px] text-muted">
          <Suspense fallback="© 2026">
            <CopyrightYear />
          </Suspense>{" "}
          PORTFOLIO
        </p>
        <p className="font-pixel text-[11px] text-muted">MADE WITH NESTJS</p>
      </div>
    </footer>
  );
}
