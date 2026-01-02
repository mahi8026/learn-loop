import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

export default function CourseReview() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingCourses();
  }, []);

  const fetchPendingCourses = async () => {
    try {
      // Fetch all courses (you can filter for 'pending' on backend or here)
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
      const pending = res.data.filter(c => c.status === "pending");
      setCourses(pending);
    } catch (err) {
      toast.error("Error loading courses");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/courses/status/${id}`, { 
        status: newStatus 
      });
      toast.success(`Course ${newStatus}`);
      fetchPendingCourses(); // Refresh list
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="p-20 text-center">Loading pending requests...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white">Course Review Queue</h1>
      
      {courses.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl text-center border border-dashed border-gray-300">
          <p className="text-gray-500">No courses pending review. You're all caught up!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {courses.map(course => (
            <div key={course._id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img src={course.image || course.imageURL} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                <div>
                  <h3 className="font-bold text-lg dark:text-white">{course.title}</h3>
                  <p className="text-sm text-gray-500">Instructor: {course.instructorEmail}</p>
                  <p className="text-indigo-600 font-bold text-sm">${course.price}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleAction(course._id, "approved")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                >
                  <FaCheck /> Approve
                </button>
                <button 
                  onClick={() => handleAction(course._id, "rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                >
                  <FaTimes /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}