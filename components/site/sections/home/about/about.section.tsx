import { useTranslations } from "next-intl";
import { messageList } from "@/lib/message-list";
import "./about.section.css";

// Title and discipline on the left; the italic statement and three
// paragraphs on the right. The phone drops the statement and shows the
// disciplines as chips instead.
export function AboutSection() {
  const t = useTranslations("about");
  const tHero = useTranslations("hero");
  const tags = messageList(t.raw("tags"));
  const paragraphs = messageList(t.raw("paragraphs"));

  return (
    <section id="sobre-mi" className="section about">
      <div className="section__inner about__inner">
        <div className="about__head">
          <h2 className="section-title">{t("title")}</h2>
          <p className="eyebrow about__subtitle">{t("subtitle")}</p>
          <p className="eyebrow about__subtitle about__subtitle_short">{tHero("role")}</p>
        </div>
        <div className="about__body">
          <ul className="about__tags" aria-label={t("subtitle")}>
            {tags.map((tag) => (
              <li key={tag} className="about__tag">
                {tag}
              </li>
            ))}
          </ul>
          <p className="about__quote">{t("quote")}</p>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="about__text">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
