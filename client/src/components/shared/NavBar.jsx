import { useState } from "react";
import { User, ShoppingBag, ChevronDown, X, TicketPercent } from "lucide-react";

export default function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Notification Banner */}
      {showBanner && (
        <div className="relative bg-black text-white px-4 py-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <TicketPercent />
            <span>30% off storewide — Limited time!</span>
            <a
              href="/shop"
              className="text-yellow-400 hover:text-yellow-300 inline-flex items-center"
            >
              Shop Now
              <span className="ml-1">→</span>
            </a>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close banner</span>
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-[#FFC94C] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-black">
            3legant.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-black hover:text-gray-700">
              Home
            </a>
            <div className="relative group">
              <button className="text-black hover:text-gray-700 inline-flex items-center">
                Shop
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="relative group">
              <button className="text-black hover:text-gray-700 inline-flex items-center">
                Product
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            <a href="/contact" className="text-black hover:text-gray-700">
              Contact Us
            </a>
          </div>

          {/* Utility Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-black hover:text-gray-700">
              <User className="h-6 w-6" />
              <span className="sr-only">Account</span>
            </button>
            <button className="text-black hover:text-gray-700 relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="sr-only">Cart</span>
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black hover:text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#FFC94C] py-2 px-4 transition-all ease-in-out duration-300">
            <a href="/" className="block py-2 text-black hover:text-gray-700">
              Home
            </a>
            <a
              href="/shop"
              className="block py-2 text-black hover:text-gray-700"
            >
              Shop
            </a>
            <a
              href="/product"
              className="block py-2 text-black hover:text-gray-700"
            >
              Product
            </a>
            <a
              href="/contact"
              className="block py-2 text-black hover:text-gray-700"
            >
              Contact Us
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}
