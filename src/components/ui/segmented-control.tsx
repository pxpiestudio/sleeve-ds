import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SegmentedControlProps {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  className?: string
}

function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  return (
    <div
      className={cn(
        "inline-flex p-1 gap-0.5 bg-bg-2 rounded-lg",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative px-3 py-1.5 rounded-md text-xs font-semibold font-sans transition-colors cursor-pointer",
              isActive ? "text-text" : "text-muted hover:text-text"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="segmented-pill"
                className="absolute inset-0 bg-surface rounded-md shadow-sm"
                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export { SegmentedControl }
