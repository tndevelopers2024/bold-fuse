# BoldFuse

Responsive healthcare business consulting website built with Next.js, React, TypeScript and Tailwind CSS.

## Development

Use Node **24.22.1** and pnpm **11.28.8** (pinned in the repository).

```sh
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Set `NEXT_PUBLIC_SITE_URL` to the public production URL before building. Never commit `.env.local` or secrets.

## Production

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

Deploy using a Next.js-compatible host. Only the homepage and custom 404 are implemented; routes marked `planned` in `src/config/routes.ts` remain placeholders.

## Maintenance

- `pnpm typecheck` checks TypeScript.
- `pnpm lint` runs ESLint.
- `pnpm test` runs the browser validation script against `TEST_BASE_URL` (defaults to localhost:3000).
- `pnpm lighthouse` generates performance and accessibility reports.
- `pnpm og` regenerates social sharing images from the retained brand badge.

Page copy is in `src/content`, active media is in `src/assets`, and homepage sections are in `src/components/editorial`. Preserve the lockfile and environment example for reproducible deployment.

Source-site captures, obsolete banner variants, unused carousel code, capture scripts, and historical QA output have been removed. Earlier versions remain available in Git history. Build output, dependencies, environment files, and test reports are ignored by Git.
