import * as React from "react";

import { cn } from "@/lib/utils";

type SealedProductCardProps = React.ComponentProps<"div"> & {
  /** Hue 0–360 — seeds the metallic-box gradient. */
  hue?: number;
  /** Product type, e.g. "ETB" or "Box". */
  type: string;
  name: string;
};

/**
 * `.tsealed` placeholder for sealed product (booster boxes, ETBs) — a
 * metallic hue-tinted gradient with diagonal foil stripes and a shine sweep,
 * the sealed-product counterpart to `CardArt`'s single-card `.tcard`.
 */
export function SealedProductCard({
  hue = 8,
  type,
  name,
  className,
  style,
  ...props
}: SealedProductCardProps) {
  return (
    <div className={cn("tsealed", className)} style={{ ["--h" as string]: hue, ...style }} {...props}>
      <span className="ts-shine" />
      <span className="ts-stripes" />
      <span className="ts-label">
        <span className="ts-type">{type}</span>
        <span className="ts-name">{name}</span>
      </span>
    </div>
  );
}
