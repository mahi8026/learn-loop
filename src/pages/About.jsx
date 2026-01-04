import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FaGraduationCap, FaGlobe, FaLightbulb, FaRocket } from "react-icons/fa";

export default function About() {
  const values = [
    {
      icon: <FaGraduationCap className="text-primary" />,
      title: "Accessible Education",
      desc: "We believe quality learning should be available to everyone, everywhere."
    },
    {
      icon: <FaGlobe className="text-secondary" />,
      title: "Global Community",
      desc: "Connect with mentors and peers from over 50 countries."
    },
    {
      icon: <FaLightbulb className="text-orange-500" />,
      title: "Innovation First",
      desc: "Our curriculum reflects the latest industry trends."
    },
    {
      icon: <FaRocket className="text-purple-500" />,
      title: "Career Growth",
      desc: "We provide the roadmap to your next promotion."
    }
  ];

  return (
    <div className="min-h-screen bg-bg-main transition-colors duration-300">
      <Helmet><title>About Us | LearnLoop</title></Helmet>

      {/* Hero Header */}
      <section className="py-24 bg-bg-card/50 border-b border-border-subtle text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-5xl font-black text-text-title mb-6">
            Empowering the next generation of <span className="text-primary">Digital Creators.</span>
          </h1>
          <p className="text-xl text-text-body font-medium">
            LearnLoop started with a simple mission: to bridge the gap between education and the tech industry.
          </p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-4 container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800" 
              className="rounded-4xl shadow-2xl relative z-10 border border-border-subtle" 
              alt="Our team" 
            />
            {/* Ambient Glows using your variables */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-glow-indigo rounded-full blur-3xl -z-0"></div>
          </div>
          
          <div>
            <h2 className="text-4xl font-black text-text-title mb-6">The LearnLoop Story</h2>
            <div className="space-y-6 text-text-body leading-relaxed text-lg">
              <p>
                Founded in 2024, LearnLoop emerged from a shared frustration: the high cost and outdated nature of professional certifications.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-border-subtle">
                <div>
                  <h4 className="text-4xl font-black text-primary">95%</h4>
                  <p className="text-xs font-black uppercase tracking-widest opacity-60">Completion Rate</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-primary">500+</h4>
                  <p className="text-xs font-black uppercase tracking-widest opacity-60">Expert Mentors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-bg-card border-y border-border-subtle">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-text-title mb-4">Our Core Values</h2>
            <p className="text-text-body font-medium">The principles that guide everything we build.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-bg-main rounded-3xl shadow-sm border border-border-subtle"
              >
                <div className="w-14 h-14 rounded-2xl bg-bg-card border border-border-subtle flex items-center justify-center text-2xl mb-6">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-text-title mb-3">{val.title}</h3>
                <p className="text-sm text-text-body leading-relaxed font-medium">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}