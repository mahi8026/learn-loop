import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Admin Route: Only allows "admin"
export const AdminRoute = ({ children }) => {
  const { user, dbUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen bg-bg-main flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  if (user && dbUser?.role === "admin") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

// Instructor Route: Only allows "instructor"
export const InstructorRoute = ({ children }) => {
  const { user, dbUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen bg-bg-main flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  if (user && dbUser?.role === "instructor") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};