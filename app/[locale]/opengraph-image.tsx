import { readFile } from "node:fs/promises";
import path from "node:path";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { PROFILE } from "@/constants/profile.const";
import { routing } from "@/i18n/routing";

// The card LinkedIn, WhatsApp and X draw when the site is shared. Rendered at
// build time, one per locale, because the role and the availability line are
// copy. Satori knows nothing of CSS variables, so the palette is repeated
// here as literals; they are the tokens of app/[locale]/globals.css.
const COLOR = {
  cream: "#f5f2ea",
  ink: "#111110",
  amber: "#f2a63b",
  muted: "#55534b",
  line: "#d9d4c7",
} as const;

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
/* The role reads the same in both catalogues, so one alt serves the two. */
export const alt = `${PROFILE.name} — Frontend developer`;

// The image route does not inherit the layout's params: without this it would
// be rendered on demand instead of once per locale at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Satori reads ttf, otf and woff, never woff2: these are the static cuts of Archivo. */
function loadFont(file: string): Promise<Buffer> {
  return readFile(path.join(process.cwd(), "public", "fonts", file));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "hero" });
  const [regular, semibold] = await Promise.all([loadFont("archivo-400.ttf"), loadFont("archivo-600.ttf")]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: COLOR.cream,
        color: COLOR.ink,
        fontFamily: "Archivo",
      }}
    >
      {/* The amber circle of the header, and beside it the line that says
            whether he is looking: «Disponible para vacantes». */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 22, height: 22, borderRadius: 11, background: COLOR.amber }} />
        <div style={{ fontSize: 26, letterSpacing: 1, color: COLOR.muted }}>{t("available")}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 150, fontWeight: 600, lineHeight: 1, letterSpacing: -4 }}>sebastian</div>
        <div style={{ fontSize: 150, fontWeight: 600, lineHeight: 1, letterSpacing: -4 }}>luna</div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 30,
          borderTop: `2px solid ${COLOR.line}`,
          fontSize: 30,
        }}
      >
        <div>{t("role")}</div>
        <div style={{ color: COLOR.muted }}>sebastianluna.dev</div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Archivo", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
