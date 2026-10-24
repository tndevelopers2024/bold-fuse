import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { siteUrl } from "@/config/site";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});
const title = "Boldfuse | Helping Doctors Build The Best Healthcare";
const description =
  "People, process and productivity partners. Boldfuse helps leaders strengthen their teams, improve operations and build the best healthcare.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Boldfuse" },
  description,
  applicationName: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: siteUrl,
    title,
    description,
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
    description,
    images: [{ url: "/twitter-image.jpg", alt: site.tagline }],
  },
};
export const viewport: Viewport = { themeColor: "#ffffff" };
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.name,
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      email: site.email,
      telephone: site.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Lanco Hills Road, Gachibowli",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500089",
        addressCountry: "IN",
      },
      sameAs: site.socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: site.name,
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only fixed top-3 left-3 z-50 rounded-full bg-brand-950 px-6 py-3 text-white focus:not-sr-only"
        >
          {ui.skip}
        </a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
