"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal.hook";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to hold before this block starts, so a list comes in one by one. */
  delay?: number;
  /** The tag to render; `li` when the block is an item of a list. */
  as?: "div" | "li";
}

// Wraps a block so it fades in the first time it scrolls into view. Only the
// wrapper is a Client Component; what it wraps stays a Server Component.
export function Reveal({ children, className, delay, as: Tag = "div" }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  const classes = ["reveal", className ?? ""].filter(Boolean).join(" ");
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref as React.RefObject<never>} className={classes} style={style}>
      {children}
    </Tag>
  );
}
