// The four products of the «Proyectos» section. Everything a visitor reads
// (kicker, title, description, stack) lives in messages/ under
// `projects.items.<slug>`; here goes only what does not change with the
// language: the order, the live URL, the screenshot and the names of the tabs
// in the drawn browser window. Those are product names, not copy: the tabs
// that ARE copy («+ 7 sitios de la red», «Reservas») stay in the catalogues,
// as `extraTabs`, and the card prints them after these.
export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

/** Keys of `projects.items` in the messages. */
export type ProjectSlug = "reto-md" | "365-dias-de-ajedrez" | "cuarteto-fratres" | "vallarta-wknd";

export interface Project {
  slug: ProjectSlug;
  /** Tabs of the browser window that carry a product's name. */
  tabs: readonly string[];
  /** Public URL of the product, when it is live under a domain of its own. */
  url: string | null;
  /** Screenshot of the home page; `null` shows a "capture pending" card. */
  image: ProjectImage | null;
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "reto-md",
    tabs: ["Reto Pediatría"],
    url: "https://retomd.com",
    image: { src: "/images/reto-md.jpg", width: 1600, height: 900 },
  },
  {
    slug: "365-dias-de-ajedrez",
    tabs: ["365 Días de Ajedrez", "Método 365"],
    url: "https://365diasdeajedrez.com",
    image: { src: "/images/365-dias-de-ajedrez.jpg", width: 1600, height: 900 },
  },
  {
    slug: "cuarteto-fratres",
    tabs: ["Cuarteto Fratres"],
    url: "https://cuartetofratres.com",
    image: { src: "/images/cuarteto-fratres.jpg", width: 1600, height: 900 },
  },
  {
    slug: "vallarta-wknd",
    tabs: ["Vallarta WKND"],
    url: "https://vallartawknd.vercel.app",
    image: { src: "/images/vallarta-wknd.jpg", width: 1600, height: 900 },
  },
];
