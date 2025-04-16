"use client"

import { useState } from "react"
import Link from "next/link"
import { Invoice } from "@/components/invoice"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { ArrowLeft, FileText } from "lucide-react"
import Image from "next/image"

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)

  // Sample invoice data
  const invoices = [
    {
      id: "INV-001",
      restaurant: "Spice Garden",
      date: "15 Jun 2023",
      amount: 850,
      items: [
        { id: "item-1", name: "Vada Pav", quantity: 2, price: 30 },
        { id: "item-2", name: "Pav Bhaji", quantity: 1, price: 120 },
        { id: "item-3", name: "Masala Dosa", quantity: 1, price: 150 },
        { id: "item-4", name: "Butter Chicken", quantity: 1, price: 320 },
        { id: "item-5", name: "Naan", quantity: 2, price: 40 },
        { id: "item-6", name: "Sweet Lassi", quantity: 2, price: 60 },
      ],
    },
    {
      id: "INV-002",
      restaurant: "Karim's",
      date: "28 May 2023",
      amount: 1250,
      items: [
        { id: "item-1", name: "Seekh Kebab", quantity: 1, price: 280 },
        { id: "item-2", name: "Butter Chicken", quantity: 1, price: 350 },
        { id: "item-3", name: "Biryani", quantity: 1, price: 400 },
        { id: "item-4", name: "Roomali Roti", quantity: 4, price: 30 },
        { id: "item-5", name: "Gulab Jamun", quantity: 2, price: 60 },
      ],
    },
    {
      id: "INV-003",
      restaurant: "Vidyarthi Bhavan",
      date: "10 Apr 2023",
      amount: 450,
      items: [
        { id: "item-1", name: "Masala Dosa", quantity: 2, price: 120 },
        { id: "item-2", name: "Idli Vada", quantity: 1, price: 80 },
        { id: "item-3", name: "Filter Coffee", quantity: 2, price: 40 },
        { id: "item-4", name: "Kesari Bath", quantity: 1, price: 50 },
      ],
    },
  ]

  const getInvoiceDetails = (id: string) => {
    const invoice = invoices.find((inv) => inv.id === id)
    if (!invoice) return null

    const subtotal = invoice.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.05 // 5% tax
    const total = subtotal + tax

    return {
      invoiceNumber: invoice.id,
      date: invoice.date,
      restaurant: {
        name: invoice.restaurant,
        address: "123 Food Street, Mumbai, India",
        gst: "22AAAAA0000A1Z5",
      },
      customer: {
        name: "Arjun Kapoor",
        address: "456 Park Avenue, Mumbai, India",
        phone: "+91 98765 43210",
      },
      items: invoice.items,
      subtotal,
      tax,
      total,
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/profile">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Your Invoices</h1>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Invoices</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {selectedInvoice ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="mb-4">
                  <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
                    Back to Invoices
                  </Button>
                </div>
                <Invoice {...getInvoiceDetails(selectedInvoice)!} />
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {invoices.map((invoice) => (
                  <motion.div
                    key={invoice.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedInvoice(invoice.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-primary mr-2" />
                              <span className="font-medium">{invoice.id}</span>
                            </div>
                            <p className="text-gray-500 mt-1">{invoice.restaurant}</p>
                            <p className="text-sm text-gray-400 mt-1">{invoice.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">₹{invoice.amount}</p>
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Paid</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Image
                            src={`/images/restaurant${(Number.parseInt(invoice.id.split("-")[1]) % 3) + 1}.png`}
                            alt={invoice.restaurant}
                            width={300}
                            height={100}
                            className="rounded-md w-full h-24 object-cover"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {invoices.slice(0, 2).map((invoice) => (
                <motion.div
                  key={invoice.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedInvoice(invoice.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-primary mr-2" />
                            <span className="font-medium">{invoice.id}</span>
                          </div>
                          <p className="text-gray-500 mt-1">{invoice.restaurant}</p>
                          <p className="text-sm text-gray-400 mt-1">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{invoice.amount}</p>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Paid</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Image
                          src={`/images/restaurant${(Number.parseInt(invoice.id.split("-")[1]) % 3) + 1}.png`}
                          alt={invoice.restaurant}
                          width={300}
                          height={100}
                          className="rounded-md w-full h-24 object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {invoices.map((invoice) => (
                <motion.div
                  key={invoice.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedInvoice(invoice.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-primary mr-2" />
                            <span className="font-medium">{invoice.id}</span>
                          </div>
                          <p className="text-gray-500 mt-1">{invoice.restaurant}</p>
                          <p className="text-sm text-gray-400 mt-1">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{invoice.amount}</p>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Paid</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Image
                          src={`/images/restaurant${(Number.parseInt(invoice.id.split("-")[1]) % 3) + 1}.png`}
                          alt={invoice.restaurant}
                          width={300}
                          height={100}
                          className="rounded-md w-full h-24 object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
