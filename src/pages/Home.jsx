import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaArrowRight,
  FaRocket,
  FaUsers,
  FaBookOpen,
  FaStar,
  FaCheckCircle,
  FaLaptopCode,
  FaChartLine,
  FaPaintBrush,
  FaBullhorn,
  FaPlayCircle,
  FaLayerGroup,
  FaShieldAlt,
} from "react-icons/fa";

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/courses`)
      .then((res) => setFeaturedCourses(res.data.slice(0, 6)))
      .catch(() => setFeaturedCourses([])) // Handle error gracefully
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-[#FAFAFA] dark:bg-[#050505] selection:bg-indigo-500/30 selection:text-indigo-400">
      <Helmet>
        <title>LearnLoop | The Future of Skills</title>
      </Helmet>

      <section className="relative min-h-screen flex items-center pt-2 pb-20 px-4 isolate">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-normal animate-pulse duration-[10s]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>

        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-7xl lg:text-[5.5rem] font-bold text-slate-900 dark:text-white leading-[1.05] mb-8 tracking-[-0.04em]"
            >
              Learn faster. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Build better.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed font-medium"
            >
              Access the top 1% of curriculum designed by engineers from Google,
              Meta, and Amazon. Stop consuming, start creating.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/courses"
                className="group h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300"
              >
                Start Learning Free{" "}
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={fadeInUp}
              className="mt-6 flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-500"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    className="w-10 h-10 rounded-full border-4 border-white dark:border-black"
                    alt="User"
                  />
                ))}
              </div>
              <p>
                Trusted by{" "}
                <span className="text-slate-900 dark:text-white font-bold">
                  10,000+
                </span>{" "}
                developers
              </p>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Floating UI Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block perspective-1000"
          >
            <motion.div
              style={{ y }}
              className="relative z-10 bg-white dark:bg-[#111] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl p-4 rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out"
            >
              {/* Simulated UI Header */}
              <div className="flex items-center gap-4 mb-6 border-b border-slate-100 dark:border-white/5 pb-4 px-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="h-2 w-32 bg-slate-100 dark:bg-white/10 rounded-full"></div>
              </div>
              {/* Simulated Content */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 h-48 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <FaChartLine className="text-indigo-500/20 text-9xl absolute" />
                  <div className="z-10 text-center">
                    <p className="text-4xl font-black dark:text-white">+124%</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">
                      Skill Growth
                    </p>
                  </div>
                </div>
                <div className="h-32 bg-indigo-500 rounded-xl p-4 text-white flex flex-col justify-between">
                  <FaRocket className="text-2xl" />
                  <p className="font-bold text-sm">Deployment Ready</p>
                </div>
                <div className="h-32 bg-slate-100 dark:bg-white/5 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-pink-500"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                  </div>
                  <p className="font-bold text-sm dark:text-white">
                    Mentorship
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. TRUSTED BY MARQUEE --- */}
      <section className="py-10 border-y border-slate-200 dark:border-white/5 bg-white dark:bg-black/50 overflow-hidden">
        <div className="flex gap-20 items-center justify-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500 animate-marquee whitespace-nowrap">
          {[
            "Google",
            "Microsoft",
            "Amazon",
            "Spotify",
            "Netflix",
            "Adobe",
            "Linear",
          ].map((brand, i) => (
            <span
              key={i}
              className="text-2xl font-black text-slate-400 dark:text-slate-600 mx-8"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* --- 4. REFINED FEATURED COURSES --- */}
      <section className="py-20 bg-slate-50 dark:bg-[#080808] px-4 overflow-hidden border-y border-slate-100 dark:border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold dark:text-white mb-2 tracking-tight">Trending Now</h2>
              <p className="text-sm text-slate-500">The most popular programs this month.</p>
            </div>
            <Link
              to="/courses"
              className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:underline border-b border-transparent hover:border-indigo-600 transition-all"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading
              ? [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-72 bg-slate-200 dark:bg-white/5 rounded-2xl animate-pulse"
                  ></div>
                ))
              : featuredCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    whileHover={{ y: -6 }}
                    className="group bg-white dark:bg-[#111] rounded-2xl p-3 border border-slate-200 dark:border-white/5 hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-xl"
                  >
                    {/* Reduced Image Height from h-56 to h-44 */}
                    <div className="h-44 rounded-xl overflow-hidden relative">
                      <img
                        src={course.image || course.imageURL}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt={course.title}
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/10 uppercase tracking-wider">
                        {course.category}
                      </div>
                    </div>
                    <div className="pt-4 px-1 pb-2">
                      <h3 className="text-base font-bold dark:text-white mb-2 line-clamp-1">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-amber-400 text-[10px]">
                          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">
                          4.9 (1.2k)
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-50 dark:border-white/5">
                        <span className="text-xl font-black dark:text-white">
                          ${course.price}
                        </span>
                        <Link
                          to={`/courses/${course._id}`}
                          className="h-9 px-4 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
                        >
                          Enroll <FaArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* --- 3. REFINED BENTO GRID FEATURES --- */}
      <section className="py-20 px-4 relative border-t border-slate-100 dark:border-white/5">
        <div className="container mx-auto max-w-6xl">
          {" "}
          {/* Reduced from 7xl to 6xl for better density */}
          <div className="mb-12 max-w-2xl">
            {" "}
            {/* Reduced margin from 20 to 12 */}
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4 tracking-tight">
              Everything you need to{" "}
              <span className="text-indigo-500">level up.</span>
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400">
              {" "}
              {/* Reduced from text-xl */}
              We stripped away the fluff. No theory without practice. No
              assignments without feedback.
            </p>
          </div>
          {/* Reduced auto-rows from 300px to 240px and gap from 6 to 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
            {/* Large Card - Reduced padding and radius */}
            <motion.div
              whileHover={{ y: -4 }}
              className="md:col-span-2 bg-slate-50 dark:bg-[#0f1117] rounded-2xl p-8 relative overflow-hidden group border border-slate-200 dark:border-white/5"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full group-hover:bg-indigo-500/20 transition-all"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="bg-white dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 shadow-sm border border-slate-100 dark:border-white/10">
                  <FaLayerGroup className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold dark:text-white mb-2">
                    Structured Learning Paths
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    Don't guess what to learn next. Follow our step-by-step
                    career tracks designed by CTOs.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tall Card - Reduced padding and radius */}
            <motion.div
              whileHover={{ y: -4 }}
              className="md:row-span-2 bg-slate-900 dark:bg-white rounded-2xl p-8 relative overflow-hidden group text-white dark:text-black border border-slate-800 dark:border-slate-200"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
              <div className="relative z-10 h-full flex flex-col">
                <FaShieldAlt className="text-3xl mb-auto text-indigo-400 dark:text-indigo-600" />
                <h3 className="text-2xl font-bold mb-3">
                  Enterprise Verified.
                </h3>
                <p className="opacity-80 text-sm leading-relaxed">
                  Your certificates are secured on the blockchain and verifiable
                  by employers instantly.
                </p>
                <div className="mt-6 p-3 bg-white/10 dark:bg-black/5 rounded-lg backdrop-blur-sm border border-white/10 dark:border-black/10">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-400 text-xs" />
                    <span className="font-mono text-[10px] tracking-tight">
                      VERIFIED ID: 8x92...a41z
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Small Card 1 - Scaled down typography */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#0f1117] rounded-2xl p-6 border border-slate-200 dark:border-white/5 flex flex-col justify-center text-center md:text-left"
            >
              <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600">
                450+
              </h3>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                Premium Courses
              </p>
            </motion.div>

            {/* Small Card 2 - Scaled down typography */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#0f1117] rounded-2xl p-6 border border-slate-200 dark:border-white/5 flex flex-col justify-center text-center md:text-left"
            >
              <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-600">
                12k
              </h3>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                Active Students
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 5. EDITORIAL TESTIMONIAL LAYOUT --- */}
<section className=" px-4 bg-white dark:bg-[#050505] overflow-hidden">
  <div className="container mx-auto max-w-6xl">
    <div className="bg-slate-900 dark:bg-[#111] rounded-[2.5rem] overflow-hidden relative border border-white/5">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-center">
        
        {/* Left Side: Image/Visual (Takes 40%) */}
        <div className="w-full lg:w-[40%] h-[300px] lg:h-[450px] relative">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
            alt="Alex Morgan" 
            className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
          />
          {/* Logo Overlay */}
          <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl">
             <p className="text-white text-xs font-bold tracking-widest uppercase">Spotify Design Team</p>
          </div>
        </div>

        {/* Right Side: Content (Takes 60%) */}
        <div className="w-full lg:w-[60%] p-8 md:p-16 lg:p-20 relative">
          {/* Large Quote Mark Decoration */}
          <span className="absolute top-10 left-10 text-[12rem] leading-none font-serif text-white/5 select-none">“</span>
          
          <div className="relative z-10">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-amber-400 text-sm" />
              ))}
            </div>

            <h2 className="text-2xl md:text-4xl font-medium text-white leading-tight mb-8 italic">
              "The structured curriculum here is the <span className="text-indigo-400 font-bold not-italic">ultimate cheat code</span> for your career. I managed to skip two years of trial and error and land my dream role in months."
            </h2>

            <div className="flex items-center gap-4 pt-8 border-t border-white/10">
              <div>
                <p className="text-xl font-bold text-white">Alex Morgan</p>
                <p className="text-indigo-400 font-medium">Product Designer @ Spotify</p>
              </div>
              
              <div className="ml-auto hidden sm:block">
                 <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group hover:bg-white hover:text-black transition-all cursor-pointer">
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
      

      {/* --- 6. CLEAN FAQ --- */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-[#080808]">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold dark:text-white mb-8 text-center">
            Frequently Asked
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Is the certificate valid globally?",
                a: "Yes. Our certificates are blockchain-verified and recognized globally.",
              },
              {
                q: "Can I access courses offline?",
                a: "Yes, our mobile app allows for offline downloads.",
              },
              {
                q: "What if I'm not satisfied?",
                a: "We offer a 30-day no-questions-asked refund policy.",
              },
            ].map((item, i) => (
              <details key={i} className="group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl transition-all">
                <summary className="flex justify-between items-center p-5 font-semibold text-sm dark:text-white list-none cursor-pointer">
                  {item.q}
                  <span className="text-slate-400 group-open:rotate-45 transition-transform text-xl">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- 7. FOOTER CTA (PROFESSIONAL SIZE) --- */}
      <section className="py-16 px-4 bg-slate-900 dark:bg-[#0b0f1a] text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to join the loop?
          </h2>
          <p className="mb-8 text-slate-400 text-sm">Join 10,000+ others masterminding their future.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25"
          >
            Create Free Account <FaArrowRight size={12} />
          </Link>
          <p className="mt-6 text-slate-500 text-[11px] font-medium uppercase tracking-widest">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* --- 8. STEP-BY-STEP SECTION --- */}
<section className="py-20 px-4 bg-white dark:bg-black">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold dark:text-white mb-4">Start Learning in 3 Steps</h2>
      <p className="text-slate-500 text-sm">Your journey to a new career is simpler than you think.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-12 relative">
      {/* Connecting Line (Desktop Only) */}
      <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-slate-100 dark:bg-white/5 z-0"></div>
      
      {[
        { step: "01", title: "Join the Loop", desc: "Create your free account and tell us your goals." },
        { step: "02", title: "Pick Your Skill", desc: "Choose from 450+ courses taught by industry veterans." },
        { step: "03", title: "Get Hired", desc: "Build a portfolio and get your blockchain certificate." }
      ].map((item, i) => (
        <div key={i} className="relative z-10 text-center">
          <div className="w-16 h-16 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{item.step}</span>
          </div>
          <h3 className="text-lg font-bold dark:text-white mb-2">{item.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed px-4">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* --- 9. EXPERTS SECTION --- */}
<section className="py-20 bg-slate-50 dark:bg-[#080808] px-4">
  <div className="container mx-auto max-w-6xl">
    <div className="flex justify-between items-center mb-12">
      <h2 className="text-3xl font-bold dark:text-white tracking-tight">Meet the Experts</h2>
      <button className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-500 transition-colors">
        See All Mentors
      </button>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { name: "Dr. Sarah Chen", role: "AI Researcher", img: "https://i.pravatar.cc/150?img=32" },
        { name: "James Wilson", role: "Senior Architect", img: "https://i.pravatar.cc/150?img=12" },
        { name: "Elena Rodriguez", role: "Design Lead", img: "https://i.pravatar.cc/150?img=44" },
        { name: "Marcus Thorne", role: "Data Scientist", img: "https://i.pravatar.cc/150?img=68" }
      ].map((mentor, i) => (
        <div key={i} className="group bg-white dark:bg-[#111] p-3 rounded-2xl border border-slate-200 dark:border-white/5 transition-all hover:shadow-lg">
          <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-white/5">
            <img src={mentor.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={mentor.name} />
          </div>
          <h3 className="text-sm font-bold dark:text-white truncate">{mentor.name}</h3>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-tighter">{mentor.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* --- 10. MINI NEWSLETTER --- */}
<section className="py-12 bg-indigo-600 dark:bg-indigo-900 px-4">
  <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8">
    <div className="text-white">
      <h3 className="text-xl font-bold mb-1">Level up your inbox.</h3>
      <p className="text-indigo-100 text-sm">Weekly career tips and course discounts.</p>
    </div>
    <div className="flex w-full md:w-auto gap-2">
      <input 
        type="email" 
        placeholder="Enter email" 
        className="h-11 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:bg-white/20 w-full md:w-64"
      />
      <button className="h-11 px-6 bg-white text-indigo-600 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors whitespace-nowrap">
        Join Loop
      </button>
    </div>
  </div>
</section>
    </div>
  );
}
