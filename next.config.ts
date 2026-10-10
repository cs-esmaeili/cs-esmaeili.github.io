import type { NextConfig } from "next";

// GitHub Pages serves a project site under a subpath (e.g. "/mySite").
// The deploy workflow injects it via NEXT_PUBLIC_BASE_PATH; it stays empty for
// local dev and for sites served from the domain root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only, so the app is statically exported.
  output: "export",
  basePath,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
