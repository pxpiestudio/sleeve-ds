"use client";

import * as React from "react";

import { Navbar } from "@/components/dc/navbar";
import { ProductCard } from "@/components/dc/product-card";

/**
 * A representative "screen" of the platform — reused verbatim (not redrawn)
 * for both the light and dark layers below, so the comparison never drifts
 * from the real components it demonstrates.
 */
function PlatformScreen() {
  return (
    <div className="theme-compare-screen">
      <Navbar state="buyer" cartCount={3} />
      <div className="ds-grid-cards theme-compare-grid">
        <ProductCard
          hue={210}
          name="Skyfall Ranger"
          meta="Foil · #114/198"
          rarity="Rare"
          price="$42.00"
          listings="12 listings"
          delta={{ dir: "up", value: "4.2%" }}
        />
        <ProductCard
          hue={320}
          name="Ember Warden"
          meta="Holo · #087/198"
          rarity="Ultra rare"
          price="$118.50"
          listings="6 listings"
          delta={{ dir: "down", value: "1.1%" }}
        />
        <ProductCard
          hue={150}
          name="Tideglass Sentinel"
          meta="Standard · #033/198"
          rarity="Common"
          price="$3.75"
          listings="41 listings"
        />
      </div>
    </div>
  );
}

/**
 * Before/after reveal — the same platform screen rendered twice, pinned to
 * opposite themes with `.theme-force-light` / `.theme-force-dark` (works
 * regardless of the ambient site theme) and wiped against each other by a
 * drag handle. A native `<input type="range">` drives it so it stays
 * keyboard- and screen-reader-operable; only its thumb is visible.
 */
export function ThemeCompareSlider() {
  const [percent, setPercent] = React.useState(50);

  return (
    <div className="theme-compare">
      <div className="theme-compare-frame">
        <div className="theme-compare-layer theme-force-light">
          <PlatformScreen />
        </div>
        <div
          className="theme-compare-layer theme-force-dark"
          style={{ clipPath: `inset(0 0 0 ${percent}%)` }}
        >
          <PlatformScreen />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          className="theme-compare-input"
          aria-label="Reveal light or dark theme"
        />
        <div className="theme-compare-divider" style={{ left: `${percent}%` }} aria-hidden="true">
          <span className="theme-compare-handle">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6 9 12l6 6" />
            </svg>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </span>
        </div>
        <span className="theme-compare-tag left">Light</span>
        <span className="theme-compare-tag right">Dark</span>
      </div>
    </div>
  );
}
