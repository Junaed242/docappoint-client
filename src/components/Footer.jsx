import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { RiHeartPulseFill, RiMailFill, RiPhoneFill, RiMapPin2Fill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 mt-auto text-slate-600">
      <div className="container mx-auto px-4">
        
        {/* Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
          
          {/* Column 1: Brand Mission (Spans 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="text-primary text-3xl">
                <RiHeartPulseFill />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                DocAppoint
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              DocAppoint is a trusted medical appointment scheduler connecting patients with board-certified clinical specialists. We are dedicated to making quality health management simple, secure, and available to all.
            </p>
          </div>

          {/* Column 2: Quick Links (Spans 3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="hover:text-primary transition-colors">
                  All Appointments
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Support (Spans 4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
              Contact & Support
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-500">
              <li className="flex items-center gap-3">
                <RiMapPin2Fill className="text-primary text-lg shrink-0" />
                <span>Road 12, Dhanmondi, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <RiMailFill className="text-primary text-lg shrink-0" />
                <a href="mailto:support@docappoint.com" className="hover:underline hover:text-primary">
                  support@docappoint.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <RiPhoneFill className="text-primary text-lg shrink-0" />
                <span>+880 1712-345678</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator and Bottom Alignment Row */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright Left */}
          <p className="text-xs text-slate-400 font-medium order-2 md:order-1">
            © {new Date().getFullYear()} DocAppoint. All rights reserved.
          </p>

          {/* Social Icons Right */}
          <div className="flex items-center gap-6 text-xl text-slate-400 order-1 md:order-2">
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
              aria-label="X (Twitter)"
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

      </div>
    </footer>
  );
};

export default Footer;