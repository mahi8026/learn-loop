import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useAuth } from "../contexts/AuthContext";
import { FaSave, FaArrowLeft } from "react-icons/fa";

export default function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/courses/${id}`)
      .then((res) => {
        if (res.data.instructorEmail !== user?.email) {
          toast.error("Unauthorized access");
          navigate("/dashboard/my-courses");
          return;
        }
        setCourse(res.data);
      })
      .catch(() => toast.error("Failed to load course"))
      .finally(() => setLoading(false));
  }, [id, user?.email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/courses/${id}`, course);
      toast.success("Course updated successfully!");
      navigate("/dashboard/my-courses");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Helmet><title>Update {course?.title} | LearnLoop</title></Helmet>
      
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 font-bold transition-colors">
        <FaArrowLeft /> Back to My Courses
      </button>

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl font-black mb-8 dark:text-white">Update Course Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input
                value={course.title}
                onChange={(e) => setCourse({...course, title: e.target.value})}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none focus:ring-2 ring-indigo-500 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Price ($)</label>
              <input
                type="number"
                value={course.price}
                onChange={(e) => setCourse({...course, price: e.target.value})}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none focus:ring-2 ring-indigo-500 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Duration</label>
              <input
                value={course.duration}
                onChange={(e) => setCourse({...course, duration: e.target.value})}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none focus:ring-2 ring-indigo-500 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              rows="4"
              value={course.description}
              onChange={(e) => setCourse({...course, description: e.target.value})}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none focus:ring-2 ring-indigo-500 dark:text-white resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg flex justify-center items-center gap-2"
          >
            {submitting ? <span className="loading loading-spinner"></span> : <><FaSave /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
}