import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { IoFlashOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = (role) => {
    if (role === "admin") {
      setForm({
        email: "naruto014@gmail.com",
        password: "Naruto014@gmail.com",
      });
      toast.success("Admin credentials filled!");
    } else {
      setForm({ email: "gon07@gmail.com", password: "Gon07@gmail.com" });
      toast.success("Student credentials filled!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google Sign-in failed");
    }
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
    <div className="min-h-screen flex items-center justify-center bg-bg-main px-4 py-12 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

      <div className="max-w-md w-full bg-bg-card border border-border-subtle rounded-[2.5rem] shadow-2xl p-8 md:p-10 z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-text-title tracking-tight">
            Login
          </h2>
          <p className="text-text-body mt-3">Access your learning dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-text-title mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-6 py-4 bg-bg-main border border-border-subtle rounded-2xl focus:ring-2 ring-primary outline-none text-text-title placeholder:text-text-body/30 transition-all"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-title mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-6 py-4 bg-bg-main border border-border-subtle rounded-2xl focus:ring-2 ring-primary outline-none text-text-title placeholder:text-text-body/30 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-focus transition-all shadow-lg shadow-primary/20 flex justify-center items-center"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
            <span className="px-4 bg-bg-card text-slate-500">Quick Access</span>
          </div>
        </div>

        {/* Demo Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => handleDemoLogin("instructor")}
            className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-text-title hover:bg-white/10 transition-all"
          >
            <IoFlashOutline className="text-amber-400" /> Demo Instructor
          </button>
          <button
            onClick={() => handleDemoLogin("admin")}
            className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-text-title hover:bg-white/10 transition-all"
          >
            <IoShieldCheckmarkOutline className="text-emerald-400" /> Demo Admin
          </button>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-4 bg-bg-main border border-border-subtle rounded-2xl font-bold text-text-title hover:bg-bg-card transition-all"
        >
          <FcGoogle size={20} /> Sign in with Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-500">
          New to LearnLoop?{" "}
          <Link
            to="/register"
            className="text-primary font-bold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
