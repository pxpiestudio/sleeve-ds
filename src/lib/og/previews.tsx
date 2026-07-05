import type { ReactNode } from "react";

import { Mark } from "./mark";
import { T } from "./tokens";

/* ── Small shared building blocks ─────────────────────────────────────────
   Satori (next/og's renderer) has no CSSOM, so every value below is a
   literal from tokens.ts rather than a Tailwind class or CSS var.
--------------------------------------------------------------------------- */
function Pill({
  children,
  bg = "rgba(232, 237, 249, 0.08)",
  color = T.text,
}: {
  children: ReactNode;
  bg?: string;
  color?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "7px 14px", borderRadius: 999, backgroundColor: bg }}>
      <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 13, color }}>{children}</span>
    </div>
  );
}

function Segmented({ options, activeIndex }: { options: string[]; activeIndex: number }) {
  return (
    <div style={{ display: "flex", borderRadius: 999, backgroundColor: T.surface, border: `1px solid ${T.border}`, padding: 4 }}>
      {options.map((label, i) => (
        <div
          key={label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 16px",
            borderRadius: 999,
            backgroundColor: i === activeIndex ? T.magenta : "transparent",
          }}
        >
          <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 13, color: i === activeIndex ? "#ffffff" : T.muted }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

const STROKE_ICONS: Record<string, string[]> = {
  bolt: ["M13 2 4.5 13.5H11l-1 8.5L18.5 10H12z"],
  heart: [
    "M12 20s-7-4.6-9.3-9C1.2 8 2.6 4.5 6 4.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.4 0 4.8 3.5 3.3 6.5C19 15.4 12 20 12 20z",
  ],
  shield: ["M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z", "m9 12 2 2 4-4"],
  tag: ["M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9z", "M7.5 7.5h.01"],
  cart: ["M3 4h2l2 12h11l2-8H7", "M9 20a1 1 0 1 0 0 .01M18 20a1 1 0 1 0 0 .01"],
  sun: ["M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z", "M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 4 4M20 20l-1-1M19 5l1-1M4 20l1-1"],
  search: ["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z", "m20 20-3.2-3.2"],
  check: ["m4 12 5 5L20 6"],
};

function StrokeIcon({ name, size = 28, color = T.lavender, sw = 1.8 }: { name: keyof typeof STROKE_ICONS; size?: number; color?: string; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "flex" }}>
      {STROKE_ICONS[name].map((d, i) => (
        <path key={i} d={d} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/* ── Overview ─────────────────────────────────────────────────────────── */
export function IntroductionPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      <Mark width={88} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={{ display: "flex", fontFamily: "Saira", fontWeight: 700, fontSize: 32, color: T.text }}>Sleeve System</span>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 15, color: T.muted }}>Deckcenter marketplace</span>
      </div>
    </div>
  );
}

export function GettingStartedPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", borderRadius: 16, backgroundColor: T.navy, border: `1px solid ${T.border}`, padding: 22, gap: 14 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, backgroundColor: T.danger }} />
        <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, backgroundColor: T.amber }} />
        <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, backgroundColor: T.success }} />
      </div>
      <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 16, color: T.lavender }}>$ npm install</span>
      <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 16, color: T.accentText }}>@pxpiestudio/sleeve-ds</span>
    </div>
  );
}

/* ── Foundations ──────────────────────────────────────────────────────── */
export function BrandPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 180, height: 180, border: `2px dashed ${T.borderStrong}`, borderRadius: 20 }}>
      <Mark width={68} />
    </div>
  );
}

const COLOR_SWATCHES: [string, string][] = [
  ["Navy", T.navy],
  ["Magenta", T.magenta],
  ["Purple", T.purple],
  ["Lavender", T.lavender],
  ["Success", T.success],
  ["Danger", T.danger],
  ["Amber", T.amber],
  ["Info", T.info],
];

