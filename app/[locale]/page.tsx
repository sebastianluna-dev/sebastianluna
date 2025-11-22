import { setRequestLocale } from "next-intl/server";
import LandingPage from "./landing-page";
import type { Locale } from "@/i18n/routing";

// The whole portfolio is this one page, prerendered in each locale.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <LandingPage />;
}
