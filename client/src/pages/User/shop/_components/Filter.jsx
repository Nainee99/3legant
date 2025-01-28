import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const categories = [
  "Earbuds",
  "Headphones",
  "Watches",
  "Accessories",
  "Phones",
  "Other",
];

export function Filter({ onFilterChange }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      onFilterChange({ categories: newCategories, priceRange });
      return newCategories;
    });
  };

  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
    onFilterChange({
      categories: selectedCategories,
      priceRange: newPriceRange,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
            />
            <Label htmlFor={category}>{category}</Label>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Price Range</h2>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={handlePriceChange}
        />
        <div className="flex justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
