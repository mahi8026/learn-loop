
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<AllCourses />} />
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

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="add-course" element={<AddCourse />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="enrolled" element={<Enrolled />} />
        <Route path="update-course/:id" element={<UpdateCourse />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
