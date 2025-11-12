import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    axios.get(`${import.meta.env.VITE_API_URL}/courses`)
      .then((res) => {
        // FIX 1: Check if the response data is an array before setting state
        if (Array.isArray(res.data)) {
            setCourses(res.data);
        } else {
            // If the server returns something other than an array, handle it
            console.error("API response is not an array:", res.data);
            setError("Server returned data in an unexpected format.");
            setCourses([]); // Ensure state is an empty array to prevent .map() crash
        }
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please check the network connection.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtered =
    category === "all"
      ? courses
      : courses.filter((c) => c.category === category);

  // FIX 2: Safely extract unique categories by checking if courses is an array.
  // This is the direct fix for the crash on line 39.
  const uniqueCategories = [
    ...new Set(
      Array.isArray(courses) 
        ? courses.map((c) => c.category).filter(Boolean) 
        : []
    ),
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>All Courses - LearnLoop</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Explore All Courses
      </h1>

      <div className="mb-6 flex justify-end">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="all">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loading & Error States */}
      {loading && <div className="text-center py-12">Loading courses...</div>}
      {error && <div className="text-center py-12 text-red-600">{error}</div>}
      
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No courses match the current category.
        </div>
      )}

      {/* Courses Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((course) => (
            <div 
              key={course._id} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={course.image || 'https://placehold.co/600x400/3B82F6/FFFFFF?text=Course'}
                alt={course.title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 grow">
                {/* Safely access course.description */}
                {course.description ? course.description.slice(0, 120) : 'No description available'}...
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ৳{course.price}
                </div>
                <Link 
                  to={`/courses/${course._id}`} 
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}