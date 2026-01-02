import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaDollarSign, FaClock, FaTag } from "react-icons/fa";

export default function AddCourse() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: "",
    price: "",
    duration: "",
    category: "",
    description: "",
    isFeatured: false,
  });

  useEffect(() => {
    document.title = "Create New Course | LearnLoop";
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) return toast.error("Please select a category");
    
    setSubmitting(true);
    const payload = {
      ...form,
      price: parseFloat(form.price),
      instructorName: user?.displayName,
      instructorEmail: user?.email,
      instructorPhoto: user?.photoURL,
      createdAt: new Date(),
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/courses`, payload);
      toast.success("Course published successfully!");
      navigate("/dashboard/my-courses");
    } catch (err) {
      toast.error("Failed to publish course");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black dark:text-white">Create New Course</h1>
        <p className="text-gray-500">Fill in the details below to launch your new learning program.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Course Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Advanced React Architecture 2024"
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white outline-none"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FaDollarSign className="text-indigo-500"/> Price (USD)
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="49.99"
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FaClock className="text-indigo-500"/> Duration
              </label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 12 Hours"
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FaTag className="text-indigo-500"/> Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white appearance-none"
                required
              >
                <option value="">Select Category</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FaCloudUploadAlt className="text-indigo-500"/> Thumbnail URL
              </label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                rows="5"
                value={form.description}
                onChange={handleChange}
                placeholder="Tell students what they will learn..."
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white resize-none"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none flex items-center gap-3"
          >
            {submitting ? <span className="loading loading-spinner"></span> : "Publish Course"}
          </button>
        </div>
      </form>
    </div>
  );
}