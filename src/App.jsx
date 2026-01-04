import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts";
import DashboardLayout from "./layouts/DashBoardLayout";
import Home from "./pages/Home";
import AllCourses from "./pages/AllCourses";
import CourseDetails from "./pages/CourseDetails";
import AddCourse from "./pages/AddCourse";
import MyCourses from "./pages/MyCourses";
import Enrolled from "./pages/MyEnrolledCourses";
import UpdateCourse from "./pages/UpdateCourse";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./Routes/AdminRoute"; // You need to create this
import InstructorRoute from "./Routes/InstructorRoute"; // You need to create this
import About from "./pages/About";
import Profile from "./pages/Profile";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers"; // The component we just built
import InstructorStats from "./pages/Dashboard/Instructor/InstructorStats";
import CourseReview from "./pages/Dashboard/Admin/CourseReview";
import AdminStats from "./pages/Dashboard/Admin/AdminStats";
import MyEnrolledCourses from "./pages/MyEnrolledCourses";
import Wishlist from "./pages/Wishlist";
import Certificates from "./pages/Certificates";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<AllCourses />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Role-Based Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Common Routes (All Logged-in Users) */}
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />

        {/* Student Specific */}
        <Route path="my-enrollments" element={<MyEnrolledCourses />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="certificates" element={<Certificates />} />

        {/* Instructor Specific */}
        <Route
          path="add-course"
          element={
            <InstructorRoute>
              <AddCourse />
            </InstructorRoute>
          }
        />
        <Route
          path="my-courses"
          element={
            <InstructorRoute>
              <MyCourses />
            </InstructorRoute>
          }
        />
        <Route
          path="update-course/:id"
          element={
            <InstructorRoute>
              <UpdateCourse />
            </InstructorRoute>
          }
        />
        <Route
          path="instructor-stats"
          element={
            <InstructorRoute>
              <InstructorStats />
            </InstructorRoute>
          }
        />

        {/* Admin Specific */}
        <Route
          path="users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

        <Route
          path="course-review"
          element={
            <AdminRoute>
              <CourseReview />
            </AdminRoute>
          }
        />
        <Route
          path="stats"
          element={
            <AdminRoute>
              <AdminStats></AdminStats>
            </AdminRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
