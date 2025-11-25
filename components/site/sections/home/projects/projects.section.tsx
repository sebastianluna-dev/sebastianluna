import { useTranslations } from "next-intl";
import { PROJECTS } from "@/constants/projects.const";
import { ProjectCard } from "./project-card.comp";
import "./projects.section.css";

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <section id="proyectos" className="section projects">
      <div className="section__inner">
        <div className="projects__head">
          <h2 className="section-title">{t("title")}</h2>
          <p className="eyebrow">{t("subtitle")}</p>
        </div>
        <ol className="projects__list">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
