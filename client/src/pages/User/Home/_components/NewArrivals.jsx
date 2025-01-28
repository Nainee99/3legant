// NewArrivals.js
import { ProductCard } from "../../../../components/shared/ProductCard";
import product1 from "@/assets/products/product1.png";
import product2 from "@/assets/products/product2.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const products = [
  {
    name: "Skullcandy - Crusher anc 2 wireless headphones",
    price: 299.99,
    image: product1,
    rating: 5,
    badge: "NEW",
  },
  {
    name: "Beats Studio Pro",
    price: 349.99,
    image: product2,
    rating: 5,
    badge: "NEW",
  },
  {
    name: "Sony - WH-CH720N Wireless Noise Canceling",
    price: 149.99,
    image: product1,
    rating: 5,
    badge: "NEW",
  },
  {
    name: "Skullcandy - Rail True Wireless Earbuds",
    price: 79.99,
    image: product2,
    rating: 5,
    badge: "NEW",
  },
];

export function NewArrivals() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
        </div>

        {/* Grid on larger screens */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {/* Mobile carousel */}
        <MobileNewArrivals />
      </div>
    </section>
  );
}

export function MobileNewArrivals() {
  return (
    <div className="block lg:hidden mt-12 relative">
      <Carousel>
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={index}>
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
