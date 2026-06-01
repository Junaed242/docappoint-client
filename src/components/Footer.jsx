import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { RiHeartPulseFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-10 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo and Name */}
        <div className="flex items-center gap-2">
          <div className="text-primary text-3xl">
            <RiHeartPulseFill />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            DocAppoint
          </span>
        </div>

    
        <div className="flex items-center gap-6 text-2xl text-slate-500">
          <a
            href="#"
            className="hover:text-blue-600 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            className="hover:text-pink-600 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="hover:text-black transition-colors"
            aria-label="X (formerly Twitter)"
          >
            <FaXTwitter />
          </a>
          <a
            href="#"
            className="hover:text-red-600 transition-colors"
            aria-label="Youtube"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} DocAppoint. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;