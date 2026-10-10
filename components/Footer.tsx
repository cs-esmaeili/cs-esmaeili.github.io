import { Suspense } from "react";
import { io } from "next/cache";

async function CopyrightYear() {
  await io();
  return <>© {new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          <Suspense fallback="© 2026">
            <CopyrightYear />
          </Suspense>{" "}
          Portfolio
        </p>
        <p className="font-mono text-xs">Built with NestJS &amp; Three.js</p>
      </div>
    </footer>
  );
}
