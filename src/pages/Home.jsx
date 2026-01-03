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
    <div className="relative overflow-x-hidden bg-[#FAFAFA] dark:bg-[#000000] selection:bg-indigo-500/30 selection:text-indigo-400">
      <Helmet>
        <title>LearnLoop | The Future of Skills</title>
      </Helmet>

      <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 overflow-hidden bg-bg-main">
        <div className="section-container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center absolute inset-0 -z-10 overflow-hidden">
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

      {/*  TRUSTED BY MARQUEE --- */}
      <section className="py-10 border-y border-white/5 bg-bg-card/30">
        <div className="section-container">
          <div className="flex gap-20 items-center justify-center opacity-40 animate-marquee whitespace-nowrap">
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
        </div>
      </section>

      {/* --- TRENDING SECTION --- */}
      <section className="py-32 bg-bg-main">
        <div className="section-container">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight mb-3">
                Trending Now
              </h2>
              <p className="text-slate-500 font-medium">
                The most popular programs this month.
              </p>
            </div>
            <Link
              to="/courses"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-all"
            >
              View All Courses
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course._id}
                className="group bg-bg-card border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all p-3"
              >
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img
                    src={course.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {course.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black">${course.price}</span>
                    <button className="px-6 py-2 bg-white/5 hover:bg-primary rounded-xl font-bold transition-all">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 relative overflow-hidden bg-white dark:bg-[#020305]">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03),transparent)] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">
                  Platform Features
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black dark:text-white tracking-tighter leading-[0.9] mb-4">
                Everything you need to <br />
                <span className="text-indigo-500">level up.</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                We stripped away the fluff. No theory without practice. No
                assignments without feedback.
              </p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-indigo-500/20 to-transparent mx-8 mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[180px]">
            {/* Main Feature: Learning Paths */}
            <motion.div
              whileHover={{ y: -5, scale: 1.01 }}
              className="md:col-span-2 bg-slate-50 dark:bg-white/[0.03] rounded-[2.5rem] p-10 relative overflow-hidden group border border-slate-200 dark:border-white/10 shadow-2xl shadow-indigo-500/5"
            >
              {/* Animated Gradient Blob */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[80px] group-hover:bg-indigo-500/20 transition-all duration-700 rounded-full" />

              <div className="relative -top-4 z-10 h-full flex flex-col justify-between">
                <div className="w-16  h-16 rounded-2xl bg-white dark:bg-indigo-500 flex items-center justify-center text-2xl shadow-xl shadow-indigo-500/20 border border-indigo-100 dark:border-indigo-400/30">
                  <FaLayerGroup className="text-indigo-600 dark:text-white" />
                </div>
                <div className="max-w-sm">
                  <h3 className="text-2xl font-black dark:text-white mb-3 tracking-tight">
                    Structured Learning Paths
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-snug">
                    Don't guess what to learn next. Follow our step-by-step
                    career tracks designed by industry leaders.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Verification: Tall Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:row-span-2 bg-slate-900 dark:bg-indigo-600 rounded-[2.5rem] p-10 relative overflow-hidden group border border-slate-800 dark:border-indigo-500"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-8">
                  <FaShieldAlt className="text-2xl text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 leading-tight">
                  Enterprise <br /> Verified.
                </h3>
                <p className="text-white/70 font-medium text-sm leading-relaxed mb-auto">
                  Your certificates are secured on the blockchain and verifiable
                  by global employers instantly.
                </p>

                <div className="mt-8 p-4 bg-black/20 rounded-2xl backdrop-blur-xl border border-white/10 group-hover:border-white/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <FaCheckCircle className="text-emerald-400 text-sm" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                        Protocol Status
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400 tracking-tighter uppercase font-bold">
                        Verified ID: 8x92...a41z
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stat Card 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-white/[0.02] rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/10 flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-500/5 blur-3xl" />
              <div className="relative z-10">
                <span className="text-sm font-black text-indigo-500 uppercase tracking-widest">
                  Library
                </span>
                <h3 className="text-5xl font-black dark:text-white mt-1">
                  450<span className="text-indigo-500">+</span>
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Premium Courses
                </p>
              </div>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-white/[0.02] rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/10 flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-emerald-500/5 blur-3xl" />
              <div className="relative z-10">
                <span className="text-sm font-black text-emerald-500 uppercase tracking-widest">
                  Community
                </span>
                <h3 className="text-5xl font-black dark:text-white mt-1">
                  12k
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Active Students
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*  BORDERLESS FAQ --- */}
      <section className="py-24 bg-bg-main">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
              Common Questions
            </h2>
            <p className="text-slate-500">
              Everything you need to know about the platform.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {[
              {
                q: "Is the certificate valid globally?",
                a: "Yes. Our certificates are blockchain-verified and recognized by top-tier tech firms globally.",
              },
              {
                q: "Can I access courses offline?",
                a: "Absolutely. Our mobile application allows you to download entire modules for offline study.",
              },
              {
                q: "What if I'm not satisfied?",
                a: "We offer a 30-day no-questions-asked refund policy directly through your dashboard.",
              },
            ].map((item, i) => (
              <details key={i} className="group">
                <summary className="flex justify-between items-center py-8 text-xl font-semibold text-white/80 hover:text-white list-none cursor-pointer transition-colors">
                  <span className="tracking-tight">{item.q}</span>
                  <span className="text-2xl font-light text-primary group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="pb-8 animate-in fade-in slide-in-from-top-2">
                  <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* . FOOTER CTA --- */}
      <section className="py-24 bg-bg-main border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <h2 className="relative text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Ready to join <br /> the loop?
            </h2>
          </div>

          <p className="max-w-lg mx-auto mb-12 text-slate-400 text-lg font-medium leading-relaxed">
            Join 10,000+ developers mastering their future with industry-leading
            curriculum.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/register"
              className="h-16 px-10 bg-white text-black rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-xl flex items-center gap-3"
            >
              Create Free Account <FaArrowRight size={16} />
            </Link>
            <div className="text-left">
              <p className="text-white font-bold text-sm">
                No credit card required
              </p>
              <p className="text-slate-500 text-xs">
                30-day money back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*  STEP-BY-STEP SECTION --- */}
      <section className="py-10 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold dark:text-white mb-4">
              Start Learning in 3 Steps
            </h2>
            <p className="text-slate-500 text-sm">
              Your journey to a new career is simpler than you think.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-slate-100 dark:bg-white/5 z-0"></div>

            {[
              {
                step: "01",
                title: "Join the Loop",
                desc: "Create your free account and tell us your goals.",
              },
              {
                step: "02",
                title: "Pick Your Skill",
                desc: "Choose from 450+ courses taught by industry veterans.",
              },
              {
                step: "03",
                title: "Get Hired",
                desc: "Build a portfolio and get your blockchain certificate.",
              },
            ].map((item, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-16 h-16 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed px-4">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  EXPERTS SECTION --- */}
      <section className="py-24 bg-bg-main">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                Meet the Experts
              </h2>
              <p className="text-slate-500 text-lg font-medium">
                Learn from pioneers who have actually built the tools you use
                every day.
              </p>
            </div>
            <button className="text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-white transition-colors pb-2 border-b border-primary/20 hover:border-white">
              See All Mentors
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "AI Researcher",
                img: "https://i.pravatar.cc/150?img=32",
              },
              {
                name: "James Wilson",
                role: "Senior Architect",
                img: "https://i.pravatar.cc/150?img=12",
              },
              {
                name: "Elena Rodriguez",
                role: "Design Lead",
                img: "https://i.pravatar.cc/150?img=44",
              },
              {
                name: "Marcus Thorne",
                role: "Data Scientist",
                img: "https://i.pravatar.cc/150?img=68",
              },
            ].map((mentor, i) => (
              <div
                key={i}
                className="group bg-bg-card p-4 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-2"
              >
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-slate-900">
                  <img
                    src={mentor.img}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    alt={mentor.name}
                  />
                </div>
                <div className="px-2 pb-4 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {mentor.name}
                  </h3>
                  <p className="text-sm text-primary font-black uppercase tracking-widest">
                    {mentor.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  MINI NEWSLETTER --- */}
      <section className="py-20 bg-bg-main relative overflow-hidden">
        {/* Ambient Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="bg-bg-card border border-white/5 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
            <div className="text-center lg:text-left max-w-md">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                Level up your <span className="text-primary">inbox.</span>
              </h3>
              <p className="text-slate-400 text-lg font-medium">
                Weekly career tips, engineering insights, and exclusive course
                discounts.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-16 px-6 rounded-2xl bg-bg-main border border-white/5 text-white placeholder:text-slate-600 text-lg focus:outline-none focus:ring-2 ring-primary w-full md:w-80 transition-all"
              />
              <button className="h-16 px-10 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-focus transition-all shadow-lg shadow-primary/20 whitespace-nowrap">
                Join the Loop
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
