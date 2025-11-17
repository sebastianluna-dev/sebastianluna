// Anchors of the single page. The labels come from the messages
// (`nav.<key>`), so the header, the phone menu and the footer share one list.
export const NAV_ITEMS = [
  { key: "home", href: "#inicio" },
  { key: "projects", href: "#proyectos" },
  { key: "about", href: "#sobre-mi" },
  { key: "contact", href: "#contacto" },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];

/** The items the desktop nav shows: everything but the home anchor. */
export const HEADER_NAV_ITEMS = NAV_ITEMS.filter((item) => item.key !== "home");
