"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Camera, Check, ChevronRight, Clock, MapPin, Phone, Upload } from "lucide-react"

export default function ListRestaurantPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Update the addImage function to use real images instead of placeholders
  const addImage = () => {
    // In a real app, this would open a file picker
    // For this demo, we'll add restaurant images in rotation
    const restaurantImages = [
      "/images/restaurant1.png",
      "/images/restaurant2.png",
      "/images/restaurant3.png",
      "/images/vada-pav.png",
      "/images/butter-chicken.png",
      "/images/masala-dosa.png",
    ]

    const nextImageIndex = images.length % restaurantImages.length
    setImages([...images, restaurantImages[nextImageIndex]])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Redirect after success
    setTimeout(() => {
      router.push("/list-restaurant/success")
    }, 2000)
  }

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Details" },
    { number: 3, title: "Menu" },
    { number: 4, title: "Photos" },
    { number: 5, title: "Review" },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Restaurant Submitted Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for listing your restaurant with PlatedUp. Our team will review your submission and get back to
              you shortly.
            </p>
            <Button size="lg" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">List Your Restaurant</h1>
              <p className="text-gray-600">Join thousands of restaurant owners on PlatedUp and reach more customers</p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step) => (
                  <motion.div
                    key={step.number}
                    className={`flex flex-col items-center ${
                      currentStep === step.number ? "text-primary" : "text-gray-400"
                    } ${currentStep > step.number ? "text-green-600" : ""}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        currentStep === step.number
                          ? "bg-primary text-white"
                          : currentStep > step.number
                            ? "bg-green-600 text-white"
                            : "bg-gray-200"
                      }`}
                    >
                      {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
                    </div>
                    <span className="text-sm hidden md:block">{step.title}</span>
                  </motion.div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-6">Basic Information</h2>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="restaurant-name">Restaurant Name*</Label>
                          <Input id="restaurant-name" placeholder="Enter your restaurant name" required />
                        </div>

                        <div>
                          <Label htmlFor="restaurant-type">Restaurant Type*</Label>
                          <Select required>
                            <SelectTrigger id="restaurant-type">
                              <SelectValue placeholder="Select restaurant type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fine-dining">Fine Dining</SelectItem>
                              <SelectItem value="casual-dining">Casual Dining</SelectItem>
                              <SelectItem value="fast-food">Fast Food</SelectItem>
                              <SelectItem value="cafe">Café</SelectItem>
                              <SelectItem value="food-truck">Food Truck</SelectItem>
                              <SelectItem value="dhaba">Dhaba</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="cuisine">Cuisine*</Label>
                          <Select required>
                            <SelectTrigger id="cuisine">
                              <SelectValue placeholder="Select primary cuisine" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="north-indian">North Indian</SelectItem>
                              <SelectItem value="south-indian">South Indian</SelectItem>
                              <SelectItem value="mughlai">Mughlai</SelectItem>
                              <SelectItem value="punjabi">Punjabi</SelectItem>
                              <SelectItem value="gujarati">Gujarati</SelectItem>
                              <SelectItem value="bengali">Bengali</SelectItem>
                              <SelectItem value="maharashtrian">Maharashtrian</SelectItem>
                              <SelectItem value="goan">Goan</SelectItem>
                              <SelectItem value="kerala">Kerala</SelectItem>
                              <SelectItem value="andhra">Andhra</SelectItem>
                              <SelectItem value="hyderabadi">Hyderabadi</SelectItem>
                              <SelectItem value="chettinad">Chettinad</SelectItem>
                              <SelectItem value="street-food">Street Food</SelectItem>
                              <SelectItem value="fusion">Fusion</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="description">Description*</Label>
                          <Textarea
                            id="description"
                            placeholder="Tell us about your restaurant"
                            className="min-h-[100px]"
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end mt-6">
                    <Button type="button" onClick={() => setCurrentStep(2)}>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-6">Restaurant Details</h2>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="address">Address*</Label>
                          <Textarea id="address" placeholder="Enter your restaurant address" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City*</Label>
                            <Select required>
                              <SelectTrigger id="city">
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mumbai">Mumbai</SelectItem>
                                <SelectItem value="delhi">Delhi</SelectItem>
                                <SelectItem value="bangalore">Bangalore</SelectItem>
                                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                                <SelectItem value="chennai">Chennai</SelectItem>
                                <SelectItem value="kolkata">Kolkata</SelectItem>
                                <SelectItem value="jaipur">Jaipur</SelectItem>
                                <SelectItem value="kochi">Kochi</SelectItem>
                                <SelectItem value="amritsar">Amritsar</SelectItem>
                                <SelectItem value="goa">Goa</SelectItem>
                                <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                                <SelectItem value="pune">Pune</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="pincode">PIN Code*</Label>
                            <Input id="pincode" placeholder="Enter PIN code" required />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">Phone Number*</Label>
                            <Input id="phone" placeholder="Enter phone number" required />
                          </div>

                          <div>
                            <Label htmlFor="email">Email*</Label>
                            <Input id="email" type="email" placeholder="Enter email address" required />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="website">Website (Optional)</Label>
                          <Input id="website" placeholder="Enter website URL" />
                        </div>

                        <div>
                          <Label>Operating Hours*</Label>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <Label htmlFor="opening-time" className="text-sm">
                                Opening Time
                              </Label>
                              <Select required>
                                <SelectTrigger id="opening-time">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[...Array(24)].map((_, i) => (
                                    <SelectItem key={i} value={`${i}:00`}>
                                      {i === 0
                                        ? "12:00 AM"
                                        : i < 12
                                          ? `${i}:00 AM`
                                          : i === 12
                                            ? "12:00 PM"
                                            : `${i - 12}:00 PM`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="closing-time" className="text-sm">
                                Closing Time
                              </Label>
                              <Select required>
                                <SelectTrigger id="closing-time">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[...Array(24)].map((_, i) => (
                                    <SelectItem key={i} value={`${i}:00`}>
                                      {i === 0
                                        ? "12:00 AM"
                                        : i < 12
                                          ? `${i}:00 AM`
                                          : i === 12
                                            ? "12:00 PM"
                                            : `${i - 12}:00 PM`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label>Dietary Options</Label>
                          <div className="grid grid-cols-2 mt-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="veg" />
                              <label
                                htmlFor="veg"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Pure Vegetarian
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="jain" />
                              <label
                                htmlFor="jain"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Jain Food Available
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="halal" />
                              <label
                                htmlFor="halal"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Halal Certified
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="vegan" />
                              <label
                                htmlFor="vegan"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Vegan Options
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setCurrentStep(3)}>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-6">Menu Information</h2>

                      <Tabs defaultValue="add-dishes">
                        <TabsList className="mb-4">
                          <TabsTrigger value="add-dishes">Add Dishes</TabsTrigger>
                          <TabsTrigger value="upload-menu">Upload Menu</TabsTrigger>
                        </TabsList>

                        <TabsContent value="add-dishes">
                          <div className="space-y-6">
                            {[1, 2, 3].map((index) => (
                              <div key={index} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                  <h3 className="font-medium">Dish {index}</h3>
                                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                    Remove
                                  </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <Label htmlFor={`dish-name-${index}`}>Dish Name*</Label>
                                    <Input id={`dish-name-${index}`} placeholder="Enter dish name" required />
                                  </div>
                                  <div>
                                    <Label htmlFor={`dish-price-${index}`}>Price (₹)*</Label>
                                    <Input
                                      id={`dish-price-${index}`}
                                      type="number"
                                      placeholder="Enter price"
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <Label htmlFor={`dish-description-${index}`}>Description</Label>
                                  <Textarea id={`dish-description-${index}`} placeholder="Describe the dish" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor={`dish-category-${index}`}>Category</Label>
                                    <Select>
                                      <SelectTrigger id={`dish-category-${index}`}>
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="starters">Starters</SelectItem>
                                        <SelectItem value="main-course">Main Course</SelectItem>
                                        <SelectItem value="desserts">Desserts</SelectItem>
                                        <SelectItem value="beverages">Beverages</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor={`dish-spice-${index}`}>Spice Level</Label>
                                    <Select>
                                      <SelectTrigger id={`dish-spice-${index}`}>
                                        <SelectValue placeholder="Select spice level" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="1">Mild</SelectItem>
                                        <SelectItem value="2">Medium</SelectItem>
                                        <SelectItem value="3">Spicy</SelectItem>
                                        <SelectItem value="4">Very Spicy</SelectItem>
                                        <SelectItem value="5">Extremely Spicy</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id={`dish-veg-${index}`} />
                                    <label htmlFor={`dish-veg-${index}`} className="text-sm font-medium leading-none">
                                      Vegetarian
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}

                            <Button type="button" variant="outline" className="w-full">
                              + Add Another Dish
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="upload-menu">
                          <div className="text-center py-10 border-2 border-dashed rounded-lg">
                            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                            <h3 className="font-medium mb-2">Upload Your Menu</h3>
                            <p className="text-sm text-gray-500 mb-4">
                              Supported formats: PDF, JPG, PNG (Max size: 5MB)
                            </p>
                            <Button type="button">Choose File</Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setCurrentStep(4)}>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-6">Restaurant Photos</h2>

                      <div className="space-y-6">
                        <div>
                          <Label className="block mb-2">Cover Photo (Required)</Label>
                          <div className="border-2 border-dashed rounded-lg p-4 text-center">
                            {images.length > 0 ? (
                              <div className="relative">
                                <Image
                                  src={images[0] || "/placeholder.svg"}
                                  alt="Cover photo"
                                  width={600}
                                  height={400}
                                  className="mx-auto rounded-lg"
                                />
                                <Button type="button" variant="outline" size="sm" className="absolute top-2 right-2">
                                  Change
                                </Button>
                              </div>
                            ) : (
                              <div className="py-8">
                                <Camera className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                                <h3 className="font-medium mb-2">Upload Cover Photo</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                  This will be the main image for your restaurant
                                </p>
                                <Button type="button" onClick={addImage}>
                                  Choose File
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label className="block mb-2">Additional Photos</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {images.slice(1).map((image, index) => (
                              <div key={index} className="relative">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`Restaurant photo ${index + 1}`}
                                  width={200}
                                  height={150}
                                  className="rounded-lg object-cover w-full h-32"
                                />
                                <Button type="button" variant="outline" size="sm" className="absolute top-2 right-2">
                                  Remove
                                </Button>
                              </div>
                            ))}
                            {images.length < 7 && (
                              <button
                                type="button"
                                onClick={addImage}
                                className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center h-32 hover:border-primary"
                              >
                                <Camera className="h-6 w-6 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Add Photo</span>
                              </button>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Add up to 6 photos of your restaurant, food, and ambiance
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(3)}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setCurrentStep(5)}>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-6">Review & Submit</h2>

                      <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Restaurant Information</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Name</p>
                              <p className="font-medium">Spice Garden</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Type</p>
                              <p className="font-medium">Casual Dining</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Cuisine</p>
                              <p className="font-medium">North Indian</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Dietary Options</p>
                              <p className="font-medium">Vegetarian, Jain</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Contact & Location</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                              <div>
                                <p className="font-medium">123 Marine Drive</p>
                                <p className="text-gray-500">Mumbai, Maharashtra 400001</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <Phone className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                              <div>
                                <p className="font-medium">+91 98765 43210</p>
                                <p className="text-gray-500">info@spicegarden.com</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <Clock className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                              <div>
                                <p className="font-medium">Operating Hours</p>
                                <p className="text-gray-500">11:00 AM - 11:00 PM</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Menu</h3>
                          <p className="text-gray-500">3 dishes added</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Photos</h3>
                          <div className="grid grid-cols-3 gap-2">
                            {images.length > 0 ? (
                              images.map((image, index) => (
                                <Image
                                  key={index}
                                  src={image || "/placeholder.svg"}
                                  alt={`Restaurant photo ${index + 1}`}
                                  width={100}
                                  height={100}
                                  className="rounded-lg object-cover w-full h-20"
                                />
                              ))
                            ) : (
                              <p className="text-gray-500 col-span-3">No photos added</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox id="terms" required />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I agree to the terms and conditions
                            </label>
                            <p className="text-sm text-gray-500">
                              By submitting, you confirm that all information provided is accurate and you have the
                              authority to list this restaurant.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(4)}>
                      Back
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Restaurant"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
