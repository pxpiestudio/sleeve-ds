import * as React from "react";

/**
 * Visual building blocks for the Brand & logo page's construction /
 * clear-space / scalability / incorrect-usage subsections. Kept separate
 * from foundation-bits.tsx because they're logo-specific and reused twice
 * (once for the core logo, once for the logomark).
 */

/* ── Anatomy: the assembled lockup, then the two source pieces it's built
   from — word-logo.svg (wordmark) and deckcenter-mark.svg (deckbox mark). ── */
export function LogoAnatomy() {
  return (
    <div>
      <div className="logo-anatomy-parts">
        <div className="logo-anatomy-part">
          <div className="logo-anatomy-part-canvas">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/word-logo.svg" alt="" style={{ height: 110 }} />
          </div>
          <div className="logo-anatomy-part-label">Wordmark</div>
          <div className="logo-anatomy-part-sub">“Deckcenter”, set in the brand letterforms</div>
        </div>
        <div className="logo-anatomy-plus" aria-hidden="true">
          +
        </div>
        <div className="logo-anatomy-part">
          <div className="logo-anatomy-part-canvas">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/deckcenter-mark.svg" alt="" style={{ height: 110 }} />
          </div>
          <div className="logo-anatomy-part-label">Deckbox mark</div>
          <div className="logo-anatomy-part-sub">The icon — never used to spell the name</div>
        </div>
      </div>
    </div>
  );
}

/* ── Clear space: padding = ¼ the rendered height, on all four sides ── */
export function ClearSpaceDiagram({
  src,
  imgHeight,
  background = "var(--bg-2)",
}: {
  src: string;
  imgHeight: number;
  background?: string;
}) {
  const x = Math.round(imgHeight / 4);
  return (
    <div className="logo-clearspace">
      <div className="logo-clearspace-box" style={{ padding: x, background }}>
        <span className="logo-clearspace-tick top" aria-hidden="true">
          <span>X</span>
        </span>
        <span className="logo-clearspace-tick left" aria-hidden="true">
          <span>X</span>
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ height: imgHeight, width: "auto" }} />
      </div>
      <p className="logo-clearspace-caption">
        X = ¼ of the logo&apos;s rendered height — {imgHeight}px tall here, so{" "}
        {x}px of clear space on every side.
      </p>
    </div>
  );
}

/* ── Scalability: the same asset at several sizes, percent-of-minimum
   labeled and baseline-aligned — no frame around the artwork itself. ── */
export type ScaleStep = { height: number; min?: boolean };

export function ScaleRow({ src, steps }: { src: string; steps: ScaleStep[] }) {
  const base = steps.find((s) => s.min)?.height ?? steps[0].height;
  return (
    <div className="logo-scale-row">
      {steps.map((s) => (
        <div key={s.height} className="logo-scale-item">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" style={{ height: s.height, width: "auto" }} />
          <hr className="logo-scale-rule" />
          <div className="logo-scale-label">
            {s.min ? (
              <>
                Minimum size <span aria-hidden="true">→</span> {s.height}px
              </>
            ) : (
              `${Math.round((s.height / base) * 100)}%`
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Incorrect usage: real assets, transformed to demonstrate the violation ──
   alt="" throughout — the figcaption already states the rule in words, so a
   descriptive alt would just repeat it. */
export type IncorrectUsageItem = {
  caption: string;
  src: string;
  imgHeight?: number;
  imgStyle?: React.CSSProperties;
  frameStyle?: React.CSSProperties;
};

export function IncorrectUsageGrid({ items }: { items: IncorrectUsageItem[] }) {
  return (
    <div className="logo-incorrect-grid">
      {items.map((it) => (
        <figure key={it.caption} className="logo-incorrect-tile">
          <div className="logo-incorrect-frame" style={it.frameStyle}>
            <span className="logo-incorrect-badge" aria-hidden="true">
              ✕
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={it.src}
              alt=""
              style={{ height: it.imgHeight ?? 64, width: "auto", ...it.imgStyle }}
            />
          </div>
          <figcaption>{it.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
