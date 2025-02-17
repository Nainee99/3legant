import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProductsPage from "./Products/product-page";
import { SidebarNav } from "./Dashboard/_components/sidebar";
import {
  Package,
  Bell,
  UserCircle,
  Settings2,
  Search,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import CreateProduct from "./Products/create-product";
import CategoriesPage from "./Products/category-page";
import OrdersPage from "./Order/orders-page";
import OrderDetailsPage from "./Order/order-details";

function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside
          className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-white shadow-sm transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center gap-2 font-semibold text-yellow-500">
              <Package className="h-6 w-6" />
              <span>3legant Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              ×
            </Button>
          </div>
          <div className="p-4">
            <SidebarNav />
          </div>
        </aside>

        <main className="ml-64 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                ☰
              </Button>
              <div className="relative w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search..." className="pl-8" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <img
                      src="/placeholder.svg"
                      alt="Avatar"
                      className="h-8 w-8 rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings2 className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="p-6">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="products/" element={<ProductsPage />} />
              <Route path="products/create" element={<CreateProduct />} />
              <Route path="products/categories" element={<CategoriesPage />} />

              <Route path="orders/*" element={<OrdersPage />} />
              <Route path="orders/:id" element={<OrderDetailsPage />} />

              <Route path="customers/*" element={<h1>Customer</h1>} />
              <Route path="statistics/*" element={<h1>Statistics</h1>} />
              <Route path="reviews/*" element={<h1>Review</h1>} />
              <Route path="transactions/*" element={<h1>Transaction</h1>} />
              <Route path="sellers/*" element={<h1>Seller</h1>} />
              <Route path="offers/*" element={<h1>Offer</h1>} />
              <Route path="appearance/*" element={<h1>Appearance</h1>} />
              <Route path="settings/*" element={<h1>Setting</h1>} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
