import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

export default function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    document.title = "Course Details - LearnLoop";
  }, []);

  
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/courses/${id}`)
      .then((r) => setCourse(r.data))
      .catch(() => toast.error("Failed to load course details"));
  }, [id]);

  
  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please login to enroll");
      return;
    }

    try {
      const payload = {
        courseId: id,
        title: course.title,
        userEmail: user.email,
        instructorEmail: course.instructorEmail,
        enrolledAt: new Date(),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/enroll`, payload);
      toast.success("Enrolled successfully!");
    } catch (err) {
      toast.error("Enrollment failed. Try again!");
      console.error(err);
    }
  };

  if (!course) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <img
  src={course.image || course.imageURL || "https://via.placeholder.com/600x400?text=No+Image"}
  alt={course.title}
  className="w-full h-64 object-cover rounded"
/>

        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="mt-3">{course.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-semibold text-lg text-gray-700">
              ${course.price} | {course.duration}
            </span>
            <button
              onClick={handleEnroll}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Enroll now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
