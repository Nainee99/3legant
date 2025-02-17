import { useState } from "react";
import { Plus, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function CreateProduct() {
  const [specifications, setSpecifications] = useState([
    { key: "", value: "" },
  ]);
  const [images, setImages] = useState([]);

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecification = (index) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleSpecificationChange = (index, field, value) => {
    const newSpecifications = [...specifications];
    newSpecifications[index][field] = value;
    setSpecifications(newSpecifications);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...newImages]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create Product</h1>
        <Button>Save Product</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Basic Details */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Basic Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" min="0" step="0.01" />
                </div>
                <div>
                  <Label htmlFor="discountPrice">Discount Price</Label>
                  <Input id="discountPrice" type="number" min="0" step="0.01" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" type="number" min="0" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Specifications</h2>
            <div className="space-y-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex gap-4">
                  <Input
                    placeholder="Key"
                    value={spec.key}
                    onChange={(e) =>
                      handleSpecificationChange(index, "key", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Value"
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecificationChange(index, "value", e.target.value)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSpecification(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={addSpecification}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Specification
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Images */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Product Images</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Product ${index + 1}`}
                  className="h-full w-full rounded-lg object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-yellow-500">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <span className="mt-2 block text-sm text-gray-600">
                  Upload Image
                </span>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
}
