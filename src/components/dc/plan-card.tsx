import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/dc/icon";

type PlanPrice =
  | "Free"
  | {
      amount: string;
      period?: string;
      billed?: string;
    };

type PlanCardProps = React.ComponentProps<"div"> & {
  name: string;
  tagline: string;
  benefits: string[];
  price: PlanPrice;
  cta: {
    label: string;
    variant: "primary" | "ghost";
    onClick?: () => void;
  };
  /** Highlights this as the featured/recommended tier. */
  pro?: boolean;
  /** Floating badge shown above the card, e.g. "Popular". Only meaningful with `pro`. */
  badge?: string;
};

/**
 * Pricing tier card — header, benefit list, price footer, uppercase CTA.
 * `pro` adds an accent ring, glow shadow, and (with `badge`) a floating pill.
 */
export function PlanCard({
  name,
  tagline,
  benefits,
  price,
  cta,
  pro = false,
  badge,
  className,
  ...props
}: PlanCardProps) {
  return (
    <div className={cn("plan-card", pro && "plan-card--pro", className)} {...props}>
      {pro && badge && (
        <span className="plan-badge">
          <span className="plan-badge-dot" />
          {badge}
        </span>
      )}
      <div className="plan-header">
        <h3 className="plan-name">{name}</h3>
        <p className="plan-tagline">{tagline}</p>
      </div>
      <div className="plan-benefits">
        {benefits.map((benefit) => (
          <div key={benefit} className="plan-benefit">
            <span className="plan-benefit-icon">
              <Icon name="check" size={16} sw={2.4} />
            </span>
            {benefit}
          </div>
        ))}
      </div>
      <div className="plan-footer">
        <div className="plan-price">
          {price === "Free" ? (
            <span className="plan-price-amount">Free</span>
          ) : (
            <>
              <span className="plan-price-amount">{price.amount}</span>
              {price.period && <span className="plan-price-period">{price.period}</span>}
              {price.billed && <span className="plan-price-billed">{price.billed}</span>}
            </>
          )}
        </div>
        <button
          type="button"
          className={cn("plan-cta", cta.variant === "primary" ? "plan-cta--primary" : "plan-cta--ghost")}
          onClick={cta.onClick}
        >
          {cta.label}
        </button>
      </div>
    </div>
  );
}
