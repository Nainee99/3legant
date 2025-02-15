// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./lib/store/useAuthStore";
// import PrivateRoute from "./routes/PrivateRoute";
import PrivateRoute from "./lib/routers/PrivateRoute";
// import AdminRoute from "./routes/AdminRoute";
import AdminRoute from "./lib/routers/AdminRoute";
import HomePage from "./pages/User/Home";
import SignInForm from "./pages/Auth/SignInPage";
import SignUpForm from "./pages/Auth/SignUpPage";
import Dashboard from "./pages/Admin/Dashboard";
import Shop from "./pages/User/shop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
