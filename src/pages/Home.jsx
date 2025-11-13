import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { useTheme } from "../contexts/ThemeContext"; 
import { Link } from "react-router-dom";
import axios from 'axios'; 

const API_BASE_URL = 'http://localhost:5000/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const instructorData = [
  { name: "Alex Smith", expertise: "Web Development", photo: "https://i.pravatar.cc/150?img=1" },
  { name: "Rina Ahmed", expertise: "Data Science", photo: "https://i.pravatar.cc/150?img=47" },
  { name: "Kamal Hossain", expertise: "Business & Design", photo: "https://i.pravatar.cc/150?img=60" },
];

export default function Home() {
  const { isDarkMode } = useTheme();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/courses`); 
        setCourses(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please check the server connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const featuredCourses = courses.filter(course => course.isFeatured).slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Helmet>
        <title>Home - LearnLoop</title>
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`rounded-2xl p-12 shadow-2xl transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-indigo-900 shadow-indigo-900/50' 
                : 'bg-indigo-600 shadow-indigo-600/50'
            }`}
          >
            <h1 className="text-5xl font-extrabold text-white mb-4">
              Master new skills with short, practical courses
            </h1>
            <p className="mt-4 text-xl text-indigo-100">
              Join thousands of learners — pick a course and start today.
            </p>
            <Link to="/courses" className="mt-6 inline-block px-8 py-3 bg-white text-indigo-700 font-bold rounded-lg hover:bg-gray-100 transition duration-300 shadow-md">
              Explore Courses
            </Link>
          </motion.div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-extrabold mb-10 text-gray-800 dark:text-white transition-colors duration-300 text-center">
            Popular Courses
          </h2>

          {loading ? (
            <p className="text-center text-indigo-500 dark:text-indigo-300 animate-pulse">
              Loading featured courses...
            </p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : featuredCourses.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No featured courses found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl"
                >
           
                  <img
                    src={course.imageURL || course.image || "https://via.placeholder.com/600x400?text=No+Image"}
                    alt={course.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {course.category} • {course.duration}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${course.price?.toFixed(2) || "Free"}
                      </span>
                    
                      <Link 
                        to={`/courses/${course._id}`}  
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-extrabold mb-10 text-gray-800 dark:text-white text-center">
            Why Choose Us
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "Practical projects and mentorship", icon: '🛠️' },
              { title: "Flexible learning paths", icon: '⏰' },
              { title: "Industry-aligned curriculum", icon: '📈' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-900"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-base">
                  {index === 0 && "Learn by doing with hands-on labs and expert mentors."}
                  {index === 1 && "Study at your own pace, anytime, anywhere."}
                  {index === 2 && "Gain skills that match real industry demand."}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section>
          <h2 className="text-4xl font-extrabold mb-10 text-gray-800 dark:text-white text-center">
            Top Instructors
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {instructorData.map((instructor, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 flex items-center space-x-4 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
              >
                <img 
                  src={instructor.photo} 
                  alt={instructor.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{instructor.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 text-base font-medium">{instructor.expertise}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
