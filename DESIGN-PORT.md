# Parvath design adaptation

The homepage uses the supplied `parvath-new/src` implementation as the design reference. BoldFuse's content modules, business details, client assets, metadata and route destinations remain the source of truth.

## Reused implementation

`src/components/editorial/` ports the reference's Hero, BrandTicker, Services, ServiceCard, Stats, BusinessOwners, Process, CTA, Reveal, SectionHeading, Ornaments, CountUp, SwipeArea, ScrollProgress, CustomCursor and Button components. `src/lib/editorial/motion.js` retains the reference motion timing. `src/app/globals.css` carries its palette, spacing, type scale, ornament animations and mobile swipe rules. Manrope Bold (700) is used for headings, Nunito Sans Medium (500) for descriptions and testimonials, Roboto for navigation and labels, and Raleway for other display details. All fonts are self-hosted by Next.js.

React Router links were converted to Next.js links, interactive modules have client boundaries, and SVG pattern IDs use React's hydration-safe `useId`. The reference's single-frame hero replaces the previous homepage carousel; the previous carousel source and images remain available.

## Content mapping

- Founders' two-card section → BoldFuse introduction and five capabilities.
- Financial services → all seven BoldFuse services, with their complete descriptions.
- Business-owner quadrants → all four BoldFuse values.
- Four-step financial process → BoldFuse's Assess, Strategize and Execute process.
- Advisory statement → BoldFuse vision, mission and experience.
- Reference card styling → BoldFuse's 18 clients, two testimonials and two articles.
- Financial contact CTA and footer → BoldFuse's contact details, links, other brands and legal navigation.

Parvath's logo, founder portraits, financial copy, financial calculators, regulatory claims, analytics/SEO configuration and generated build output are not transplanted into BoldFuse. Those are source-brand content or application-specific infrastructure, rather than reusable design. The reference project itself is unchanged.

## Validation

- TypeScript check and focused ESLint check.
- Production build: `pnpm build --webpack` (Turbopack worker port creation is restricted in this execution environment).
- Browser inspection of desktop/mobile layout, dropdown menu, mobile dialog, Escape/focus restoration, horizontal swipe controls, retained content and image loading.

Only the homepage was implemented before this change. Existing routes marked `planned` in `src/config/routes.ts` retain their existing 404 behavior.

## Palette refinement

Gold and warm beige accents were replaced with BoldFuse emerald, mint and cool green neutrals, including SVG ornaments, cursor colors, animated glows and borders.

## Approved background treatment — 2026-10-24

The user approved the updated contact CTA background as the direction for the entire site: soft emerald/forest gradients with sparse, flowing curved lines. Keep the center quiet and the text legible; concentrate decorative curves near the edges. Use emerald, mint and cool green neutrals on light and dark surfaces.

Reference implementation: `src/components/editorial/CTA.jsx`. Do not reuse the earlier repeating diamond/circle lattice or gold accents from Parvath. Existing lattice decorations elsewhere have not yet been migrated; follow this approved treatment when updating those sections or building further pages.

## Site-wide text weight

All body and interface text uses a minimum medium (500) weight, including navigation, labels, buttons, statistics and footer copy. Headings remain Manrope Bold (700); existing semibold and bold emphasis is retained.

## Service cards and buttons

The service section uses three columns on desktop, readable sentence previews and native expandable descriptions that retain the full original copy. The seventh service finishes the grid as a full-width emerald panel. Phones retain the seven-card swipe row. Cards use restrained gradients and edge curves from the approved background direction.

All buttons and button-like links are flat and static. Shimmer, lift/scale effects, arrow movement, box shadows and inherited text shadows are removed. Color changes and keyboard focus indicators remain available.

## Service imagery

Each of the seven service cards has an original ImageGen photograph in the site's emerald palette. Optimized assets are in `src/assets/services/`; exact prompts and original output paths are in `brand-assets/service-images-v1.json`. Use the card's descriptive alt text and responsive Next.js image sizing. The duplicate vision/get-started strip beneath capabilities was removed at the user's request; the main vision/mission section remains.

## Image-forward service cards

Service images use a larger 4:3 crop and occupy over half the collapsed card height. Card titles are 20px; Nunito Sans descriptions are 14px at medium (500), with two-line previews. Expanding a description reveals the complete original text. The featured service uses a larger image beside its compact content on desktop.

## Original service copy

The user requested the original boldfuse.in heading and descriptions for the What we do section. All seven service descriptions now display in full at 14px medium weight, without previews, line clamps or disclosure controls. The section heading and service names retain the source wording; the larger generated images remain. Other page sections are outside this content update.

## White section backgrounds

Light page sections use white backgrounds site-wide. The pale green backgrounds on Services, Process, Clients and Blog were removed. Dark emerald panels and green accents remain. This supersedes the earlier alternating pale-green section bands.

## About section and responsive navbar

The homepage now includes an About Us section directly after the hero, using the original introduction, team description and three principles from `https://boldfuse.in/about/`. Source content is in `src/content/about.ts`; the original puzzle-cube photo is optimized as `src/assets/about-strategy-v1.webp`.

At the top of the banner, the transparent navbar spans the available page width with the same side padding as the hero. After 25px of scrolling, it contracts to a centered, 1152px maximum-width white pill, with a shorter 64px height. Reduced-motion preferences disable this transition.

## Values redesign

The values section now pairs a dark emerald introduction with four compact, left-aligned white cards. All four original values and descriptions are retained. The previous medallion, rotating ring, animated cross, numeric labels and icon badges are removed. Subtle static curves use the approved background direction; mobile shows all four cards in a vertical layout. The implementation is `src/components/editorial/Values.jsx`.

## Floating statistics

The four statistics now sit directly below About Us as separate raised emerald cards on a white section background. They retain the original counts and labels, use the approved subtle curved-line decoration, and form a two-column layout on phones and four columns on desktop. The previous edge-to-edge patterned strip below Services is removed.

## FAQs

A white FAQ section sits after the blog and before the footer, with six questions covering the audience, services, assessment/strategy/execution process, focused engagements, confidentiality and getting started. The accordion uses native `details`/`summary` elements with a shared name so one question opens at a time. A separate emerald contact panel provides the existing phone and email details. FAQ content is in `src/content/faq.ts`.
