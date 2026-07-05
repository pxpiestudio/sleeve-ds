import type { ReactNode } from "react";

import { Mark } from "./mark";
import { T } from "./tokens";

/** Title font size steps down as the label gets longer, so short names like
 * "Card" stay big and bold while longer ones like "Internationalization"
 * still fit the 1200px canvas on one line. */
function titleSize(title: string) {
  if (title.length <= 8) return 76;
  if (title.length <= 14) return 64;
  if (title.length <= 20) return 52;
  return 44;
}

/**
 * Shared 1200x630 OG canvas: brand chrome (mark, wordmark, brand rule) on
 * the left with the page's eyebrow/title/description, and a bordered
 * preview panel on the right holding a stylized mock of the page's content.
 */
export function OgChrome({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        position: "relative",
        backgroundColor: T.bg,
        backgroundImage: `linear-gradient(135deg, ${T.bg} 0%, #14172b 55%, #1c1030 100%)`,
        fontFamily: "Geist",
      }}
    >
      {/* Soft brand-color corner glow, faked without filter/blur support. */}
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -160,
          width: 560,
          height: 560,
          borderRadius: 9999,
          display: "flex",
          backgroundImage: `linear-gradient(135deg, ${T.magenta}, ${T.purple})`,
          opacity: 0.25,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "row",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingRight: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
            <Mark width={28} />
            <span style={{ display: "flex", fontFamily: "Geist", fontWeight: 500, fontSize: 22, color: T.muted }}>
              Sleeve System
            </span>
          </div>

          <span
            style={{
              display: "flex",
              fontFamily: "Geist",
              fontWeight: 500,
              fontSize: 20,
              color: T.accentText,
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 16,
            }}
          >
            {eyebrow}
          </span>

          <div
            style={{
              display: "flex",
              fontFamily: "Saira",
              fontWeight: 700,
              fontSize: titleSize(title),
              color: T.text,
              lineHeight: 1.05,
              marginBottom: 22,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Geist",
              fontWeight: 400,
              fontSize: 26,
              color: T.muted,
              lineHeight: 1.45,
              maxWidth: 600,
            }}
          >
            {description}
          </div>
        </div>

        <div style={{ width: 440, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              width: "100%",
              minHeight: 320,
              borderRadius: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: T.surface2,
              border: `1px solid ${T.borderStrong}`,
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
              padding: 36,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 8,
          display: "flex",
          backgroundImage: `linear-gradient(90deg, ${T.magenta}, ${T.purple})`,
        }}
      />
    </div>
  );
}
