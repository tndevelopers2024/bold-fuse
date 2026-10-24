# Build brief: Boldfuse website rebuild (production)

You are a senior Next.js engineer and product designer. Rebuild https://boldfuse.in (currently WordPress + Elementor) as a production-grade Next.js site. This is a real launch, not a demo. Everything you ship must work, build cleanly and pass the checks at the end. Work through the phases in order.

Scope: scrape EVERY page of the live site into a local content folder, then build ONLY the home page and a custom 404 page. Every other page link points to its future internal route, which renders the custom 404 until that page is built.

## Inputs
- Source site (read-only): https://boldfuse.in
- New logo badge: ./brand-assets/boldfuse-badge.png (green circle with "bOLDFUSE", "People | Process | Productivity partners", "Helping Doctors Build The Best Healthcare")
- Brand palette (only these colours, plus white): #02aa77, #03281e, #e2faf7, #61a390, #026b4d, #024935, #326a5a, #a9e9d9

## Non-negotiable rules
1. Never link to boldfuse.in and never hotlink its files. Download, rename and serve every asset locally. The production domain may appear only in the NEXT_PUBLIC_SITE_URL env var, which is used for the canonical URL and absolute OG URLs.
2. Build only "/" and the 404. Do not create About, Services, Blogs, Contact or blog-post routes.
3. Use real content from the scrape only.
   - No lorem ipsum, invented numbers, fake testimonials, extra clients, awards, team members or FAQs.
   - Light grammar polish is allowed. Log every change in content/copy-changes.md.
   - Never change client or company names.
4. Visual bans:
   - No gradients anywhere: backgrounds, text, buttons or borders.
   - No heavy shadows. shadow-sm on hover is the maximum.
   - No frosted or translucent glass.
   - No tinted, off-white, cream, grey or mint "milky" section backgrounds. Light sections are pure white; colour comes from solid brand blocks and accents.
   - No text smaller than 14px. No font weight below 400.
5. Set up Tailwind v4 exactly as in Phase 3. No tailwind.config.js, no v3 directives, no hex values or arbitrary colour classes in components.
6. No Server Actions, API route handlers, proxy/middleware, third-party scripts, analytics, trackers or iframes.
7. No placeholders, TODOs, commented-out code or console.log in shipped code.
8. Don't ask me questions unless you're blocked by something only I can provide. Record your judgment calls in DECISIONS.md.

## Phase 0: Versions and security baseline
These facts are as of 24 Oct 2026. Before installing, re-check npm and the advisories (github.com/vercel/next.js/security, github.com/facebook/react/security, nextjs.org/blog). Use the newest patched stable versions.

- next: 16.4.2 or newer.
  - 16.4.1 is the absolute floor. It fixed the 14 Oct 2026 out-of-band advisories:
    - CVE-2026-96889: unauthenticated RCE in the Image Optimization API via SVG/sharp, also reachable through next/og.
    - GHSA-673q-mjm6-r5xr: RCE in "use cache" functions returning typed arrays.
    - CVE-2026-94482: Server Actions DoS.
  - Being on ≥ 16.4.1 also covers the earlier 2026 fixes:
    - 30 Sep: security release with 7 advisories.
    - 25 Aug: CVE-2026-75604 (RCE on Windows-hosted servers) and GHSA-2xp9-vwfh-vxw4 (RCE in AVIF image optimisation).
    - Jul: CVE-2026-64642 (proxy/middleware bypass) and CVE-2026-64648 (fetch cache confusion).
    - May: 13 advisories, including CVE-2026-44580 (XSS via beforeInteractive scripts) and CVE-2026-44581 (stored XSS with CSP nonces behind shared caches).
- react / react-dom: the latest 19.x patch that matches that Next release.
  - Past RSC vulnerabilities to stay clear of: CVE-2025-55182 "React2Shell" RCE, CVE-2026-23864, CVE-2026-23869, CVE-2026-44907.
  - The App Router runs Next's bundled RSC build, so upgrading next is what actually patches it. Update both.
