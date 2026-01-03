import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { FaUserEdit, FaCamera, FaEnvelope, FaIdBadge, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("student"); // Default role
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  // Fetch real-time role from MongoDB
  useEffect(() => {
    if (user?.email) {
      axios.get(`${import.meta.env.VITE_API_URL}/users/role/${user.email}`)
        .then(res => {
          setRole(res.data.role);
        })
        .catch(err => console.error("Error fetching role:", err));
    }
  }, [user?.email]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Account Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your public profile and account security.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Public Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <img 
                src={formData.photoURL || "https://i.pravatar.cc/150"} 
                alt="Avatar" 
                className="w-32 h-32 rounded-[2rem] object-cover ring-4 ring-indigo-50 dark:ring-indigo-900/30 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg">
                <FaCamera size={14} />
              </div>
            </div>
            <h3 className="text-xl font-bold dark:text-white">{user?.displayName || "Member"}</h3>
            <p className="text-sm text-gray-500 mb-6">{user?.email}</p>
            
            {/* CORRECT ROLE BADGES */}
            <div className="flex justify-center gap-2">
              {role === "admin" && (
                <span className="px-3 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-full uppercase flex items-center gap-1">
                  <FaShieldAlt size={10} /> Admin
                </span>
              )}
              {role === "instructor" && (
                <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full uppercase">
                  Instructor
                </span>
              )}
              {role === "student" && (
                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full uppercase">
                  Student
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaIdBadge className="text-indigo-500"/> Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-indigo-500"/> Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full px-5 py-4 bg-gray-100 dark:bg-gray-700 border-none rounded-2xl text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold tracking-widest">Email cannot be changed</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <FaCamera className="text-indigo-500"/> Photo URL
                </label>
                <input
                  type="text"
                  value={formData.photoURL}
                  onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white transition-all"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-3"
                >
                  {loading ? <span className="loading loading-spinner loading-sm"></span> : <><FaUserEdit /> Update Profile</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}