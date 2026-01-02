import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function Register() {
  const { register, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Create Account | LearnLoop";
  }, []);

  // Real-time validation logic (Standard #1 & #6)
  const validations = {
    length: form.password.length >= 6,
    hasUpper: /[A-Z]/.test(form.password),
    hasLower: /[a-z]/.test(form.password),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validations.length || !validations.hasUpper || !validations.hasLower) {
      return toast.error("Please meet all password requirements");
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.photo);
      toast.success("Account created! Welcome to LearnLoop.");
      navigate("/");
    } catch (e) {
      toast.error(e.message || "Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (e) {
      toast.error("Google authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black dark:text-white tracking-tight">Join LearnLoop</h2>
          <p className="text-gray-500 mt-3">Start your journey toward mastering new skills today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white outline-none transition-all"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white outline-none transition-all"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Profile Photo URL</label>
            <input
              type="url"
              value={form.photo}
              onChange={(e) => setForm({ ...form, photo: e.target.value })}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white outline-none transition-all"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white outline-none transition-all"
              placeholder="••••••••"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-[3.2rem] text-gray-400 hover:text-indigo-500"
            >
              {showPassword ? <IoEyeOffOutline size={22} /> : <IoEyeOutline size={22} />}
            </button>
          </div>

          {/* Password Validation UI (Standard #1) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-bold">
            <div className={`${validations.length ? "text-emerald-500" : "text-gray-400"}`}>✓ 6+ Characters</div>
            <div className={`${validations.hasUpper ? "text-emerald-500" : "text-gray-400"}`}>✓ Uppercase</div>
            <div className={`${validations.hasLower ? "text-emerald-500" : "text-gray-400"}`}>✓ Lowercase</div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex justify-center"
          >
            {loading ? <span className="loading loading-spinner loading-md"></span> : "Create Account"}
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800"></div></div>
          <span className="relative px-4 bg-white dark:bg-gray-900 text-gray-500 text-sm">Or sign up with</span>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-4 border-2 border-gray-100 dark:border-gray-800 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all dark:text-white"
        >
          <FcGoogle size={24} /> Sign up with Google
        </button>

        <p className="mt-8 text-center text-gray-500">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}