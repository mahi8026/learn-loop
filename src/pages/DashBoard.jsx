import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { FaBookOpen, FaUsers, FaGraduationCap, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    myCourses: 0,
    enrolled: 0,
    totalStudents: 124, // Placeholder or fetch from backend
    revenue: 4500,     // Placeholder or fetch from backend
  });

  useEffect(() => {
    document.title = "Dashboard - LearnLoop";
    
    // Fetch real counts from your API
    const fetchStats = async () => {
      try {
        const [myRes, enrolledRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/courses?owner=${user?.email}`),
          axios.get(`${import.meta.env.VITE_API_URL}/enrolled?email=${user?.email}`)
        ]);
        setStats(prev => ({
          ...prev,
          myCourses: myRes.data.length,
          enrolled: enrolledRes.data.length
        }));
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      }
    };

    if (user?.email) fetchStats();
  }, [user]);

  const statCards = [
    { label: "My Courses", value: stats.myCourses, icon: <FaBookOpen />, color: "bg-blue-500" },
    { label: "Enrolled", value: stats.enrolled, icon: <FaGraduationCap />, color: "bg-indigo-600" },
    { label: "Total Students", value: stats.totalStudents, icon: <FaUsers />, color: "bg-emerald-500" },
    { label: "Total Revenue", value: `$${stats.revenue}`, icon: <FaChartLine />, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, {user?.displayName}! Here’s what’s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-5"
          >
            <div className={`${stat.color} p-4 rounded-xl text-white text-2xl shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black dark:text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Table Placeholder */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold dark:text-white">Recent Activity</h2>
          <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
        </div>
        <div className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 italic">No recent activity found. Start by adding or enrolling in a course!</p>
        </div>
      </div>
    </div>
  );
}