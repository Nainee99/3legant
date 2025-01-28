import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import { Outlet } from "react-router-dom";
import React from "react";

export default function UserLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* Render nested routes here */}
      </main>
      <Footer />
    </div>
  );
}
