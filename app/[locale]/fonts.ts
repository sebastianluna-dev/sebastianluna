import localFont from "next/font/local";

// Latin subsets of the three Google Fonts of the design, served from
// public/fonts so the build does not depend on Google.
export const archivo = localFont({
  src: [
    { path: "../../public/fonts/archivo-latin.woff2", weight: "100 900", style: "normal" },
    { path: "../../public/fonts/archivo-latin-ext.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
});

export const ibmPlexMono = localFont({
  src: [
    { path: "../../public/fonts/ibm-plex-mono-latin.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/ibm-plex-mono-latin-ext.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const instrumentSerif = localFont({
  src: [
    { path: "../../public/fonts/instrument-serif-italic-latin.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/instrument-serif-italic-latin-ext.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});
