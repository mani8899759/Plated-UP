import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PlatedUp
            </h3>
            <p className="text-gray-400 mb-4">
              Discover the best Indian dishes and restaurants across India. Share your food experiences and connect with
              fellow food lovers.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/restaurants" className="text-gray-400 hover:text-white">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href="/dishes" className="text-gray-400 hover:text-white">
                  Dishes
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/list-restaurant" className="text-gray-400 hover:text-white">
                  List Your Restaurant
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Cities</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/restaurants?city=mumbai" className="text-gray-400 hover:text-white">
                  Mumbai
                </Link>
              </li>
              <li>
                <Link href="/restaurants?city=delhi" className="text-gray-400 hover:text-white">
                  Delhi
                </Link>
              </li>
              <li>
                <Link href="/restaurants?city=bangalore" className="text-gray-400 hover:text-white">
                  Bangalore
                </Link>
              </li>
              <li>
                <Link href="/restaurants?city=hyderabad" className="text-gray-400 hover:text-white">
                  Hyderabad
                </Link>
              </li>
              <li>
                <Link href="/restaurants?city=chennai" className="text-gray-400 hover:text-white">
                  Chennai
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500">&copy; {new Date().getFullYear()} PlatedUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
