"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AskAiModal } from "@/components/ask-ai-modal"

interface AskAiButtonProps {
  className?: string
  context?: "home" | "search" | "dish" | "restaurant" | "profile"
}

export function AskAiButton({ className, context = "home" }: AskAiButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={`ask-ai-button ${className}`} size="lg">
        <Sparkles className="ask-ai-button-icon mr-2" />
        Ask AI
      </Button>

      <AskAiModal isOpen={isOpen} onClose={() => setIsOpen(false)} context={context} />
    </>
  )
}
