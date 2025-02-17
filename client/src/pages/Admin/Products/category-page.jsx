import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Sample data
const initialCategories = [
  { id: 1, name: "Electronics", products: 125 },
  { id: 2, name: "Clothing", products: 89 },
  { id: 3, name: "Furniture", products: 45 },
  { id: 4, name: "Accessories", products: 67 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          name: newCategory,
          products: 0,
        },
      ]);
      setNewCategory("");
    }
  };

  const handleEditCategory = (category) => {
    setCategories(
      categories.map((c) =>
        c.id === editingCategory.id ? { ...c, name: newCategory } : c
      )
    );
    setEditingCategory(null);
    setNewCategory("");
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((c) => c.id !== categoryId));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={
                  editingCategory ? handleEditCategory : handleAddCategory
                }
              >
                {editingCategory ? "Save Changes" : "Add Category"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search categories..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.products}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingCategory(category);
                        setNewCategory(category.name);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
