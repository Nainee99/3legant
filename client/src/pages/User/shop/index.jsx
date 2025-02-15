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
import useProductStore from "@/lib/store/useProductStore";

export default function Shop() {
  const { products, fetchProducts, loading, error } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
  }, [sortOrder]);

  return (
    <>
      <Navbar />
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
          {loading ? (
            <p className="text-center text-lg">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              <aside className="w-full md:w-64">
                <Filter onFilterChange={handleFilterChange} />
              </aside>
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} {...product} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
