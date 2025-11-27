import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import LandingPage from "./landing-page";
import { routing } from "@/i18n/routing";

// The whole portfolio is this one page, prerendered in each locale.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <LandingPage />;
}
