This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Sitemap

`sitemap.xml` is a plain static file checked into `public/` (with an identical
copy at `public/sitemaps/main.xml` used as an alternate submission path in
Search Console). It is generated from the slugs in `lib/projects.ts`:

```bash
pnpm sitemap          # regenerate public/sitemap.xml + public/sitemaps/main.xml
pnpm sitemap --check  # fails if the files are stale (run by CI)
```

Run `pnpm sitemap` after adding, renaming, or removing a project, and commit
the generated files.

## Deploy on Cloudflare Pages

Primary site: **https://cs-esmaeili.pages.dev** (canonical origin, see `lib/site.ts`).

The app is a static export, so Pages only serves `out/`. `wrangler.jsonc` is a
**Pages** config (`pages_build_output_dir` → `./out`), not a Workers config; it
makes the Pages build output directory explicit and prevents the build system
from guessing a nonexistent directory.

In the Pages project's **Build configuration**:

| Setting | Value |
| --- | --- |
| Build command | `pnpm run build` (or `npx next build`) |
| Build output directory | `out` (overridden by `wrangler.jsonc`) |
| Build variable | none required; `NEXT_PUBLIC_SITE_URL` defaults to `https://cs-esmaeili.pages.dev` |

Leave `NEXT_PUBLIC_BASE_PATH` unset on Pages: the site is served from the domain
root. The GitHub Pages workflow still deploys a mirror and lets URLs resolve
against the canonical `pages.dev` origin.

Do not add Workers-only keys (`main`, `assets`) to `wrangler.jsonc`, and do not
accept a Workers "Next.js / OpenNext" migration for this repository.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
