import * as React from "react";

import { cn } from "@/lib/utils";

type ExpansionTileProps = React.ComponentProps<"button"> & {
  hue: number;
  /** Short glyph rendered on the hue-tinted symbol (e.g. "✦", "◉"). */
  symbol: React.ReactNode;
  name: string;
  meta: string;
  count: string;
  active?: boolean;
};

/**
 * A set/expansion selector tile for horizontal rails — hue-tinted symbol,
 * name + meta, and a card count that inverts to accent when active.
 */
export function ExpansionTile({
  hue,
  symbol,
  name,
  meta,
  count,
  active = false,
  className,
  style,
  ...props
}: ExpansionTileProps) {
  return (
    <button
      type="button"
      className={cn("exp-tile", active && "active", className)}
      style={{ ["--h" as string]: hue, ...style }}
      aria-pressed={active}
      {...props}
    >
      <span className="set-symbol" style={{ width: 46, height: 46, fontSize: 18 }}>
        {symbol}
      </span>
      <span className="exp-tile-body">
        <span className="exp-tile-name">{name}</span>
        <span className="exp-tile-meta">{meta}</span>
      </span>
      <span className="exp-tile-count">{count}</span>
    </button>
  );
}
