import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaArrowRight,
  FaRocket,
  FaCheckCircle,
  FaChartLine,
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
      .catch(() => setFeaturedCourses([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-bg-main selection:bg-primary/30">
      <Helmet>
        <title>LearnLoop | The Future of Skills</title>
      </Helmet>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 overflow-hidden bg-bg-main">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse duration-[10s]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-6xl lg:text-[5.5rem] font-bold text-text-title leading-[1.05] mb-8 tracking-[-0.04em]"
            >
              Learn faster. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
                Build better.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-text-body mb-10 max-w-lg leading-relaxed font-medium"
            >
              Access the top 1% of curriculum designed by engineers from Google,
              Meta, and Amazon. Stop consuming, start creating.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button class="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base">
                <span class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"></span>

                <span class="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"></span>

                <div class="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
                  <Link to="/courses" className="">
                    Start Learning Free
                  </Link>

                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex items-center gap-4 text-sm font-medium text-text-body"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    className="w-10 h-10 rounded-full border-4 border-bg-main"
                    alt="User"
                  />
                ))}
              </div>
              <p>
                Trusted by{" "}
                <span className="text-text-title font-bold">10,000+</span>{" "}
                developers
              </p>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <motion.div
              style={{ y }}
              className="relative z-10 bg-bg-card rounded-3xl border border-border-subtle shadow-2xl p-4"
            >
              <div className="flex items-center gap-4 mb-6 border-b border-border-subtle pb-4 px-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 h-48 bg-bg-main rounded-xl flex items-center justify-center relative overflow-hidden">
                  <FaChartLine className="text-primary/10 text-9xl absolute" />
                  <div className="z-10 text-center">
                    <p className="text-4xl  font-black text-text-title">
                      +124%
                    </p>
                    <p className="text-xs text-text-body uppercase tracking-widest">
                      Skill Growth
                    </p>
                  </div>
                </div>
                <div className="h-32 bg-primary rounded-xl p-4 text-white flex flex-col justify-between shadow-lg shadow-primary/20">
                  <FaRocket className="text-2xl" />
                  <p className="font-bold text-text-title text-sm">
                    Deployment Ready
                  </p>
                </div>
                <div className="h-32 bg-bg-main border border-border-subtle rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-pink-500"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                  </div>
                  <p className="font-bold text-sm text-text-title">
                    Mentorship
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- TRUSTED BY MARQUEE --- */}
      <section className="py-6 border-y border-border-subtle/30 bg-bg-card/20 overflow-hidden">
        <div className="flex overflow-hidden select-none group">
          <div className="flex flex-nowrap shrink-0 items-center gap-20 animate-marquee group-hover:[animation-play-state:paused]">
            {[
              "Google",
              "Microsoft",
              "Amazon",
              "Spotify",
              "Netflix",
              "Adobe",
              "Slack",
              "Discord",
              "Linear",
              "Stripe",
              "Framer",
              "Vercel",
            ].map((brand, i) => (
              <span
                key={i}
                className="text-2xl md:text-3xl font-black text-text-title tracking-tighter opacity-20 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default"
              >
                {brand}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              "Google",
              "Microsoft",
              "Amazon",
              "Spotify",
              "Netflix",
              "Adobe",
              "Slack",
              "Discord",
              "Linear",
              "Stripe",
              "Framer",
              "Vercel",
            ].map((brand, i) => (
              <span
                key={`dup-${i}`}
                className="text-2xl md:text-3xl font-black text-text-title tracking-tighter opacity-20 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRENDING SECTION --- */}
      <section className="py-12 bg-bg-main">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-text-title tracking-tight mb-2">
                Trending Now
              </h2>
              <p className="text-text-body font-medium">
                The most popular programs this month.
              </p>
            </div>
            <Link
              to="/courses"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:opacity-70 transition-all"
            >
              View All Courses
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course._id}
                className="group bg-bg-card border border-border-subtle rounded-4xl overflow-hidden hover:border-primary transition-all p-3 shadow-sm"
              >
                <div className="aspect-video rounded-2xl overflow-hidden bg-bg-main">
                  <img
                    src={course.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={course.title}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-text-title mb-4">
                    {course.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-text-title">
                      ${course.price}
                    </span>
                    <button className="relative max-w-20 group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base w-full">
                      {/* The Shadow Layer */}
                      <span className="absolute top-0 left-0 w-full h-full bg-black/25 rounded-xl transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"></span>

                      {/* The Edge/Depth Layer */}
                      <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-slate-800 via-slate-700 to-slate-800"></span>

                      {/* The Top Layer (Face) */}
                      <Link
                        to={`/courses/${course._id}`}
                        className="relative flex items-center justify-center py-3 px-6 text-white rounded-xl transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-2 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110"
                      >
                        <span className="font-bold text-sm tracking-wider">
                          Enroll
                        </span>

                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 transition duration-250 group-hover:translate-x-1"
                        >
                          <path
                            clipRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES BENTO GRID --- */}
      <section className="py-12 bg-bg-card/50">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-text-title tracking-tighter mb-4">
              Everything you need to{" "}
              <span className="text-primary">level up.</span>
            </h2>
            <p className="text-lg text-text-body max-w-2xl font-medium">
              We stripped away the fluff. No theory without practice. No
              assignments without feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[180px]">
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-bg-card border border-border-subtle rounded-[2.5rem] p-10 relative overflow-hidden group shadow-xl"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-16 h-16 rounded-2xl bg-bg-main flex items-center justify-center text-2xl border border-border-subtle shadow-inner">
                  <FaLayerGroup className="text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-text-title mb-3">
                    Structured Learning Paths
                  </h3>
                  <p className="text-text-body font-medium">
                    Follow step-by-step career tracks designed by industry
                    leaders.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="md:row-span-2 bg-primary rounded-[2.5rem] p-10 relative overflow-hidden text-white shadow-2xl shadow-primary/20"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <FaShieldAlt className="text-4xl" />
                <div>
                  <h3 className="text-3xl font-black mb-4">
                    Enterprise Verified.
                  </h3>
                  <p className="text-white/80 font-medium text-sm mb-6">
                    Secured on the blockchain and verifiable globally.
                  </p>
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                    <p className="text-[10px] font-mono opacity-70">
                      ID: 8x92...A41Z
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="bg-bg-card border border-border-subtle rounded-[2.5rem] p-8 flex flex-col justify-center">
              <h3 className="text-4xl font-black text-text-title">
                450<span className="text-primary">+</span>
              </h3>
              <p className="text-xs font-bold text-text-body uppercase tracking-widest mt-1">
                Premium Courses
              </p>
            </div>

            <div className="bg-bg-card border border-border-subtle rounded-[2.5rem] p-8 flex flex-col justify-center">
              <h3 className="text-4xl font-black text-text-title">12k</h3>
              <p className="text-xs font-bold text-text-body uppercase tracking-widest mt-1">
                Active Students
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. MENTOR/EXPERT GRID: LINKEDIN STYLE --- */}
      <section className="py-32 bg-bg-main">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-primary font-black text-[10px] uppercase tracking-[0.3em] block mb-4"
              >
                Industry Practitioners
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-text-title tracking-tighter">
                Learn from the people <br /> building the industry.
              </h2>
            </div>
            <button className="h-12 px-6 rounded-xl border border-border-subtle text-sm font-bold text-text-title hover:bg-bg-card transition-all">
              View All 85+ Mentors
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "AI Researcher",
                company: "Google",
                img: "https://i.pravatar.cc/400?img=32",
              },
              {
                name: "James Wilson",
                role: "SRE Architect",
                company: "Amazon",
                img: "https://i.pravatar.cc/400?img=12",
              },
              {
                name: "Elena Rodriguez",
                role: "Product Designer",
                company: "Meta",
                img: "https://i.pravatar.cc/400?img=44",
              },
              {
                name: "Marcus Thorne",
                role: "Data Scientist",
                company: "Netflix",
                img: "https://i.pravatar.cc/400?img=68",
              },
            ].map((mentor, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative bg-bg-card border border-border-subtle rounded-[2rem] p-4 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:border-primary/30"
              >
                {/* Social/Connect Button - Hidden until hover */}
                <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-lg cursor-pointer hover:bg-primary hover:text-white transition-colors">
                    <span className="font-black text-xs">in</span>
                  </div>
                </div>

                {/* Mentor Image Container */}
                <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 bg-bg-main relative">
                  <img
                    src={mentor.img}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    alt={mentor.name}
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Quick Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-black text-white uppercase tracking-widest border border-white/20">
                        {mentor.company}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Block */}
                <div className="px-2 pb-2">
                  <h3 className="text-xl font-bold text-text-title group-hover:text-primary transition-colors">
                    {mentor.name}
                  </h3>
                  <p className="text-xs font-bold text-text-body opacity-50 uppercase tracking-widest mt-1">
                    {mentor.role}
                  </p>

                  {/* Skill Tags - Linked Style */}
                  <div className="mt-4 pt-4 border-t border-border-subtle flex flex-wrap gap-2">
                    <span className="text-[10px] font-bold text-text-body/60 px-2 py-1 bg-bg-main border border-border-subtle rounded-md">
                      React
                    </span>
                    <span className="text-[10px] font-bold text-text-body/60 px-2 py-1 bg-bg-main border border-border-subtle rounded-md">
                      System Design
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="py-12 bg-bg-main">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="bg-bg-card border border-border-subtle rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full" />
            <div className="text-center lg:text-left z-10">
              <h3 className="text-3xl md:text-4xl font-black text-text-title mb-4">
                Level up your <span className="text-primary">inbox.</span>
              </h3>
              <p className="text-text-body text-lg font-medium">
                Weekly career tips and exclusive course discounts.
              </p>
            </div>
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 z-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-16 px-6 rounded-2xl bg-bg-main border border-border-subtle text-text-title focus:ring-2 ring-primary outline-none min-w-[300px]"
              />
              <button className="h-16 px-10 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20">
                Join
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-black text-text-title mb-12">
            Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                date: "Oct 12, 2024",
                title: "The rise of AI-driven development workflows.",
                img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800",
              },
              {
                date: "Oct 05, 2024",
                title: "Why TypeScript is no longer optional in 2025.",
                img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800",
              },
            ].map((post, i) => (
              <div
                key={i}
                className="group cursor-pointer flex gap-6 items-center"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={post.img}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">
                    {post.date}
                  </p>
                  <h3 className="text-xl font-bold text-text-title group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HIGHLIGHTS & IMPACT STATISTICS --- */}
      <section className="py-12 bg-bg-main relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent opacity-50" />

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* LEFT: The "Story" Highlights */}
            <div className="lg:col-span-5">
              <div className="mb-12">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                  Outcome Driven
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-text-title tracking-tighter mt-4 leading-[1.1]">
                  We measure success <br /> in{" "}
                  <span className="text-primary italic">career leaps.</span>
                </h2>
              </div>

              <div className="space-y-10">
                {[
                  {
                    title: "Verified Curriculum",
                    desc: "Every lesson is peer-reviewed by engineering leads currently at FAANG companies.",
                    icon: <FaCheckCircle className="text-primary" />,
                  },
                  {
                    title: "Real-World Sandboxes",
                    desc: "Don't just watch videos. Spin up a cloud-based dev environment in one click.",
                    icon: <FaRocket className="text-primary" />,
                  },
                  {
                    title: "Active Job Network",
                    desc: "Direct referrals to our 200+ partner tech companies for top-performing students.",
                    icon: <FaChartLine className="text-primary" />,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-bg-card border border-border-subtle flex items-center justify-center text-xl shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-text-title mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-text-body font-medium leading-relaxed opacity-70">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT: The Statistics "Glass" Panel */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                {/* Main Large Stat Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="md:col-span-2 p-10 rounded-[3rem] bg-text-title text-bg-main flex flex-col justify-between relative overflow-hidden shadow-2xl"
                >
                  <div className="relative z-10">
                    <p className="text-xs font-black uppercase tracking-[0.3em] opacity-50 mb-4">
                      Average Salary Increase
                    </p>
                    <h3 className="text-7xl md:text-8xl font-black tracking-tighter">
                      $32,500<span className="text-primary">+</span>
                    </h3>
                    <p className="text-lg font-medium opacity-80 mt-6 max-w-sm">
                      Reported by students within 12 months of completing a
                      Professional Track.
                    </p>
                  </div>
                  {/* Abstract Visual Pattern */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                </motion.div>

                {/* Smaller Stat Cards */}
                <div className="p-10 rounded-[2.5rem] bg-bg-card border border-border-subtle shadow-sm flex flex-col justify-center">
                  <h4 className="text-5xl font-black text-text-title tracking-tight">
                    94%
                  </h4>
                  <p className="text-[10px] font-black text-text-body opacity-40 uppercase tracking-widest mt-2">
                    Hiring Rate
                  </p>
                  <p className="text-xs font-bold text-text-body/60 mt-4 leading-relaxed">
                    Alumni hired within 6 months of graduation.
                  </p>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-bg-card border border-border-subtle shadow-sm flex flex-col justify-center">
                  <h4 className="text-5xl font-black text-text-title tracking-tight">
                    1.2M
                  </h4>
                  <p className="text-[10px] font-black text-text-body opacity-40 uppercase tracking-widest mt-2">
                    Projects Built
                  </p>
                  <p className="text-xs font-bold text-text-body/60 mt-4 leading-relaxed">
                    Production-ready repos deployed to GitHub.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="py-12 bg-bg-main border-t border-border-subtle text-center">
        <h2 className="text-5xl md:text-7xl font-black text-text-title tracking-tighter mb-8">
          Ready to join?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button class="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base">
            <span class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"></span>

            <span class="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"></span>

            <div class="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
              <Link to="/register" className="">
                Create Free Account
              </Link>

              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1"
              >
                <path
                  clip-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </div>
        <p className="mt-8 text-text-body font-medium">
          No credit card required • 30-day money back guarantee
        </p>
      </footer>

      {/* ---  ENTERPRISE: B2B SCHEDULING UI --- */}
      <section className="py-12 bg-bg-card/40 border-y border-border-subtle/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left: Value Proposition */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                <FaShieldAlt size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Enterprise Grade
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-text-title tracking-tight leading-[0.95] mb-8">
                Scale your engineering <br />
                <span className="text-primary">standards globally.</span>
              </h2>
              <p className="text-lg text-text-body font-medium mb-10 opacity-80 leading-relaxed">
                The same curriculum used by the world's most innovative
                companies. Upskill your entire engineering team with custom
                paths, progress tracking, and private mentorship.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Custom API for LMS Integration",
                  "SSO & Advanced Security Protocol",
                  "Dedicated Account Success Manager",
                  "Quarterly Skill Gap Analysis",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold text-text-title"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <FaCheckCircle size={10} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: "Schedule a Call" Interactive UI */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative bg-bg-main border border-border-subtle rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/5 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FaRocket size={120} />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-text-title mb-2">
                  Book a Demo
                </h3>
                <p className="text-sm text-text-body font-medium mb-8 opacity-60">
                  Speak with our Enterprise Solutions team.
                </p>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-body/50 px-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className="h-12 px-4 rounded-xl bg-bg-card border border-border-subtle focus:ring-2 ring-primary outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-body/50 px-1">
                        Company Email
                      </label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        className="h-12 px-4 rounded-xl bg-bg-card border border-border-subtle focus:ring-2 ring-primary outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-body/50 px-1">
                      Team Size
                    </label>
                    <select className="h-12 px-4 rounded-xl bg-bg-card border border-border-subtle focus:ring-2 ring-primary outline-none transition-all text-sm font-medium">
                      <option>10 - 50 Engineers</option>
                      <option>50 - 200 Engineers</option>
                      <option>200+ Engineers</option>
                    </select>
                  </div>

                  <button className="w-full h-14 bg-text-title text-bg-main rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl">
                    Schedule Consultation <FaArrowRight size={14} />
                  </button>

                  <div className="flex items-center justify-center gap-6 pt-4 border-t border-border-subtle/50 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-text-body/60 uppercase tracking-widest">
                        Available Today
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
