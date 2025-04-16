"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { cities, dishes, moods, restaurants } from "@/lib/mock-data"
import { DishCard } from "@/components/dish-card"
import { RestaurantCard } from "@/components/restaurant-card"
import { MoodFilter } from "@/components/mood-filter"
import { AskAiButton } from "@/components/ask-ai-button"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronRight, MapPin, Star, TrendingUp, Utensils, Check } from "lucide-react"

export default function Home() {
  // Get featured dishes
  const featuredDishes = dishes.slice(0, 6)

  // Get popular restaurants
  const popularRestaurants = restaurants.slice(0, 3)

  // Get featured cities
  const featuredCities = cities.slice(0, 6)

  const [activeMood, setActiveMood] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-10" />
        <Image
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGw1eXdhMHRqdzBmdHd6c3k0OGxhYnl2a3BwY2RzdnNvMXdiaHEwciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oeSANlR56jz1tEPao/giphy.gif"
          alt="Delicious Indian Food"
          width={1200}
          height={600}
          className="w-full h-[70vh] object-cover"
        />
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="container relative z-20 flex flex-col items-center justify-center h-[70vh] text-white text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                Discover India's Culinary Magic
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg md:text-xl mb-8 max-w-2xl"
              >
                Find, rate, and share your favorite dishes from across India
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link href="/search">Explore Dishes</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Link href="/restaurants">Find Restaurants</Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-background">
        <div className="container">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4"
          >
            <motion.div variants={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/restaurants?filter=top-rated"
                className="bg-primary/10 rounded-lg p-4 text-center hover:bg-primary/20 transition-colors block"
              >
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="font-medium">Top Rated</span>
              </Link>
            </motion.div>
            <motion.div variants={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/restaurants?filter=near-me"
                className="bg-secondary/10 rounded-lg p-4 text-center hover:bg-secondary/20 transition-colors block"
              >
                <MapPin className="w-6 h-6 mx-auto mb-2 text-secondary" />
                <span className="font-medium">Near Me</span>
              </Link>
            </motion.div>
            <motion.div variants={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/restaurants?filter=hidden-gems"
                className="bg-accent/10 rounded-lg p-4 text-center hover:bg-accent/20 transition-colors block"
              >
                <span className="text-2xl block mb-1">💎</span>
                <span className="font-medium">Hidden Gems</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mood Filters */}
      <section className="py-8 bg-background">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-6"
          >
            I'm in the mood for...
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-4 md:grid-cols-8 gap-4"
          >
            {moods.map((mood) => (
              <motion.div key={mood.id} variants={item}>
                <MoodFilter
                  mood={mood}
                  isActive={activeMood === mood.id}
                  onClick={() => setActiveMood(activeMood === mood.id ? null : mood.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending Dishes */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              Trending Dishes
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button asChild variant="ghost" className="gap-1">
                <Link href="/dishes">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {featuredDishes.map((dish) => (
              <motion.div key={dish.id} variants={item} whileHover={{ y: -5 }} transition={{ type: "spring" }}>
                <DishCard dish={dish} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* List Your Restaurant */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Own a Restaurant?</h2>
              <p className="text-lg mb-6 text-white/90">
                Join thousands of restaurant owners on PlatedUp and reach more customers. List your restaurant for free
                and showcase your delicious dishes to food lovers across India.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-white text-primary flex items-center justify-center mr-3">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Increase your restaurant's visibility</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-white text-primary flex items-center justify-center mr-3">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Receive genuine reviews and ratings</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-white text-primary flex items-center justify-center mr-3">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Connect with food enthusiasts</span>
                </li>
              </ul>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/list-restaurant">
                  List Your Restaurant <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="flex items-center mb-4">
                  <Utensils className="w-6 h-6 text-primary mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">Restaurant Dashboard</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Views</span>
                      <span className="text-lg font-bold text-gray-900">2,547</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Reviews</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                        <span className="text-lg font-bold text-gray-900">4.8 (124)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-yellow-500 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Popular Dishes</span>
                      <span className="text-lg font-bold text-gray-900">12</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary/20 rounded-full z-[-1]"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary/20 rounded-full z-[-1]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="py-12 bg-cream-100">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              Popular Restaurants
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button asChild variant="ghost" className="gap-1">
                <Link href="/restaurants">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {popularRestaurants.map((restaurant) => (
              <motion.div key={restaurant.id} variants={item} whileHover={{ y: -5 }} transition={{ type: "spring" }}>
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Explore Cities */}
      <section className="py-12 bg-background">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-6"
          >
            Explore by City
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {featuredCities.map((city) => (
              <motion.div key={city.id} variants={item} whileHover={{ scale: 1.03 }} transition={{ type: "spring" }}>
                <Link
                  href={`/restaurants?city=${city.id}`}
                  className="relative overflow-hidden rounded-lg h-40 group block"
                >
                  <Image
                    src={city.image || "/placeholder.svg"}
                    alt={city.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">{city.name}</h3>
                      <p className="text-white/80 text-sm">{city.state}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ask AI Button */}
      <AskAiButton />
    </div>
  )
}
