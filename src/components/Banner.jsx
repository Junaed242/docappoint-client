"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Button } from "@heroui/react";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Your Health, Our Priority",
      description: "Connect with top-rated specialists and book your appointments in just a few clicks.",
      image: "https://images.unsplash.com/photo-1505751172177-51ad1c92fa63?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Expert Doctors, Trusted Care",
      description: "Browse through our extensive list of certified doctors across various specialties.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Secure & Seamless Booking",
      description: "Manage your bookings and stay updated with your healthcare schedule securely.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <div className="w-auto h-125 md:h-162.5 rounded-3xl overflow-hidden shadow-2xl m-4">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Responsive Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-blue-950/95 via-blue-900/70 to-blue-900/30 md:to-transparent flex items-center">
                
                <div className="text-left px-6 sm:px-10 md:px-20 w-full max-w-4xl">
                  {/* Smaller font on mobile (text-3xl) vs Desktop (md:text-6xl) */}
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  
                  {/* Smaller description on mobile */}
                  <p className="text-base md:text-xl text-blue-100 mb-8 md:mb-10 leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none">
                    {slide.description}
                  </p>
                  
                  {/* Stack buttons on mobile (flex-col), side-by-side on tablet+ (sm:flex-row) */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Button
                      as={Link}
                      href="/appointments"
                      color="primary"
                      size="lg"
                      className="font-bold px-8 h-12 md:h-14 text-sm md:text-md shadow-xl"
                    >
                      Find a Doctor
                    </Button>
                    <Button
                      as={Link}
                      href="/register"
                      variant="bordered"
                      className="text-white border-white/40 hover:bg-white hover:text-blue-950 font-bold px-8 h-12 md:h-14 text-sm md:text-md"
                      size="lg"
                    >
                      Join Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CSS to hide Swiper arrows on small mobile screens to prevent overlap */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .swiper-button-next, .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;