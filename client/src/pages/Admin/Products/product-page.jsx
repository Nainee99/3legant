import { useState } from "react";
import { Search, Download, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data - replace with your actual data
const products = [
  {
    id: 1,
    name: "T-shirt for Men",
    price: 90.0,
    image: "/placeholder.svg",
    category: "Clothing",
  },
  {
    id: 2,
    name: "Travel Bag Jeans",
    price: 19.5,
    image: "/placeholder.svg",
    category: "Accessories",
  },
  {
    id: 3,
    name: "Jeans shorts",
    price: 70.0,
    image: "/placeholder.svg",
    category: "Clothing",
  },
  {
    id: 4,
    name: "Sofa for interior",
    price: 375.0,
    image: "/placeholder.svg",
    category: "Furniture",
  },
  {
    id: 5,
    name: "Leather Wallet",
    price: 375.0,
    image: "/placeholder.svg",
    category: "Accessories",
  },
  // ... add more products
];

const categories = [
  "All Categories",
  "Clothing",
  "Accessories",
  "Electronics",
  "Furniture",
];

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-yellow-600"
          onClick={() => onEdit(product)}
        >
          <Pencil className="h-4 w-4" />
          <span className="ml-2">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-red-600"
          onClick={() => onDelete(product)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="ml-2">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "All Categories" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (product) => {
    // Implement edit functionality
    console.log("Edit product:", product);
  };

  const handleDelete = (product) => {
    // Implement delete functionality
    console.log("Delete product:", product);
  };

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting products...");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products grid</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <a href="/products/create">
              <Plus className="mr-2 h-4 w-4" />
              Create new
            </a>
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
