import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";
import { ErrorResponse, sendErrorResponse } from "../utils/errorResponse.js";
import { sendSuccessResponse } from "../utils/successResponse.js";

// @desc    Get Wishlist Items
// @route   GET /api/wishlist
// @access  Private (Authenticated Users)
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate(
      "products"
    );

    if (!wishlist) {
      throw new ErrorResponse("Wishlist not found", 404);
    }

    return sendSuccessResponse(
      res,
      wishlist.products,
      "Wishlist fetched successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// @desc    Add a product to Wishlist
// @route   POST /api/wishlist
// @access  Private (Authenticated Users)
export const addToWishlist = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging log

    const { productId } = req.body;
    if (!productId) {
      throw new ErrorResponse("Product ID is required", 400);
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }

    let wishlist = await Wishlist.findOne({ userId: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user._id, products: [productId] });
    } else {
      if (wishlist.products.includes(productId)) {
        throw new ErrorResponse("Product already in wishlist", 400);
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    return sendSuccessResponse(
      res,
      wishlist,
      "Product added to wishlist successfully"
    );
  } catch (error) {
    console.error("Add to Wishlist Error:", error.message); // Debugging log
    sendErrorResponse(res, error);
  }
};

// @desc    Remove a product from Wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private (Authenticated Users)
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    let wishlist = await Wishlist.findOne({ userId: req.user._id });

    if (!wishlist) {
      throw new ErrorResponse("Wishlist not found", 404);
    }

    if (!wishlist.products.includes(productId)) {
      throw new ErrorResponse("Product not found in wishlist", 400);
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );
    await wishlist.save();

    return sendSuccessResponse(
      res,
      wishlist,
      "Product removed from wishlist successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// @desc    Clear Wishlist
// @route   DELETE /api/wishlist
// @access  Private (Authenticated Users)
export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({ userId: req.user._id });

    if (!wishlist) {
      throw new ErrorResponse("Wishlist not found", 404);
    }

    return sendSuccessResponse(res, null, "Wishlist cleared successfully");
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
