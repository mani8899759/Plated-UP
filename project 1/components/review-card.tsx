import type { Review } from "@/lib/mock-data"
import { StarRating } from "@/components/ui/star-rating"
import { SpiceMeter } from "@/components/ui/spice-meter"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp } from "lucide-react"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { cn } from "@/lib/utils"

interface ReviewCardProps {
  review: Review
  className?: string
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <div className={cn("review-card", className)}>
      <div className="review-header">
        <ImageWithFallback
          src={review.user.image || "/placeholder.svg"}
          alt={review.user.name}
          width={40}
          height={40}
          className="review-avatar"
          hoverEffect="glow"
        />
        <div>
          <div className="flex items-center">
            <span className="review-author">{review.user.name}</span>
            <Badge variant="outline" className="ml-2 text-xs">
              Level {review.user.level}
            </Badge>
          </div>
          <span className="review-date">{review.date}</span>
        </div>
      </div>

      <div className="review-rating">
        <StarRating rating={review.rating} size="sm" className="mr-3" />
        <SpiceMeter level={review.spiceRating} size="sm" />
      </div>

      <p className="review-content">{review.comment}</p>

      {review.images.length > 0 && (
        <div className="review-images">
          {review.images.map((image, index) => (
            <div key={index} className="group">
              <ImageWithFallback
                src={image || "/placeholder.svg"}
                alt={`Review image ${index + 1}`}
                width={150}
                height={150}
                className="review-image"
                hoverEffect="zoom"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-1">
          {review.emojis.map((emoji, index) => (
            <span key={index} className="text-xl">
              {emoji}
            </span>
          ))}
        </div>

        <button className="flex items-center text-gray-500 hover:text-primary transition-colors">
          <ThumbsUp className="w-4 h-4 mr-1" />
          <span>{review.likes}</span>
        </button>
      </div>
    </div>
  )
}
