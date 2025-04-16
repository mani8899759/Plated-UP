export interface City {
  id: string
  name: string
  state: string
  image: string
}

export interface Restaurant {
  id: string
  name: string
  description: string
  address: string
  city: string
  cuisine: string[]
  priceRange: 1 | 2 | 3 | 4
  rating: number
  reviews: number
  image: string
  isVeg: boolean
  isJain: boolean
  isHalal: boolean
  dishes: string[]
}

export interface Dish {
  id: string
  name: string
  description: string
  price: number
  image: string
  restaurant: string
  restaurantName: string
  city: string
  cuisine: string
  isVeg: boolean
  spiceLevel: 1 | 2 | 3 | 4 | 5
  tasteTags: string[]
  rating: number
  reviews: number
  moods: string[]
}

export interface Review {
  id: string
  user: {
    id: string
    name: string
    image: string
    level: number
    badges: string[]
  }
  dishId: string
  restaurantId: string
  rating: number
  spiceRating: number
  comment: string
  date: string
  images: string[]
  likes: number
  emojis: string[]
}

export interface Mood {
  id: string
  name: string
  icon: string
  description: string
}

// Update the cities array to use real images
export const cities: City[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    image:
      "https://media.istockphoto.com/id/539018660/photo/taj-mahal-hotel-and-gateway-of-india.jpg?s=612x612&w=0&k=20&c=L1LJVrYMS8kj2rJKlQMcUR88vYoAZeWbYIGkcTo6QV0=",
  },
  {
    id: "delhi",
    name: "Delhi",
    state: "Delhi",
    image: "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
  },
  {
    id: "bangalore",
    name: "Bengaluru",
    state: "Karnataka",
    image: "https://static.toiimg.com/thumb/msid-54559212,width-748,height-499,resizemode=4,imgsize-307081/.jpg",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/98/f7/df/charminar.jpg?w=1400&h=1400&s=1",
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Chennai_Central.jpg",
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    image: "https://i.pinimg.com/736x/6f/ac/d9/6facd93b7f78138560e239a26baac0d9.jpg",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "kochi",
    name: "Kochi",
    state: "Kerala",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "pune",
    name: "Pune",
    state: "Maharashtra",
    image: "/placeholder.svg?height=400&width=600",
  },
]

