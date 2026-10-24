import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { routes } from "@/config/routes";
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routes)
    .filter((r) => r.status === "built")
    .map((r) => ({
      url: new URL(r.path, siteUrl).href,
      changeFrequency: "monthly",
      priority: 1,
    }));
}
