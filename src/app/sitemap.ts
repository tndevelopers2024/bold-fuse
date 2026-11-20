import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { indexablePaths } from "@/config/routes";
export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.map((path) => ({
    url: new URL(path, siteUrl).href,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
