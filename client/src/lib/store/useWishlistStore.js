import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/wishlist";

// Function to get wishlist from localStorage
const getStoredWishlist = () => {
  const storedWishlist = localStorage.getItem("wishlist");
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

// Zustand Store
const useWishlistStore = create((set) => ({
  wishlist: getStoredWishlist(), // Initialize from localStorage
  loading: false,
  error: null,

  // Fetch wishlist from API
  fetchWishlist: async (token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ wishlist: data.data, loading: false });
      localStorage.setItem("wishlist", JSON.stringify(data.data)); // Save to localStorage
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch wishlist",
        loading: false,
      });
    }
  },

  // Add product to wishlist
  addToWishlist: async (productId, token) => {
    set({ loading: true, error: null });
    try {
      console.log("Adding product to wishlist:", productId); // Debugging log
      const { data } = await axios.post(
        API_URL,
        { productId }, // Ensure productId is correctly sent
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set((state) => {
        const updatedWishlist = [...state.wishlist, data.data];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        return { wishlist: updatedWishlist, loading: false };
      });
    } catch (error) {
      console.error("Add to wishlist error:", error.response?.data);
      set({
        error:
          error.response?.data?.message || "Failed to add product to wishlist",
        loading: false,
      });
    }
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId, token) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set((state) => {
        const updatedWishlist = state.wishlist.filter(
          (item) => item._id.toString() !== productId.toString() // Ensure type consistency
        );

        console.log("Updated Wishlist:", updatedWishlist); // Debugging log

        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save updated list

        return { wishlist: updatedWishlist, loading: false };
      });
    } catch (error) {
      console.error("Remove from wishlist error:", error.response?.data); // Debugging log

      set({
        error:
          error.response?.data?.message ||
          "Failed to remove product from wishlist",
        loading: false,
      });
    }
  },

  // Clear wishlist
  clearWishlist: async (token) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ wishlist: [], loading: false });
      localStorage.removeItem("wishlist"); // Remove from localStorage
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to clear wishlist",
        loading: false,
      });
    }
  },
}));

export default useWishlistStore;
