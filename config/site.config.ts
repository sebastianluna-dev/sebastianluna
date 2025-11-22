import type { ComponentType } from "react";
import { HeroSection } from "@/components/site/sections/home/hero/hero.section";

interface HomeSection {
  id: string;
  Section: ComponentType;
}

// The order of the home page. Each section renders its own anchor, which has
// to match constants/navigation.const.ts.
export const HOME_SECTIONS: readonly HomeSection[] = [
  { id: "hero", Section: HeroSection },
];
