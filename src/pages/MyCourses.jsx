import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // 🟢 Added Link for routing

export default function MyCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Courses - LearnLoop";
  }, []);

  useEffect(() => {
    if (user?.email) { // 🟢 Check for user.email before fetching
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_API_URL}/courses?owner=${user.email}`)
            .then((r) => setCourses(r.data))
            .catch(() => toast.error("Failed to fetch your courses"))
            .finally(() => setLoading(false));
    }
  }, [user]);

  // 🟢 Delete functionality (working with the new server route)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) return;
    try {
      // ⚠️ Use the delete method
      await axios.delete(`${import.meta.env.VITE_API_URL}/courses/${id}`);
      
      // Update state to remove the course without re-fetching everything
      setCourses((c) => c.filter((x) => x._id !== id));
      toast.success("Course deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete course.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white border-b pb-2">
        My Added Courses
      </h1>
      
      {loading && (
        <div className="text-center py-12 text-indigo-500">Loading your courses...</div>
      )}
      
      {!loading && courses.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          You have not added any courses yet.
          <Link to="/add-course" className="text-indigo-600 dark:text-indigo-400 ml-2 hover:underline">
            Add a new course
          </Link>
        </div>
      )}

      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div 
              key={c._id} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col"
            >
              <img
                src={c.imageURL || c.image || 'https://placehold.co/600x400/5B5B5B/FFFFFF?text=Course+Image'}
                alt={c.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{c.title}</h3>
              <p className="text-md text-indigo-600 dark:text-indigo-400 mb-4">{c.category}</p>
              
              <div className="mt-auto flex justify-between space-x-2 border-t pt-4 border-gray-100 dark:border-gray-700">
                {/* 🟢 View Details Link */}
                <Link 
                  to={`/courses/${c._id}`} 
                  className="px-4 py-2 text-sm text-center font-medium rounded-lg text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700 transition"
                >
                  View Details
                </Link>
                {/* 🟢 Update Button Link */}
                <Link 
                  to={`/dashboard/update-course/${c._id}`} // ⚠️ Ensure your router setup supports this path
                  className="px-4 py-2 text-sm text-center font-medium rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
                >
                  Update
                </Link>
                {/* 🟢 Delete Button */}
                <button
                  onClick={() => handleDelete(c._id)}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}