import { useState, useEffect } from "react";
import Navbar from "@/components/shared/NavBar";
import { ProductCard } from "@/components/shared/ProductCard";
import { Filter } from "./_components/Filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import product1 from "@/assets/products/product1.png";
import product2 from "@/assets/products/product2.png";

const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 99.99,
    image: product1,
    rating: 4,
    category: "Earbuds",
  },
  {
    id: 2,
    name: "Over-Ear Headphones",
    price: 199.99,
    image: product2,
    rating: 5,
    category: "Headphones",
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 249.99,
    image: product1,
    rating: 4,
    category: "Watches",
  },
  {
    id: 4,
    name: "Phone Case",
    price: 19.99,
    image: product2,
    rating: 3,
    category: "Accessories",
  },
  {
    id: 5,
    name: "Smartphone",
    price: 699.99,
    image: product1,
    rating: 5,
    category: "Phones",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: product2,
    rating: 4,
    category: "Other",
  },
];

export default function Shop() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleFilterChange = ({ categories, priceRange }) => {
    const filtered = products.filter((product) => {
      const categoryMatch =
        categories.length === 0 || categories.includes(product.category);
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });
    setFilteredProducts(filtered);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  useEffect(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sorted);
  }, [sortOrder]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shop</h1>
          <Select onValueChange={handleSortChange} defaultValue="asc">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <Filter onFilterChange={handleFilterChange} />
          </aside>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  rating={product.rating}
                  badge={product.category}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
