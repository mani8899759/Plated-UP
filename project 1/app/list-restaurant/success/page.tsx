"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"

export default function ListingSuccessPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8">
            <Check className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Restaurant Submitted Successfully!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for listing your restaurant with PlatedUp. Our team will review your submission and get back to
            you shortly.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium mb-4">What happens next?</h2>
            <ol className="text-left space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                  1
                </div>
                <div>
                  <p className="font-medium">Review Process</p>
                  <p className="text-gray-600">
                    Our team will review your restaurant details within 48 hours to ensure everything meets our
                    guidelines.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                  2
                </div>
                <div>
                  <p className="font-medium">Verification</p>
                  <p className="text-gray-600">
                    We may contact you to verify some details or request additional information if needed.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                  3
                </div>
                <div>
                  <p className="font-medium">Go Live</p>
                  <p className="text-gray-600">
                    Once approved, your restaurant will be live on PlatedUp and visible to thousands of food lovers!
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/profile">
                Go to Dashboard <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
