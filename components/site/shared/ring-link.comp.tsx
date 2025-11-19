import "./ring-link.comp.css";

interface RingLinkProps {
  href: string;
  /** Two-letter monospace mark inside the ring: "in", "gh". */
  mark: string;
  label: string;
  className?: string;
}

// Round outlined link with a two-letter mark: the LinkedIn and GitHub links
// of the hero. The mark is decorative; the label names the destination.
export function RingLink({ href, mark, label, className }: RingLinkProps) {
  return (
    <a
      className={["ring-link", className].filter(Boolean).join(" ")}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{mark}</span>
    </a>
  );
}
