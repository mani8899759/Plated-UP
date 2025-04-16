"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { StarRating } from "@/components/ui/star-rating"
import { SpiceMeter } from "@/components/ui/spice-meter"
import { AskAiButton } from "@/components/ask-ai-button"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Mic, X } from "lucide-react"

export default function ReviewPage() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [spiceLevel, setSpiceLevel] = useState(0)
  const [images, setImages] = useState<string[]>([])
  const [emojis, setEmojis] = useState<string[]>([])

  const availableEmojis = ["😋", "🔥", "👌", "😍", "🤤", "💯", "🥰", "🤩"]

  const toggleEmoji = (emoji: string) => {
    if (emojis.includes(emoji)) {
      setEmojis(emojis.filter((e) => e !== emoji))
    } else {
      setEmojis([...emojis, emoji])
    }
  }

  const addImage = () => {
    // In a real app, this would open a file picker
    // For this demo, we'll just add a placeholder
    setImages([...images, "/placeholder.svg?height=300&width=400"])
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the review
    router.push("/profile")
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Write a Review</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Restaurant</label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select restaurant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai-spice-garden">Spice Garden, Mumbai</SelectItem>
                  <SelectItem value="delhi-karim">Karim's, Delhi</SelectItem>
                  <SelectItem value="bangalore-vidyarthi-bhavan">Vidyarthi Bhavan, Bengaluru</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Dish</label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select dish" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai-vada-pav">Vada Pav</SelectItem>
                  <SelectItem value="delhi-butter-chicken">Butter Chicken</SelectItem>
                  <SelectItem value="bangalore-masala-dosa">Masala Dosa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Overall Rating</label>
              <StarRating rating={rating} onChange={setRating} readOnly={false} size="lg" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Spice Level</label>
              <SpiceMeter level={spiceLevel} onChange={setSpiceLevel} readOnly={false} size="lg" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <Textarea placeholder="Share your experience with this dish..." className="min-h-[120px]" required />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Add Emojis</label>
              <div className="flex flex-wrap gap-2">
                {availableEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`text-2xl p-2 rounded-full ${
                      emojis.includes(emoji) ? "bg-primary/10 border border-primary" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => toggleEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Add Photos</label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Review image ${index + 1}`}
                      width={150}
                      height={150}
                      className="rounded-lg object-cover w-full h-24"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {images.length < 6 && (
                  <button
                    type="button"
                    onClick={addImage}
                    className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-24 hover:border-primary"
                  >
                    <Camera className="w-6 h-6 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            <div className="mb-6">
              <button type="button" className="flex items-center gap-2 text-primary hover:text-primary/80">
                <Mic className="w-5 h-5" />
                Record Voice Review
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Submit Review</Button>
          </div>
        </form>
      </div>

      {/* Ask AI Button */}
      <AskAiButton />
    </div>
  )
}