// Update the restaurants array to use real images
export const restaurants: Restaurant[] = [
  {
    id: "mumbai-spice-garden",
    name: "Spice Garden",
    description: "Authentic Maharashtrian cuisine with a modern twist",
    address: "123 Marine Drive, Mumbai",
    city: "mumbai",
    cuisine: ["Maharashtrian", "Coastal"],
    priceRange: 3,
    rating: 4.7,
    reviews: 342,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/6d/99/0b/main.jpg?w=900&h=-1&s=1",
    isVeg: false,
    isJain: false,
    isHalal: false,
    dishes: ["mumbai-vada-pav", "mumbai-pav-bhaji", "mumbai-malvani-fish-curry"],
  },
  {
    id: "mumbai-punjabi-dhaba",
    name: "Punjabi Dhaba",
    description: "Hearty North Indian food in a rustic setting",
    address: "45 Bandra West, Mumbai",
    city: "mumbai",
    cuisine: ["Punjabi", "North Indian"],
    priceRange: 2,
    rating: 4.3,
    reviews: 256,
    image: "https://b.zmtcdn.com/data/pictures/5/19708725/3cb2ff58dc4c6db199a2d04d9e0be576.jpeg",
    isVeg: false,
    isJain: false,
    isHalal: true,
    dishes: ["mumbai-butter-chicken", "mumbai-dal-makhani", "mumbai-naan"],
  },
  {
    id: "mumbai-south-express",
    name: "South Express",
    description: "Authentic South Indian vegetarian delights",
    address: "78 Matunga East, Mumbai",
    city: "mumbai",
    cuisine: ["South Indian", "Tamil"],
    priceRange: 1,
    rating: 4.5,
    reviews: 189,
    image: "https://b.zmtcdn.com/data/pictures/2/19005012/ab8eb9f242034f41c3f4eb880cc5b968.jpg",
    isVeg: true,
    isJain: true,
    isHalal: false,
    dishes: ["mumbai-masala-dosa", "mumbai-idli-sambar", "mumbai-filter-coffee"],
  },
  {
    id: "delhi-karim",
    name: "Karim's",
    description: "Legendary Mughlai cuisine since 1913",
    address: "16 Jama Masjid, Old Delhi",
    city: "delhi",
    cuisine: ["Mughlai", "North Indian"],
    priceRange: 2,
    rating: 4.8,
    reviews: 512,
    image: "https://b.zmtcdn.com/data/pictures/1/19232821/6b7e6dc1ca2cc8f01b483948f440e1ed.jpeg",
    isVeg: false,
    isJain: false,
    isHalal: true,
    dishes: ["delhi-seekh-kebab", "delhi-butter-chicken", "delhi-biryani"],
  },
  {
    id: "delhi-saravana-bhavan",
    name: "Saravana Bhavan",
    description: "Authentic South Indian vegetarian chain",
    address: "42 Connaught Place, Delhi",
    city: "delhi",
    cuisine: ["South Indian", "Tamil"],
    priceRange: 2,
    rating: 4.4,
    reviews: 324,
    image: "https://b.zmtcdn.com/data/pictures/6/20956166/233f7ee409a56724377e14b933e783a3_featured_v2.jpg",
    isVeg: true,
    isJain: true,
    isHalal: false,
    dishes: ["delhi-masala-dosa", "delhi-idli-sambar", "delhi-filter-coffee"],
  },
  {
    id: "delhi-paranthe-wali-gali",
    name: "Paranthe Wali Gali",
    description: "Famous for traditional stuffed parathas",
    address: "Chandni Chowk, Old Delhi",
    city: "delhi",
    cuisine: ["North Indian", "Street Food"],
    priceRange: 1,
    rating: 4.6,
    reviews: 278,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKq95ANJ8-yVPYOny_NVklBcY9YCy4aBXFBA&s",
    isVeg: true,
    isJain: false,
    isHalal: false,
    dishes: ["delhi-aloo-paratha", "delhi-paneer-paratha", "delhi-lassi"],
  },
  {
    id: "bangalore-vidyarthi-bhavan",
    name: "Vidyarthi Bhavan",
    description: "Iconic South Indian breakfast spot since 1943",
    address: "Gandhi Bazaar, Basavanagudi, Bengaluru",
    city: "bangalore",
    cuisine: ["South Indian", "Karnataka"],
    priceRange: 1,
    rating: 4.7,
    reviews: 412,
    image: "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/2025-03/Vidyarthi%20Bhavan.jpg",
    isVeg: true,
    isJain: false,
    isHalal: false,
    dishes: ["bangalore-masala-dosa", "bangalore-idli-vada", "bangalore-filter-coffee"],
  },
  {
    id: "bangalore-truffles",
    name: "Truffles",
    description: "Popular for American and Continental cuisine",
    address: "Koramangala, Bengaluru",
    city: "bangalore",
    cuisine: ["Continental", "American", "Fusion"],
    priceRange: 2,
    rating: 4.5,
    reviews: 356,
    image: "https://b.zmtcdn.com/data/pictures/0/51040/3614a681863f438e8a1018e313ed070f.jpg",
    isVeg: false,
    isJain: false,
    isHalal: false,
    dishes: ["bangalore-chicken-steak", "bangalore-pasta", "bangalore-burger"],
  },
  {
    id: "bangalore-meghana-foods",
    name: "Meghana Foods",
    description: "Famous for Andhra-style biryani and spicy curries",
    address: "Residency Road, Bengaluru",
    city: "bangalore",
    cuisine: ["Andhra", "Hyderabadi"],
    priceRange: 2,
    rating: 4.6,
    reviews: 389,
    image: "https://b.zmtcdn.com/data/pictures/0/59690/677683aae9b3d94a437a3616be178bd3.jpg?fit=around",
    isVeg: false,
    isJain: false,
    isHalal: true,
    dishes: ["bangalore-chicken-biryani", "bangalore-andhra-chicken", "bangalore-paneer-butter-masala"],
  },
  // Add more restaurants for other cities...
]

