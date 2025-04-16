"use client"

import type React from "react"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

interface AskAiModalProps {
  isOpen: boolean
  onClose: () => void
  context?: "home" | "search" | "dish" | "restaurant" | "profile"
}

export function AskAiModal({ isOpen, onClose, context = "home" }: AskAiModalProps) {
  const [activeTab, setActiveTab] = useState("quick")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your preferences, I recommend trying Butter Chicken from Karim's in Delhi. It's creamy, flavorful, and has a moderate spice level that most people enjoy.",
        "For a rainy evening in Mumbai, I suggest Pav Bhaji from Spice Garden. It's the perfect comfort food with a nice balance of spices and buttery goodness.",
        "If you're in Bangalore and craving something light yet satisfying, the Masala Dosa at Vidyarthi Bhavan is a must-try. It's crispy, flavorful, and perfect for breakfast or a light meal.",
      ]

      setResult(responses[Math.floor(Math.random() * responses.length)])
      setLoading(false)
    }, 1500)
  }

  const getContextPrompt = () => {
    switch (context) {
      case "home":
        return "What are you craving today?"
      case "search":
        return "Need help finding something specific?"
      case "dish":
        return "Want similar dishes or pairing suggestions?"
      case "restaurant":
        return "What would you like to know about this restaurant?"
      case "profile":
        return "Looking for personalized recommendations?"
      default:
        return "How can I help with your food journey today?"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-accent" />
            Ask AI
          </DialogTitle>
          <DialogDescription>{getContextPrompt()}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="quick" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quick">Quick Options</TabsTrigger>
            <TabsTrigger value="custom">Custom Query</TabsTrigger>
          </TabsList>

          <TabsContent value="quick" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>I'm in the mood for</Label>
                <RadioGroup defaultValue="comfort">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfort" id="comfort" />
                      <Label htmlFor="comfort">Comfort Food</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="spicy" id="spicy" />
                      <Label htmlFor="spicy">Spicy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="healthy" id="healthy" />
                      <Label htmlFor="healthy">Healthy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sweet" id="sweet" />
                      <Label htmlFor="sweet">Sweet</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Spice Level</Label>
                <Slider defaultValue={[3]} max={5} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Mild</span>
                  <span>Medium</span>
                  <span>Hot</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Dietary Preference</Label>
                <RadioGroup defaultValue="any">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any" />
                      <Label htmlFor="any">Any</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="veg" id="veg" />
                      <Label htmlFor="veg">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-veg" id="non-veg" />
                      <Label htmlFor="non-veg">Non-Vegetarian</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Thinking..." : "Get Recommendations"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-query">Ask anything about food</Label>
                <Textarea
                  id="custom-query"
                  placeholder="E.g., What's a good breakfast dish in Bangalore? Or, suggest a spicy dish for a rainy day."
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Thinking..." : "Ask AI"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {result && (
          <div className="mt-4 p-4 bg-accent/10 rounded-lg">
            <h4 className="font-medium flex items-center mb-2">
              <Sparkles className="w-4 h-4 mr-2 text-accent" />
              AI Recommendation
            </h4>
            <p>{result}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
