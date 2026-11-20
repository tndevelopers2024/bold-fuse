import "./src/config/site.js";
const production = process.env.NODE_ENV === "production";
const csp =
  "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src 'self' https://maps.google.com https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests";
/** @type {import("next").NextConfig} */
const config = {
  allowedDevOrigins: ["192.168.1.4", "localhost"],
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    dangerouslyAllowSVG: false,
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/home1/", destination: "/", permanent: true },
      { source: "/home2/", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          ...(production
            ? [{ key: "Content-Security-Policy", value: csp }]
            : []),
        ],
      },
    ];
  },
};
export default config;