export function ColorPreview() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: 320, gap: 14 }}>
      {COLOR_SWATCHES.map(([name, color]) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 66 }}>
          <div style={{ display: "flex", width: 66, height: 44, borderRadius: 10, backgroundColor: color, border: name === "Lavender" ? `1px solid ${T.borderStrong}` : "1px solid transparent" }} />
          <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 12, color: T.muted }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

export function TypographyPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, transform: "scale(1.3)" }}>
      <span style={{ display: "flex", fontFamily: "Saira", fontWeight: 700, fontSize: 62, color: T.text, lineHeight: 1 }}>Aa</span>
      <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 32, color: T.text, lineHeight: 1 }}>Aa</span>
      <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 19, color: T.muted, lineHeight: 1 }}>Aa</span>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <Pill>Saira</Pill>
        <Pill>Geist</Pill>
      </div>
    </div>
  );
}

const SPACING_STEPS = [4, 8, 12, 16, 24, 32];

export function SpacingPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
      {SPACING_STEPS.map((s) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", width: s * 4, height: 14, borderRadius: 4, backgroundColor: T.magenta }} />
          <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 13, color: T.muted }}>{s}px</span>
        </div>
      ))}
    </div>
  );
}

export function ElevationPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 28 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", width: 104, height: 72, borderRadius: 14, backgroundColor: T.surface, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)" }} />
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 13, color: T.muted }}>shadow</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", width: 104, height: 72, borderRadius: 14, backgroundColor: T.surface, boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)" }} />
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 13, color: T.muted }}>shadow-lg</span>
      </div>
    </div>
  );
}

const DURATIONS: [string, number][] = [
  ["fast", 56],
  ["base", 96],
  ["slow", 144],
  ["slower", 208],
];

export function MotionPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      {DURATIONS.map(([label, w]) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", width: w, height: 10, borderRadius: 999, backgroundImage: `linear-gradient(90deg, ${T.magenta}, ${T.purple})` }} />
          <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 13, color: T.muted }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

const ICON_TILE_NAMES: (keyof typeof STROKE_ICONS)[] = ["bolt", "heart", "shield", "tag", "cart", "sun"];

export function IconsPreview() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: 260, gap: 18, justifyContent: "center" }}>
      {ICON_TILE_NAMES.map((name) => (
        <div key={name} style={{ display: "flex", width: 60, height: 60, borderRadius: 14, backgroundColor: T.surface, border: `1px solid ${T.border}`, alignItems: "center", justifyContent: "center" }}>
          <StrokeIcon name={name} />
        </div>
      ))}
    </div>
  );
}

export function AccessibilityPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 96, height: 96, borderRadius: 9999, backgroundColor: T.surface, border: `2px solid ${T.success}` }}>
        <StrokeIcon name="check" size={40} color={T.success} sw={2.4} />
      </div>
      <span style={{ display: "flex", fontFamily: "Saira", fontWeight: 700, fontSize: 22, color: T.text }}>WCAG AA</span>
      <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 14, color: T.muted }}>4.5:1 minimum contrast</span>
    </div>
  );
}

/* ── Components ───────────────────────────────────────────────────────── */
const OVERVIEW_TILES = [T.magenta, T.purple, T.info, T.success, T.amber, T.danger, T.muted, T.lavender];

export function ComponentsOverviewPreview() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: 280, gap: 12, justifyContent: "center" }}>
      {OVERVIEW_TILES.map((c, i) => (
        <div key={i} style={{ display: "flex", width: 56, height: 56, borderRadius: 12, backgroundColor: c, opacity: 0.92 }} />
      ))}
    </div>
  );
}

export function ButtonPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: T.magenta, borderRadius: 11, padding: "12px 22px", boxShadow: "0 8px 22px rgba(222, 14, 127, 0.35)" }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 15, color: "#ffffff" }}>Start browsing</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: T.surface, border: `1px solid ${T.borderStrong}`, borderRadius: 11, padding: "12px 22px" }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 15, color: T.text }}>Browse sets</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 22px" }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 15, color: T.text }}>Sign in</span>
      </div>
    </div>
  );
}

