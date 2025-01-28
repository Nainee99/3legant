// BestSeller.js
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
    name: "Sony - WH-1000XM5 Wireless Noise Canceling",
    price: 299.99,
    image: product1,
    rating: 5,
    badge: "HOT",
  },
  {
    name: "Beats Studio Pro",
    price: 349.99,
    image: product2,
    rating: 5,
    badge: "HOT",
  },
  {
    name: "Sony - WH-CH720N Wireless Noise Canceling",
    price: 149.99,
    image: product1,
    rating: 5,
    badge: "HOT",
  },
  {
    name: "Skullcandy - Rail True Wireless Earbuds",
    price: 79.99,
    image: product2,
    rating: 5,
    badge: "HOT",
  },
  {
    name: "Beats Studio Pro",
    price: 249.99,
    image: product1,
    rating: 5,
    badge: "HOT",
  },
  {
    name: "JBL Reflect Flow Pro+ Bluetooth Truly Wireless Sports",
    price: 179.95,
    image: product2,
    rating: 5,
    badge: "HOT",
  },
  {
    name: "Bose QuietComfort Headphones",
    price: 349.0,
    image: product1,
    rating: 5,
    badge: "HOT",
  },
  {
    name: "AKG Y600NC Wireless",
    price: 349.99,
    image: product2,
    rating: 5,
    badge: "HOT",
  },
];

export function BestSeller() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Best Seller</h2>

        {/* Grid on larger screens */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="flex justify-center">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <MobileBestSeller />
      </div>
    </section>
  );
}

export function MobileBestSeller() {
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
