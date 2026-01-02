import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  FaArrowRight, FaRocket, FaUsers, FaBookOpen, 
  FaStar, FaCheckCircle, FaLaptopCode, FaChartLine, 
  FaPaintBrush, FaBullhorn 
} from "react-icons/fa";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch top 6 courses for the featured section
    axios.get(`${import.meta.env.VITE_API_URL}/courses`)
      .then((res) => {
        setFeaturedCourses(res.data.slice(0, 6));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-gray-950">
      <Helmet><title>LearnLoop | Master Your Future</title></Helmet>

      {/* 1. HERO SECTION */}
      
      <section className="relative pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-6">
              🚀 NEW: AI-Powered Learning Paths
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6">
              Master the skills <br /> 
              <span className="text-indigo-600">that matter.</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-lg">
              Join 10,000+ students learning from industry leaders. Real-world projects, expert mentors, and a community that cares.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-200 dark:shadow-none">
                Browse Courses <FaArrowRight />
              </Link>
              <Link to="/register" className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center">
                Get Started for Free
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="hidden lg:block relative">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800" className="rounded-[3rem] shadow-2xl" alt="Students" />
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white"><FaCheckCircle size={24}/></div>
              <div><p className="text-sm font-black dark:text-white">Professional Certificates</p><p className="text-xs text-gray-500">Verified by Industry Partners</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12 border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Students", count: "10K+", icon: <FaUsers className="text-indigo-600" /> },
            { label: "Courses", count: "450+", icon: <FaBookOpen className="text-indigo-600" /> },
            { label: "Mentors", count: "120+", icon: <FaRocket className="text-indigo-600" /> },
            { label: "Reviews", count: "4.9/5", icon: <FaStar className="text-indigo-600" /> },
          ].map((stat, i) => (
            <div key={i} className="text-center flex flex-col items-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <h3 className="text-3xl font-black dark:text-white">{stat.count}</h3>
              <p className="text-gray-500 text-sm font-bold uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="py-24 px-4 container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black dark:text-white mb-4">Top Categories</h2>
          <p className="text-gray-500">Discover your next passion from our most popular subjects.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Development", icon: <FaLaptopCode />, color: "bg-blue-50 text-blue-600" },
            { name: "Marketing", icon: <FaBullhorn />, color: "bg-orange-50 text-orange-600" },
            { name: "Design", icon: <FaPaintBrush />, color: "bg-pink-50 text-pink-600" },
            { name: "Business", icon: <FaChartLine />, color: "bg-emerald-50 text-emerald-600" },
          ].map((cat, i) => (
            <div key={i} className="p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:border-indigo-500 hover:shadow-xl transition-all text-center cursor-pointer dark:bg-gray-900 group">
              <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform ${cat.color}`}>
                {cat.icon}
              </div>
              <h4 className="font-bold dark:text-white">{cat.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED COURSES */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black dark:text-white mb-4">Featured Courses</h2>
              <p className="text-gray-500">Hand-picked excellence for your professional growth.</p>
            </div>
            <Link to="/courses" className="text-indigo-600 font-bold hover:underline flex items-center gap-2">
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <motion.div key={course._id} whileHover={{ y: -10 }} className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                <img src={course.image} className="w-full h-48 object-cover" alt={course.title} />
                <div className="p-6">
                  <span className="text-xs font-black text-indigo-500 uppercase">{course.category}</span>
                  <h3 className="text-xl font-bold dark:text-white mt-2 mb-4 line-clamp-1">{course.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black dark:text-white">${course.price}</span>
                    <Link to={`/courses/${course._id}`} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all">Details</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      
      <section className="py-24 px-4 container mx-auto max-w-5xl">
        <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-white text-center">
          <h2 className="text-4xl font-black mb-16">Start Learning in 3 Steps</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Join Loop", desc: "Create your profile in seconds." },
              { num: "02", title: "Pick Skill", desc: "Choose from 400+ expert courses." },
              { num: "03", title: "Get Hired", desc: "Showcase your new certificates." },
            ].map((step, i) => (
              <div key={i}>
                <div className="text-6xl font-black opacity-30 mb-4">{step.num}</div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-indigo-100">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TOP INSTRUCTORS */}
      <section className="py-24 px-4 container mx-auto max-w-6xl">
        <h2 className="text-4xl font-black dark:text-white text-center mb-16">Meet the Experts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Dr. Sarah Chen", role: "AI Researcher", img: "https://i.pravatar.cc/150?img=32" },
            { name: "James Wilson", role: "Senior Architect", img: "https://i.pravatar.cc/150?img=11" },
            { name: "Elena Rodriguez", role: "Design Lead", img: "https://i.pravatar.cc/150?img=44" },
          ].map((ins, i) => (
            <div key={i} className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-[2rem]">
              <img src={ins.img} className="w-24 h-24 rounded-2xl mx-auto mb-4 object-cover" alt="" />
              <h4 className="text-xl font-bold dark:text-white">{ins.name}</h4>
              <p className="text-indigo-500 font-bold text-sm uppercase">{ins.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 bg-white dark:bg-gray-950 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black dark:text-white mb-6">Success Stories</h2>
              <p className="text-gray-500 text-lg mb-8 italic">"LearnLoop didn't just teach me how to code; they taught me how to think like an engineer. Within 3 months of finishing the React course, I landed my first Senior role."</p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=5" className="w-12 h-12 rounded-full" alt="" />
                <div>
                  <p className="font-bold dark:text-white">David K., Alumni</p>
                  <p className="text-sm text-gray-500">Software Engineer at Google</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-gray-900 p-8 rounded-3xl h-40 flex items-center justify-center text-center"><p className="font-black text-indigo-600 text-xl">98% Satisfied</p></div>
              <div className="bg-emerald-50 dark:bg-gray-900 p-8 rounded-3xl h-40 flex items-center justify-center text-center mt-8"><p className="font-black text-emerald-600 text-xl">24/7 Support</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Level up your inbox</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto">Get weekly career tips, course discounts, and industry news directly to your email.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500" />
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all">Subscribe</button>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="py-24 px-4 container mx-auto max-w-3xl">
        <h2 className="text-4xl font-black text-center mb-16 dark:text-white">Common Questions</h2>
        <div className="space-y-6">
          {[
            { q: "Do I get a certificate?", a: "Yes! Every course includes a verified professional certificate." },
            { q: "Is there a refund policy?", a: "We offer a 30-day money-back guarantee on all enrollments." },
            { q: "Can I learn at my own pace?", a: "Absolutely. All courses provide lifetime access to content." },
          ].map((faq, i) => (
            <details key={i} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <summary className="p-6 font-bold cursor-pointer list-none flex justify-between items-center dark:text-white">
                {faq.q} <span className="group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <div className="p-6 pt-0 text-gray-500 dark:text-gray-400">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* 10. CTA FOOTER */}
      <section className="py-24 bg-indigo-50 dark:bg-indigo-900/10 text-center px-4">
        <h2 className="text-4xl md:text-6xl font-black dark:text-white mb-8">Ready to start your journey?</h2>
        <p className="text-xl text-gray-500 mb-12">No credit card required to get started.</p>
        <Link to="/register" className="px-12 py-5 bg-indigo-600 text-white rounded-full font-black text-xl hover:bg-indigo-700 transition-all inline-block shadow-2xl shadow-indigo-200">
          Join LearnLoop Now
        </Link>
      </section>
    </div>
  );
}