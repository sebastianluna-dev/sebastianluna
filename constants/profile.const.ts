import type { Locale } from "@/i18n/routing";

// Who the site is about. Names and links are not translated; the copy around
// them lives in messages/.
export const PROFILE = {
  name: "Sebastian Luna",
  email: "contacto@sebastianluna.dev",
  linkedin: "https://www.linkedin.com/in/sebastianlunarodriguez",
  github: "https://github.com/sebastianluna-dev",
  portrait: { src: "/images/retrato-sebastian-luna.png", width: 900, height: 1200 },
} as const;

/** The CV, one PDF per language, served from public/. */
export const CV_FILES: Record<Locale, string> = {
  es: "/cv/sebastian-luna-es.pdf",
  en: "/cv/sebastian-luna-en.pdf",
};

/** The figures of the hero; their labels are `hero.stats.<key>` in messages. */
export const STATS = [
  { key: "years", value: 6, approximate: true },
  { key: "products", value: 4, approximate: true },
  { key: "lighthouse", value: 99, approximate: false },
  { key: "deploys", value: 6, approximate: false },
] as const;

export const PORTFOLIO_YEAR = 2026;
