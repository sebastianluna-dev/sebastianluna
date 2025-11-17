import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "./globals.css";
import { archivo, ibmPlexMono, instrumentSerif } from "./fonts";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-url";

const OG_LOCALES: Record<Locale, string> = { es: "es_MX", en: "en_US" };

// One static page per locale.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: { es: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: OG_LOCALES[locale],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // Lets the page render statically: without it, reading the locale would
  // make every request dynamic.
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    <html lang={locale} className={`${archivo.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable}`}>
      <body>
        <a className="skip-link" href="#contenido">
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
