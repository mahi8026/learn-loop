import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function AddCourse() {
  useEffect(() => {
    document.title = "Add Course - LearnLoop";
  }, []);

  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    image: "",
    price: "",
    duration: "",
    category: "",
    description: "",
    isFeatured: false,
  });
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(() => {
    if (user)
      setForm((f) => ({
        ...f,
        instructorName: user.displayName,
        instructorEmail: user.email,
        instructorPhoto: user.photoURL,
      }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      let imageUrl = form.image;

      
      if (form.image instanceof File) {
        const key = import.meta.env.VITE_IMGBB_KEY;
        const data = new FormData();
        data.append("image", form.image);
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${key}`, data);
        imageUrl = res.data.data.url;
      }

      const payload = { ...form, image: imageUrl };
      await axios.post(`${import.meta.env.VITE_API_URL}/courses`, payload);
      toast.success("✅ Course added successfully!");
      setForm({
        title: "",
        image: "",
        price: "",
        duration: "",
        category: "",
        description: "",
        isFeatured: false,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add course");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4  p-6 rounded shadow">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="w-full p-2 border rounded" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
          <label>Feature this course</label>
        </div>
        <button type="submit" disabled={submitting} className="px-4 py-2 bg-green-600 text-white rounded">
          {submitting ? "Saving..." : "Save Course"}
        </button>
      </form>
    </div>
  );
}
