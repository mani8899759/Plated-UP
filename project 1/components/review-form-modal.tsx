"use client"

import type React from "react"

import { useState } from "react"
import { StarRating } from "@/components/ui/star-rating"
import { SpiceMeter } from "@/components/ui/spice-meter"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Camera, X } from "lucide-react"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { useToast } from "@/hooks/use-toast"

interface ReviewFormModalProps {
  isOpen: boolean
  onClose: () => void
  dishId?: string
  restaurantId?: string
  dishName?: string
  restaurantName?: string
}

export function ReviewFormModal({
  isOpen,
  onClose,
  dishId,
  restaurantId,
  dishName,
  restaurantName,
}: ReviewFormModalProps) {
  const [rating, setRating] = useState(0)
  const [spiceLevel, setSpiceLevel] = useState(0)
  const [comment, setComment] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [emojis, setEmojis] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

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
    // For this demo, we'll add placeholder images in rotation
    const placeholderImages = [
      "https://i.ytimg.com/vi/Z9Y60u8tI9M/maxresdefault.jpg",
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/07/chicken-butter-masala-recipe.jpg",
      "https://www.mydelicious-recipes.com/home/images/120_1080_1080/mydelicious-recipes-masala-dosa-with-batter-Masala%20Dosa",
    ]
    const nextImageIndex = images.length % placeholderImages.length
    setImages([...images, placeholderImages[nextImageIndex]])
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a star rating for your review",
        variant: "destructive",
      })
      return
    }

    if (!comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please write a comment for your review",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Review submitted!",
      description: "Thank you for sharing your experience",
      variant: "default",
    })

    setIsSubmitting(false)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setRating(0)
    setSpiceLevel(0)
    setComment("")
    setImages([])
    setEmojis([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {dishName && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Dish</p>
                <p className="font-bold">{dishName}</p>
              </div>
            )}

            {restaurantName && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Restaurant</p>
                <p className="font-bold">{restaurantName}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Overall Rating</label>
            <StarRating rating={rating} onChange={setRating} readOnly={false} size="lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Spice Level</label>
            <SpiceMeter level={spiceLevel} onChange={setSpiceLevel} readOnly={false} size="lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <Textarea
              placeholder="Share your experience..."
              className="min-h-[120px]"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <div>
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

          <div>
            <label className="block text-sm font-medium mb-2">Add Photos</label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <ImageWithFallback
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
