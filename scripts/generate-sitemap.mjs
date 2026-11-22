/**
 * Generates the static sitemap files for GitHub Pages.
 *
 * Why static files instead of app/sitemap.ts:
 *  - GitHub Pages serves only static files, and Next.js metadata routes add a
 *    moving `lastmod` (build date) on every deploy.
 *  - A checked-in, deterministic file keeps the URL bytes stable, so Google
 *    doesn't see a "changed" sitemap on every deploy.
 *  - The file stays in sync via CI: the workflow fails if it's stale.
 *
 * Usage:
 *   node scripts/generate-sitemap.mjs          # regenerate the files
 *   node scripts/generate-sitemap.mjs --check  # fail if files are out of date
 *
 * Run it whenever a project is added/removed/renamed in lib/projects.ts.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = (process.env.SITE_URL ?? "https://cs-esmaeili.github.io").replace(/\/+$/, "");

const read = (p) => readFileSync(join(root, p), "utf8");

const projectsSource = read("lib/projects.ts");
const slugs = [...projectsSource.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
if (slugs.length === 0) {
  throw new Error("No project slugs found in lib/projects.ts — parser is broken");
}

const paths = ["/", "/projects/", ...slugs.map((slug) => `/projects/${slug}/`)];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`)
  .join("\n")}
</urlset>
`;

const targets = ["public/sitemap.xml", "public/sitemaps/main.xml"];
const checkMode = process.argv.includes("--check");

for (const target of targets) {
  mkdirSync(dirname(join(root, target)), { recursive: true });
  const current = (() => {
    try {
      return read(target);
    } catch {
      return null;
    }
  })();

  if (checkMode) {
    if (current !== xml) {
      console.error(`Out of date: ${target}\nRun \`node scripts/generate-sitemap.mjs\` and commit the result.`);
      process.exit(1);
    }
    continue;
  }

  if (current === xml) {
    console.log(`unchanged: ${target} (${paths.length} URLs)`);
  } else {
    writeFileSync(join(root, target), xml);
    console.log(`written:   ${target} (${paths.length} URLs)`);
  }
}

if (checkMode) {
  console.log(`sitemap up to date (${paths.length} URLs)`);
}
