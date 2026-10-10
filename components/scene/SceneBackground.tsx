"use client";

import dynamic from "next/dynamic";

const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

export default function SceneBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <NetworkScene />
    </div>
  );
}
