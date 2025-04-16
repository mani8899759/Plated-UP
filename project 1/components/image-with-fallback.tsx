"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string
  hoverEffect?: "zoom" | "lift" | "glow" | "none"
  className?: string
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg?height=400&width=400",
  hoverEffect = "zoom",
  className,
  ...rest
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Define hover effect classes
  const hoverEffectClasses = {
    zoom: "group-hover:scale-110 transition-transform duration-300",
    lift: "group-hover:-translate-y-2 transition-transform duration-300",
    glow: "group-hover:brightness-110 group-hover:shadow-lg transition-all duration-300",
    none: "",
  }

  return (
    <div className={cn("relative group overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse z-10">
          <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
        </div>
      )}
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
        className={cn(hoverEffectClasses[hoverEffect], "transition-all duration-300")}
        {...rest}
      />
    </div>
  )
}
