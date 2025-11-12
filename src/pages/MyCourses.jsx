import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function MyCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    document.title = "My Courses - LearnLoop";
  }, []);

  useEffect(() => {
    if (user)
      axios
        .get(`${import.meta.env.VITE_API_URL}/courses?owner=${user.email}`)
        .then((r) => setCourses(r.data))
        .catch(() => toast.error("Failed to fetch your courses"));
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this course?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/courses/${id}`);
      setCourses((c) => c.filter((x) => x._id !== id));
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Added Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.category}</p>
            <div className="mt-2 flex justify-end space-x-2">
              <button className="px-2 py-1 border rounded">Update</button>
              <button
                onClick={() => handleDelete(c._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
