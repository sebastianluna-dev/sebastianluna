// Public URL of the site, for everything that needs an absolute URL (sitemap,
// robots, canonicals and Open Graph). Locally it is overridden with
// NEXT_PUBLIC_SITE_URL; the default value is the production domain, `www`
// included: the bare domain answers with a 308 to it, and a canonical that
// redirects is no canonical at all.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sebastianluna.dev";
