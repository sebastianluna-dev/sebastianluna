import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { PillLink } from "@/components/site/shared/pill-link.comp";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { RingLink } from "@/components/site/shared/ring-link.comp";
import { CV_FILES, PROFILE } from "@/constants/profile.const";
import { StatList } from "./stat-list.comp";
import "./hero.section.css";

// Name, role, lead, figures and the portrait on its amber card. On the phone
// the card goes first, under the header, and carries the availability badge.
// The two blocks come in when the section enters the viewport —which here is
// on load, since it is the top of the page— the card just after the copy.
export function HeroSection() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <section id="inicio" className="section hero">
      <div className="section__inner hero__inner">
        <Reveal className="hero__copy">
          <span className="hero__available">
            <i className="hero__dot" aria-hidden="true" />
            <span className="hero__available-long">{t("available")}</span>
            <span className="hero__available-short">{t("availableShort")}</span>
          </span>
          <h1 className="hero__name">{t.rich("name", { br: () => <br /> })}</h1>
          <p className="eyebrow eyebrow_tone_rust hero__role">{t("role")}</p>
          <p className="hero__lead">{t("lead")}</p>
          <div className="hero__actions">
            <PillLink href={CV_FILES[locale]} icon="download" download>
              {tCommon("downloadCv")}
            </PillLink>
            <RingLink href={PROFILE.linkedin} mark="in" label={tCommon("linkedin")} />
            <RingLink href={PROFILE.github} mark="gh" label={tCommon("github")} />
          </div>
          <StatList />
        </Reveal>

        <Reveal className="hero__portrait" delay={0.1}>
          <Image
            className="hero__photo"
            src={PROFILE.portrait.src}
            alt={t("portraitAlt")}
            width={PROFILE.portrait.width}
            height={PROFILE.portrait.height}
            sizes="(max-width: 767px) 60vw, 380px"
            quality={100}
            priority
          />
          <span className="hero__badge" aria-hidden="true">
            <i className="hero__dot hero__dot_tone_ink" />
            {t("availableShort")}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
