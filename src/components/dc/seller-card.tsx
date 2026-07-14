import * as React from "react";

import { cn } from "@/lib/utils";

type SellerCardProps = React.ComponentProps<"div"> & {
  hue: number;
  name: string;
  handle: string;
  badge?: string;
  stats: {
    rating: string;
    reviews: string;
    items: string;
  };
};

/** A seller's public profile summary — gradient avatar, handle, and stats row. */
export function SellerCard({
  hue,
  name,
  handle,
  badge,
  stats,
  className,
  ...props
}: SellerCardProps) {
  return (
    <div className={cn("scard", className)} {...props}>
      <div
        className="av"
        style={{ background: `linear-gradient(150deg, hsl(${hue} 70% 55%), hsl(${hue + 40} 60% 45%))` }}
      />
      <div className="sname">{name}</div>
      <div className="shandle">@{handle}</div>
      {badge && <span className="sbadge">{badge}</span>}
      <div className="sstats">
        <div>
          <b>{stats.rating}</b>rating
        </div>
        <div>
          <b>{stats.reviews}</b>reviews
        </div>
        <div>
          <b>{stats.items}</b>items
        </div>
      </div>
    </div>
  );
}
