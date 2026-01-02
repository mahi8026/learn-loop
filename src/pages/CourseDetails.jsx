import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { Helmet } from "react-helmet";
import { FaCheckCircle, FaUsers, FaPlayCircle } from "react-icons/fa";

export default function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/courses/${id}`)
      .then((r) => setCourse(r.data))
      .catch(() => toast.error("Course not found"));
  }, [id]);

  const handleEnroll = async () => {
    if (!user) return navigate("/login", { state: { from: `/courses/${id}` } });
    
    setEnrolling(true);
    try {
      const payload = {
        courseId: id,
        userEmail: user.email,
        userName: user.displayName,
        enrolledAt: new Date()
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/enroll`, payload);
      toast.success("Welcome to the course!");
      navigate("/dashboard/enrolled");
    } catch (err) {
      toast.error(err.response?.data?.message || "Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };

  if (!course) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-dots loading-lg text-indigo-600"></span></div>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet><title>{course.title} | LearnLoop</title></Helmet>
      
      {/* Page Header */}
      <div className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <span className="bg-indigo-600 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">{course.category}</span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">{course.title}</h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl">{course.description}</p>
            <div className="flex flex-wrap gap-6 text-sm font-bold">
              <div className="flex items-center gap-2"><FaUsers className="text-indigo-400"/> 1,240 Students</div>
              <div className="flex items-center gap-2"><FaPlayCircle className="text-indigo-400"/> 24 Lessons</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-indigo-400"/> Certificate of Completion</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-20 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12 py-20">
            <section>
              <h2 className="text-2xl font-black mb-6 dark:text-white">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {["Industry standard practices", "Real-world projects", "Advanced techniques", "Problem-solving skills"].map((item, i) => (
                  <div key={i} className="flex gap-3 text-gray-600 dark:text-gray-400">
                    <FaCheckCircle className="text-emerald-500 mt-1 shrink-0"/> {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center gap-6">
              <img src={course.instructorPhoto} className="w-20 h-20 rounded-2xl object-cover" alt="" />
              <div>
                <p className="text-xs font-bold text-indigo-600 uppercase">Instructor</p>
                <h3 className="text-xl font-bold dark:text-white">{course.instructorName}</h3>
                <p className="text-gray-500 text-sm">Expert {course.category} Professional</p>
              </div>
            </section>
          </div>

          {/* Sticky Enrollment Card */}
          <div className="relative">
            <div className="lg:sticky lg:top-24 bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <img src={course.image || course.imageURL} className="w-full h-56 object-cover" alt="" />
              <div className="p-8">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black dark:text-white">${course.price}</span>
                  <span className="text-gray-400 line-through">$199.99</span>
                </div>
                <button 
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all mb-4 shadow-lg shadow-indigo-200 dark:shadow-none"
                >
                  {enrolling ? <span className="loading loading-spinner"></span> : "Enroll Now"}
                </button>
                <p className="text-center text-xs text-gray-400">30-Day Money-Back Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}