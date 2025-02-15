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

export function BestSeller() {
  const { fetchProducts, products } = useProductStore();
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch only the first 8 products
    if (products.length > 0) {
      setBestSellers(products.slice(0, 8));
    }
  }, [products]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Best Seller</h2>

        {/* Grid on larger screens */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <MobileBestSeller products={bestSellers} />
      </div>
    </section>
  );
}

export function MobileBestSeller({ products }) {
  return (
    <div className="block lg:hidden mt-12 relative">
      <Carousel>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id}>
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
