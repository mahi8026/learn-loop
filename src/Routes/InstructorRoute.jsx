import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function InstructorRoute({ children }) {
  const { dbUser, loading } = useAuth();
  if (loading) return <div className="p-20 text-center">Loading...</div>;
  // Allow both instructors and admins to see instructor tools
  return (dbUser?.role === "instructor" || dbUser?.role === "admin") ? children : <Navigate to="/dashboard" />;
}