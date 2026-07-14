import type { CSSProperties, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GradeBadge, RarityChip, StatusBadge } from "@/components/dc/badges";
import { CardArt } from "@/components/dc/card-art";
import { Icon } from "@/components/dc/icon";
import { SearchBar } from "@/components/dc/search-bar";
import { QtyControl } from "@/components/dc/qty-control";
import { RoleSwitcher } from "@/components/dc/role-switcher";
import { LangToggle } from "@/components/dc/lang-toggle";
import { ProductCard } from "@/components/dc/product-card";
import { PriceComparison } from "@/components/dc/price-comparison";
import { InboxRow } from "@/components/dc/inbox-row";
import { ListingCard } from "@/components/dc/listing-card";
import { ExpansionTile } from "@/components/dc/expansion-tile";
import { SellerCard } from "@/components/dc/seller-card";
import { StatStripe } from "@/components/dc/stat-stripe";
import { SealedProductCard } from "@/components/dc/sealed-card";
import { PlanCard } from "@/components/dc/plan-card";

const fieldLabelStyle: CSSProperties = {
  display: "block",
  fontSize: 10.5,
  fontWeight: 700,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "var(--faint)",
  marginBottom: 8,
  fontFamily: "var(--font-head)",
};

/**
 * Fixed-size "stage" for components too large to render at true size inside
 * a card-sized preview — the real component renders at its natural
 * dimensions, then the whole stage is scaled down and centered, so the
 * miniature is a faithful crop of the real thing rather than a redrawn
 * approximation.
 */
function Stage({
  width,
  scale,
  /** "start" anchors scaling to the top edge instead of the center, so a
   * component taller than the preview box crops its (less essential) bottom
   * instead of losing an equal, visually-jarring slice off both ends. */
  align = "center",
  children,
}: {
  width: number;
  scale: number;
  align?: "center" | "start";
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width,
        alignSelf: align === "start" ? "flex-start" : undefined,
        transform: `scale(${scale})`,
        transformOrigin: align === "start" ? "50% 0%" : "50% 50%",
      }}
    >
      {children}
    </div>
  );
}

/**
 * One miniature per Components-overview tile, keyed by nav href. Renders the
 * real component (not a redrawn icon) so the preview never drifts from the
 * component it represents. Callers wrap this in an `inert` container — real
 * buttons/inputs/toggles can't validly nest inside the tile's own <a>.
 */
