"use client"

import { cn } from "@/lib/utils"
import type { Mood } from "@/lib/mock-data"

interface MoodFilterProps {
  mood: Mood
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function MoodFilter({ mood, isActive = false, onClick, className }: MoodFilterProps) {
  return (
    <button className={cn("mood-filter", isActive && "active", className)} onClick={onClick} aria-pressed={isActive}>
      <span className="mood-filter-icon" aria-hidden="true">
        {mood.icon}
      </span>
      <span className="mood-filter-label">{mood.name}</span>
    </button>
  )
}
