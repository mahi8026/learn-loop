import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  FaBookOpen,
  FaUsers,
  FaGraduationCap,
  FaChartLine,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function Dashboard() {
  const axiosSecure = useAxiosSecure();
  
  const { user } = useAuth();
  const [stats, setStats] = useState({
    myCourses: 0,
    enrolled: 0,
    totalStudents: 124,
    revenue: 4500,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Overview | LearnLoop";

    const fetchStats = async () => {
      try {
        

        const [myRes, enrolledRes] = await Promise.all([
        axiosSecure.get(`/courses?owner=${user?.email}`),
        axiosSecure.get(`/enrolled/${user?.email}`) 
      ]);
        setStats((prev) => ({
          ...prev,
          myCourses: myRes.data.length,
          enrolled: enrolledRes.data.length,
        }));
      } catch (err) {
        console.error("Dashboard sync error", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.email) fetchStats();
  }, [user]);

  const statCards = [
    {
      label: "My Courses",
      value: stats.myCourses,
      icon: <FaBookOpen />,
      color: "from-blue-500 to-cyan-400",
      trend: "+2 this month",
    },
    {
      label: "Enrolled",
      value: stats.enrolled,
      icon: <FaGraduationCap />,
      color: "from-indigo-600 to-purple-500",
      trend: "Active now",
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: <FaUsers />,
      color: "from-emerald-500 to-teal-400",
      trend: "+12% growth",
    },
    {
      label: "Total Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      icon: <FaChartLine />,
      color: "from-amber-500 to-orange-400",
      trend: "+$840.00",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto space-y-10 pb-10"
    >
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">
            Analytics Overview
          </span>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mt-1">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
              {user?.displayName?.split(" ")[0]}
            </span>
            !
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Monitoring your learning ecosystem and performance.
          </p>
        </motion.div>

        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all dark:text-white">
            Generate Report
          </button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all">
            + New Course
          </button>
        </div>
      </div>

      {/* Stats Grid with Glassmorphism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden bg-white dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
          >
            {/* Subtle Gradient Glow */}
            <div
              className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-2xl bg-gradient-to-br ${stat.color}`}
            ></div>

            <div className="flex items-start justify-between relative z-10 mb-6">
              <div
                className={`p-4 rounded-3xl bg-gradient-to-br ${stat.color} text-white text-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500`}
              >
                {stat.icon}
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full uppercase">
                <FaArrowUp /> {stat.trend.split(" ")[0]}
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-4xl font-black dark:text-white tracking-tight">
                {isLoading ? "---" : stat.value}
              </h3>
              <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Refined Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 dark:border-slate-800/50 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black dark:text-white">
                Recent Activity
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Real-time updates across your courses
              </p>
            </div>
            <button className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-xs font-bold rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 transition-all">
              View Analytics
            </button>
          </div>
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-700">
              <FaChartLine size={32} />
            </div>
            <h3 className="text-lg font-bold dark:text-slate-200">
              System is Ready
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto mt-2 italic">
              Activity logs will populate automatically as students interact
              with your content.
            </p>
          </div>
        </div>

        <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
            <FaGraduationCap size={120} />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-4">Start Teaching Today</h2>
            <p className="text-indigo-100 text-sm leading-relaxed mb-8">
              Share your expertise with the world. Apply to become an instructor
              and start earning.
            </p>
          </div>
          <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm hover:shadow-2xl transition-all relative z-10">
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
