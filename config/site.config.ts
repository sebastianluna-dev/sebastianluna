import type { ComponentType } from "react";
import { AboutSection } from "@/components/site/sections/home/about/about.section";
import { ContactSection } from "@/components/site/sections/home/contact/contact.section";
import { HeroSection } from "@/components/site/sections/home/hero/hero.section";
import { ProjectsSection } from "@/components/site/sections/home/projects/projects.section";

interface HomeSection {
  id: string;
  Section: ComponentType;
}

// The order of the home page. Each section renders its own anchor, which has
// to match constants/navigation.const.ts.
export const HOME_SECTIONS: readonly HomeSection[] = [
  { id: "hero", Section: HeroSection },
  { id: "projects", Section: ProjectsSection },
  { id: "about", Section: AboutSection },
  { id: "contact", Section: ContactSection },
];
