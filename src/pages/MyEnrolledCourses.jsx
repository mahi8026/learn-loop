import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure"; // Import our secure hook
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function MyEnrolledCourses() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); // Use secure instance
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/enrolled/${user.email}`)
        .then((res) => {
          setEnrollments(res.data);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch your enrolled courses.");
        })
        .finally(() => setLoading(false));
    }
  }, [user?.email, axiosSecure]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <Helmet>
        <title>My Learning | LearnLoop</title>
      </Helmet>

      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
          My Learning <span className="text-indigo-600">Journey</span>
        </h1>
        <p className="text-gray-500 mt-2">All your enrolled courses in one place.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-bars loading-lg text-indigo-600"></span>
        </div>
      ) : enrollments.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold dark:text-white">No courses joined yet</h2>
          <Link to="/courses" className="btn btn-primary mt-6 rounded-xl">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {enrollments.map((e) => (
            <div
              key={e._id}
              className="group bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700 p-2 flex flex-col sm:flex-row gap-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-full sm:w-48 h-40 overflow-hidden rounded-2xl">
                <img
                  src={e.courseDetails?.image || e.courseDetails?.imageURL}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center pr-4 py-4 sm:py-0">
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mb-1">
                  {e.courseDetails?.category}
                </span>
                <h3 className="text-xl font-bold dark:text-white leading-tight mb-2">
                  {e.courseDetails?.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium">
                  Enrolled: {formatDate(e.enrolledAt)}
                </p>
                <div className="mt-6">
                  <Link
                    to={`/courses/${e.courseId}`}
                    className="inline-flex items-center text-sm font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors"
                  >
                    Continue Learning
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
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