- Node.js: the latest patch of the current LTS line, released on or after the 21 Oct 2026 Node security releases. Pin it in .nvmrc and in package.json "engines".
- tailwindcss: latest v4.x (4.3 or newer).
- Use exact versions (no ^ or ~) for next, react, react-dom, tailwindcss and @tailwindcss/postcss.

Supply chain. In 2026 npm saw the axios maintainer-account hijack, the "Mini Shai-Hulud" wave (314 packages in 22 minutes), and the June binding.gyp and Mastra waves.
- Package manager: use pnpm 11, pinned via "packageManager".
- pnpm-workspace.yaml protections:
  - Keep these on: minimumReleaseAge ≥ 1440, blockExoticSubdeps: true, strictDepBuilds: true, trustPolicy: no-downgrade.
  - Allow build scripts only for named packages that truly need them (allowBuilds). Never use dangerouslyAllowAllBuilds.
  - If an urgent security patch is younger than the age gate, or the trust policy blocks a legitimate package, exclude only that package and log it in DECISIONS.md.
- Dependency budget:
  - Runtime: next, react, react-dom, lucide-react, clsx, tailwind-merge.
  - Dev: typescript, @types/*, tailwindcss, @tailwindcss/postcss, eslint, eslint-config-next, prettier, prettier-plugin-tailwindcss, playwright, @axe-core/playwright, turndown.
  - Anything else needs a one-line justification in DECISIONS.md.
  - Check every package name for typosquats before installing.
  - Run scripts with Node's built-in TypeScript support. Do not add tsx or ts-node.
- Commit pnpm-lock.yaml.
- Add .github/dependabot.yml: npm, weekly, security updates, with a cooldown matching the age gate.
- pnpm audit --prod must show 0 high/critical findings before you finish.

## Phase 1: Scrape the whole site (miss nothing)
Write a re-runnable script, scripts/scrape.ts, using Playwright (headless Chromium). Elementor builds content with JavaScript, so never parse raw HTML from fetch. Crawl politely: concurrency 2, ~500 ms delay, retries with backoff.

URL discovery: use the union of all of these.
- /wp-sitemap.xml and /sitemap_index.xml (whichever exist), plus robots.txt.
- The WordPress REST API, if it's open: /wp-json/wp/v2/pages, /posts, /categories and /media (per_page=100, paginate). /media lists every uploaded file, so use it to cross-check images.
- A breadth-first crawl of every internal link on every rendered page: header (including dropdowns), footer, in-content links and pagination.

Minimum inventory. Fail loudly if any of these is missing:
- /
- /about/
- /services/
- /blogs/
- /contact/
- /why-do-performing-and-outstanding-employees-leave-the-system-sooner-than-the-others/
- /mental-health-of-entrepreneurs/

Log category/author archives and WooCommerce leftovers (cart etc.) in the inventory. Don't create folders for empty archives.

On every page, before extracting:
- Wait for network idle.
- Scroll slowly to the bottom to trigger lazy loading.
- Open every accordion, tab and toggle.
- Read all carousel slides from the DOM, de-duplicating cloned Swiper slides.
- Capture popups and modals.

Elementor traps:
- Counters show "0+" until animated. Read the real number from data-to-value, plus its prefix/suffix. The home page "Years of Experience" must end up with its real value.
- Images hide in data-src, data-lazy-src, srcset and CSS backgrounds loaded from external Elementor CSS. Run getComputedStyle(el).backgroundImage on every element. Always keep the largest srcset candidate or the original upload.
- Strip raw shortcodes (e.g. [mc4wp_form id="698"] on /blogs/) and list them in the report.

Output: one folder per page, named by its slug.
content/scraped/
  _inventory.json: every URL with its type (page/post/archive/media/other), HTTP status, title and local folder
  _report.md: coverage table and issues
  site/global.json:
    header and footer logo variants, favicon
    nav tree with dropdown children and anchors
    top-bar text ("Need help? Talk to an expert" + phone)
    footer columns, phone, email, address
    social profiles (strip utm params), sister brands (Marshmellowww, House of Bold)
    copyright, legal links
  pages/<slug>/ (home, about, services, blogs, contact) and posts/<slug>/, each containing:
    content.md: all visible text in DOM order, with heading levels preserved, list items, button/link labels with their original hrefs, testimonial quotes with names, and image alt text inline
    sections.json: ordered array of { order, id, eyebrow, heading, subheading, body[], items[{ title, subtitle, text, image, link }], ctas[{ label, href }], images[], background }
    meta.json: url, title, meta description, canonical, robots, OG/Twitter tags, JSON-LD, h1, dates, category, author
    images/: full-resolution originals, plus images.json (original URL, local file, alt, width, height, section)
    screenshots/desktop-1440.png and screenshots/mobile-390.png (full page)
    rendered.html: reference copy

Scraped files stay outside /public and must never be publicly served.

Verification. Write the results to _report.md, and stop if any page fails:
- The content.md word count is at least 98% of the page's rendered innerText, excluding header and footer.
- Every <img>, srcset and background image in the DOM exists in images/.
- Every DOM heading appears in content.md.

Also list these inconsistencies for me to decide. Do not fix them silently:
- Nav "Brand/Digital Management" vs card "Creative Branding and PR".
- Nav "Operational Excellence" vs card "Business Process Excellence".
- "Bold Fuse" vs "Boldfuse".
- Suspected typos in names (e.g. "Kaa's kirchen").
- Footer Privacy/Terms links that point to the home page.

## Phase 2: Routes and 404 linking
- src/config/routes.ts is the single source of truth for every old-site page.
  - Each entry has: label, new path, and status "built" | "planned".
  - Mirror the old slugs and keep the old anchor IDs (/services/#businessautomation, etc.).
  - Only "/" is "built".
- Set trailingSlash: true so the new URLs match the old ones. Existing Google results and backlinks then keep working as pages get built.
- Header, footer, CTAs, service "Learn more" links and blog cards all read from the registry.
  - Planned routes are normal internal <Link>s with prefetch={false}, which avoids 404 prefetch errors in the console.
  - Planned routes render the custom 404.
- Privacy Policy → /privacy-policy/ and Terms → /terms-and-conditions/, both planned.
- External links are allowed only for:
  - Boldfuse's own social profiles (target="_blank" rel="noopener noreferrer")
  - tel: links
  - mailto: links
- sitemap.ts lists "built" routes only.

## Phase 3: Design system (Tailwind v4, done properly)
Setup:
- Install tailwindcss and @tailwindcss/postcss, and add postcss.config.mjs.
- Import app/globals.css once, in app/layout.tsx.
- globals.css starts with @import "tailwindcss";
- Then an @theme block resets the default palette (--color-*: initial;) and defines only these tokens:
  --color-white: #ffffff
  --color-brand-50: #e2faf7 (small chips and icon tiles only, never a section background)
  --color-brand-200: #a9e9d9 (text and borders on dark blocks)
  --color-brand-500: #02aa77 (signature bright green: bright CTA fills, highlights, icons)
  --color-brand-700: #026b4d (primary button fill with white text, links)
  --color-brand-800: #024935 (hover states, dark surfaces)
  --color-brand-950: #03281e (headings, body text, dark blocks)
  --color-sage-400: #61a390 (decorative only: dividers, icon strokes)
  --color-sage-700: #326a5a (secondary text on white)
  --color-danger: #b42318 (only if an error state is ever needed)
- Fonts: next/font/google (self-hosted at build), mapped via @theme inline { --font-display: …; --font-sans: …; }.
  - Display face: geometric, matching the bold logo wordmark (e.g. Plus Jakarta Sans 700/800).
  - Body face: very legible (e.g. Inter 400/500/600).
- Forbidden: tailwind.config.js, @tailwind base/components/utilities, inline styles, CSS modules, bg-[#…] and text-[#…].
- Hairlines use palette opacity (border-brand-950/10).
- Build these primitives and use them in every section. Merge classes with cn() (clsx + tailwind-merge).
  - Container: max-w-7xl mx-auto px-5 sm:px-8.
  - Section: one vertical rhythm (e.g. py-20 md:py-28). Props: id, and tone "white" | "dark" | "bright".
  - SectionHeading: eyebrow, title, lead.
  - Button: variants primary (brand-700 + white), bright (brand-500 + brand-950) and outline; sizes md and lg.
  - Card and Badge.

Contrast (WCAG AA, pre-computed; follow it):
- White on brand-700 = 6.5:1 ✓ for primary buttons.
- brand-950 on brand-500 = 5.3:1 ✓ for bright buttons and bands.
- White on brand-500 = 3.0:1 ✗ never.
- brand-500 or sage-400 as text on white ≈ 3:1 ✗ never. Use brand-950, brand-700 or sage-700 (6.3:1) instead.
- White or brand-200 on brand-950 ✓.

Typography:
- Body: text-base on mobile and text-lg on desktop, weight 400–500, leading-relaxed, max ~70ch, colour brand-950 or sage-700.
- Smallest text anywhere is text-sm at weight 500. Never use text-xs. Never use font-thin, font-extralight or font-light.
- H1: text-5xl → text-7xl, weight 800, tight tracking.
- H2: text-4xl → text-5xl, weight 700.
- H3: text-xl → text-2xl, weight 600–700.

Visual direction: a confident, clinical-but-warm consulting brand for doctors and hospital leaders.
- White canvas, deep forest-green type and bright emerald accents.
- Generous whitespace, a strong 12-column grid, editorial asymmetry and oversized numerals.
- 1px borders instead of shadows. rounded-2xl/3xl cards and images, rounded-full buttons.
- Rhythm comes from 2–3 solid brand-950 or brand-500 blocks between white sections.
- Motion is subtle and CSS-only:
  - Reveal with opacity plus an 8–12px rise, using scroll-driven animations inside @supports.
  - Honour prefers-reduced-motion.
  - Content must stay visible in browsers without support.
  - No animation libraries.
- Icons come from one set (lucide-react) with a consistent stroke. Replace the old low-res decorative PNG icons with matching icons. Keep the real photos and client logos.
- Avoid template tropes: centred heroes with blobs, rows of identical three-card grids, emoji icons, fake dashboards, stock illustration packs.

## Phase 4: Home page (existing sections, redesigned)
Every section below exists on the live home page and must appear with its real content.
- Confirm the order against screenshots/desktop-1440.png. Reorder only if it clearly improves the story, and log why.
- Copy lives in a typed src/content/home.ts sourced from the scrape. Components never hardcode copy.
- Images are statically imported from src/assets/ with explicit sizes. Only the hero image is preloaded.

1. Header
   - Header logo from the scrape.
   - Nav: Home, About, Services (accessible dropdown with the 7 services → /services/#anchors), Blogs, Contact.
   - "Talk to an expert" → tel:+918341410810 (carries over the old "Need help? Talk to an expert" message).
   - Solid white and sticky, with a 1px bottom border once scrolled.
   - Mobile: full-screen menu with a focus trap, Esc to close and scroll lock. Services become a nested disclosure.
2. Hero
   - H1: "Helping Doctors Build The Best Healthcare" (the brand line from the new logo).
   - Eyebrow: "People | Process | Productivity partners".
   - Supporting copy from the old hero: "Welcome to Bold Fuse" plus its paragraph, lightly polished.
   - CTAs: "Learn more" → /about/, and "Talk to an expert" (tel:).
   - Asymmetric split layout with a real scraped photo in a rounded frame.
3. Time to thrive
   - Heading: "Multiply your strengths, Eliminate your weaknesses."
   - Five capability cards with their taglines:
     - Technology management: Shake hands with future
     - Product management: Innovate awesomeness
     - People management: Nurture your employees
     - Business management: Defend your dream
     - Brand management: Showcase your power
   - Bento layout with the scraped photo.
4. Our Values
   - Heading: "Make us compatible with you".
   - Values, with full descriptions: Every step towards perfection; We are secret keepers; Straightforwardness; Always stay on the leading edge.
   - Large 01–04 numerals.
5. Our working structure
   - Heading: "We partner up with people at the top to make the best out of their extraordinary team."
   - Assess → Strategize → Execute, with the full paragraphs, as a connected numbered process: horizontal on desktop, vertical on mobile.
6. What we do
   - Heading: "Dictate the trajectory of your business with our super skills".
   - All 7 services with full descriptions. Each "Learn more" → /services/#<old anchor>.
7. Experience, Vision and Mission (a solid brand-950 block suits this)
   - The real "Years of Experience" number, rendered in the HTML. A count-up is optional and only an enhancement: tabular-nums, no layout shift.
   - Vision: "To always believe in co-existence".
   - Mission: in full.
8. Clients and testimonials
   - All client logos (18 on the live page today), with their names as alt text, in uniform white tiles with 1px borders.
   - Layout: a grid, or a marquee that pauses on hover/focus and becomes a grid under reduced motion.
   - All testimonials (Warrior garage and Ambus today) as large editorial quotes. No stars or ratings.
9. CTA band (a solid brand-500 band with brand-950 text suits this)
   - "We grow when you grow" plus its line.
   - "Get Started" → /contact/, plus working call and email buttons.
10. From our blog
    - Heading: "Keeping Up with Boldfuse".
    - Every post shown (2 today), each with image, category, title and excerpt, linking to its old slug.
11. Footer (solid brand-950)
    - Footer logo.
    - Reach us: phone, email, address.
    - Quick Links.
    - Facebook, Instagram and LinkedIn.
    - "Our other brands": Marshmellowww, House of Bold.
    - © {current year} Boldfuse; Privacy Policy; Terms & Conditions.

Drop the WooCommerce "Cart", stray popup controls and raw shortcodes.

You may add up to 3 extra sections, but only if the scraped About, Services or Contact pages hold the material:
- A Service explorer (tabs with the detailed Services-page copy).
- An About snapshot.
- A Contact strip.
Skip any you can't fill honestly.

Give every section a stable id (#services, #values, #process, #clients, #blog, etc.) so the 404 can deep-link into the home page.

## Phase 5: The 404 page (app/not-found.tsx)
Make it memorable and on-brand. Most visitors who land here clicked a page that is still being rebuilt.
- Same header and footer as the home page.
- A bold typographic "404" composition in brand-950 with a brand-500 accent. No gradients, no stock illustration.
- Copy that fits both cases: the page doesn't exist, or it's still being rebuilt as part of the new website.
- Actions:
  - Back to home.
  - Jump links to #services, #process, #clients and #blog.
  - "Talk to an expert" (tel:) and email (mailto:).
- Real HTTP 404 status, noindex, title "Page not found | Boldfuse".

## Phase 6: SEO and social sharing
- metadataBase comes from NEXT_PUBLIC_SITE_URL.
  - Validate it at build; the production build fails if it's missing.
  - Document it in .env.example.
- Root metadata:
  - Title template "%s | Boldfuse".
  - Default title "Boldfuse | Helping Doctors Build The Best Healthcare".
  - Description of 155 characters or fewer, written from real content.
  - canonical, robots, applicationName, publisher; formatDetection off.
- openGraph: type "website", siteName "Boldfuse", locale "en_IN", url, title, description, images (1200×630, with alt).
- twitter: card "summary_large_image", title, description, images with alt.
  - No twitter:site or twitter:creator. The site has no X handle; never invent one.
- Share images are static files committed to the repo:
  - app/opengraph-image.jpg and app/twitter-image.jpg, 1200×630, each under 300 KB so WhatsApp shows them, plus matching .alt.txt files.
  - Generate them once with scripts/og.ts: a Playwright screenshot of a local 1200×630 HTML template with a white canvas, the badge, the brand line, the eyebrow and a solid brand-500 bar.
  - No runtime image generation.
- Icons:
  - app/icon.png, app/apple-icon.png and favicon.ico.
  - app/manifest.ts with name, short_name, theme_color #ffffff and background_color #ffffff.
  - A viewport export with themeColor.
  - Crop the heart-hand mark from the real logo files. Never redraw it.
- JSON-LD in the layout:
  - Organization: name, url, logo, email, telephone, PostalAddress (Lanco Hills Road, Gachibowli, Hyderabad, Telangana 500089, IN), sameAs (Facebook, Instagram, LinkedIn).
  - WebSite.
  - Serialise with JSON.stringify(data).replace(/</g, "\\u003c").
- robots.ts (allow all, plus the sitemap URL) and sitemap.ts (built routes only).
- Check the rendered <head> for:
  - Absolute og:image and twitter:image URLs.
  - og:image width, height and alt.
  - Exactly one canonical.
  These cover Facebook, LinkedIn, WhatsApp, X, Telegram, Slack and Discord previews.

## Phase 7: Security hardening
- Rendering and features:
  - Home and 404 are statically rendered (○ Static in the build output).
  - No Server Actions, route handlers, proxy.ts, "use cache"/Cache Components or other experimental flags.
  - No next/script with beforeInteractive.
- next.config.ts:
  - poweredByHeader: false and reactStrictMode: true.
  - No productionBrowserSourceMaps.
  - images: no remotePatterns, dangerouslyAllowSVG: false, default formats (don't force AVIF).
  - SVGs are imported as components or plain <img>. Never send them through the optimiser.
- headers() on every route. Apply CSP in production only, because dev needs eval for HMR.
  Strict-Transport-Security: max-age=31536000; includeSubDomains (add preload only after confirming every subdomain is HTTPS)
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' …; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
- script-src:
  - First try a Next.js hash/SRI-based CSP that keeps pages static.
  - If the installed version can't do that cleanly, use 'self' 'unsafe-inline' with zero external script origins.
  - Don't use nonce-based CSP here. It forces dynamic rendering, and it is the setup behind CVE-2026-44581.
  - Document the choice in the README.
- Don't put a restrictive Cross-Origin-Resource-Policy on the share images, icons or manifest. Social crawlers must be able to fetch them.
- error.tsx and global-error.tsx are branded and show no stack traces or internal messages.
- Hosting:
  - Linux only: Vercel, or Node LTS behind Nginx/Caddy with TLS and rate limiting on /_next/image.
  - Never Windows.
- Only NEXT_PUBLIC_SITE_URL is public. No other env var reaches the client.
- Final check: searching src/ and public/ for "wp-content" and "https://boldfuse.in" returns nothing.

## Phase 8: QA and Definition of Done
Test the production build (pnpm build && pnpm start), not dev.
- Build:
  - The build finishes with zero errors and warnings.
  - tsc --noEmit is clean.
  - The ESLint CLI is clean (next lint was removed in v16).
  - Code is Prettier formatted.
- Playwright:
  - Home returns 200 and shows every section heading from the scrape.
  - Every planned link returns 404 and shows the custom 404.
  - The dropdown and mobile menu work by keyboard alone.
  - No console errors or hydration warnings.
  - Meta, OG and Twitter tags are present with absolute URLs.
  - @axe-core/playwright reports 0 serious/critical issues.
- Screenshots at 360, 390, 768, 1024, 1280, 1440 and 1920:
  - No horizontal scroll.
  - No overlapping or clipped text.
  - Tailwind styles visibly applied in every section.
  - Compare section by section with the old screenshots to prove nothing is missing.
- Lighthouse mobile on the production build:
  - Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.
  - LCP < 2.5 s, CLS < 0.05.
- Security:
  - pnpm audit --prod shows 0 high/critical.
  - Response headers verified with curl -I.
  - 0 CSP violations in the console.
- Deliverables:
  - README.md: setup, env, scripts (scrape, og, dev, build, start, test), deployment, security notes, and how to build the next page by flipping its route to "built".
  - DECISIONS.md
  - content/copy-changes.md
  - content/scraped/_report.md
  - A final summary of anything that needs my decision.