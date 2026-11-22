import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

// سایت با trailingSlash:true اکسپورت می‌شود و canonical صفحه‌ها هم با «/» پایانی
// است؛ پس همه‌ی URLهای sitemap دقیقاً همان شکل نهایی را دارند (بدون ریدایرکت).
const pageUrl = (path: string) => {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${SITE.url}/${clean}/` : `${SITE.url}/`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  // فقط <loc> و <lastmod> می‌فرستیم؛ changefreq و priority را گوگل نادیده
  // می‌گیرد و حذفشان سند را ساده و بدون ابهام می‌کند.
  // date-only دقیقاً همان قالبی است که مستندات گوگل مثال می‌زند.
  const lastModified = new Date().toISOString().slice(0, 10);

  return [
    { url: pageUrl("/"), lastModified },
    { url: pageUrl("/projects"), lastModified },
    ...PROJECTS.map((project) => ({
      url: pageUrl(`/projects/${project.slug}`),
      lastModified,
    })),
  ];
}
