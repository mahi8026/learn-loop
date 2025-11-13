import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useAuth } from "../contexts/AuthContext";

export default function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/courses/${id}`)
      .then((res) => {
        
        if (res.data.instructorEmail !== user?.email) {
          toast.error("You are not authorized to edit this course.");
          navigate("/dashboard/my-courses");
          return;
        }
        setCourse(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch course details.");
        toast.error("Failed to load course for editing.");
      })
      .finally(() => setLoading(false));
  }, [id, user?.email, navigate]);

  
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const { _id, ...updateData } = course;
    
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/courses/${id}`, updateData);
      
      toast.success("Course updated successfully!");
      navigate(`/courses/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading course data...</div>;
  if (error || !course) return <div className="text-center py-20 text-red-600">{error || "Course not found."}</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl dark:bg-gray-900 min-h-screen">
      <Helmet>
        <title>Update Course: {course.title}</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Update Course: {course.title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        
       
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={course.title || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
       
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={course.price || ''}
            onChange={handleChange}
            required
            step="0.01"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={course.category || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={course.description || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={course.image || course.imageURL || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
        >
          {submitting ? "Saving Changes..." : "Save Updates"}
        </button>
      </form>
    </div>
  );
}