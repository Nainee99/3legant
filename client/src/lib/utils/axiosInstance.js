import axios from "axios";
import store from "../store";
import { logout } from "../store/slices/authSlice";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Use your backend URL
});

// Interceptor to attach the token to the header for protected routes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle response errors (e.g., unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If the response is unauthorized, logout the user
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
