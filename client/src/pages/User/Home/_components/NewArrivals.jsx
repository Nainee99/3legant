import { ProductCard } from "../../../../components/shared/ProductCard";
import { useEffect, useState } from "react";
import useProductStore from "@/lib/store/useProductStore";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function NewArrivals() {
  const { fetchProducts, products } = useProductStore();
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Show only the first 4 new products
    if (products.length > 0) {
      setNewArrivals(products.slice(0, 4));
    }
  }, [products]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
        </div>

        {/* Grid on larger screens */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>

        {/* Mobile carousel */}
        <MobileNewArrivals products={newArrivals} />
      </div>
    </section>
  );
}

export function MobileNewArrivals({ products }) {
  return (
    <div className="block lg:hidden mt-12 relative">
      <Carousel>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product._id}>
              <div className="flex justify-center">
                <ProductCard {...product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Adjusted position for the previous and next buttons */}
        <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black rounded-full p-2 shadow-md" />
        <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black rounded-full p-2 shadow-md" />
      </Carousel>
    </div>
  );
}
