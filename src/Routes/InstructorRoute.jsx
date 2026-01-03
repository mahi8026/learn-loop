import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const InstructorRoute = ({ children }) => {
  const { user, dbUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="h-screen flex items-center justify-center bg-bg-main"><span className="loading loading-spinner text-primary"></span></div>;

  if (user && dbUser?.role === "instructor") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default InstructorRoute;