import { ArrowRight } from "lucide-react";
import headband from "@/assets/headband.png";
import earbuds from "@/assets/earbuds.png";
import accessories from "@/assets/accessories.png";

export function CategoryShowcase() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Shop Collection</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {/* Headband Category */}
          <div className="group relative bg-[#F3F5F7] rounded-lg overflow-hidden lg:col-span-1 lg:row-span-2">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={headband}
                alt="Headband Collection"
                className="w-full h-full object-cover object-center rounded-lg"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-lg sm:text-2xl font-bold mb-2">Headband</h3>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium hover:underline"
                >
                  Collection
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Container for Earbuds and Accessories */}
          <div className="flex flex-col gap-4 lg:col-span-2 lg:row-span-1">
            {/* Earbuds Category */}
            <div className="group relative bg-[#F3F5F7] rounded-lg overflow-hidden">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={earbuds}
                  alt="Earbuds Collection"
                  className="w-full h-[300px] object-cover object-center rounded-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-2xl font-bold mb-2">
                    Earbuds
                  </h3>
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium hover:underline"
                  >
                    Collection
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Accessories Category */}
            <div className="group relative bg-[#F3F5F7] rounded-lg overflow-hidden">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={accessories}
                  alt="Accessories Collection"
                  className="w-full h-[300px] object-cover object-center rounded-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-2xl font-bold mb-2">
                    Accessories
                  </h3>
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium hover:underline"
                  >
                    Collection
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
