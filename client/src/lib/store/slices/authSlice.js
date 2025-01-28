import { createSlice } from "@reduxjs/toolkit";

// Initial state for the authentication slice
const initialState = {
  user: null, // Contains the user data (id, username, role, etc.)
  token: null, // JWT Token
  isAuthenticated: false, // To track the authentication status
  loading: false, // To manage loading states during login/signup
  error: null, // For handling errors
};

// Slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { setUser, logout, setLoading, setError } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
