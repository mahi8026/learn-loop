import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    document.title = "Login - LearnLoop";
  }, []);
  const [form, setForm] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      toast.success("Logged in");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Login failed: " + (err.message || ""));
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex items-center justify-between">
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Login
          </button>
        </div>
      </form>
      <div className="mt-4">
        <button
          onClick={async () => {
            try {
              await signInWithGoogle();
              navigate("/");
            } catch (e) {
              toast.error("Google sign in failed");
            }
          }}
          className="px-4 py-2 border rounded"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
