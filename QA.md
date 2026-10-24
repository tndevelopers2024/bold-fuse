# Production verification

Verified locally on 24 October 2026 with Node 24.22.1, pnpm 11.28.8, Next 16.4.3 and headless Chromium. The site was tested with `pnpm build` and `pnpm start`, not the development server. Local results are not a substitute for checking the final hosting environment after deployment.

| Check                | Result                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Production build     | Pass; home and custom 404 statically prerendered                                                                               |
| TypeScript / ESLint  | Pass, no errors or lint warnings                                                                                               |
| Prettier             | Pass                                                                                                                           |
| Dependency peers     | No peer dependency issues                                                                                                      |
| Production audit     | No known vulnerabilities; 0 high/critical                                                                                      |
| Home HTTP response   | 200                                                                                                                            |
| Planned destinations | All 48 distinct paths return HTTP 404, branded content, correct title and noindex                                              |
| Keyboard navigation  | Desktop Services disclosure and full-screen mobile menu pass; Tab wrapping, Escape, focus restoration and scroll lock verified |
| Accessibility        | Axe: 0 serious/critical at mobile and desktop, including the custom 404                                                        |
| Browser diagnostics  | No application console errors, hydration errors or CSP violations; expected 404 navigation responses excluded                  |
| Responsive layouts   | 360, 390, 768, 1024, 1280, 1440 and 1920 px; no horizontal overflow; no rendered text below 14 px                              |
| Source parity        | All 39 unique source body entries and 28 source heading instances represented; 18 client logos and both testimonials preserved |
| Images               | Every visible local image loads; all seven full-page screenshots saved after lazy images decode                                |
| Metadata             | Absolute OG/Twitter image URLs, OG dimensions/alt, exactly one canonical, built-only sitemap                                   |
| Headers              | CSP, HSTS, nosniff, referrer/permissions policies, frame denial and same-origin opener policy verified                         |
| Missing environment  | Build fails as intended when NEXT_PUBLIC_SITE_URL is empty                                                                     |
| Source isolation     | No source-site URLs or wp-content references in src/ or public/                                                                |

## Lighthouse mobile

| Metric         |  Result | Required |
| -------------- | ------: | -------: |
| Performance    |      98 |      ≥95 |
| Accessibility  |     100 |      100 |
| Best practices |     100 |      100 |
| SEO            |     100 |      100 |
| LCP            | 2.432 s |   <2.5 s |
| CLS            |       0 |    <0.05 |

The standard mobile Lighthouse configuration was used; metrics were not overridden or emulated with a faster preset. The first run exposed low reveal-opacity contrast and generic link labels. Those issues were corrected, and resource loading was reduced before the passing run.

Machine-readable summaries: `qa/browser-results.json` and `qa/lighthouse-summary.json`. Source comparison: `qa/section-parity.md`. Full Lighthouse HTML/JSON, seven responsive screenshots, 404 screenshot and nine section screenshots are available in ignored `test-results/`.

## Source capture

47 rendered URLs inspected; 40 content folders retained after excluding seven empty categories. The inventory also contains all 285 WordPress media records. All page image dependencies downloaded; 23 unused media records returned HTTP 422 to HEAD checks and are listed in `content/scraped/site/media-status.json`. No production page depends on them. There are 1,252 page-local image records, including referenced unscaled originals, with decoded image dimensions.

## Launch and editorial review

- No remote deployment was performed. Rebuild with the production origin and deploy on Linux with TLS and image-endpoint rate limiting.
- The official latest Node LTS security patch is dated 20 October, earlier than the brief's 21 October date floor; the actual published latest patch is pinned and documented.
- Source service-label differences, brand spelling variants and “Kaa's kirchen” remain unchanged for review. See `content/scraped/_report.md`.
- Future legal, service, about, contact and blog pages intentionally return the custom 404.
