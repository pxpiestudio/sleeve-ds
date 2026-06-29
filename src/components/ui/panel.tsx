import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, hoverable, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-surface border border-border rounded-lg",
          hoverable && "cursor-pointer",
          className
        )}
        whileHover={hoverable ? {
          y: -2,
          boxShadow: "var(--shadow-lg)",
        } : undefined}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        {...props as any}
      >
        {children}
      </motion.div>
    )
  }
)
Panel.displayName = "Panel"

export { Panel }
