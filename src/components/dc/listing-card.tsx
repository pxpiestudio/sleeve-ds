import * as React from "react";

import { cn } from "@/lib/utils";
import { CardArt } from "@/components/dc/card-art";
import { GradeBadge } from "@/components/dc/badges";
import { Icon } from "@/components/dc/icon";

type ListingCardProps = React.ComponentProps<"div"> & {
  hue: number;
  title: string;
  /** e.g. "PSA 10" — omit for ungraded listings. */
  grade?: string;
  /** e.g. "Gem Mint" or "NM" — always shown next to grade. */
  condition: string;
  seller: {
    name: string;
    verified?: boolean;
    rating: string;
  };
  price: string;
  shipping?: string;
};

/**
 * A single seller's listing for a card — art + title + grade/condition +
 * seller line + price, in a horizontal layout distinct from `ProductCard`
 * (which represents the aggregate marketplace price, not one seller's row).
 */
export function ListingCard({
  hue,
  title,
  grade,
  condition,
  seller,
  price,
  shipping,
  className,
  ...props
}: ListingCardProps) {
  return (
    <div className={cn("lcard", className)} {...props}>
      <CardArt hue={hue} />
      <div className="body">
        <div className="ltitle">{title}</div>
        <div className="lgrade">
          {grade && <GradeBadge graded>{grade}</GradeBadge>}
          <GradeBadge>{condition}</GradeBadge>
        </div>
        <div className="seller">
          <span
            className="av"
            style={{ background: `linear-gradient(150deg, hsl(${hue} 70% 55%), hsl(${hue + 40} 60% 45%))` }}
          />
          {seller.name}
          {seller.verified && (
            <span className="verified">
              <Icon name="shield" size={13} />
            </span>
          )}
          · {seller.rating}★
        </div>
        <div className="lprice">
          <span className="v">{price}</span>
          {shipping && <span className="ships">{shipping}</span>}
        </div>
      </div>
    </div>
  );
}
