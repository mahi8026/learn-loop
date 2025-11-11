import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (e) {
      toast.error("Failed to logout");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    user ? { name: "Dashboard", path: "/dashboard" } : null,
  ].filter(Boolean); 

  return (
    <header
      className={`py-4 shadow-md transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          LearnLoop
        </Link>

        
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-medium transition duration-200 py-1 ${
                  isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                    : "hover:text-indigo-600 dark:hover:text-indigo-400"
                }`
              }
              end={link.path === "/"}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {isDarkMode ? (
              <IoSunny size={20} className="text-yellow-400" />
            ) : (
              <IoMoon size={20} className="text-gray-700" />
            )}
          </button>

          {user ? (
            <div className="flex items-center space-x-4">
              
              <img
                src={user.photoURL || "https://i.pravatar.cc/150?img=68"} 
                alt={user.displayName || "User"}
                className="w-9 h-9 rounded-full cursor-pointer border-2 border-indigo-500 hover:border-indigo-400 transition"
                title={user.displayName || user.email}
              />
              
              <button
                onClick={handleLogout}
                className="hidden sm:block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Login
            </NavLink>
          )}

          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          className={`md:hidden mt-2 border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded text-lg ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`
                }
                end={link.path === "/"}
              >
                {link.name}
              </NavLink>
            ))}
            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 rounded text-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