export function BadgePreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      <Pill bg="rgba(31, 173, 102, 0.16)" color={T.successText}>Grade A</Pill>
      <Pill bg="rgba(138, 43, 184, 0.2)" color={T.purpleText}>Holo Rare</Pill>
      <Pill bg="rgba(222, 14, 127, 0.16)" color={T.accentText}>New</Pill>
    </div>
  );
}

const STATUS_ROWS: [string, string, string][] = [
  ["Pending", T.amber, T.amberText],
  ["Confirmed", T.info, T.infoText],
  ["Delivered", T.success, T.successText],
];

export function StatusBadgePreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {STATUS_ROWS.map(([label, dot, color]) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 14px", borderRadius: 999, backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", width: 8, height: 8, borderRadius: 9999, backgroundColor: dot }} />
          <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 14, color }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function CardPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 260, borderRadius: 16, backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", padding: "14px 16px", borderBottom: `1px solid ${T.border}` }}>
        <span style={{ display: "flex", fontFamily: "Saira", fontWeight: 700, fontSize: 16, color: T.text }}>Charizard ex</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 16 }}>
        <div style={{ display: "flex", width: "100%", height: 10, borderRadius: 4, backgroundColor: T.surface2 }} />
        <div style={{ display: "flex", width: "70%", height: 10, borderRadius: 4, backgroundColor: T.surface2 }} />
      </div>
      <div style={{ display: "flex", padding: "12px 16px", borderTop: `1px solid ${T.border}`, justifyContent: "flex-end" }}>
        <div style={{ display: "flex", backgroundColor: T.magenta, borderRadius: 8, padding: "6px 14px" }}>
          <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 13, color: "#ffffff" }}>Buy</span>
        </div>
      </div>
    </div>
  );
}

export function InputPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 280 }}>
      <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 14, color: T.muted }}>Email address</span>
      <div style={{ display: "flex", alignItems: "center", width: "100%", height: 44, borderRadius: 11, backgroundColor: T.surface, border: `1.5px solid ${T.magenta}`, boxShadow: "0 0 0 3px rgba(222, 14, 127, 0.22)", padding: "0 14px" }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 15, color: T.text }}>you@example.com</span>
      </div>
    </div>
  );
}

export function SearchBarPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, width: 300, height: 52, borderRadius: 999, backgroundColor: T.surface, border: `1px solid ${T.borderStrong}`, padding: "0 18px" }}>
      <StrokeIcon name="search" size={18} color={T.muted} sw={2} />
      <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 15, color: T.faint }}>Search sets, cards, sellers</span>
    </div>
  );
}

export function QtyControlPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", borderRadius: 11, border: `1px solid ${T.borderStrong}` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, backgroundColor: T.surface }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 18, color: T.text }}>-</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 40, backgroundColor: T.surface2 }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 16, color: T.text }}>2</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, backgroundColor: T.surface }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 18, color: T.text }}>+</span>
      </div>
    </div>
  );
}

export function TogglesPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
      <Segmented options={["Light", "Dark"]} activeIndex={1} />
      <Segmented options={["EN", "ES"]} activeIndex={0} />
      <Segmented options={["Buyer", "Seller"]} activeIndex={1} />
    </div>
  );
}

export function NavbarPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: 340, height: 56, borderRadius: 14, backgroundColor: T.surface, border: `1px solid ${T.border}`, padding: "0 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Mark width={18} />
        <span style={{ display: "flex", fontFamily: "Saira", fontWeight: 700, fontSize: 14, color: T.text }}>Deckcenter</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 12, color: T.muted }}>Browse</span>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 12, color: T.muted }}>Sell</span>
        <div style={{ display: "flex", width: 26, height: 26, borderRadius: 9999, backgroundColor: T.magenta }} />
      </div>
    </div>
  );
}

