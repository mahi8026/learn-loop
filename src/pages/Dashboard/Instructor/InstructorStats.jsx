import React, { useEffect, useState } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";
import { FaUsers, FaBook, FaWallet, FaChartLine } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

export default function InstructorStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    courseCount: 0,
    totalEarnings: 0,
    chartData: []
  });

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        // Fetch real data based on the instructor's email
        const [coursesRes, enrolledRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/courses?owner=${user?.email}`),
          axios.get(`${import.meta.env.VITE_API_URL}/enrolled-stats?instructor=${user?.email}`)
        ]);

        // Mock chart data - in a real app, generate this from enrolledRes.data
        const mockChart = [
          { month: "Sep", students: 12 },
          { month: "Oct", students: 45 },
          { month: "Nov", students: 30 },
          { month: "Dec", students: 85 },
          { month: "Jan", students: 120 },
        ];

        setStats({
          totalStudents: enrolledRes.data.total || 142, // fallback for demo
          courseCount: coursesRes.data.length,
          totalEarnings: (enrolledRes.data.total || 142) * 25, // Mock calculation
          chartData: mockChart
        });
      } catch (err) {
        console.error("Error loading instructor stats:", err);
      }
    };

    if (user?.email) fetchInstructorData();
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Instructor Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400">Track your performance and student growth.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<FaUsers />} 
          label="Total Students" 
          value={stats.totalStudents} 
          color="bg-indigo-600" 
        />
        <StatCard 
          icon={<FaBook />} 
          label="My Courses" 
          value={stats.courseCount} 
          color="bg-blue-500" 
        />
        <StatCard 
          icon={<FaWallet />} 
          label="Total Earnings" 
          value={`$${stats.totalEarnings}`} 
          color="bg-emerald-500" 
        />
      </div>

      {/* Enrollment Chart */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
            <FaChartLine />
          </div>
          <h3 className="text-xl font-bold dark:text-white">Enrollment Growth</h3>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.chartData}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="students" 
                stroke="#4f46e5" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorStudents)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Small helper component for the cards
function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-5 shadow-sm">
      <div className={`${color} p-4 rounded-2xl text-white text-xl`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <h3 className="text-2xl font-black dark:text-white">{value}</h3>
      </div>
    </div>
  );
}