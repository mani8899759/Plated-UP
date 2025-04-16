import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download, Printer } from "lucide-react"

interface InvoiceItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface InvoiceProps {
  invoiceNumber: string
  date: string
  restaurant: {
    name: string
    address: string
    gst?: string
  }
  customer: {
    name: string
    address?: string
    phone?: string
  }
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  className?: string
}

export function Invoice({
  invoiceNumber,
  date,
  restaurant,
  customer,
  items,
  subtotal,
  tax,
  total,
  className,
}: InvoiceProps) {
  return (
    <Card className={`w-full max-w-3xl mx-auto shadow-lg ${className}`}>
      <CardHeader className="bg-primary/5 rounded-t-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-primary">Invoice</CardTitle>
            <CardDescription className="mt-1">#{invoiceNumber}</CardDescription>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-lg font-bold">{restaurant.name}</div>
            <div className="text-sm text-gray-500">{restaurant.address}</div>
            {restaurant.gst && <div className="text-sm text-gray-500">GST: {restaurant.gst}</div>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h3 className="font-semibold text-sm text-gray-500 mb-1">BILLED TO</h3>
            <div className="font-medium">{customer.name}</div>
            {customer.address && <div className="text-sm text-gray-500">{customer.address}</div>}
            {customer.phone && <div className="text-sm text-gray-500">{customer.phone}</div>}
          </div>
          <div className="mt-4 md:mt-0">
            <h3 className="font-semibold text-sm text-gray-500 mb-1">DATE</h3>
            <div>{date}</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left font-semibold text-gray-500">Item</th>
                <th className="py-2 text-right font-semibold text-gray-500">Qty</th>
                <th className="py-2 text-right font-semibold text-gray-500">Price</th>
                <th className="py-2 text-right font-semibold text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3">{item.name}</td>
                  <td className="py-3 text-right">{item.quantity}</td>
                  <td className="py-3 text-right">₹{item.price.toFixed(2)}</td>
                  <td className="py-3 text-right">₹{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-xs">
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Tax (GST)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between py-1 font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t">
          <p className="text-center text-gray-500 text-sm">
            Thank you for dining with us! We hope to serve you again soon.
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 rounded-b-lg flex justify-end gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}
