import type { Locale } from "@/i18n/routing";

// Who the site is about. Names and links are not translated; the copy around
// them lives in messages/.
export const PROFILE = {
  name: "Sebastian Luna",
  linkedin: "https://www.linkedin.com/in/sebastianlunarodriguez",
  github: "https://github.com/sebastianluna-dev",
  portrait: { src: "/images/retrato-sebastian-luna.png", width: 900, height: 1200 },
} as const;

/** The address to write to, one per language; both reach the same inbox. */
export const CONTACT_EMAILS: Record<Locale, string> = {
  es: "contacto@sebastianluna.dev",
  en: "contact@sebastianluna.dev",
};

/**
 * The CV, one PDF per language, served from public/. A folder per locale
 * rather than a suffix so both downloads land with the same filename, which
 * is what the recruiter ends up with on disk.
 */
export const CV_FILES: Record<Locale, string> = {
  es: "/cv/es/cv-sebastian-luna-senior-frontend-developer.pdf",
  en: "/cv/en/cv-sebastian-luna-senior-frontend-developer.pdf",
};

/** The figures of the hero; their labels are `hero.stats.<key>` in messages. */
export const STATS = [
  { key: "years", value: 6, approximate: true },
  { key: "projects", value: 50, approximate: true },
  { key: "products", value: 15, approximate: false },
  { key: "industries", value: 5, approximate: true },
] as const;

export const PORTFOLIO_YEAR = 2026;
