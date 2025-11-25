import Image from "next/image";
import { useTranslations } from "next-intl";
import { BrowserFrame } from "@/components/site/shared/browser-frame.comp";
import { PillLink } from "@/components/site/shared/pill-link.comp";
import type { Project } from "@/constants/projects.const";
import { displayUrl } from "@/lib/display-url";
import { formatIndex } from "@/lib/format-index";
import { messageList } from "@/lib/message-list";
import "./project-card.comp.css";

interface ProjectCardProps {
  project: Project;
  index: number;
}

// One product: number, kicker, title, domain, description, stack and the
// screenshot inside a browser window. Odd and even cards mirror each other.
export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations("projects");
  const tItem = useTranslations(`projects.items.${project.slug}`);
  const tabs = messageList(tItem.raw("tabs"));
  const domain = project.url ? displayUrl(project.url) : null;

  return (
    <li className="project-card">
      <div className="project-card__copy">
        <p className="project-card__kicker">
          <span className="project-card__index">{formatIndex(index)}</span>
          <span className="eyebrow eyebrow_tone_rust project-card__category">{tItem("kicker")}</span>
        </p>
        <h3 className="project-card__title">{tItem("title")}</h3>
        {project.url ? (
          <p className="project-card__domain">
            <a className="project-card__domain-link" href={project.url} target="_blank" rel="noopener noreferrer">
              {domain} ↗
            </a>
          </p>
        ) : (
          <p className="project-card__domain project-card__domain_pending">{t("domainPending")}</p>
        )}
        <p className="project-card__description">{tItem("description")}</p>
        <p className="project-card__stack">{tItem("stack")}</p>
        {project.url && (
          <PillLink className="project-card__cta" href={project.url} icon="external" size="sm" external>
            {t("visit")}
          </PillLink>
        )}
      </div>

      <div className="project-card__media">
        {project.image ? (
          <BrowserFrame tabs={tabs} url={domain ?? t("domainPending")}>
            <Image
              className="project-card__shot"
              src={project.image.src}
              alt={tItem("imageAlt")}
              width={project.image.width}
              height={project.image.height}
              sizes="(max-width: 767px) 100vw, (max-width: 1280px) 55vw, 720px"
            />
          </BrowserFrame>
        ) : (
          <div className="project-card__placeholder" role="img" aria-label={tItem("imageAlt")}>
            <span className="eyebrow eyebrow_tone_cocoa">{t("screenshotPending")}</span>
          </div>
        )}
      </div>
    </li>
  );
}
