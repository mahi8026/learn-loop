import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function MyCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`${import.meta.env.VITE_API_URL}/courses?owner=${user.email}`)
        .then((r) => setCourses(r.data))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will permanently remove the course.")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/courses/${id}`);
      setCourses(courses.filter(c => c._id !== id));
      toast.success("Course deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="p-10 text-center"><span className="loading loading-bars loading-lg"></span></div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black dark:text-white">My Added Courses</h1>
          <p className="text-gray-500">You have published {courses.length} courses.</p>
        </div>
        <Link to="/dashboard/add-course" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
          + New Course
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-6 group hover:border-indigo-200 transition-all">
            <img src={course.image || course.imageURL}className="w-full md:w-32 h-24 object-cover rounded-2xl" alt="" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold dark:text-white">{course.title}</h3>
              <div className="flex justify-center md:justify-start gap-4 mt-2">
                <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-500 uppercase">{course.category}</span>
                <span className="text-xs font-bold text-indigo-600">${course.price}</span>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Link to={`/courses/${course._id}`} className="flex-1 md:flex-none p-3 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-indigo-50 transition-colors flex justify-center"><FaEye /></Link>
              <Link to={`/dashboard/update-course/${course._id}`} className="flex-1 md:flex-none p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all flex justify-center"><FaEdit /></Link>
              <button onClick={() => handleDelete(course._id)} className="flex-1 md:flex-none p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all flex justify-center"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}