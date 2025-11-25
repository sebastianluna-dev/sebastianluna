// The four products of the «Proyectos» section. Everything a visitor reads
// (kicker, title, description, stack, browser tabs) lives in messages/ under
// `projects.items.<slug>`; here goes only what does not change with the
// language: the order, the live URL and the screenshot.
export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

/** Keys of `projects.items` in the messages. */
export type ProjectSlug = "reto-md" | "365-dias-de-ajedrez" | "cuarteto-fratres" | "vallarta-wknd";

export interface Project {
  slug: ProjectSlug;
  /** Public URL of the product, when it is live under a domain of its own. */
  url: string | null;
  /** Screenshot of the home page; `null` shows a "capture pending" card. */
  image: ProjectImage | null;
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "reto-md",
    url: null,
    image: { src: "/images/reto-md.jpg", width: 1600, height: 977 },
  },
  {
    slug: "365-dias-de-ajedrez",
    url: "https://365diasdeajedrez.com",
    image: { src: "/images/365-dias-de-ajedrez.jpg", width: 1600, height: 900 },
  },
  {
    slug: "cuarteto-fratres",
    url: null,
    image: { src: "/images/cuarteto-fratres.jpg", width: 1600, height: 900 },
  },
  {
    slug: "vallarta-wknd",
    url: null,
    image: null,
  },
];
