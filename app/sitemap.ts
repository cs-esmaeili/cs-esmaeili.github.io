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
  // تاریخ ساخت نسخه‌ی استاتیک؛ در هر دیپلوی مقدار تازه می‌گیرد.
  const lastModified = new Date();

  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: pageUrl(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: pageUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: pageUrl("/projects"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages,
  ];
}