// Update the dishes array to use real images
export const dishes: Dish[] = [
  // Mumbai dishes
  {
    id: "mumbai-vada-pav",
    name: "Vada Pav",
    description: "Mumbai's favorite street food - spicy potato fritter in a bun with chutneys",
    price: 30,
    image: "https://i.ytimg.com/vi/Z9Y60u8tI9M/maxresdefault.jpg",
    restaurant: "mumbai-spice-garden",
    restaurantName: "Spice Garden",
    city: "mumbai",
    cuisine: "Street Food",
    isVeg: true,
    spiceLevel: 3,
    tasteTags: ["Spicy", "Savory", "Tangy"],
    rating: 4.8,
    reviews: 156,
    moods: ["Comfort Food", "Quick Bite", "Street Food Craving"],
  },
  {
    id: "mumbai-pav-bhaji",
    name: "Pav Bhaji",
    description: "Mashed vegetable curry served with buttered bread rolls",
    price: 120,
    image: "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/01171428/YFL-Pav-Bhaji-3.jpg",
    restaurant: "mumbai-spice-garden",
    restaurantName: "Spice Garden",
    city: "mumbai",
    cuisine: "Street Food",
    isVeg: true,
    spiceLevel: 2,
    tasteTags: ["Buttery", "Tangy", "Comforting"],
    rating: 4.7,
    reviews: 132,
    moods: ["Comfort Food", "Rainy Day", "Family Meal"],
  },
  {
    id: "mumbai-malvani-fish-curry",
    name: "Malvani Fish Curry",
    description: "Spicy coconut-based fish curry from the Konkan coast",
    price: 350,
    image: "https://www.yummefy.com/uploads/1156e47258.jpg",
    restaurant: "mumbai-spice-garden",
    restaurantName: "Spice Garden",
    city: "mumbai",
    cuisine: "Coastal",
    isVeg: false,
    spiceLevel: 4,
    tasteTags: ["Spicy", "Coconutty", "Rich"],
    rating: 4.6,
    reviews: 98,
    moods: ["Seafood Craving", "Traditional Meal", "Weekend Indulgence"],
  },
  {
    id: "mumbai-butter-chicken",
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce",
    price: 320,
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/07/chicken-butter-masala-recipe.jpg",
    restaurant: "mumbai-punjabi-dhaba",
    restaurantName: "Punjabi Dhaba",
    city: "mumbai",
    cuisine: "North Indian",
    isVeg: false,
    spiceLevel: 2,
    tasteTags: ["Creamy", "Tangy", "Rich"],
    rating: 4.5,
    reviews: 124,
    moods: ["Comfort Food", "Date Night", "Indulgent Meal"],
  },
  // Delhi dishes
  {
    id: "delhi-seekh-kebab",
    name: "Seekh Kebab",
    description: "Grilled minced meat skewers with aromatic spices",
    price: 280,
    image: "https://static01.nyt.com/images/2019/09/25/dining/aw-lamb-kebabs/aw-lamb-kebabs-superJumbo.jpg",
    restaurant: "delhi-karim",
    restaurantName: "Karim's",
    city: "delhi",
    cuisine: "Mughlai",
    isVeg: false,
    spiceLevel: 3,
    tasteTags: ["Smoky", "Juicy", "Spiced"],
    rating: 4.9,
    reviews: 203,
    moods: ["Protein Craving", "Dinner Date", "Special Occasion"],
  },
  {
    id: "delhi-butter-chicken",
    name: "Butter Chicken",
    description: "The iconic Delhi-style butter chicken with rich tomato gravy",
    price: 350,
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/07/chicken-butter-masala-recipe.jpg",
    restaurant: "delhi-karim",
    restaurantName: "Karim's",
    city: "delhi",
    cuisine: "Mughlai",
    isVeg: false,
    spiceLevel: 2,
    tasteTags: ["Creamy", "Smoky", "Rich"],
    rating: 4.8,
    reviews: 245,
    moods: ["Comfort Food", "Family Dinner", "Weekend Treat"],
  },
  // Bangalore dishes
  {
    id: "bangalore-masala-dosa",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato filling",
    price: 120,
    image:
      "https://www.mydelicious-recipes.com/home/images/120_1080_1080/mydelicious-recipes-masala-dosa-with-batter-Masala%20Dosa",
    restaurant: "bangalore-vidyarthi-bhavan",
    restaurantName: "Vidyarthi Bhavan",
    city: "bangalore",
    cuisine: "South Indian",
    isVeg: true,
    spiceLevel: 2,
    tasteTags: ["Crispy", "Savory", "Tangy"],
    rating: 4.7,
    reviews: 178,
    moods: ["Breakfast", "Traditional", "Light Meal"],
  },
  // Add more dishes with real images
  {
    id: "hyderabad-biryani",
    name: "Hyderabadi Biryani",
    description: "Aromatic rice dish with tender meat, herbs and spices",
    price: 280,
    image: "https://vismaifood.com/storage/app/uploads/public/980/eb9/ed6/thumb__1200_0_0_0_auto.jpg",
    restaurant: "delhi-karim",
    restaurantName: "Karim's",
    city: "hyderabad",
    cuisine: "Hyderabadi",
    isVeg: false,
    spiceLevel: 3,
    tasteTags: ["Aromatic", "Spicy", "Flavorful"],
    rating: 4.9,
    reviews: 312,
    moods: ["Special Occasion", "Weekend Treat", "Indulgent Meal"],
  },
  {
    id: "delhi-paneer-tikka",
    name: "Paneer Tikka",
    description: "Grilled cottage cheese cubes marinated in spices",
    price: 220,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkTmoN6HX1YlataD_t0nUSL1Re6-zhsCPikQ&s",
    restaurant: "delhi-karim",
    restaurantName: "Karim's",
    city: "delhi",
    cuisine: "North Indian",
    isVeg: true,
    spiceLevel: 2,
    tasteTags: ["Smoky", "Tangy", "Spiced"],
    rating: 4.6,
    reviews: 187,
    moods: ["Protein Craving", "Dinner Date", "Vegetarian Delight"],
  },
  {
    id: "delhi-chole-bhature",
    name: "Chole Bhature",
    description: "Spicy chickpea curry served with deep-fried bread",
    price: 150,
    image:
      "https://cdn.zeptonow.com/production///tr:w-600,ar-100-100,pr-true,f-auto,q-80/web/recipes/chola-bhatura.png",
    restaurant: "delhi-paranthe-wali-gali",
    restaurantName: "Paranthe Wali Gali",
    city: "delhi",
    cuisine: "North Indian",
    isVeg: true,
    spiceLevel: 3,
    tasteTags: ["Spicy", "Tangy", "Filling"],
    rating: 4.7,
    reviews: 203,
    moods: ["Comfort Food", "Weekend Treat", "Indulgent Meal"],
  },
]

