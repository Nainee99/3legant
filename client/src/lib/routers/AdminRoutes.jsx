import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import dashboard from "@/pages/Admin/Dashboard";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="dashhboard" element={<dashboard />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
