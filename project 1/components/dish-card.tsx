import Link from "next/link"
import type { Dish } from "@/lib/mock-data"
import { StarRating } from "@/components/ui/star-rating"
import { SpiceMeter } from "@/components/ui/spice-meter"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { cn } from "@/lib/utils"

interface DishCardProps {
  dish: Dish
  className?: string
}

export function DishCard({ dish, className }: DishCardProps) {
  return (
    <Link href={`/dishes/${dish.id}`} className={cn("group", className)}>
      <div className="dish-card">
        <ImageWithFallback
          src={dish.image || "/placeholder.svg"}
          alt={`${dish.name} - ${dish.description}`}
          width={400}
          height={400}
          className="dish-card-image"
          hoverEffect="zoom"
        />
        <div className="dish-card-content">
          <h3 className="text-lg font-bold mb-1">{dish.name}</h3>
          <p className="text-sm mb-2 line-clamp-1">{dish.restaurantName}</p>
          <div className="flex items-center justify-between mb-2">
            <StarRating rating={dish.rating} size="sm" />
            <SpiceMeter level={dish.spiceLevel} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">₹{dish.price}</span>
            {dish.isVeg ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                Veg
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                Non-Veg
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
