import React from "react";
import HeroSection from "./_components/HeroSection";
import { NewArrivals } from "./_components/NewArrivals";
import { BestSeller } from "./_components/BestSeller";
import { CategoryShowcase } from "./_components/CategoryShowcase";
import Newsletter from "../../../components/shared/Newsletter";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <NewArrivals />
      <CategoryShowcase />
      <BestSeller />
      <Newsletter />
    </div>
  );
};

export default HomePage;
