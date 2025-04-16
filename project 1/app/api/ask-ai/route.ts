import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { query, context, preferences } = await request.json()

    // In a real app, this would call an AI service like OpenAI
    // For this demo, we'll simulate AI responses

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let response = ""

    // Generate response based on context and preferences
    if (context === "home") {
      if (preferences?.mood === "comfort") {
        response =
          "Based on your comfort food preference, I recommend trying Butter Chicken from Karim's in Delhi. It's creamy, flavorful, and has a moderate spice level that most people enjoy."
      } else if (preferences?.mood === "spicy") {
        response =
          "For spice lovers, I recommend the Andhra Chicken from Meghana Foods in Bangalore. It's known for its fiery flavor profile and authentic South Indian spices."
      } else {
        response =
          "I recommend trying the Vada Pav from Spice Garden in Mumbai. It's a classic street food with the perfect balance of flavors and textures."
      }
    } else if (context === "restaurant") {
      response =
        "Based on your current restaurant selection, I recommend trying their signature dish. If you enjoy this place, you might also like similar restaurants with comparable cuisine styles in the area."
    } else if (context === "dish") {
      response =
        "If you're enjoying this dish, you might also like similar dishes with comparable flavor profiles. Would you like me to suggest some alternatives based on your taste preferences?"
    } else {
      response =
        "I can help you discover amazing Indian dishes based on your preferences. Let me know what you're in the mood for, and I'll suggest some great options!"
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in Ask AI API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
