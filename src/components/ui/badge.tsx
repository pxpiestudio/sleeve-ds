import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-md font-heading font-bold text-[11px] h-[22px] px-2 transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-surface-2 text-muted",
        grade:
          "bg-purple/15 text-purple",
        accent:
          "bg-accent text-white",
        accentGhost:
          "bg-accent-soft text-accent",
        success:
          "bg-success text-white",
        successGhost:
          "bg-success/12 text-success",
        warningGhost:
          "bg-warning/12 text-warning",
        info:
          "bg-info text-white",
        destructiveGhost:
          "bg-destructive/12 text-destructive",
        brandGhost:
          "bg-purple/12 text-purple",
      },
      shape: {
        default: "rounded-md",
        pill: "rounded-full px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, shape, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, shape }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
