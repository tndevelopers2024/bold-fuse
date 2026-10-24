# Boldfuse

A production Next.js rebuild containing the home page and a custom HTTP 404. Every other source route is registered as planned and links internally to the 404. No forms, API handlers, Server Actions, analytics, external scripts or embedded frames are shipped.

## Setup

Use Node **24.22.1** (`nvm install && nvm use`) and pnpm **11.28.8**, pinned in `package.json`. Install using `pnpm install --frozen-lockfile`. The pnpm workspace retains a one-day release-age gate, strict dependency-build policy, exotic-subdependency blocking and provenance downgrade protection. Exact, reviewed exceptions and the tooling compatibility choices are documented in [DECISIONS.md](DECISIONS.md).

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the intended HTTP(S) origin. For local checks use `http://localhost:3000`. For launch use the production origin from `.env.example`. This is the only public environment variable. It controls canonical, structured-data, sitemap and absolute social-image URLs. Missing or malformed values fail the production build. Rebuild after changing the origin.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

## Commands

| Command                             | Purpose                                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `pnpm scrape`                       | Capture the entire read-only source site with Chromium; normalize navigation, cross-check media and verify saved content. |
| `pnpm verify-scrape`                | Recheck saved captures without contacting the source website.                                                             |
| `pnpm prepare-content`              | Generate typed home content, the complete route registry and selected local assets from saved captures.                   |
| `pnpm og`                           | Generate both static 1200×630 social JPGs and their alternative text.                                                     |
| `pnpm dev`                          | Local development server.                                                                                                 |
| `pnpm build`                        | Production build, including locally hosted Google fonts.                                                                  |
| `pnpm start`                        | Serve the production build.                                                                                               |
| `pnpm typecheck`                    | TypeScript check.                                                                                                         |
| `pnpm lint`                         | ESLint CLI check.                                                                                                         |
| `pnpm format` / `pnpm format:check` | Apply / check Prettier formatting.                                                                                        |
| `pnpm test`                         | Production-browser checks, keyboard navigation, axe, metadata, planned routes and screenshots.                            |
| `pnpm lighthouse`                   | Mobile Lighthouse performance, accessibility, best-practices and SEO acceptance checks.                                   |
| `pnpm audit --prod`                 | Audit production dependencies.                                                                                            |

`pnpm test` and `pnpm lighthouse` require a running **production** server. `TEST_BASE_URL` can select another local test origin; build with the same `NEXT_PUBLIC_SITE_URL`. Run browser tests and Lighthouse sequentially to avoid measurement interference. Reports and screenshots are written to ignored `test-results/`; the release summary is retained in `QA.md`.

## Content provenance

`content/scraped/` contains the sitemap/API discovery inputs, URL inventory, normalized global content, ordered sections, metadata, rendered HTML, Markdown, original images and desktop/mobile source screenshots. It is deliberately outside `public/` and never imported into the application. The production build consumes `src/content/` and statically imported `src/assets/` only. `content/asset-map.json` maps selected assets to their source captures; `content/copy-changes.md` records editorial changes.

The original site's published empty `/home2/` body is retained as an empty capture. Empty categories are inventoried without folders. Elementor header/footer template URLs render the home page and are classified as other. Raw newsletter and booking shortcodes are removed from Markdown and reported. The image inventory includes every discovered DOM variant plus media-API originals; unused media are cross-checked without being copied into the site.

The scraper uses two workers, a 500 ms batch delay and exponential retries. It renders JavaScript, waits for network idle, scrolls for lazy content, opens disclosures, reads counter targets, inspects computed backgrounds and captures all available carousel content. It never submits contact, payment or booking forms. Re-running a scrape updates the source snapshot; review the changes before running `prepare-content`, which intentionally regenerates the initial route registry and home data.

## Design and interactions

Tailwind v4 tokens are defined in `src/app/globals.css`; there is no Tailwind v3 configuration. White canvases alternate with solid forest-green and emerald sections. The original logo contours and client artwork are retained. The header mark is recoloured for visibility on white; icons crop the real heart-hand mark. Existing gradient pixels inside the supplied badge are preserved as source artwork; no CSS gradients are used.

The native mobile dialog adds explicit Tab wrapping, Escape dismissal, scroll locking and focus restoration. Desktop services use an ordinary disclosure with keyboard support and Escape dismissal. Service descriptions are initially expanded, so all source copy is available without interaction. Reduced-motion users receive static, fully visible content. Only the hero photograph is preloaded; other images load lazily and are served locally through Next's default image optimizer.

## Security and deployment

Deploy on **Linux**, using Vercel or Node LTS behind Nginx/Caddy with TLS. Do not deploy on Windows. Set the production `NEXT_PUBLIC_SITE_URL` before building. Build and run with the pinned Node and pnpm versions. Keep `content/`, source captures and test artifacts outside the web server's static document root; serve requests through Next rather than exposing the project directory.

Production responses include CSP, HSTS (without preload), nosniff, frame denial, same-origin opener policy, strict-origin referrer policy and disabled camera/microphone/geolocation/browsing-topics permissions. No restrictive Cross-Origin-Resource-Policy is applied to sharing assets. Rate-limit `/_next/image` at the reverse proxy. The optimizer accepts local assets only; SVG optimization is disabled and AVIF is not forced.

The installed Next release exposes SRI under experimental configuration. SRI alone would not authorize Next's static inline bootstrap scripts. To retain static rendering without experimental flags or nonce-based dynamic rendering, this build uses the brief's permitted `script-src 'self' 'unsafe-inline'` fallback, with no external script origins. CSP is applied only in production. The required `style-src 'unsafe-inline'` also permits styles emitted by Next/Image. JSON-LD is safely serialized with `<` escaped.

Dependabot is configured for weekly npm updates with a one-day cooldown and grouped security updates. Enable Dependabot security alerts and security updates in the hosting repository's settings when creating the remote repository; the local configuration cannot toggle those repository settings.

## Building the next page

1. Read its saved `content.md`, `sections.json`, `meta.json` and screenshots.
2. Add its real App Router page, preserving the existing slug and any source anchor IDs. Reuse the shared design primitives and typed content pattern.
3. Change its entry in `src/config/routes.ts` from `planned` to `built`. For Services, also update the seven service-anchor entries after implementing those anchors.
4. Add the new page's content and SEO checks, then run the full production verification. The sitemap includes built entries automatically; deduplicate anchor entries when building Services.

No catch-all route is used: unknown and planned paths naturally receive the shared custom 404 with HTTP 404 and `noindex`.

## Editorial review

See `content/scraped/_report.md` for the source inconsistencies that remain deliberately unchanged: service-label differences, brand spelling variants and the client spelling “Kaa's kirchen”. Privacy and Terms point to the future legal routes required by the brief. Confirm the legal-page content before implementing those routes. The source counter is **2+**, not the founder's separate experience figure.
