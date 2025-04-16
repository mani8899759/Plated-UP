"use client"

import { useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { dishes, reviews } from "@/lib/mock-data"
import { StarRating } from "@/components/ui/star-rating"
import { SpiceMeter } from "@/components/ui/spice-meter"
import { ReviewCard } from "@/components/review-card"
import { AskAiButton } from "@/components/ask-ai-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Utensils } from "lucide-react"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { ReviewFormModal } from "@/components/review-form-modal"

interface DishPageProps {
  params: {
    id: string
  }
}

export default function DishPage({ params }: DishPageProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const dish = dishes.find((d) => d.id === params.id)

  if (!dish) {
    notFound()
  }

  const dishReviews = reviews.filter((review) => review.dishId === dish.id)
  const similarDishes = dishes
    .filter(
      (d) => d.id !== dish.id && (d.cuisine === dish.cuisine || d.moods.some((mood) => dish.moods.includes(mood))),
    )
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="relative aspect-square rounded-xl overflow-hidden group">
            <ImageWithFallback
              src={dish.image || "/placeholder.svg"}
              alt={`${dish.name} - ${dish.description}`}
              fill
              className="object-cover"
              priority
              hoverEffect="glow"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>

            <Link
              href={`/restaurants/${dish.restaurant}`}
              className="flex items-center text-primary hover:underline mb-4"
            >
              <Utensils className="w-4 h-4 mr-1" />
              {dish.restaurantName}
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <StarRating rating={dish.rating} className="mr-2" />
                <span>
                  {dish.rating} ({dish.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center">
                <span className="mr-2">Spice Level:</span>
                <SpiceMeter level={dish.spiceLevel} />
              </div>
            </div>

            <div className="mb-4">
              <Badge variant={dish.isVeg ? "success" : "destructive"} className="mb-2">
                {dish.isVeg ? "Vegetarian" : "Non-Vegetarian"}
              </Badge>
              <p className="text-lg">{dish.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Taste Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {dish.tasteTags.map((tag, index) => (
                  <span key={index} className="taste-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Perfect For:</h3>
              <div className="flex flex-wrap gap-2">
                {dish.moods.map((mood, index) => (
                  <Badge key={index} variant="outline" className="bg-secondary/10">
                    {mood}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">Price</span>
                <p className="text-2xl font-bold">₹{dish.price}</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => setIsReviewModalOpen(true)}>Write a Review</Button>
                <Button variant="outline">Add to Favorites</Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="reviews">
          <TabsList className="mb-6">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="similar">Similar Dishes</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Reviews</h2>
                <p className="text-gray-600">{dish.reviews} reviews</p>
              </div>
              <Button onClick={() => setIsReviewModalOpen(true)}>Write a Review</Button>
            </div>

            <div className="space-y-6">
              {dishReviews.length > 0 ? (
                dishReviews.map((review) => <ReviewCard key={review.id} review={review} />)
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="similar">
            <h2 className="text-xl font-bold mb-6">Similar Dishes You Might Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {similarDishes.map((similarDish) => (
                <Link key={similarDish.id} href={`/dishes/${similarDish.id}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-video">
                      <ImageWithFallback
                        src={similarDish.image || "/placeholder.svg"}
                        alt={similarDish.name}
                        fill
                        className="object-cover"
                        hoverEffect="zoom"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{similarDish.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{similarDish.restaurantName}</p>
                      <div className="flex items-center justify-between">
                        <StarRating rating={similarDish.rating} size="sm" />
                        <span className="font-medium">₹{similarDish.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Review Modal */}
      <ReviewFormModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        dishId={dish.id}
        restaurantId={dish.restaurant}
        dishName={dish.name}
        restaurantName={dish.restaurantName}
      />

      {/* Ask AI Button */}
      <AskAiButton context="dish" />
    </div>
  )
}
