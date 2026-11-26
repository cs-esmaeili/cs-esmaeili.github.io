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

## Deploy on Cloudflare Workers (static assets)

The app is a static export, so Cloudflare only needs to serve `out/`. `wrangler.jsonc`
declares an assets-only Worker (no server runtime, no OpenNext), and the committed
`out/` directory is uploaded as-is.

In the Worker's **Settings → Build**, use:

| Setting | Value |
| --- | --- |
| Build command | `pnpm run build` |
| Deploy command | `npx wrangler deploy` |
| Build variable | `NEXT_PUBLIC_SITE_URL=https://<production-domain>` |

Leave `NEXT_PUBLIC_BASE_PATH` unset: Cloudflare serves the site from the domain
root, unlike the GitHub Pages project site.

Do not accept Cloudflare's automatic "Next.js / OpenNext" migration. `wrangler.jsonc`
points Wrangler at `./out`, which skips that auto-configuration. To try it locally:

```bash
pnpm build && pnpm preview   # serves out/ at http://localhost:8787
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
