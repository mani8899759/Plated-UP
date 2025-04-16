"use client"

import { useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { restaurants, dishes, reviews } from "@/lib/mock-data"
import { StarRating } from "@/components/ui/star-rating"
import { DishCard } from "@/components/dish-card"
import { ReviewCard } from "@/components/review-card"
import { AskAiButton } from "@/components/ask-ai-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Clock } from "lucide-react"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { ReviewFormModal } from "@/components/review-form-modal"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const restaurant = restaurants.find((r) => r.id === params.id)

  if (!restaurant) {
    notFound()
  }

  const restaurantDishes = dishes.filter((dish) => dish.restaurant === restaurant.id)
  const restaurantReviews = reviews.filter((review) => review.restaurantId === restaurant.id)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh]">
        <ImageWithFallback
          src={restaurant.image || "/placeholder.svg"}
          alt={`${restaurant.name} - ${restaurant.description}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center mb-2">
              <StarRating rating={restaurant.rating} className="mr-2" />
              <span>
                {restaurant.rating} ({restaurant.reviews} reviews)
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {restaurant.cuisine.map((type, index) => (
                <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/40">
                  {type}
                </Badge>
              ))}
              {restaurant.isVeg && (
                <Badge variant="outline" className="bg-green-500/20 text-white border-green-500/40">
                  Pure Veg
                </Badge>
              )}
              {restaurant.isJain && (
                <Badge variant="outline" className="bg-purple-500/20 text-white border-purple-500/40">
                  Jain
                </Badge>
              )}
              {restaurant.isHalal && (
                <Badge variant="outline" className="bg-blue-500/20 text-white border-blue-500/40">
                  Halal
                </Badge>
              )}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{restaurant.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="dishes">Dishes</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="mb-6">{restaurant.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">{restaurant.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <p className="text-gray-600">11:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Popular Dishes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {restaurantDishes.slice(0, 3).map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button asChild variant="outline">
                  <Link href="#dishes">View All Dishes</Link>
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                {restaurantReviews.slice(0, 2).map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button asChild variant="outline">
                  <Link href="#reviews">View All Reviews</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dishes" id="dishes">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {restaurantDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" id="reviews">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Reviews</h2>
                <p className="text-gray-600">{restaurant.reviews} reviews</p>
              </div>
              <Button onClick={() => setIsReviewModalOpen(true)}>Write a Review</Button>
            </div>

            <div className="space-y-6">
              {restaurantReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="photos" id="photos">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Show restaurant image and dish images */}
              <div className="aspect-square overflow-hidden rounded-lg group">
                <ImageWithFallback
                  src={restaurant.image || "/placeholder.svg"}
                  alt={`${restaurant.name} exterior`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  hoverEffect="zoom"
                />
              </div>
              {restaurantDishes.map((dish, index) => (
                <Link
                  key={index}
                  href={`/dishes/${dish.id}`}
                  className="aspect-square overflow-hidden rounded-lg group"
                >
                  <ImageWithFallback
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    hoverEffect="zoom"
                  />
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
        restaurantId={restaurant.id}
        restaurantName={restaurant.name}
      />

      {/* Ask AI Button */}
      <AskAiButton context="restaurant" />
    </div>
  )
}
