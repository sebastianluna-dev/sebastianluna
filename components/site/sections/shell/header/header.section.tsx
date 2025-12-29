import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/site/shared/locale-switcher.comp";
import { HEADER_NAV_ITEMS } from "@/constants/navigation.const";
import { PORTFOLIO_YEAR } from "@/constants/profile.const";
import { MobileMenu } from "./mobile-menu.comp";
import "./header.section.css";

// Top row of the page: the "Portafolio 2026" label on the left, the anchor
// links in the middle (desktop), the language switch on the right and, on the
// phone, the menu button.
export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <header className="section header">
      <div className="section__inner header__inner">
        <p className="eyebrow header__label">{tCommon("portfolioLabel", { year: PORTFOLIO_YEAR })}</p>
        <nav className="header__nav" aria-label={t("label")}>
          {HEADER_NAV_ITEMS.map((item, index) => (
            <span key={item.key} className="header__nav-item">
              {index > 0 && (
                <span className="header__separator" aria-hidden="true">
                  /
                </span>
              )}
              <a className="header__link" href={item.href}>
                {t(item.key)}
              </a>
            </span>
          ))}
        </nav>
        <div className="header__tools">
          <LocaleSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
