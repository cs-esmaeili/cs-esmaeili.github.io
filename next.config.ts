import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only, so the app is statically exported.
  // `output: "export"` cannot be combined with `cacheComponents` in this Next
  // version: exported GET route handlers (robots.txt, sitemap.xml,
  // opengraph-image) require `dynamic = "force-static"` / `revalidate`, and
  // those segment configs are rejected when `cacheComponents` is enabled.
  output: "export",
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
