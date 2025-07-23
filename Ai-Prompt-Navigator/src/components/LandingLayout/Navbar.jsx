import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/Logo2.png"
            alt="Logo"
            className="h-6 w-6 sm:h-8 sm:w-8 object-contain rounded-s-xl rounded-t-sm "
          />
          <span className="text-white font-bold text-lg sm:text-xl">
            PromptCraft AI
          </span>
        </Link>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Link
                to="/app/dashboard"
                className="text-white hover:text-purple-300 text-sm sm:text-base"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-white text-purple-700 rounded-full text-sm sm:text-base font-semibold hover:bg-purple-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-purple-300 text-sm sm:text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 sm:px-4 py-1 sm:py-2 bg-white text-purple-700 rounded-full text-sm sm:text-base font-semibold hover:bg-purple-100 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
