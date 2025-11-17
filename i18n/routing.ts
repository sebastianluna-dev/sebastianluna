import { defineRouting } from "next-intl/routing";

// Spanish is the default and lives at the root (`/`); English at `/en`.
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
