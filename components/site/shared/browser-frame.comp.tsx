import type { ReactNode } from "react";
import "./browser-frame.comp.css";

interface BrowserFrameProps {
  /** Tab titles; the first one is the active tab. */
  tabs: readonly string[];
  /** What the address bar shows. */
  url: string;
  children: ReactNode;
}

// A browser window drawn in CSS around a screenshot: traffic lights, tabs and
// an address bar. Decorative, so the whole chrome is hidden from readers; on
// the phone it is not drawn at all.
export function BrowserFrame({ tabs, url, children }: BrowserFrameProps) {
  return (
    <div className="browser-frame">
      <div className="browser-frame__chrome" aria-hidden="true">
        <div className="browser-frame__tabs">
          <span className="browser-frame__lights">
            <i className="browser-frame__light browser-frame__light_color_red" />
            <i className="browser-frame__light browser-frame__light_color_yellow" />
            <i className="browser-frame__light browser-frame__light_color_green" />
          </span>
          {tabs.map((tab, index) => (
            <span
              key={tab}
              className={["browser-frame__tab", index === 0 && "browser-frame__tab_active"].filter(Boolean).join(" ")}
            >
              <i className="browser-frame__favicon" />
              <span className="browser-frame__tab-title">{tab}</span>
            </span>
          ))}
        </div>
        <div className="browser-frame__toolbar">
          <i className="browser-frame__dot" />
          <span className="browser-frame__address">
            <i className="browser-frame__dot browser-frame__dot_size_sm" />
            {url}
          </span>
          <i className="browser-frame__dot" />
        </div>
      </div>
      <div className="browser-frame__viewport">{children}</div>
    </div>
  );
}
