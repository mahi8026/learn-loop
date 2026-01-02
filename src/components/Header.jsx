import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { IoSunny, IoMoon, IoMenu, IoClose } from "react-icons/io5";
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

  // Professional Standard: 3 links for Guest, 5+ for User
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Courses", path: "/courses" },
    { name: "About", path: "/about" },
    ...(user ? [
      { name: "Dashboard", path: "/dashboard" },
      { name: "My Learning", path: "/dashboard/enrolled" }
    ] : []),
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 border-b shadow-sm backdrop-blur-md ${
      isDarkMode ? "bg-gray-900/90 border-gray-800 text-white" : "bg-white/90 border-gray-100 text-gray-800"
    }`}>
      <div className="container mx-auto px-4 h-18 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <span className="bg-indigo-600 text-white px-2 py-1 rounded-lg">LL</span>
          <span>LearnLoop</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors hover:text-indigo-600 ${
                  isActive ? "text-indigo-600" : "text-gray-500 dark:text-gray-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {isDarkMode ? <IoSunny size={20} /> : <IoMoon size={20} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || "https://i.pravatar.cc/150"} alt="User" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-1 p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box w-52 border border-gray-100 dark:border-gray-700">
                <li className="px-4 py-2 font-bold text-indigo-600 border-b border-gray-100 dark:border-gray-700 mb-2">
                  {user.displayName}
                </li>
                <li><Link to="/dashboard">Dashboard Overview</Link></li>
                <li><Link to="/dashboard/profile">Profile Settings</Link></li>
                <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
              Get Started
            </Link>
          )}

          {/* Mobile Toggle */}
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 absolute w-full left-0 p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className="font-semibold text-lg">
              {link.name}
            </Link>
          ))}
          {!user && <Link to="/login" className="btn btn-primary w-full">Login</Link>}
        </div>
      )}
    </header>
  );
}