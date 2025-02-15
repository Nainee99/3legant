"use client";

import { useState } from "react";
import Navbar from "@/components/shared/NavBar";
import AccountDetails from "./_components/AccountDetails";
import Address from "./_components/Address";
import Orders from "./_components/Orders";
import Wishlist from "./_components/Wishlist";
import AccountSidebar from "./_components/AccountSidebar";


export default function Account() {
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "address":
        return <Address />;
      case "orders":
        return <Orders />;
      case "wishlist":
        return <Wishlist />;
      case "logout":
        // Handle logout logic here
        return null;
      default:
        return <AccountDetails />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">My Account</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 bg-white p-6 rounded-lg shadow-sm">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
