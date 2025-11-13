
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaHome, FaPlus, FaList, FaCheckSquare } from "react-icons/fa";

export default function DashboardLayout() {
  const { user } = useAuth();

  const dashboardLinks = [
    
    { name: "Home", path: "/", icon: FaHome },
    { name: "My Enrolled Courses", path: "/dashboard/enrolled", icon: FaCheckSquare },
    { name: "Add Course", path: "/dashboard/add-course", icon: FaPlus },
    { name: "My Added Courses", path: "/dashboard/my-courses", icon: FaList },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome,
          </h2>
          <span className="text-indigo-600 dark:text-indigo-400">
            {user?.displayName || "Instructor"}
          </span>
        </div>

        
        <nav className="flex flex-col p-4 space-y-2">
          {dashboardLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
