import { Suspense } from "react";
import { io } from "next/cache";

async function CopyrightYear() {
  await io();
  return <>© {new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center px-6 py-6 text-sm text-zinc-400">
        <p>
          <Suspense fallback="©">
            <CopyrightYear />
          </Suspense>{" "}
          Portfolio
        </p>
      </div>
    </footer>
  );
}
