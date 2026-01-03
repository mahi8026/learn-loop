import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function AdminStats() {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    axiosSecure.get("/admin-stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Platform Analytics</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
          <div className="stat-title text-gray-500 uppercase text-xs">Total Users</div>
          <div className="stat-value text-2xl font-bold">{stats.totalUsers}</div>
        </div>
        <div className="stat bg-white shadow rounded-lg p-4 border-l-4 border-green-500">
          <div className="stat-title text-gray-500 uppercase text-xs">Approved Courses</div>
          <div className="stat-value text-2xl font-bold">{stats.totalCourses}</div>
        </div>
        <div className="stat bg-white shadow rounded-lg p-4 border-l-4 border-purple-500">
          <div className="stat-title text-gray-500 uppercase text-xs">Enrollments</div>
          <div className="stat-value text-2xl font-bold">{stats.totalEnrollments}</div>
        </div>
        <div className="stat bg-white shadow rounded-lg p-4 border-l-4 border-yellow-500">
          <div className="stat-title text-gray-500 uppercase text-xs">Revenue</div>
          <div className="stat-value text-2xl font-bold">${stats.totalRevenue}</div>
        </div>
      </div>
    </div>
  );
}