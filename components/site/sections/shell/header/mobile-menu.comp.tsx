"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { PillLink } from "@/components/site/shared/pill-link.comp";
import { NAV_ITEMS } from "@/constants/navigation.const";
import { CONTACT_EMAILS, CV_FILES, PORTFOLIO_YEAR, PROFILE } from "@/constants/profile.const";
import { formatIndex } from "@/lib/format-index";
import "./mobile-menu.comp.css";

// Full-screen menu of the phone. A native modal <dialog>: the browser traps
// the focus, closes it with Escape and the page behind it stops scrolling
// (globals.css). Only the button is visible on the desktop breakpoints... and
// not even that: the whole block is hidden there.
export function MobileMenu() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <div className="mobile-menu">
      <button type="button" className="mobile-menu__toggle" aria-label={t("openMenu")} onClick={open}>
        <span aria-hidden="true">≡</span>
      </button>

      <dialog ref={dialogRef} className="mobile-menu__panel" aria-label={t("menu")}>
        <div className="mobile-menu__bar">
          {/* The bar of the panel keeps the label of the header, «Portafolio 2026»;
              «Menú» is left to the accessible name of the dialog. */}
          <span className="eyebrow mobile-menu__title">
            {tCommon("portfolioLabel", { year: PORTFOLIO_YEAR })}
          </span>
          <button type="button" className="mobile-menu__close" aria-label={t("closeMenu")} onClick={close}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label={t("label")}>
          {NAV_ITEMS.map((item, index) => (
            <a key={item.key} className="mobile-menu__link" href={item.href} onClick={close}>
              <span className="mobile-menu__index">{formatIndex(index)}</span>
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="mobile-menu__foot">
          <PillLink href={CV_FILES[locale]} icon="download" download>
            {tCommon("downloadCv")}
          </PillLink>
          <div className="mobile-menu__social">
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              {tCommon("linkedin")} ↗
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              {tCommon("github")} ↗
            </a>
            <a href={`mailto:${CONTACT_EMAILS[locale]}`}>{tCommon("email")} ↗</a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
