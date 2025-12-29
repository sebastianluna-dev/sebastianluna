import { useEffect, useRef } from "react";

/**
 * Calls `advance` every `seconds` while the block is on screen. Returns the
 * ref to attach to it.
 *
 * It only runs where the movement makes sense and can be seen: above the phone
 * breakpoint (the drawn browser has no chrome on the phone), on a visible tab
 * of a real browser, and never for whoever asks for reduced motion. Pass
 * `active: false` to hold it — a reader who picks a tab, or points at the
 * block, keeps what they are looking at.
 */
export function useRotation<T extends HTMLElement>(
  advance: () => void,
  seconds: number,
  active: boolean,
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);
  // Kept in a ref so a new closure every render does not restart the clock.
  const latest = useRef(advance);
  useEffect(() => {
    latest.current = advance;
  });

  useEffect(() => {
    const element = ref.current;
    if (!active || !element || typeof IntersectionObserver === "undefined") return;

    const wide = window.matchMedia("(min-width: 768px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    const update = () => {
      clearInterval(timer);
      timer = undefined;
      if (onScreen && wide.matches && !still.matches && !document.hidden) {
        timer = setInterval(() => latest.current(), seconds * 1000);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        update();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    wide.addEventListener("change", update);
    still.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);

    return () => {
      clearInterval(timer);
      observer.disconnect();
      wide.removeEventListener("change", update);
      still.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [active, seconds]);

  return ref;
}
