import { dishes } from "@/lib/mock-data"
import { DishCard } from "@/components/dish-card"
import { AskAiButton } from "@/components/ask-ai-button"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

export default function DishesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">Dishes</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cuisine</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  <SelectItem value="north-indian">North Indian</SelectItem>
                  <SelectItem value="south-indian">South Indian</SelectItem>
                  <SelectItem value="mughlai">Mughlai</SelectItem>
                  <SelectItem value="street-food">Street Food</SelectItem>
                  <SelectItem value="coastal">Coastal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Dietary</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select dietary preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="veg">Vegetarian Only</SelectItem>
                  <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price Range</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Under ₹100</SelectItem>
                  <SelectItem value="moderate">₹100 - ₹300</SelectItem>
                  <SelectItem value="expensive">Above ₹300</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Spice Level</label>
            <Slider defaultValue={[3]} max={5} step={1} className="mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mild</span>
              <span>Medium</span>
              <span>Hot</span>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button>Apply Filters</Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top-rated" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {dishes
                .filter((dish) => dish.rating >= 4.7)
                .map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {dishes
                .filter((dish) => dish.reviews >= 150)
                .map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {dishes.slice(0, 6).map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ask AI Button */}
      <AskAiButton context="search" />
    </div>
  )
}
