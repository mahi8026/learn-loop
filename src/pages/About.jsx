import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FaGraduationCap, FaGlobe, FaLightbulb, FaRocket } from "react-icons/fa";

export default function About() {
  const values = [
    {
      icon: <FaGraduationCap className="text-indigo-600" />,
      title: "Accessible Education",
      desc: "We believe quality learning should be available to everyone, everywhere, regardless of their background."
    },
    {
      icon: <FaGlobe className="text-emerald-600" />,
      title: "Global Community",
      desc: "Connect with mentors and peers from over 50 countries to broaden your professional horizons."
    },
    {
      icon: <FaLightbulb className="text-orange-600" />,
      title: "Innovation First",
      desc: "Our curriculum is constantly updated to reflect the latest industry trends and technologies."
    },
    {
      icon: <FaRocket className="text-purple-600" />,
      title: "Career Growth",
      desc: "We don't just teach skills; we provide the roadmap to your next promotion or career pivot."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet><title>About Us | LearnLoop</title></Helmet>

      {/* Hero Header */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-6">
            Empowering the next generation of <span className="text-indigo-600">Digital Creators.</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            LearnLoop started with a simple mission: to bridge the gap between traditional education and the rapidly evolving tech industry.
          </p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-4 container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800" 
              className="rounded-[3rem] shadow-2xl relative z-10" 
              alt="Our team" 
            />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl -z-0"></div>
          </div>
          <div>
            <h2 className="text-3xl font-black dark:text-white mb-6">The LearnLoop Story</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Founded in 2024, LearnLoop emerged from a shared frustration: the high cost and outdated nature of professional certifications. We wanted to create a platform where experts could share their knowledge directly with students.
              </p>
              <p>
                Today, we host hundreds of courses ranging from Web Development to Digital Marketing, helping thousands of students land jobs at top-tier companies like Google, Meta, and Netflix.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-black text-indigo-600">95%</h4>
                  <p className="text-sm font-bold uppercase tracking-wider">Completion Rate</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-indigo-600">500+</h4>
                  <p className="text-sm font-bold uppercase tracking-wider">Expert Mentors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black dark:text-white mb-4">Our Core Values</h2>
            <p className="text-gray-500">The principles that guide everything we build.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-2xl mb-6">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold dark:text-white mb-3">{val.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black dark:text-white mb-6">Want to join the loop?</h2>
          <p className="text-gray-500 mb-10">
            We're always looking for passionate instructors and talented individuals to help us redefine education.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all">
              Become an Instructor
            </button>
            <button className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-2xl font-bold hover:bg-gray-200 transition-all">
              View Careers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}