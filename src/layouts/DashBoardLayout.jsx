import React, { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaHome,
  FaPlus,
  FaList,
  FaCheckSquare,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaArrowLeft,
  FaUsers,
  FaCheckCircle,
  FaChartBar,
  FaPlusSquare,
  FaBook,
  FaDollarSign,
  FaGraduationCap,
  FaHeart,
  FaAward,
} from "react-icons/fa";
import { toast } from "react-toastify";


export default function DashboardLayout() {
  const { user, dbUser, loading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out from dashboard");
    } catch (e) {
      toast.error("Logout failed");
    }
  };

  const getSidebarLinks = (role) => {
    const currentRole = role?.toLowerCase() || "student";

    const common = [
      { name: "Overview", path: "/dashboard", icon: <FaHome />, end: true },
      {
        name: "Profile",
        path: "/dashboard/profile",
        icon: <FaUserCircle />,
        end: false,
      },
    ];

    const roleLinks = {
      admin: [
        {
          name: "Manage Users",
          path: "/dashboard/users",
          icon: <FaUsers />,
          end: false,
        },
        {
          name: "Course Review",
          path: "/dashboard/course-review",
          icon: <FaCheckCircle />,
          end: false,
        },
        {
          name: "Platform Stats",
          path: "/dashboard/stats",
          icon: <FaChartBar />,
          end: false,
        },
      ],
      instructor: [
        {
          name: "Add New Course",
          path: "/dashboard/add-course",
          icon: <FaPlusSquare />,
          end: false,
        },
        {
          name: "My Courses",
          path: "/dashboard/my-courses",
          icon: <FaBook />,
          end: false,
        },
        {
          name: "Earnings",
          path: "/dashboard/instructor-stats",
          icon: <FaDollarSign />,
          end: false,
        },
      ],
      student: [
        {
          name: "My Learning",
          path: "/dashboard/my-enrollments",
          icon: <FaGraduationCap />,
          end: false,
        },
        {
          name: "Wishlist",
          path: "/dashboard/wishlist",
          icon: <FaHeart />,
          end: false,
        },
        {
          name: "Certificates",
          path: "/dashboard/certificates",
          icon: <FaAward />,
          end: false,
        },
      ],
    };

    return [...common, ...(roleLinks[currentRole] || roleLinks.student)];
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  const activeLinks = getSidebarLinks(dbUser?.role);


  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Return to Homepage
        </Link>
      </div>

      <div className="p-8 pt-2 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/150"}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500 ring-offset-2"
            alt="Profile"
          />
          <div className="overflow-hidden">
            <h2 className="text-sm font-black dark:text-white truncate">
              {user?.displayName || "Member"}
            </h2>
            <p className="text-xs text-indigo-500 font-bold uppercase tracking-tighter">
              {dbUser ? dbUser.role : "Verifying Role..."}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {activeLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.end}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-indigo-600"
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-sm tracking-wide">{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-4 py-3.5 text-red-500 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 flex">
      <aside className="hidden lg:block w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-60 w-72 bg-white dark:bg-gray-900 transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <Link to="/" className="text-xl font-black text-indigo-600">
            LearnLoop
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
