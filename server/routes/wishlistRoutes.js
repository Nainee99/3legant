import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlistControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to get the wishlist (Authenticated Users)
router.get("/", authMiddleware, getWishlist);

// Route to add a product to wishlist (Authenticated Users)
router.post("/", authMiddleware, addToWishlist);

// Route to remove a product from wishlist (Authenticated Users)
router.delete("/:productId", authMiddleware, removeFromWishlist);

// Route to clear the wishlist (Authenticated Users)
router.delete("/", authMiddleware, clearWishlist);

export default router;
