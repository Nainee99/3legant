import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import EmptyState from "./EmptyState";

export default function Address() {
  const addresses = {
    billing: {
      name: "Sofia Havertz",
      phone: "(+1) 234 567 890",
      address: "345 Long Island, NewYork, United States",
    },
    shipping: {
      name: "Sofia Havertz",
      phone: "(+1) 234 567 890",
      address: "345 Long Island, NewYork, United States",
    },
  };

  if (!addresses.billing && !addresses.shipping) {
    return (
      <EmptyState
        type="address"
        message="You haven't added any addresses yet. Add an address to make checkout easier."
      />
    );
  }

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold mb-6">Address</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">Billing Address</h3>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit billing address</span>
              </Button>
            </div>
            {addresses.billing ? (
              <div className="space-y-1">
                <p className="font-medium">{addresses.billing.name}</p>
                <p className="text-gray-600">{addresses.billing.phone}</p>
                <p className="text-gray-600">{addresses.billing.address}</p>
              </div>
            ) : (
              <Button variant="outline" className="w-full">
                Add Billing Address
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">Shipping Address</h3>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit shipping address</span>
              </Button>
            </div>
            {addresses.shipping ? (
              <div className="space-y-1">
                <p className="font-medium">{addresses.shipping.name}</p>
                <p className="text-gray-600">{addresses.shipping.phone}</p>
                <p className="text-gray-600">{addresses.shipping.address}</p>
              </div>
            ) : (
              <Button variant="outline" className="w-full">
                Add Shipping Address
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
