import Link from "next/link"
import type { Restaurant } from "@/lib/mock-data"
import { StarRating } from "@/components/ui/star-rating"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { cn } from "@/lib/utils"

interface RestaurantCardProps {
  restaurant: Restaurant
  className?: string
}

export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className={cn("group", className)}>
      <div className="restaurant-card">
        <ImageWithFallback
          src={restaurant.image || "/placeholder.svg"}
          alt={`${restaurant.name} - ${restaurant.description}`}
          width={600}
          height={400}
          className="restaurant-card-image"
          hoverEffect="zoom"
        />
        <div className="restaurant-card-content">
          <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{restaurant.name}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">{restaurant.address}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <StarRating rating={restaurant.rating} size="sm" />
            <span className="text-sm text-gray-500">{restaurant.reviews} reviews</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {restaurant.cuisine.map((type, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {type}
              </Badge>
            ))}
            {restaurant.isVeg && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                Pure Veg
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
