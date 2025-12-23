import { useTranslations } from "next-intl";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { PROJECTS } from "@/constants/projects.const";
import { ProjectCard } from "./project-card.comp";
import "./projects.section.css";

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <section id="proyectos" className="section projects">
      <div className="section__inner">
        <Reveal className="projects__head">
          <h2 className="section-title">{t("title")}</h2>
          <p className="eyebrow projects__subtitle">{t("subtitle")}</p>
        </Reveal>
        <ol className="projects__list">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.slug} as="li" className="projects__item" delay={index * 0.06}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
