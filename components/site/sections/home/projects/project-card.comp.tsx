import Image from "next/image";
import { useTranslations } from "next-intl";
import { BrowserFrame, type BrowserView } from "@/components/site/shared/browser-frame.comp";
import { PillLink } from "@/components/site/shared/pill-link.comp";
import type { Project, ProjectImage } from "@/constants/projects.const";
import { displayUrl } from "@/lib/display-url";
import { formatIndex } from "@/lib/format-index";
import { messageList } from "@/lib/message-list";
import "./project-card.comp.css";

// The capture inside the window; every tab draws one the same way.
function ProjectShot({ image, alt }: { image: ProjectImage; alt: string }) {
  return (
    <Image
      className="project-card__shot"
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes="(max-width: 767px) 100vw, (max-width: 1280px) 55vw, 720px"
      quality={100}
    />
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

// One product: number, kicker, title, domain, description, stack and the
// screenshot inside a browser window. Odd and even cards mirror each other.
export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations("projects");
  const tItem = useTranslations(`projects.items.${project.slug}`);
  const paragraphs = messageList(tItem.raw("description"));
  const domain = project.url ? displayUrl(project.url) : null;
  // The product's own site opens first; its other sites follow in their tabs.
  const views: BrowserView[] = project.image
    ? [
        {
          tab: project.tab,
          url: domain ?? t("domainPending"),
          content: <ProjectShot image={project.image} alt={tItem("imageAlt")} />,
        },
        ...(project.extraViews ?? []).map((view) => ({
          tab: view.tab,
          url: displayUrl(view.url),
          content: <ProjectShot image={view.image} alt={t("viewImageAlt", { site: view.tab })} />,
        })),
      ]
    : [];

  return (
    <article className="project-card">
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
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="project-card__description">
            {paragraph}
          </p>
        ))}
        <p className="project-card__stack">{tItem("stack")}</p>
        {project.url && (
          <PillLink className="project-card__cta" href={project.url} icon="external" size="sm" external>
            {t("visit")}
          </PillLink>
        )}
      </div>

      <div className="project-card__media">
        {views.length > 0 ? (
          <BrowserFrame views={views} label={t("tabsLabel", { project: tItem("title") })} />
        ) : (
          <div className="project-card__placeholder" role="img" aria-label={tItem("imageAlt")}>
            <span className="eyebrow eyebrow_tone_cocoa">{t("screenshotPending")}</span>
          </div>
        )}
      </div>
    </article>
  );
}
