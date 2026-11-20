# BoldFuse

Healthcare business consulting website built with Next.js, React, TypeScript and Tailwind CSS.

## Development

Use Node **24.x** (local development pin **24.22.1** in `.nvmrc`) and pnpm **11.28.8** (`packageManager`).

```sh
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

`NEXT_PUBLIC_SITE_URL` defaults to `https://boldfuse.in`. Set it to the final HTTPS origin before building for a different domain. It controls canonical URLs, sharing images, structured data and the sitemap, and must not contain paths, query strings or credentials. Never commit `.env.local` or secrets.

## Production

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm check
pnpm start
```

`pnpm check` runs lint, a production build, type checking, and browser validation against a temporary production server. Set `TEST_PORT` if port 3100 is occupied. On Linux, install browser system libraries with `pnpm exec playwright install --with-deps chromium`. CI runs these checks and saves screenshots and accessibility reports as artifacts.

The build uses Next.js's supported Webpack bundler for reproducibility in environments that restrict Turbopack worker processes. A matching, locked SWC WASM compiler is staged before each build so hosts with older glibc can use the fallback. Configuration is plain JavaScript (`next.config.mjs`), which loads without invoking the native TypeScript compiler. Deploy the checkout to a Next.js-compatible Node host with `pnpm build` as the build command and `pnpm start` as the start command. This is a server deployment, not a static export: the appointment page reads query parameters at request time. Serve it through HTTPS; security headers and the production CSP are configured in `next.config.mjs`.

Before switching the domain, confirm the production origin, HTTPS, email address, phone number and WhatsApp recipient. Review the privacy and terms copy against actual business practices and hosting logs. Run the browser suite against the deployed host with `TEST_BASE_URL=https://your-domain.example pnpm test`; it verifies local behavior without sending email or WhatsApp messages. No hosting deployment or domain changes are performed by the checks.

## Implemented behavior

- Homepage, company, service, counselling, brand, article, contact and appointment pages are implemented. Privacy and terms pages are linked from the footer.
- The contact page prepares an email in the visitor’s email app. The shared contact modal submits to `/api/contact`, which validates enquiries and records them in server logs; it does not send outbound email or store them in a customer database. Appointment enquiries open WhatsApp, with email and phone alternatives. There is no automatic booking or payment processing.
- Booking, cancellation and payment support pages do not confirm transactions. Utility status pages use `noindex` and are excluded from the sitemap.
- `/home1/` and `/home2/` permanently redirect to `/`. Legacy WordPress taxonomy, author and template URLs marked `planned` return the custom 404 and are not linked in navigation.
- Canonical URLs and social previews describe each page; the sitemap includes unique indexable pages and excludes fragment-only service links.

## Maintenance

- `pnpm lint` checks application code.
- `pnpm typecheck` checks TypeScript; do not run it concurrently with a build, which regenerates `.next/types`.
- `pnpm test` checks an already-running production server (`TEST_BASE_URL`, default `http://localhost:3000`).
- `pnpm test:production` starts and stops its own production server after a build.
- `pnpm lighthouse` writes mobile performance, accessibility and SEO reports to `test-results` against `TEST_BASE_URL`.
- `pnpm audit --prod` checks production dependencies against the registry advisory database.
- `pnpm og` regenerates social images from the retained brand badge.
- `pnpm hero` re-encodes the retained hero photograph as a static AVIF, avoiding an image-optimizer request on the critical loading path.

Page copy lives in `src/content`, active media in `src/assets`, and shared sections in `src/components/editorial`. Preserve the logo, approved design direction, lockfile and environment example. Generated build files, dependencies, environment files and test reports are ignored by Git.

## Latest local verification

The production build, lint, type checking and browser suite pass. The browser suite covers 35 built pages, 88 internal links, seven homepage widths, keyboard menus, appointment enquiry validation, page metadata, security headers and accessibility. The production dependency audit reported no known vulnerabilities.

Lighthouse measured mobile scores of **95 performance / 100 accessibility / 100 best practices / 100 SEO**, with zero layout shift. Its simulated LCP was **2.92 seconds**, so the separate Lighthouse command still fails the repository’s stricter **2.5-second LCP** assertion. This budget remains open; remeasure on the final HTTPS/CDN host before launch. Local checks used Node 24.21.0; CI uses the local 24.22.1 pin; deployment accepts maintained Node 24.x patch versions.
