import React, { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard - LearnLoop";
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">My Courses</h3>
          <p>Manage your created courses.</p>
        </div>
        <div className="p-6 bg-white rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Enrolled Courses</h3>
          <p>See all courses you’ve joined.</p>
        </div>
        <div className="p-6 bg-white rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Profile</h3>
          <p>View and update your account info.</p>
        </div>
      </div>
    </div>
  );
}
