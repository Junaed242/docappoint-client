"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { RiHeartPulseFill } from "react-icons/ri";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center py-24 px-4 text-center gap-6">
      <div className="text-primary text-8xl animate-pulse">
        <RiHeartPulseFill />
      </div>
      
      <div>
        <h1 className="text-6xl font-black text-slate-800">404</h1>
        <h2 className="text-2xl font-bold text-slate-700 mt-2">Page Not Found</h2>
        <p className="text-slate-500 max-w-md mx-auto mt-4 leading-relaxed">
          The schedule or page you are looking for might have been moved, canceled, or is temporarily offline.
        </p>
      </div>

      <div className="flex gap-4">
        <Link href="/" passHref>
          <Button variant="primary" size="lg" className="font-bold shadow-md">
            Go Back Home
          </Button>
        </Link>
        <Link href="/appointments" passHref>
          <Button variant="secondary" size="lg" className="font-bold">
            Browse Doctors
          </Button>
        </Link>
      </div>
    </div>
  );
}