// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./lib/store/useAuthStore";
import PrivateRoute from "./lib/routers/PrivateRoute";
import AdminRoute from "./lib/routers/AdminRoute";
import HomePage from "./pages/User/Home";
import SignInForm from "./pages/Auth/SignInPage";
import SignUpForm from "./pages/Auth/SignUpPage";
import Shop from "./pages/User/shop";
import Account from "./pages/User/Account";
import AdminPanel from "./pages/Admin/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/profile" element={<Account />} />
        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
