import { useTranslations } from "next-intl";
import { PORTFOLIO_YEAR } from "@/constants/profile.const";
import "./footer.section.css";

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  return (
    <footer className="section footer">
      <div className="section__inner footer__inner">
        <span className="footer__signature">{t("signature")}</span>
        <span className="footer__signature footer__signature_short">{t("signatureShort")}</span>
        <span>{tCommon("portfolioLabel", { year: PORTFOLIO_YEAR })}</span>
      </div>
    </footer>
  );
}
