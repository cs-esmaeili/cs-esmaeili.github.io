import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE.url}/projects/${project.slug}/`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/projects/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages,
  ];
}
