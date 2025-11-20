import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import "./locale-switcher.comp.css";

// "ES / EN": the same page in the other language. The site is one URL, so
// every option points to the root of its locale.
export function LocaleSwitcher() {
  const current = useLocale();
  const t = useTranslations("nav");

  return (
    <nav className="locale-switcher" aria-label={t("language")}>
      {routing.locales.map((locale, index) => (
        <span key={locale} className="locale-switcher__item">
          {index > 0 && (
            <span className="locale-switcher__separator" aria-hidden="true">
              /
            </span>
          )}
          <Link
            className={["locale-switcher__link", locale === current && "locale-switcher__link_active"]
              .filter(Boolean)
              .join(" ")}
            href="/"
            locale={locale}
            hrefLang={locale}
            aria-current={locale === current ? "page" : undefined}
          >
            {locale}
          </Link>
        </span>
      ))}
    </nav>
  );
}
