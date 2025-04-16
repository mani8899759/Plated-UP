"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  color?: string
  className?: string
  onChange?: (rating: number) => void
  readOnly?: boolean
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  color = "text-secondary",
  className,
  onChange,
  readOnly = true,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const handleMouseEnter = (index: number) => {
    if (readOnly) return
    setHoverRating(index)
  }

  const handleMouseLeave = () => {
    if (readOnly) return
    setHoverRating(0)
  }

  const handleClick = (index: number) => {
    if (readOnly) return
    onChange?.(index)
  }

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        const isFilled = hoverRating ? starValue <= hoverRating : starValue <= rating

        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              "transition-colors",
              isFilled ? color : "text-gray-300",
              !readOnly && "cursor-pointer",
            )}
            fill={isFilled ? "currentColor" : "none"}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          />
        )
      })}
    </div>
  )
}
