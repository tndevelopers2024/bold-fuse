const value = process.env.NEXT_PUBLIC_SITE_URL;
if (!value)
  throw new Error("NEXT_PUBLIC_SITE_URL is required. See .env.example.");
const parsed = new URL(value);
if (
  !["http:", "https:"].includes(parsed.protocol) ||
  parsed.username ||
  parsed.password ||
  parsed.pathname !== "/" ||
  parsed.search ||
  parsed.hash
)
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without a path or credentials.",
  );
export const siteUrl = parsed.origin;
