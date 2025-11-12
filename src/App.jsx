import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllCourses from "./pages/AllCourses";
import CourseDetails from "./pages/CourseDetails";
import AddCourse from "./pages/AddCourse";
import MyCourses from "./pages/MyCourses";
import Enrolled from "./pages/Enrolled";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/DashBoard";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-course"
            element={
              <ProtectedRoute>
                <AddCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enrolled"
            element={
              <ProtectedRoute>
                <Enrolled />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