export function ProductCardPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 180, borderRadius: 16, backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", width: "100%", height: 110, borderRadius: "16px 16px 0 0", backgroundImage: `linear-gradient(135deg, ${T.purple}, ${T.magenta})` }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 14 }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 13, color: T.text }}>Base Set Booster</span>
        <div style={{ display: "flex", backgroundColor: T.surface2, borderRadius: 999, padding: "4px 10px" }}>
          <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 13, color: T.successText }}>$89.00</span>
        </div>
      </div>
    </div>
  );
}

export function CardArtPreview() {
  const hues: [string, string][] = [
    [T.magenta, T.purple],
    [T.info, T.purple],
    [T.success, T.info],
    [T.amber, T.magenta],
  ];
  return (
    <div style={{ display: "flex", gap: 14 }}>
      {hues.map(([a, b], i) => (
        <div key={i} style={{ display: "flex", width: 64, height: 88, borderRadius: 12, backgroundImage: `linear-gradient(160deg, ${a}, ${b})` }} />
      ))}
    </div>
  );
}

const PRICE_ROWS: [string, string, boolean][] = [
  ["TCGplayer", "$42.10", false],
  ["Cardmarket", "$38.50", true],
  ["eBay", "$45.99", false],
];

export function PriceComparisonPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 280 }}>
      {PRICE_ROWS.map(([name, price, best]) => (
        <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 11, backgroundColor: T.surface, border: `1px solid ${best ? T.magenta : T.border}` }}>
          <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 14, color: T.text }}>{name}</span>
          <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 14, color: best ? T.accentText : T.muted }}>{price}</span>
        </div>
      ))}
    </div>
  );
}

export function InboxRowPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: 320, padding: 14, borderRadius: 14, backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", width: 36, height: 36, borderRadius: 9999, backgroundImage: `linear-gradient(135deg, ${T.info}, ${T.purple})` }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 14, color: T.text }}>Order #4821 shipped</span>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 12, color: T.muted }}>2 hours ago</span>
      </div>
      <div style={{ display: "flex", padding: "4px 10px", borderRadius: 999, backgroundColor: "rgba(42, 111, 219, 0.16)" }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 11, color: T.infoText }}>Shipped</span>
      </div>
    </div>
  );
}

/* ── Patterns ─────────────────────────────────────────────────────────── */
const LIFECYCLE_STEPS: [string, string][] = [
  ["Pending", T.amber],
  ["Confirmed", T.info],
  ["Ready", T.purple],
  ["Collected", T.success],
];

export function OrderLifecyclePreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 300, position: "relative" }}>
      <div style={{ position: "absolute", left: 6, top: 14, bottom: 14, width: 2, display: "flex", backgroundColor: T.border }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {LIFECYCLE_STEPS.map(([label, color]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 9999, backgroundColor: color }} />
            <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 15, color: T.text }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThemingPreview() {
  return (
    <div style={{ display: "flex", width: 320, height: 180, borderRadius: 16, border: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: "#f4f6fc", borderRadius: "16px 0 0 16px" }}>
        <div style={{ display: "flex", backgroundColor: T.magenta, borderRadius: 9, padding: "8px 16px" }}>
          <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 12, color: "#ffffff" }}>Buy now</span>
        </div>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 11, color: "#616892" }}>Light</span>
      </div>
      <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: T.bg, borderRadius: "0 16px 16px 0" }}>
        <div style={{ display: "flex", backgroundColor: T.magenta, borderRadius: 9, padding: "8px 16px" }}>
          <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 12, color: "#ffffff" }}>Buy now</span>
        </div>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 11, color: T.muted }}>Dark</span>
      </div>
    </div>
  );
}

export function InternationalizationPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
      <Segmented options={["EN", "ES"]} activeIndex={0} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 17, color: T.text }}>Add to cart</span>
        <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 400, fontSize: 17, color: T.muted }}>Añadir al carrito</span>
      </div>
    </div>
  );
}
