import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";

export default function Register() {
  const { register, loginWithGoogle } = useAuth(); // Note: Changed to loginWithGoogle to match context
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photoFile: null, // Added to explicitly track the file
  });

  useEffect(() => {
    document.title = "Create Account | LearnLoop";
  }, []);

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
      // 1. Initial Fallback URL (UI Avatars)
      let finalPhotoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        form.name
      )}&background=random&color=fff`;

      // 2. Try Uploading to ImgBB
      if (form.photoFile) {
        const formData = new FormData();
        formData.append("image", form.photoFile);

        try {
          const imgBBRes = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
            formData
          );

          if (imgBBRes.data.success) {
            finalPhotoURL = imgBBRes.data.data.display_url;
          }
        } catch (imgErr) {
          console.warn("ImgBB Error (CORS/503), using fallback avatar.");
          // We don't throw here so registration continues
        }
      }

      // 3. Complete Registration (Firebase + MongoDB)
      await register(form.name, form.email, form.password, finalPhotoURL);

      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (e) {
      toast.error("Google authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main  px-4 py-8">
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black dark:text-white tracking-tight">
            Join LearnLoop
          </h2>
          <p className="text-gray-500 mt-3">
            Start your journey toward mastering new skills today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white outline-none transition-all"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white outline-none transition-all"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, photoFile: e.target.files[0] })}
              className="file-input file-input-bordered w-full bg-gray-50 dark:bg-gray-800 rounded-2xl border-none"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white outline-none transition-all"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-11 text-gray-400 hover:text-indigo-500"
            >
              {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[10px] md:text-xs font-bold pt-1">
            <div className={validations.length ? "text-emerald-500" : "text-gray-400"}>✓ 6+ Char</div>
            <div className={validations.hasUpper ? "text-emerald-500" : "text-gray-400"}>✓ Uppercase</div>
            <div className={validations.hasLower ? "text-emerald-500" : "text-gray-400"}>✓ Lowercase</div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg flex justify-center items-center gap-2"
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Create Account"}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
          </div>
          <span className="relative px-4 bg-white dark:bg-gray-900 text-gray-400 text-sm">Or</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-4 border-2 border-gray-100 dark:border-gray-800 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all dark:text-white"
        >
          <FcGoogle size={24} /> Google
        </button>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}