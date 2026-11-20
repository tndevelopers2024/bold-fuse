# Deploy Boldfuse on Hostinger

This archive is for Hostinger's Node.js Web App upload workflow. Hostinger installs dependencies and builds the site on its Linux servers. It is not a static HTML/public_html archive.

## Upload

1. In Hostinger, open Websites and choose Create site / Add website, then Web App / Node.js Web App.
2. Choose Upload your files and upload boldfuse-hostinger-production-v2.zip.
3. Keep the project root as `.`: package.json is at the archive root.
4. Select the Next.js framework preset and review the settings below.
5. Add the environment variable below before the build, then deploy.

| Setting                    | Value                              |
| -------------------------- | ---------------------------------- |
| Framework                  | Next.js                            |
| Node.js                    | 24.x (project pin: 24.22.1)        |
| Package manager            | pnpm (packageManager pins 11.28.8) |
| Root directory             | .                                  |
| Install command, if shown  | pnpm install --frozen-lockfile     |
| Build command              | pnpm build                         |
| Output directory, if shown | .next                              |
| Start command, if shown    | pnpm start                         |
| Entry file                 | Keep the Next.js preset default    |

Build dependencies must be installed; do not select an install mode that omits devDependencies before the build. The start script uses Hostinger's PORT environment variable automatically. Do not hardcode a port.

## Environment

Set `NEXT_PUBLIC_SITE_URL=https://boldfuse.in` before building. For a different production domain, replace this with that domain's HTTPS origin and rebuild. The URL must not include a path. `.env.local` and credentials are intentionally not included.

## After deployment

Verify the homepage, /about/, /services/, /contact/ and /book-appointment/. Check a service selection and the email/WhatsApp handoff without sending a test enquiry to the business. Confirm the map, images, HTTPS, canonical URLs, /robots.txt and /sitemap.xml. An unknown path should return the custom 404. Review the new privacy and terms copy before launch.

The contact page and booking form prepare email/WhatsApp enquiries. The shared contact modal submits validated enquiries to the server log via `/api/contact`. These flows do not automatically book appointments or take payments. The latest local Lighthouse measurement was 95 performance and 100 for the other categories, but the simulated 2.92-second LCP still exceeds the separate 2.5-second benchmark.

## Hostinger references

- https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- https://www.hostinger.com/support/how-to-migrate-a-node-js-application-to-hostinger/
- https://www.hostinger.com/support/how-to-select-the-node-js-version-for-your-application/

## Hostinger compiler compatibility

This package uses `next.config.mjs` and a plain JavaScript origin validator so configuration loading needs no TypeScript compilation. The pinned `@next/swc-wasm-nodejs` package matches Next.js 16.4.3, and the build script stages that compiler in Next.js’s fallback directory, allowing Webpack to fall back to WASM if the server’s native SWC binary requires a newer glibc. Keep the build command `pnpm build` (Webpack), the Next.js preset, and Node 24.x. A native SWC warning can still appear before fallback; check whether the build continues.

Use this v2 ZIP for a fresh upload/redeploy. The archive contains no `next.config.ts`.
