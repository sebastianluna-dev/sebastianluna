"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { useRotation } from "@/hooks/use-rotation.hook";
import "./browser-frame.comp.css";

/** Seconds a tab stays open before the window turns to the next one. */
const TURN_EVERY = 6;

export interface BrowserView {
  /** Tab title. */
  tab: string;
  /** What the address bar shows while the tab is open. */
  url: string;
  /** The capture the tab opens. */
  content: ReactNode;
}

interface BrowserFrameProps {
  /** Views of the window; the first one is open to begin with. */
  views: readonly BrowserView[];
  /** Names the tab strip for readers, when there is more than one tab. */
  label: string;
}

// A browser window drawn in CSS around a screenshot: traffic lights, tabs and
// an address bar. With a single view the whole chrome is decorative and hidden
// from readers; with several the tabs are real buttons that swap the capture
// and the address, and the window turns to the next tab on its own every few
// seconds, fading one capture into the other. It holds still while the reader
// points at it, and stops for good once they pick a tab themselves. The phone
// does not draw the chrome, so there it always shows the first view.
export function BrowserFrame({ views, label }: BrowserFrameProps) {
  const [open, setOpen] = useState(0);
  const [held, setHeld] = useState(false);
  const [paused, setPaused] = useState(false);
  const id = useId();
  const switchable = views.length > 1;
  const frame = useRotation<HTMLDivElement>(
    () => setOpen((current) => (current + 1) % views.length),
    TURN_EVERY,
    switchable && !held && !paused,
  );

  function pick(index: number) {
    setOpen(index);
    setHeld(true);
  }

  // Left and right walk the tabs, as in a real browser; the focus follows.
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const next = (open + step + views.length) % views.length;
    pick(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }

  return (
    <div
      className="browser-frame"
      ref={frame}
      onMouseEnter={switchable ? () => setPaused(true) : undefined}
      onMouseLeave={switchable ? () => setPaused(false) : undefined}
      onFocus={switchable ? () => setPaused(true) : undefined}
      onBlur={switchable ? () => setPaused(false) : undefined}
    >
      <div className="browser-frame__chrome" aria-hidden={switchable ? undefined : true}>
        <div className="browser-frame__tabs">
          <span className="browser-frame__lights" aria-hidden="true">
            <i className="browser-frame__light browser-frame__light_color_red" />
            <i className="browser-frame__light browser-frame__light_color_yellow" />
            <i className="browser-frame__light browser-frame__light_color_green" />
          </span>
          <div
            className="browser-frame__strip"
            role={switchable ? "tablist" : undefined}
            aria-label={switchable ? label : undefined}
          >
            {views.map((item, index) => {
              const active = index === open;
              const className = ["browser-frame__tab", active && "browser-frame__tab_active"].filter(Boolean).join(" ");
              const title = (
                <>
                  <i className="browser-frame__favicon" aria-hidden="true" />
                  <span className="browser-frame__tab-title">{item.tab}</span>
                </>
              );

              return switchable ? (
                <button
                  key={item.tab}
                  type="button"
                  id={`${id}-tab-${index}`}
                  className={`${className} browser-frame__tab_switchable`}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`${id}-view-${index}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => pick(index)}
                  onKeyDown={onKeyDown}
                >
                  {title}
                </button>
              ) : (
                <span key={item.tab} className={className}>
                  {title}
                </span>
              );
            })}
          </div>
        </div>
        <div className="browser-frame__toolbar" aria-hidden="true">
          <i className="browser-frame__dot" />
          <span className="browser-frame__address">
            <i className="browser-frame__dot browser-frame__dot_size_sm" />
            {views[open].url}
          </span>
          <i className="browser-frame__dot" />
        </div>
      </div>
      {/* Every capture is drawn, one over the other, so the open one can fade
          in over the one it replaces. */}
      <div className="browser-frame__viewport">
        {views.map((item, index) => {
          const active = index === open;

          return (
            <div
              key={item.tab}
              id={`${id}-view-${index}`}
              className={["browser-frame__view", active && "browser-frame__view_open"].filter(Boolean).join(" ")}
              role={switchable ? "tabpanel" : undefined}
              aria-labelledby={switchable ? `${id}-tab-${index}` : undefined}
              aria-hidden={switchable && !active ? true : undefined}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
