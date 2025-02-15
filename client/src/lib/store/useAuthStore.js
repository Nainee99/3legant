import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api/auth"; // Adjust this URL based on your backend

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      signup: async (userData) => {
        try {
          set({ isLoading: true, error: null });
          const response = await axios.post(`${API_URL}/signup`, userData);
          const { user, token } = response.data.data;
          set({ user, token, isLoading: false });
          localStorage.setItem("token", token);
          get().redirectUser(user.role);
        } catch (error) {
          set({
            error: error.response?.data?.message,
            isLoading: false,
          });
        }
      },

      signin: async (credentials, navigate) => {
        try {
          set({ isLoading: true, error: null });
          const response = await axios.post(`${API_URL}/signin`, credentials);
          const { user, token } = response.data.data;
          set({ user, token, isLoading: false });
          localStorage.setItem("token", token);

          // Navigate after setting the user and token
          if (user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        } catch (error) {
          set({
            error: error.response?.data?.message,
            isLoading: false,
          });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await axios.post(
            `${API_URL}/logout`,
            {},
            {
              headers: { Authorization: `Bearer ${get().token}` },
            }
          );
          set({ user: null, token: null, isLoading: false });
          localStorage.removeItem("token");
        } catch (error) {
          set({
            error: error.response?.data?.message || "Logout failed",
            isLoading: false,
          });
        }
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");
          const response = await axios.get(`${API_URL}/checkauth`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { user } = response.data.data;
          set({ user, token, isLoading: false });
        } catch (error) {
          set({
            user: null,
            token: null,
            error: "Session expired",
            isLoading: false,
          });
          localStorage.removeItem("token");
        }
      },

      redirectUser: (role) => {
        const navigate = useNavigate();
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      },
    }),
    { name: "auth-store" }
  )
);
