import { useLocale, useTranslations } from "next-intl";
import { PillLink } from "@/components/site/shared/pill-link.comp";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { CONTACT_EMAILS, CV_FILES, PROFILE } from "@/constants/profile.const";
import "./contact.section.css";

// The amber card: title, email, location and the three ways to reach out.
export function ContactSection() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const email = CONTACT_EMAILS[locale];

  return (
    <section id="contacto" className="section contact">
      <div className="section__inner">
        <Reveal className="contact__card">
          <div className="contact__copy">
            <p className="eyebrow eyebrow_tone_cocoa contact__eyebrow">{t("eyebrow")}</p>
            <h2 className="section-title contact__title">{t("title")}</h2>
            <p className="contact__email">
              <a className="contact__email-link" href={`mailto:${email}`}>
                {email}
                <span className="contact__email-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </p>
            <p className="contact__location">{t("location")}</p>
          </div>
          <div className="contact__actions">
            <a className="button contact__button" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              {tCommon("linkedin")} ↗
            </a>
            <a
              className="button button_variant_outline contact__button"
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tCommon("github")} ↗
            </a>
            <PillLink className="contact__cv" href={CV_FILES[locale]} icon="download" variant="paper">
              {tCommon("downloadCv")}
            </PillLink>
            <a className="contact__cv-plain" href={CV_FILES[locale]}>
              {tCommon("downloadCv")} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
