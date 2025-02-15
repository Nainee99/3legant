import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleShopNow = () => {
    navigate("/shop"); // Navigate to the products route
  };

  return (
    <main className="dark:bg-gray-800 bg-[#FFC94C] relative overflow-hidden ">
      <div className="bg-[#FFC94C] dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center py-16">
          {/* Left side content */}
          <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20 text-center lg:text-left">
            <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12 mx-auto lg:mx-0"></span>
            <h1 className="font-bebas-neue uppercase text-4xl sm:text-6xl lg:text-7xl font-black flex flex-col leading-none dark:text-white text-gray-800">
              Elevate Your Style
              <span className="text-5xl sm:text-7xl">With 3legant</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-4 px-6 sm:px-0">
              Discover the latest trends in fashion and luxury. Exclusive
              collections just for you.
            </p>
            <div className="flex mt-8 justify-center lg:justify-start">
              <button
                onClick={handleShopNow} // Attach onClick handler
                className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400"
              >
                Shop Now
              </button>
              <a
                href="#"
                className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right side image */}
          <div className="sm:w-2/3 lg:w-3/5 relative mt-8 lg:mt-0">
            <img
              src="https://www.tailwind-kit.com/images/object/10.png"
              className="max-w-xs md:max-w-sm mx-auto lg:mx-0"
              alt="Fashion"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
