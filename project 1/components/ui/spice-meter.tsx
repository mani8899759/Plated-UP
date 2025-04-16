"use client"

import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpiceMeterProps {
  level: number
  maxLevel?: number
  size?: "sm" | "md" | "lg"
  className?: string
  onChange?: (level: number) => void
  readOnly?: boolean
}

export function SpiceMeter({
  level,
  maxLevel = 5,
  size = "md",
  className,
  onChange,
  readOnly = true,
}: SpiceMeterProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const handleClick = (index: number) => {
    if (readOnly) return
    onChange?.(index)
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(maxLevel)].map((_, index) => {
        const flameValue = index + 1
        const isActive = flameValue <= level

        return (
          <Flame
            key={index}
            className={cn(
              sizeClasses[size],
              "transition-colors",
              isActive ? "text-red-500" : "text-gray-300",
              !readOnly && "cursor-pointer",
            )}
            fill={isActive ? "currentColor" : "none"}
            onClick={() => handleClick(flameValue)}
          />
        )
      })}
    </div>
  )
}
