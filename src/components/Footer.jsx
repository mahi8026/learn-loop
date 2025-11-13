import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer flex justify-between p-10 bg-neutral text-neutral-content mt-10">
      <div className='text-3xl font-bold'>© {new Date().getFullYear()} LearnLoop</div>
      
      <nav>
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms and Conditions</a> 
        <a className="link link-hover">Privacy Policy</a> 
        <a className="link link-hover">Cookie Policy</a>
      </nav>
      <nav>
        <header className="footer-title">Social</header> 
        <div className="">
          <Link className='grid grid-flow-col gap-4 text-2xl'>
          <a><FaTwitter /></a>
          <a><FaInstagram /></a>
          <a><FaGithub /></a>
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
