// import Product from "../models/productModel.js";
import Product from "../models/productModel.js";
import { ErrorResponse, sendErrorResponse } from "../utils/errorResponse.js";
import { sendSuccessResponse } from "../utils/successResponse.js";

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Admin Only)
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      specifications,
      stock,
      images,
      discountPrice,
      ratings,
    } = req.body;

    // Ensure required fields are provided
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !brand ||
      !specifications ||
      stock === undefined
    ) {
      throw new ErrorResponse("Please provide all required fields", 400);
    }

    // Create the new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      specifications,
      stock,
      images: images || [],
      discountPrice,
      ratings,
    });

    // Save the product to the database
    await newProduct.save();

    // Send success response
    return sendSuccessResponse(res, newProduct, "Product created successfully");
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      throw new ErrorResponse("No products found", 404);
    }

    return sendSuccessResponse(res, products, "Products fetched successfully");
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }

    return sendSuccessResponse(res, product, "Product fetched successfully");
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin Only)
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    // Validate the product existence before updating
    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }

    // Update product with the provided data
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true,
    });

    return sendSuccessResponse(
      res,
      updatedProduct,
      "Product updated successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate the product existence before deleting
    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(productId);

    return sendSuccessResponse(res, null, "Product deleted successfully");
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// @desc    Add a review to a product
// @route   POST /api/products/:id/reviews
// @access  Private
export const addReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    // Validate the rating and comment
    if (!rating || !comment) {
      throw new ErrorResponse("Rating and comment are required", 400);
    }

    // Check if the rating is valid
    if (rating < 1 || rating > 5) {
      throw new ErrorResponse("Rating should be between 1 and 5", 400);
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }

    // Create new review
    const newReview = {
      user: userId,
      rating,
      comment,
    };

    // Add review to the product
    product.reviews.push(newReview);
    product.ratings =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    // Save the updated product
    await product.save();

    return sendSuccessResponse(res, product, "Review added successfully");
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// @desc    Get all reviews for a product
// @route   GET /api/products/:id/reviews
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }

    return sendSuccessResponse(
      res,
      product.reviews,
      "Reviews fetched successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
