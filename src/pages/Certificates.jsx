import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FaAward, FaDownload, FaShareAlt, FaCheckCircle } from "react-icons/fa";

export default function Certificates() {
  const certificates = [
    { id: 1, course: "Full Stack MERN Mastery", date: "Jan 2026", idCode: "LL-882-991" },
  ];

  return (
    <div className="min-h-screen bg-bg-main p-4 md:p-8 transition-colors duration-300">
      <Helmet><title>My Certificates | LearnLoop</title></Helmet>

      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-text-title flex items-center gap-3">
            <FaAward className="text-primary" /> Achievements
          </h1>
          <p className="text-text-body font-medium opacity-70">Your earned credentials and certifications.</p>
        </header>

        <div className="grid gap-4">
          {certificates.length > 0 ? (
            certificates.map((cert) => (
              <motion.div 
                key={cert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-bg-card border border-border-subtle p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/30 transition-all shadow-sm"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl text-primary">
                    <FaAward />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-text-title">{cert.course}</h3>
                    <div className="flex flex-wrap gap-4 mt-1">
                      <span className="text-xs font-bold text-text-body/60 uppercase tracking-widest">Issued: {cert.date}</span>
                      <span className="text-xs font-bold text-primary flex items-center gap-1">
                        <FaCheckCircle /> Verified Credential
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none px-6 py-3 bg-bg-main border border-border-subtle text-text-title rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-border-subtle transition-all">
                    <FaDownload /> Download
                  </button>
                  <button className="p-3 bg-bg-main border border-border-subtle text-text-title rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all">
                    <FaShareAlt />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-24 bg-bg-card/50 rounded-4xl border-2 border-dashed border-border-subtle">
              <FaAward className="text-6xl text-text-body/10 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-text-title opacity-40">Complete a course to earn your first certificate</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}