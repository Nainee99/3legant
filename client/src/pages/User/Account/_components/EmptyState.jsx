import { PackageX, ShoppingBag, MapPin, Heart } from "lucide-react";

const icons = {
  orders: ShoppingBag,
  address: MapPin,
  wishlist: Heart,
  default: PackageX,
};

export default function EmptyState({ type = "default", message }) {
  const Icon = icons[type] || icons.default;

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <Icon className="w-8 h-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        No {type} found
      </h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
