import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
  getProductReviews,
} from "../controllers/productControllers.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";
// import validation middleware if needed (e.g., for create/update product)
// import validateRequest from "../middlewares/validateMiddleware.js";
// import {
//   productCreateSchema,
//   productUpdateSchema,
// } from "../validators/productSchemas.js"; // Optional, if validation is required

const router = express.Router();

// Route to create a new product (Admin only)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  // Optional: validate product creation if necessary
  // validateRequest(productCreateSchema),
  createProduct
);

// Route to get all products (Public)
router.get("/", getAllProducts);

// Route to get a single product by ID (Public)
router.get("/:id", getProductById);

// Route to update a product (Admin only)
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  // Optional: validate product update if necessary
  // validateRequest(productUpdateSchema),
  updateProduct
);

// Route to delete a product (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

// Route to add a review for a product (Authenticated users)
router.post("/:id/reviews", authMiddleware, addReview);

// Route to get all reviews for a product (Public)
router.get("/:id/reviews", getProductReviews);

export default router;
