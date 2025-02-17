import { useState } from "react";
import { MapPin, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Sample order data
const orderData = {
  id: "3453012",
  date: "Wed, Aug 13, 2020, 4:34PM",
  status: "delivered",
  customer: {
    name: "John Alexander",
    email: "alex@example.com",
    phone: "+998 99 22123456",
  },
  shipping: {
    method: "Fargo express",
    paymentMethod: "Card card",
    address: {
      city: "Tashkent, Uzbekistan",
      street: "Beruniy 369",
      details: "Block A, House 123, Floor 2",
    },
  },
  payment: {
    cardNumber: "Master Card **** **** 4768",
    businessName: "Master Card, inc.",
    phone: "+1 (800) 555-154-52",
  },
  items: [
    {
      id: 1,
      name: "Supreme helinox chair one",
      image: "/placeholder.svg",
      quantity: 2,
      price: 43.5,
    },
    {
      id: 2,
      name: "Gopro hero 7",
      image: "/placeholder.svg",
      quantity: 1,
      price: 43.5,
    },
  ],
  subtotal: 973.35,
  shipping: 10.0,
  total: 983.0,
};

export default function OrderDetailsPage() {
  const [status, setStatus] = useState(orderData.status);
  const [note, setNote] = useState("");

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order details</h1>
          <div className="mt-1 text-sm text-gray-500">
            <Calendar className="mr-2 inline-block h-4 w-4" />
            {orderData.date}
          </div>
          <div className="mt-1 text-sm text-gray-500">#{orderData.id}</div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Change status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button>Save</Button>
          <Button variant="outline">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Customer</h2>
            <div className="space-y-2">
              <div className="font-medium">{orderData.customer.name}</div>
              <div>{orderData.customer.email}</div>
              <div>{orderData.customer.phone}</div>
              <Button variant="link" className="p-0">
                View profile
              </Button>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Shipping</h2>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Shipping:</span>{" "}
                {orderData.shipping.method}
              </div>
              <div>
                <span className="font-medium">Payment method:</span>{" "}
                {orderData.shipping.paymentMethod}
              </div>
              <div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Payment made
                </Badge>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Deliver to</h2>
            <div className="space-y-2">
              <div>
                <span className="font-medium">City:</span>{" "}
                {orderData.shipping?.address?.city || "N/A"}
              </div>

              <div>
                <span className="font-medium">Street:</span>{" "}
                {orderData.shipping?.address?.street || "N/A"}
              </div>
              <div>
                <span className="font-medium">Address:</span>{" "}
                {orderData.shipping?.address?.details || "N/A"}
              </div>
              <Button variant="link" className="p-0">
                <MapPin className="mr-2 h-4 w-4" />
                Open map
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Order Items */}
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Order Items</h2>
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                  <div className="text-right font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="mt-4 space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${orderData.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping cost</span>
                  <span>${orderData.shipping}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${orderData.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Payment info</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img
                  src="/mastercard.svg"
                  alt="Mastercard"
                  className="h-8 w-8"
                />
                {orderData.payment.cardNumber}
              </div>
              <div>
                <span className="font-medium">Business name:</span>{" "}
                {orderData.payment.businessName}
              </div>
              <div>
                <span className="font-medium">Phone:</span>{" "}
                {orderData.payment.phone}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Notes</h2>
            <Textarea
              placeholder="Add note about this order"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[100px]"
            />
            <Button className="mt-4">Save note</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