// Update the reviews array to use real images
export const reviews: Review[] = [
  {
    id: "review-1",
    user: {
      id: "user-1",
      name: "Priya Sharma",
      image: "https://data.thefeedfeed.com/static/profiles/15296072005b2bf42077b71.jpg",
      level: 4,
      badges: ["Top Reviewer", "Food Photographer"],
    },
    dishId: "mumbai-vada-pav",
    restaurantId: "mumbai-spice-garden",
    rating: 5,
    spiceRating: 3,
    comment:
      "The best vada pav in Mumbai! Perfect balance of spices and the green chutney is to die for. A must-try for anyone visiting the city.",
    date: "2023-12-15",
    images: [
      "https://i.ytimg.com/vi/Z9Y60u8tI9M/maxresdefault.jpg",
      "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/01171428/YFL-Pav-Bhaji-3.jpg",
    ],
    likes: 42,
    emojis: ["😋", "🔥", "👌"],
  },
  {
    id: "review-2",
    user: {
      id: "user-2",
      name: "Rahul Desai",
      image: "https://data.thefeedfeed.com/static/profiles/15296072005b2bf42077b71.jpg",
      level: 3,
      badges: ["Spice Lover"],
    },
    dishId: "delhi-butter-chicken",
    restaurantId: "delhi-karim",
    rating: 5,
    spiceRating: 2,
    comment:
      "Karim's butter chicken is legendary for a reason. The gravy is rich and flavorful, and the chicken is perfectly cooked. Worth every penny!",
    date: "2023-11-28",
    images: ["https://www.indianhealthyrecipes.com/wp-content/uploads/2022/07/chicken-butter-masala-recipe.jpg"],
    likes: 36,
    emojis: ["😍", "🤤", "💯"],
  },
  // Add more reviews...
]

export const moods: Mood[] = [
  {
    id: "comfort-food",
    name: "Comfort Food",
    icon: "🍲",
    description: "Warm, hearty dishes that feel like a hug",
  },
  {
    id: "spicy-craving",
    name: "Spicy Craving",
    icon: "🔥",
    description: "When you need that heat kick",
  },
  {
    id: "healthy-option",
    name: "Healthy Option",
    icon: "🥗",
    description: "Nutritious and light on the stomach",
  },
  {
    id: "sweet-tooth",
    name: "Sweet Tooth",
    icon: "🍰",
    description: "For dessert lovers and sugar cravings",
  },
  {
    id: "street-food",
    name: "Street Food",
    icon: "🥪",
    description: "Quick, flavorful bites on the go",
  },
  {
    id: "celebration",
    name: "Celebration",
    icon: "🎉",
    description: "Special occasion dishes to mark moments",
  },
  {
    id: "rainy-day",
    name: "Rainy Day",
    icon: "☔",
    description: "Perfect for monsoon cravings",
  },
  {
    id: "date-night",
    name: "Date Night",
    icon: "💑",
    description: "Impressive dishes to share with someone special",
  },
]
