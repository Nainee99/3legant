import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import useWishlistStore from "@/lib/store/useWishlistStore";
import { useAuthStore } from "@/lib/store/useAuthStore";

export function ProductCard({ _id, name, price, images = [], ratings, badge }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { token } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const imageUrl = images.length > 0 ? images[0] : "/placeholder.svg";

  // Check if product is in wishlist
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsFavorite(storedWishlist.some((item) => item._id === _id));
  }, [_id, wishlist]); // Depend only on `_id` and `wishlist`

  const handleWishlistToggle = async () => {
    if (!token) {
      alert("Please login to manage your wishlist.");
      return;
    }

    if (isFavorite) {
      await removeFromWishlist(_id, token);
    } else {
      await addToWishlist(_id, token);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="group relative w-[260px]">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
        {badge && (
          <Badge className="absolute left-2 top-2 bg-transparent text-black">
            {badge}
          </Badge>
        )}
        <button
          className={`absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${
            isFavorite ? "bg-black" : "bg-transparent hover:bg-black/20"
          } focus:outline-none`}
          onClick={handleWishlistToggle}
        >
          <svg
            className={`h-4 w-4 transition-all duration-200 ${
              isFavorite ? "text-white" : "text-gray-500 hover:text-black"
            }`}
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button className="w-full rounded-md bg-black py-2 text-white transition-colors duration-200 hover:bg-black/90">
            Add to cart
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < ratings ? "fill-yellow-400" : "fill-gray-200"
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-600">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
