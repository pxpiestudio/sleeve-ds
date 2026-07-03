"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { InboxRow } from "@/components/dc/inbox-row";
import { ProductCard } from "@/components/dc/product-card";
import { QtyControl } from "@/components/dc/qty-control";
import { RoleSwitcher, type Role } from "@/components/dc/role-switcher";

/**
 * Stateful demos for the documentation pages. Pages stay Server Components
 * (so they can export `metadata`); anything that needs local state lives
 * here behind "use client".
 */

/* ── Quantity control: controlled usage with a live readout ── */
export function ControlledQtyDemo() {
  const [qty, setQty] = React.useState(2);
  return (
    <div className="ds-row" style={{ gap: 16 }}>
      <QtyControl value={qty} onValueChange={setQty} max={8} />
      <span style={{ fontSize: 13, color: "var(--muted)" }}>
        Subtotal: <strong style={{ color: "var(--text)" }}>${(qty * 44.5).toFixed(2)}</strong>{" "}
        — {qty} × $44.50, max 8
      </span>
    </div>
  );
}

/* ── Role switcher: controlled usage with a live readout ── */
export function ControlledRoleDemo() {
  const [role, setRole] = React.useState<Role>("seller");
  return (
    <div className="ds-row" style={{ gap: 16 }}>
      <RoleSwitcher value={role} onValueChange={setRole} />
      <span style={{ fontSize: 13, color: "var(--muted)" }}>
        Viewing the <strong style={{ color: "var(--text)" }}>{role}</strong> dashboard
      </span>
    </div>
  );
}

/* ── Product card: favorite toggling ── */
export function FavoriteProductDemo() {
  const [favorited, setFavorited] = React.useState(false);
  return (
    <div style={{ maxWidth: 236 }}>
      <ProductCard
        hue={8}
        rarity="Special"
        artLabel="151 · 199/165"
        name="Charizard ex"
        meta="151 · 199/165"
        price="$412.50"
        listings="41 listings"
        delta={{ dir: "up", value: "6.2%" }}
        favorited={favorited}
        onToggleFavorite={() => setFavorited((f) => !f)}
      />
    </div>
  );
}

/* ── Inbox: seller sold tab with bulk select ── */
export function SellingInboxDemo() {
  const [selected, setSelected] = React.useState(true);
  return (
    <div className="demo-inbox">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 14px",
          background: "var(--surface-2)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            background: "var(--accent)",
            display: "grid",
            placeItems: "center",
            fontSize: 9,
            color: "#fff",
            fontWeight: 800,
          }}
        >
          ✓
        </div>
        <span
          style={{
            fontSize: 11.5,
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
          }}
        >
          Select all · 2 sold
        </span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "var(--font-head)",
              fontWeight: 700,
              fontSize: 12,
              color: "var(--accent-text)",
            }}
          >
            {selected ? "1 selected" : "0 selected"}
          </span>
          <Button size="sm" className="text-[11px]">
            Advance status →
          </Button>
        </div>
      </div>
      <InboxRow
        hue={320}
        title="Hisuian Zoroark VSTAR"
        subtitle="Lost Origin"
        selected={selected}
        checkbox={{ checked: selected, onChange: setSelected }}
        trailing={
          <button
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 700,
              padding: "5px 10px",
              borderRadius: 8,
              cursor: "pointer",
              color: "var(--amber-text)",
              background: "color-mix(in oklch,#f0a030 14%,transparent)",
              border: "none",
              whiteSpace: "nowrap",
            }}
          >
            💳 Paid →
          </button>
        }
      />
    </div>
  );
}
