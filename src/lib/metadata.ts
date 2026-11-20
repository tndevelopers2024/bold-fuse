import type { Metadata } from "next";
import { noIndexPaths } from "@/config/routes";
import { siteUrl } from "@/config/site";
import { site } from "@/content/site";

/** Keep sharing previews aligned with each page instead of inheriting home copy. */
export function pageMetadata(metadata: Metadata): Metadata {
  const path = String(metadata.alternates?.canonical ?? "/");
  const title =
    typeof metadata.title === "string"
      ? `${metadata.title} | ${site.name}`
      : site.name;
  return {
    ...metadata,
    ...(noIndexPaths.includes(path)
      ? { robots: { index: false, follow: true } }
      : {}),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      url: new URL(path, siteUrl).href,
      title,
      description: metadata.description ?? undefined,
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: site.tagline,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metadata.description ?? undefined,
      images: [{ url: "/twitter-image.jpg", alt: site.tagline }],
    },
  };
}
