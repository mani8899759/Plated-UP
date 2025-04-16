"use client"

import { useState } from "react"
import Link from "next/link"
import { StarRating } from "@/components/ui/star-rating"
import { AskAiButton } from "@/components/ask-ai-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Settings } from "lucide-react"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { ReviewFormModal } from "@/components/review-form-modal"

export default function ProfilePage() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedDishId, setSelectedDishId] = useState<string | undefined>()
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | undefined>()

  // Make sure the favorite restaurants and dishes have clear images and proper display

  // Update the user object to ensure all images are properly set
  const user = {
    name: "Arjun Kapoor",
    image: "https://data.thefeedfeed.com/static/profiles/15296072005b2bf42077b71.jpg",
    level: 4,
    reviews: 28,
    followers: 124,
    following: 56,
    badges: ["Top Reviewer", "Food Photographer", "Spice Expert"],
    favoriteRestaurants: [
      {
        id: "mumbai-spice-garden",
        name: "Spice Garden",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/6d/99/0b/main.jpg?w=900&h=-1&s=1",
      },
      {
        id: "delhi-karim",
        name: "Karim's",
        image: "https://b.zmtcdn.com/data/pictures/1/19232821/6b7e6dc1ca2cc8f01b483948f440e1ed.jpeg",
      },
    ],
    favoriteDishes: [
      {
        id: "mumbai-vada-pav",
        name: "Vada Pav",
        image: "https://i.ytimg.com/vi/Z9Y60u8tI9M/maxresdefault.jpg",
      },
      {
        id: "delhi-butter-chicken",
        name: "Butter Chicken",
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/07/chicken-butter-masala-recipe.jpg",
      },
      {
        id: "bangalore-masala-dosa",
        name: "Masala Dosa",
        image:
          "https://www.mydelicious-recipes.com/home/images/120_1080_1080/mydelicious-recipes-masala-dosa-with-batter-Masala%20Dosa",
      },
    ],
  }

  const openReviewModal = (type: "dish" | "restaurant", id: string) => {
    if (type === "dish") {
      setSelectedDishId(id)
      setSelectedRestaurantId(undefined)
    } else {
      setSelectedRestaurantId(id)
      setSelectedDishId(undefined)
    }
    setIsReviewModalOpen(true)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative group">
              <ImageWithFallback
                src={user.image || "/placeholder.svg"}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full object-cover"
                hoverEffect="glow"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {user.level}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h1 className="text-2xl font-bold mb-2 md:mb-0">{user.name}</h1>
                <div className="flex gap-2 justify-center md:justify-start">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-1">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-6 mb-4">
                <div className="text-center">
                  <div className="font-bold">{user.reviews}</div>
                  <div className="text-sm text-gray-500">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{user.followers}</div>
                  <div className="text-sm text-gray-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{user.following}</div>
                  <div className="text-sm text-gray-500">Following</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {user.badges.map((badge, index) => (
                  <Badge key={index} className="bg-secondary text-secondary-foreground">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="favorites">
          <TabsList className="mb-6">
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="reviews">My Reviews</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="badges">Badges & Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="favorites">
            <div className="space-y-8">
              {/* Update the favorite restaurants section to ensure images are properly displayed */}
              <div>
                <h2 className="text-xl font-bold mb-4">Favorite Restaurants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.favoriteRestaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <Link href={`/restaurants/${restaurant.id}`} className="block relative aspect-video">
                        <ImageWithFallback
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          fill
                          className="object-cover"
                          hoverEffect="zoom"
                        />
                      </Link>
                      <div className="p-4">
                        <Link href={`/restaurants/${restaurant.id}`}>
                          <h3 className="font-bold group-hover:text-primary transition-colors">{restaurant.name}</h3>
                        </Link>
                        <div className="flex justify-end mt-2">
                          <Button size="sm" onClick={() => openReviewModal("restaurant", restaurant.id)}>
                            Write Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Update the favorite dishes section to ensure images are properly displayed */}
              <div>
                <h2 className="text-xl font-bold mb-4">Favorite Dishes</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {user.favoriteDishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <Link href={`/dishes/${dish.id}`} className="block relative aspect-square">
                        <ImageWithFallback
                          src={dish.image || "/placeholder.svg"}
                          alt={dish.name}
                          fill
                          className="object-cover"
                          hoverEffect="zoom"
                        />
                      </Link>
                      <div className="p-3">
                        <Link href={`/dishes/${dish.id}`}>
                          <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                            {dish.name}
                          </h3>
                        </Link>
                        <div className="flex justify-end mt-2">
                          <Button size="sm" variant="outline" onClick={() => openReviewModal("dish", dish.id)}>
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link href="/restaurants/mumbai-spice-garden" className="font-bold hover:text-primary">
                      Spice Garden
                    </Link>
                    <div className="flex items-center mt-1">
                      <StarRating rating={4.5} size="sm" className="mr-2" />
                      <span className="text-sm text-gray-500">Reviewed on May 15, 2023</span>
                    </div>
                  </div>
                  <Link href="/dishes/mumbai-vada-pav" className="text-sm text-primary">
                    Vada Pav
                  </Link>
                </div>
                <p className="mb-4">
                  The vada pav here is absolutely incredible! The perfect balance of spices and the green chutney is to
                  die for. A must-try for anyone visiting Mumbai.
                </p>
                {/* Update the review images */}
                <div className="grid grid-cols-3 gap-2">
                  <Link href="/dishes/mumbai-vada-pav" className="group">
                    <ImageWithFallback
                      src="https://i.ytimg.com/vi/Z9Y60u8tI9M/maxresdefault.jpg"
                      alt="Vada Pav"
                      width={300}
                      height={200}
                      className="rounded-lg object-cover w-full h-24"
                      hoverEffect="zoom"
                    />
                  </Link>
                  <Link href="/dishes/mumbai-pav-bhaji" className="group">
                    <ImageWithFallback
                      src="https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/01171428/YFL-Pav-Bhaji-3.jpg"
                      alt="Pav Bhaji"
                      width={300}
                      height={200}
                      className="rounded-lg object-cover w-full h-24"
                      hoverEffect="zoom"
                    />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link href="/restaurants/delhi-karim" className="font-bold hover:text-primary">
                      Karim's
                    </Link>
                    <div className="flex items-center mt-1">
                      <StarRating rating={5} size="sm" className="mr-2" />
                      <span className="text-sm text-gray-500">Reviewed on April 3, 2023</span>
                    </div>
                  </div>
                  <Link href="/dishes/delhi-butter-chicken" className="text-sm text-primary">
                    Butter Chicken
                  </Link>
                </div>
                <p className="mb-4">
                  Karim's butter chicken is legendary for a reason. The gravy is rich and flavorful, and the chicken is
                  perfectly cooked. Worth every penny!
                </p>
                {/* Update the second review image */}
                <div className="grid grid-cols-3 gap-2">
                  <Link href="/dishes/delhi-butter-chicken" className="group">
                    <ImageWithFallback
                      src="https://www.indianhealthyrecipes.com/wp-content/uploads/2022/07/chicken-butter-masala-recipe.jpg"
                      alt="Butter Chicken"
                      width={300}
                      height={200}
                      className="rounded-lg object-cover w-full h-24"
                      hoverEffect="zoom"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invoices">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Recent Invoices</h2>
                <Button asChild variant="outline">
                  <Link href="/profile/invoices">View All Invoices</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">INV-001</p>
                      <p className="text-sm text-gray-500">Spice Garden</p>
                      <p className="text-xs text-gray-400">15 Jun 2023</p>
                    </div>
                    <p className="font-bold">₹850</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">INV-002</p>
                      <p className="text-sm text-gray-500">Karim's</p>
                      <p className="text-xs text-gray-400">28 May 2023</p>
                    </div>
                    <p className="font-bold">₹1,250</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="badges">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Your Badges</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <h3 className="font-bold">Top Reviewer</h3>
                    <p className="text-sm text-gray-500">Earned on May 20, 2023</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📸</span>
                    </div>
                    <h3 className="font-bold">Food Photographer</h3>
                    <p className="text-sm text-gray-500">Earned on April 12, 2023</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🔥</span>
                    </div>
                    <h3 className="font-bold">Spice Expert</h3>
                    <p className="text-sm text-gray-500">Earned on June 5, 2023</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Reviewer Level</h2>
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Level {user.level}: Food Connoisseur</h3>
                      <p className="text-sm text-gray-500">12 more reviews to reach Level 5</p>
                    </div>
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {user.level}
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>28/40 reviews</span>
                    <span>Level 5</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Review Modal */}
      <ReviewFormModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        dishId={selectedDishId}
        restaurantId={selectedRestaurantId}
        dishName={selectedDishId ? user.favoriteDishes.find((d) => d.id === selectedDishId)?.name : undefined}
        restaurantName={
          selectedRestaurantId ? user.favoriteRestaurants.find((r) => r.id === selectedRestaurantId)?.name : undefined
        }
      />

      {/* Ask AI Button */}
      <AskAiButton context="profile" />
    </div>
  )
}
