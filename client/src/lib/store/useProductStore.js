import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/products"; // Define the API base URL

const useProductStore = create((set) => ({
  products: [],
  product: null,
  reviews: [],
  loading: false,
  error: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}`);
      set({ products: data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch products",
        loading: false,
      });
    }
  },

  // Fetch a single product by ID
  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/${id}`);
      set({ product: data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch product",
        loading: false,
      });
    }
  },

  // Fetch all reviews for a product
  fetchReviews: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/${id}/reviews`);
      set({ reviews: data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch reviews",
        loading: false,
      });
    }
  },

  // Create a new product (Admin Only)
  createProduct: async (productData, token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        products: [...state.products, data.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create product",
        loading: false,
      });
    }
  },

  // Update a product (Admin Only)
  updateProduct: async (id, productData, token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update product",
        loading: false,
      });
    }
  },

  // Delete a product (Admin Only)
  deleteProduct: async (id, token) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete product",
        loading: false,
      });
    }
  },

  // Add a review to a product
  addReview: async (id, reviewData, token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(
        `${API_URL}/${id}/reviews`,
        reviewData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set((state) => ({
        reviews: [...state.reviews, data.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to add review",
        loading: false,
      });
    }
  },
}));

export default useProductStore;
