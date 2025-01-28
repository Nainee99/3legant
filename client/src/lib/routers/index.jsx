import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminRoutes from "./AdminRoutes";
import ProtectedRoute from "./ProtectedRoute";
import SignInForm from "@/pages/Auth/SignInPage";
import SignUpForm from "@/pages/Auth/SignUpPage";
import HomePage from "@/pages/User/Home";
import Shop from "@/pages/User/shop";
import Account from "@/pages/User/Account";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />

        {/* Protected User Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute role="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes */}
          <Route index element={<HomePage />} />
          <Route path="products" element={<Shop />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
