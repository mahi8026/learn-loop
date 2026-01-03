import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8 px-4 border-t border-gray-900">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Link to="/" className="text-3xl font-black text-white mb-6 block">LearnLoop</Link>
          <p className="text-sm leading-relaxed mb-6">
            Empowering creators and professionals worldwide with accessible, high-quality education. Join the loop today.
          </p>
          
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Explore</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/courses" className="hover:text-white transition-colors">All Courses</Link></li>
            <li><Link to="/register" className="hover:text-white transition-colors">Become an Instructor</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Business Plans</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Student Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Social</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-indigo-500 transition-colors"><FaTwitter size={28} /></a>
            <a href="#" className="hover:text-indigo-500 transition-colors"><FaInstagram size={28} /> </a>
            <a href="#" className="hover:text-indigo-500 transition-colors"><FaGithub size={28} /></a>
            <a href="#" className="hover:text-indigo-500 transition-colors"><FaLinkedin size={28} /></a>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-5 pt-8 border-t border-gray-900 text-xs uppercase tracking-widest font-bold">
        © {new Date().getFullYear()} LearnLoop Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;