import type { ReactNode } from "react";
import "./pill-link.comp.css";

interface PillLinkProps {
  href: string;
  children: ReactNode;
  /** Glyph inside the round badge: an arrow down for files, up-right for sites. */
  icon: "download" | "external";
  /** `ink` is the default black pill; `paper` the light one on the amber card. */
  variant?: "ink" | "paper";
  size?: "md" | "sm";
  /** Adds the target and rel of a link that leaves the site. */
  external?: boolean;
  /** Saves the file instead of opening it; the name comes from the URL. */
  download?: boolean;
  className?: string;
}

const GLYPHS = { download: "↓", external: "↗" } as const;

// The pill with a round badge at its end: "Descargar CV", "Visitar el sitio".
export function PillLink({
  href,
  children,
  icon,
  variant = "ink",
  size = "md",
  external,
  download,
  className,
}: PillLinkProps) {
  const classes = ["pill-link", `pill-link_variant_${variant}`, `pill-link_size_${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      className={classes}
      href={href}
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="pill-link__label">{children}</span>
      <span className="pill-link__badge" aria-hidden="true">
        {GLYPHS[icon]}
      </span>
    </a>
  );
}
