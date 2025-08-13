import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Star,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useSettings } from "../../contexts/SettingsContext";
import SettingsPage from "../../pages/SettingsPage";

const Header = ({ title, isSidebarOpen, toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { theme, setTheme } = useSettings();

  const toggleTheme = () => {
    const newTheme = theme === "Light" ? "Dark" : "Light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "Dark");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="bg-white text-black dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-300 z-10">
        <div className="flex items-center justify-between">
          {/* Left: Sidebar toggle & title */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <img
              src="/images/Logo2.png"
              alt="Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-s-xl rounded-t-sm"
            />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prompts, templates, or users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {theme === "Dark" ? (
                <Moon className="w-5 h-5 text-yellow-400" />
              ) : (
                <Sun className="w-5 h-5 text-orange-400" />
              )}
            </button>

            {/* User profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.name || "User"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  {/* Profile */}
                  <NavLink
                    to="/app/userprofile"
                    onClick={() => setIsProfileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-blue-400 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400 font-semibold"
                          : "text-gray-700 dark:text-gray-100"
                      }`
                    }
                  >
                    <User className="w-4 h-4 text-blue-500 group-hover:text-blue-700 transition" />
                    <span>Profile</span>
                  </NavLink>

                  {/* Settings */}
                  <div
                    onClick={() => {
                      setShowSettings(true);
                      setIsProfileOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-green-100 dark:hover:bg-green-400 cursor-pointer group"
                  >
                    <Settings className="w-4 h-4 text-green-500 group-hover:text-green-700 transition" />
                    <span>Settings</span>
                  </div>

                  {/* Upgrade Plan */}
                  <NavLink
                    to="/app/subsciption-plans"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-yellow-50 dark:hover:bg-yellow-400 group"
                  >
                    <Star className="w-4 h-4 text-yellow-500 group-hover:text-yellow-700 transition" />
                    <span>Upgrade Plan</span>
                  </NavLink>

                  <hr className="my-1 border-gray-200 dark:border-gray-700" />

                  {/* Logout (Red) */}
                  <div
                    onClick={() => {
                      handleLogout();
                      setIsProfileOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-400 cursor-pointer transition group"
                  >
                    <LogOut className="w-4 h-4 text-red-600 group-hover:text-red-800 transition" />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Settings modal */}
      <SettingsPage
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
};

export default Header;