export const COMPONENT_PREVIEWS: Record<string, ReactNode> = {
  "/components/button": (
    <div className="ds-row" style={{ gap: 8, flexWrap: "nowrap" }}>
      <Button size="sm">Add to cart</Button>
      <Button size="sm" variant="ghost">
        Details
      </Button>
    </div>
  ),

  "/components/badge": (
    <div className="ds-row" style={{ gap: 8, flexWrap: "nowrap" }}>
      <Badge variant="accent">12 new</Badge>
      <GradeBadge graded>PSA 10</GradeBadge>
      <RarityChip>Special</RarityChip>
    </div>
  ),

  "/components/status-badge": (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
      <StatusBadge tone="pending">Pending</StatusBadge>
      <StatusBadge tone="delivered">Delivered</StatusBadge>
    </div>
  ),

  "/components/card": (
    <Card style={{ width: 230 }}>
      <CardHeader>
        <CardTitle style={{ fontSize: 14 }}>Seller payout</CardTitle>
        <CardDescription style={{ fontSize: 11.5 }}>Transferred after pickup.</CardDescription>
      </CardHeader>
    </Card>
  ),

  "/components/input": (
    <div style={{ width: 230 }}>
      <label htmlFor="preview-input-email" style={fieldLabelStyle}>
        Email
      </label>
      <Input id="preview-input-email" placeholder="you@email.com" readOnly />
    </div>
  ),

  "/components/search-bar": <SearchBar className="max-w-[230px]" />,

  "/components/qty-control": <QtyControl defaultValue={2} min={1} max={9} />,

  "/components/toggles": (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
      <RoleSwitcher defaultValue="seller" />
      <LangToggle />
    </div>
  ),

  // A condensed summary rather than the real <Navbar> — the real component's
  // mobile drawer is `position: fixed`, and scaling an ancestor with
  // `transform` (the Stage technique) retargets fixed-position containing
  // blocks to that ancestor, which pushed the (closed but still `inert`)
  // drawer into view instead of off-screen. This mockup reuses the same
  // tokens/anatomy (navy utility strip, logo, cart, accent CTA) without the
  // interactive parts that trigger the bug.
  "/components/navbar": (
    <div
      style={{
        width: 232,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <div
        style={{
          height: 18,
          background: "var(--navy-surface)",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
        }}
      >
        <span style={{ fontSize: 8.5, fontWeight: 700, color: "var(--on-navy)", opacity: 0.6 }}>
          How it works
        </span>
      </div>
      <div
        style={{
          height: 42,
          background: "var(--surface)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 12px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/deckcenter-logo.svg" alt="" style={{ height: 18, width: "auto" }} />
        <span style={{ flex: 1 }} />
        <Icon name="cart" size={14} />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            fontWeight: 700,
            color: "#fff",
            background: "var(--accent)",
            padding: "5px 8px",
            borderRadius: 7,
            whiteSpace: "nowrap",
          }}
        >
          Sell cards
        </span>
      </div>
    </div>
  ),

  "/components/product-card": (
    <Stage width={220} scale={0.453} align="start">
      <ProductCard
        hue={8}
        rarity="Special"
        artLabel="151 · 199/165"
        name="Charizard ex"
        meta="151 · 199/165"
        price="$412.50"
        listings="41 listings"
        delta={{ dir: "up", value: "6.2%" }}
      />
    </Stage>
  ),

  "/components/card-art": <CardArt hue={320} label="151 · 199/165" style={{ width: 92, height: 129 }} />,

  "/components/price-comparison": (
    <PriceComparison
      stores={[
        { store: "TCGplayer", logo: { color: "#2563eb", glyph: "T" }, price: "$458.00", over: "+$45.50", marketAvg: true },
      ]}
    />
  ),

  "/components/inbox-row": (
    <Stage width={340} scale={0.72}>
      <div className="demo-inbox">
        <InboxRow
          hue={22}
          title="Charizard ex"
          subtitle="Obsidian Flames"
          status={<StatusBadge tone="delivered">Collected</StatusBadge>}
          trailing={
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--accent-text)" }}>
              $89.99
            </div>
          }
        />
        <InboxRow
          hue={260}
          title="Umbreon VMAX"
          subtitle="Evolving Skies"
          status={<StatusBadge tone="pending">Pending</StatusBadge>}
          trailing={
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--accent-text)" }}>
              $44.50
            </div>
          }
        />
      </div>
    </Stage>
  ),

  "/components/listing-card": (
    <Stage width={360} scale={0.53}>
      <ListingCard
        hue={8}
        title="Charizard ex — 151"
        grade="PSA 10"
        condition="Gem Mint"
        seller={{ name: "VaultCards", verified: true, rating: "4.98" }}
        price="$412.50"
        shipping="Ships Today"
      />
    </Stage>
  ),

  "/components/expansion-tile": (
    <ExpansionTile hue={8} symbol="✦" name="151" meta="MEW · 2023" count="4 cards" active />
  ),

  "/components/seller-card": (
    <Stage width={180} scale={0.75} align="start">
      <div style={{ paddingTop: 16 }}>
        <SellerCard
          hue={330}
          name="VaultCards"
          handle="vaultcards"
          badge="Power Seller"
          stats={{ rating: "4.98", reviews: "3.1k", items: "4.2k" }}
        />
      </div>
    </Stage>
  ),

  "/components/stat-stripe": (
    <Stage width={640} scale={0.37}>
      <StatStripe
        cells={[
          { value: "2,310", label: "Cards sold · 24h" },
          { value: "14k", label: "Live listings", accent: true },
          { value: "98%", label: "Verified sellers" },
          { value: "4.9★", label: "Avg rating" },
        ]}
      />
    </Stage>
  ),

  "/components/sealed-product-card": (
    <SealedProductCard hue={48} type="ETB" name="Surging Sparks" style={{ width: 92 }} />
  ),

  "/components/plan-card": (
    <Stage width={220} scale={0.5} align="start">
      {/* PlanCard's "pro" badge is `position: absolute; top: -14px`, floating
       * above the card's own box — this padding gives it room so align="start"
       * doesn't clip it against the tile's top edge. */}
      <div style={{ paddingTop: 30 }}>
        <PlanCard
          name="Seller Pro"
          tagline="For power sellers moving real volume."
          benefits={["Bulk listing tools", "Verified seller badge"]}
          price={{ amount: "$19", period: "/ mo" }}
          cta={{ label: "Upgrade to Pro", variant: "primary" }}
          pro
          badge="Popular"
        />
      </div>
    </Stage>
  ),
};

export function ComponentPreview({ href }: { href: string }) {
  const preview = COMPONENT_PREVIEWS[href];
  if (!preview) return null;
  return (
    <div className="doc-tile-preview" inert>
      {preview}
    </div>
  );
}
