import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Requirement #6: Demo Credentials Button
  const handleDemoLogin = () => {
    setForm({ email: "instructor@learnloop.com", password: "Password123!" });
    toast.info("Demo credentials filled!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 border border-gray-100 dark:border-gray-800">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black dark:text-white">Login</h2>
          <p className="text-gray-500 mt-2">Access your learning dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white transition-all"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-indigo-500 dark:text-white transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
            {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => signInWithGoogle()} className="flex items-center justify-center gap-2 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all dark:text-white">
            <FcGoogle size={20}/> Google
          </button>
          <button onClick={handleDemoLogin} className="flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-600 rounded-2xl font-bold hover:bg-emerald-100 transition-all">
            Demo User
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          New to LearnLoop? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}