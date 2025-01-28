import React from "react";
import { Mail, Shield } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="bg-[#FFC94C] dark:bg-gray-900 py-8 lg:py-16">
      <div className="px-4 mx-auto max-w-screen-xl">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
            Join the 3legant Community
          </h2>
          <p className="mb-8 text-lg font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Be the first to know about our latest collections, exclusive
            discounts, and exciting offers. Sign up with your email today!
          </p>

          <form action="#">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 mx-auto max-w-md">
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  className="block w-full p-3 pl-10 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 shadow-sm sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-4 sm:mt-0 sm:w-auto py-3 px-6 w-full text-sm font-medium text-white bg-blue-700 rounded-lg shadow-lg sm:rounded-r-lg hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Subscribe
              </button>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-300">
              <div className="flex items-center justify-center sm:justify-start">
                <Shield className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span>
                  We care about the protection of your data.{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Read our Privacy Policy
                  </a>
                  .
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
