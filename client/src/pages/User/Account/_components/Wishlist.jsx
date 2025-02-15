import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import EmptyState from "./EmptyState";
import useWishlistStore from "@/lib/store/useWishlistStore";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function Wishlist() {
  const { wishlist, fetchWishlist, removeFromWishlist } = useWishlistStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchWishlist(token);
    }
  }, [token, fetchWishlist]);

  if (wishlist.length === 0) {
    return (
      <EmptyState
        type="wishlist"
        message="Your wishlist is empty. Start adding items you like to your wishlist."
      />
    );
  }

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold mb-6">Your Wishlist</h2>
      <div className="border rounded-lg divide-y">
        <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm text-gray-500">
          <div className="col-span-6">Product</div>
          <div className="col-span-3">Price</div>
          <div className="col-span-3">Action</div>
        </div>
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-12 gap-4 p-4 items-center"
          >
            <div className="col-span-6 flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => removeFromWishlist(item._id, token)}
              >
                <X className="h-4 w-4" />
              </Button>
              <img //
                src={
                  item.images && Array.isArray(item.images)
                    ? item.images[0]
                    : "/placeholder.svg"
                }
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Color: {item.color || "N/A"}
                </p>
              </div>
            </div>
            <div className="col-span-3">
              <p className="font-medium">${item.price}</p>
            </div>
            <div className="col-span-3">
              <Button>Add to cart</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
