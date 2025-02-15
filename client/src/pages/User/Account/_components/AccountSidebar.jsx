import { useState, useRef } from "react";
import { Plus } from "lucide-react";

export default function AccountSidebar({ activeTab, onTabChange }) {
  const [profileImage, setProfileImage] = useState(
    "/placeholder.svg?height=100&width=100"
  );
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            <img
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={handleImageClick}
            className="absolute bottom-0 right-0 p-1 bg-black rounded-full text-white hover:bg-black/90"
          >
            <Plus className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <h2 className="mt-4 font-semibold text-lg">Sofia Havertz</h2>
      </div>

      <nav className="space-y-2">
        {[
          { id: "account", label: "Account" },
          { id: "address", label: "Address" },
          { id: "orders", label: "Orders" },
          { id: "wishlist", label: "Wishlist" },
          { id: "logout", label: "Log Out" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === item.id
                ? "text-black font-medium bg-gray-100"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
