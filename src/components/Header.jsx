import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { IoSunny, IoMoon, IoMenu, IoClose } from "react-icons/io5";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "All Courses", path: "/courses" },
    { name: "About", path: "/about" },
    ...(user ? [
      { name: "Dashboard", path: "/dashboard" },
      { name: "My Learning", path: "/dashboard/my-enrollments" }
    ] : []),
  ];

  return (
    <header 
      className={`sticky rounded-b-xl top-0 z-100 w-full transition-all duration-300 border-b 
      ${scrolled ? "py-2 shadow-lg" : "py-4"}
  bg-bg-main/70 border-border-subtle backdrop-blur-md`} 
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 group">
          <span className="bg-primary text-white px-2 py-1 rounded-lg">LL</span>
          <span className={`${isDarkMode ? "text-text-title" : "text-indigo-600"}`}>LearnLoop</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-xs uppercase tracking-widest font-bold transition-all hover:text-indigo-500 ${
                  isActive 
                    ? "text-indigo-600" 
                    : isDarkMode ? "text-slate-400" : "text-slate-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-xl transition-colors ${
              isDarkMode ? "bg-white/5 text-yellow-400" : "bg-slate-100 text-slate-600"
            }`}
          >
            {isDarkMode ? <IoSunny size={24} /> : <IoMoon size={24} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-indigo-500/50">
                <div className="w-9 rounded-full">
                  <img src={user?.photoURL || "https://i.pravatar.cc/150"} alt="User" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-4 z-10 p-2 shadow-2xl menu menu-sm dropdown-content bg-white dark:bg-[#1a1c23] rounded-2xl w-56 border border-slate-200 dark:border-white/10 backdrop-blur-2xl">
                <li className="px-4 py-3 border-b border-slate-100 dark:border-white/5 mb-2">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Signed in as</p>
                  <p className="font-bold text-slate-900 dark:text-white truncate">{user.displayName}</p>
                </li>
                <li><Link className="py-2" to="/dashboard">Dashboard</Link></li>
                <li><Link className="py-2" to="/dashboard/profile">Settings</Link></li>
                <li><button onClick={handleLogout} className="text-red-500 font-bold py-2">Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="hidden md:flex px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
            >
              Get Started
            </Link>
          )}

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 rounded-lg ${isDarkMode ? "text-white" : "text-slate-900"}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute w-[95%] left-1/2 -translate-x-1/2 top-20 p-6 rounded-2xl border border-white/10 shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsMenuOpen(false)} 
              className="font-bold text-sm uppercase tracking-widest text-slate-600 dark:text-slate-300"
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <Link to="/login" className="py-3 bg-indigo-600 text-white rounded-xl text-center font-bold text-sm">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}