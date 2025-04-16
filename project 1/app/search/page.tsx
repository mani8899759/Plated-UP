"use client"

import { useState } from "react"
import { dishes, restaurants, moods } from "@/lib/mock-data"
import { DishCard } from "@/components/dish-card"
import { RestaurantCard } from "@/components/restaurant-card"
import { MoodFilter } from "@/components/mood-filter"
import { AskAiButton } from "@/components/ask-ai-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, SlidersHorizontal, X } from "lucide-react"

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState("dishes")
  const [activeMoods, setActiveMoods] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const toggleMood = (moodId: string) => {
    if (activeMoods.includes(moodId)) {
      setActiveMoods(activeMoods.filter((id) => id !== moodId))
    } else {
      setActiveMoods([...activeMoods, moodId])
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">Search</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search for dishes, restaurants, cuisines..." className="pl-10 pr-10" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {/* Mood Filters */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">I'm in the mood for...</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {moods.map((mood) => (
              <MoodFilter
                key={mood.id}
                mood={mood}
                isActive={activeMoods.includes(mood.id)}
                onClick={() => toggleMood(mood.id)}
              />
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="location">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                    </SelectContent>
                  </Select>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cuisine">
                <AccordionTrigger>Cuisine</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="north-indian" className="rounded" />
                      <label htmlFor="north-indian">North Indian</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="south-indian" className="rounded" />
                      <label htmlFor="south-indian">South Indian</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="mughlai" className="rounded" />
                      <label htmlFor="mughlai">Mughlai</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="street-food" className="rounded" />
                      <label htmlFor="street-food">Street Food</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="coastal" className="rounded" />
                      <label htmlFor="coastal">Coastal</label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dietary">
                <AccordionTrigger>Dietary Preferences</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="all-food" name="dietary" className="rounded" defaultChecked />
                      <label htmlFor="all-food">All</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="veg-only" name="dietary" className="rounded" />
                      <label htmlFor="veg-only">Vegetarian Only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="non-veg" name="dietary" className="rounded" />
                      <label htmlFor="non-veg">Non-Vegetarian</label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="spice">
                <AccordionTrigger>Spice Level</AccordionTrigger>
                <AccordionContent>
                  <Slider defaultValue={[3]} max={5} step={1} className="mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Mild</span>
                    <span>Medium</span>
                    <span>Hot</span>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price">
                <AccordionTrigger>Price Range</AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline">Reset</Button>
              <Button>Apply Filters</Button>
            </div>
          </div>
        )}

        {/* Results */}
        <Tabs defaultValue="dishes" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dishes">Dishes</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          </TabsList>

          <TabsContent value="dishes" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {dishes
                .filter((dish) => activeMoods.length === 0 || dish.moods.some((mood) => activeMoods.includes(mood)))
                .map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="restaurants" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
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
