import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function MyEnrolledCourses() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Enrolled Courses - LearnLoop";
  }, []);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      // ⚠️ Fetch enrollments using the user's email
      axios
        .get(`${import.meta.env.VITE_API_URL}/enrolled?email=${user.email}`)
        .then(async (res) => {
          const enrolledData = res.data;
          
          // ⚠️ Challenge: Fetch the full course details for each enrollment
          // This requires a separate request for each course ID unless you implement aggregation on the backend.
          const coursePromises = enrolledData.map(enrollment =>
            axios.get(`${import.meta.env.VITE_API_URL}/courses/${enrollment.courseId}`)
          );

          const courseResponses = await Promise.all(coursePromises);
          const courses = courseResponses.map(r => r.data);
          
          // Merge course details back into enrollments
          const finalEnrollments = enrolledData.map((enrollment, index) => ({
              ...enrollment,
              courseDetails: courses[index], // Attach the full course object
          }));
          
          setEnrollments(finalEnrollments.filter(e => e.courseDetails)); // Filter out any failed course fetches
        })
        .catch((err) => {
            console.error(err);
            toast.error("Failed to fetch your enrolled courses.");
        })
        .finally(() => setLoading(false));
    }
  }, [user]);
  
  // Helper function to format the enrollment date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen dark:bg-gray-900">
      <Helmet>
        <title>My Enrolled Courses</title>
      </Helmet>
      
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white border-b pb-2">
        My Enrolled Courses
      </h1>

      {loading && (
        <div className="text-center py-12 text-indigo-500">Loading your enrolled courses...</div>
      )}

      {!loading && enrollments.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          You are not currently enrolled in any courses.
          <Link to="/courses" className="text-indigo-600 dark:text-indigo-400 ml-2 hover:underline">
            Explore courses
          </Link>
        </div>
      )}

      {!loading && enrollments.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enrollments.map((e) => (
            <div 
              key={e._id} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <img
                src={e.courseDetails?.imageURL || e.courseDetails?.image || 'https://placehold.co/100x100/5B5B5B/FFFFFF?text=Course'}
                alt={e.courseDetails?.title || "Course"}
                className="w-full sm:w-24 h-24 object-cover rounded-lg shrink-0"
              />
              <div className="flex flex-col grow">
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{e.courseDetails?.title || "Unknown Course"}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Category: {e.courseDetails?.category || 'N/A'}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">
                  Enrolled On: {formatDate(e.enrolledAt)}
                </p>
                
                <div className="mt-4">
                  <Link 
                    to={`/courses/${e.courseDetails?._id}`} 
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}