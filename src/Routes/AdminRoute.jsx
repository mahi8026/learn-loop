import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute({ children }) {
  const { dbUser, loading } = useAuth();
  if (loading) return <div className="p-20 text-center">Loading...</div>;
  return dbUser?.role === "admin" ? children : <Navigate to="/dashboard" />;
}