import * as React from "react";

/**
 * Presentational helpers shared by the foundations and patterns pages —
 * ported from the original single-page showcase.
 */

export function Swatch({
  block,
  name,
  token,
  use,
  small,
  blockStyle,
}: {
  block: string;
  name: string;
  token: string;
  use?: string;
  small?: boolean;
  blockStyle?: React.CSSProperties;
}) {
  return (
    <div className="swatch">
      <div className="swatch-block" style={{ background: block, ...blockStyle }} />
      <div className="swatch-body">
        <div className="swatch-name" style={small ? { fontSize: 12 } : undefined}>
          {name}
        </div>
        <div className="swatch-token">{token}</div>
        {use && <div className="swatch-use">{use}</div>}
      </div>
    </div>
  );
}

export function TypeRow({
  children,
  spec,
}: {
  children: React.ReactNode;
  spec: string;
}) {
  return (
    <div className="type-row">
      <span>{children}</span>
      <span className="type-spec">{spec}</span>
    </div>
  );
}

/** Status lifecycle step pill (order-lifecycle pattern page). */
export function Step({
  color,
  textColor,
  children,
}: {
  color: string;
  textColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        borderRadius: 10,
        background: `color-mix(in oklch, ${color} 12%, transparent)`,
      }}
    >
      <span
        style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "block" }}
      />
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 13,
          color: textColor,
        }}
      >
        {children}
      </span>
    </div>
  );
}

export function Connector() {
  return (
    <div
      aria-hidden="true"
      style={{ width: 24, height: 2, background: "var(--border-strong)" }}
    />
  );
}
