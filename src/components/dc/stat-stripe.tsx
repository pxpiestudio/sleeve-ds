import * as React from "react";

import { cn } from "@/lib/utils";

export type StatCell = {
  value: React.ReactNode;
  label: string;
  /** Render `value` in the accent color. */
  accent?: boolean;
};

type StatStripeProps = React.ComponentProps<"div"> & {
  cells: StatCell[];
};

/** A hairline-divided grid of headline metrics — 4-up, collapsing to 2-up on mobile. */
export function StatStripe({ cells, className, ...props }: StatStripeProps) {
  return (
    <div className={cn("stripe", className)} {...props}>
      {cells.map((cell, i) => (
        <div key={i} className="cell">
          <div className="n">{cell.accent ? <span className="accent">{cell.value}</span> : cell.value}</div>
          <div className="l">{cell.label}</div>
        </div>
      ))}
    </div>
  );
}

type MiniBarChartProps = React.ComponentProps<"div"> & {
  /** Bar heights as 0–100 percentages. The last bar is always the peak accent. */
  values: number[];
};

/** A minimal inline bar chart for compact "portfolio value" style widgets. */
export function MiniBarChart({ values, className, ...props }: MiniBarChartProps) {
  return (
    <div className={cn("mbc", className)} {...props}>
      {values.map((v, i) => (
        <i key={i} className={i === values.length - 1 ? "peak" : undefined} style={{ height: `${v}%` }} />
      ))}
    </div>
  );
}
