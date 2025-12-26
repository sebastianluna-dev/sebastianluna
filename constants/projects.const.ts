// The four products of the «Proyectos» section. Everything a visitor reads
// (kicker, title, description, stack) lives in messages/ under
// `projects.items.<slug>`; here goes only what does not change with the
// language: the order, the live URL, the screenshot and the name of the tab in
// the drawn browser window. Those are product names, not copy. A project whose
// window opens more than one site lists the others in `extraViews`: each one
// adds a tab that swaps the capture and the address bar (desktop only, because
// the phone does not draw the chrome).
export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

/** Another site of the same product, shown in a tab of its window. */
export interface ProjectView {
  /** Tab title; also the name the capture's alt text cites. */
  tab: string;
  url: string;
  image: ProjectImage;
}

/** Keys of `projects.items` in the messages. */
export type ProjectSlug = "reto-md" | "365-dias-de-ajedrez" | "cuarteto-fratres" | "vallarta-tours";

export interface Project {
  slug: ProjectSlug;
  /** Tab of the browser window, carrying the product's name. */
  tab: string;
  /** Public URL of the product, when it is live under a domain of its own. */
  url: string | null;
  /** Screenshot of the home page; `null` shows a "capture pending" card. */
  image: ProjectImage | null;
  /** Further sites of the product, each in a tab of the same window. */
  extraViews?: readonly ProjectView[];
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "365-dias-de-ajedrez",
    tab: "365 Días de Ajedrez",
    url: "https://365diasdeajedrez.com",
    image: { src: "/images/365-dias-de-ajedrez.jpg", width: 1600, height: 900 },
  },
  {
    slug: "cuarteto-fratres",
    tab: "Cuarteto Fratres",
    url: "https://cuartetofratres.com",
    image: { src: "/images/cuarteto-fratres.jpg", width: 1600, height: 900 },
  },
  {
    slug: "reto-md",
    tab: "Reto MD",
    url: "https://retomd.com",
    image: { src: "/images/reto-md.jpg", width: 1600, height: 900 },
    extraViews: [
      {
        tab: "Reto Pediatría",
        url: "https://retopediatria.com",
        image: { src: "/images/reto-pediatria.jpg", width: 1600, height: 900 },
      },
      {
        tab: "Reto Dermatología",
        url: "https://retodermatologia.com",
        image: { src: "/images/reto-dermatologia.jpg", width: 1600, height: 900 },
      },
    ],
  },
  {
    slug: "vallarta-tours",
    tab: "Vallarta TOURS",
    url: "https://vallartatours.vercel.app",
    image: { src: "/images/vallarta-tours.jpg", width: 1600, height: 900 },
  },
];
