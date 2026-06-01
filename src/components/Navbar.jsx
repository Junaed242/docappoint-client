"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { RiHeartPulseFill } from "react-icons/ri";

const Navbar = () => {
  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo & Name */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-primary text-2xl">
            <RiHeartPulseFill />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            DocAppoint
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/appointments" className="hover:text-primary transition-colors">
            All Appointment
          </Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
        </div>

        {/* Auth Buttons (Static) */}
        <div className="flex items-center gap-3">
          <Button 
            as={Link} 
            href="/login" 
            variant="light" 
            size="sm" 
            className="font-medium"
          >
            Login
          </Button>
          <Button 
            as={Link} 
            href="/register" 
            color="primary" 
            size="sm" 
            className="font-bold shadow-sm"
          >
            Register
          </Button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;