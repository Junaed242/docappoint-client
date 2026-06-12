import React from "react";
import DoctorDetails from "@/components/DoctorDetails";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/doctors/${resolvedParams.id}`);
    const doctor = await res.json();
    const displayName = doctor.name.startsWith("Dr.") ? doctor.name : `Dr. ${doctor.name}`;
    
    return {
      title: `Book ${displayName} | DocAppoint`,
      description: `Schedule a session with ${displayName}, highly rated ${doctor.specialty} at ${doctor.hospital}.`,
    };
  } catch (err) {
    return {
      title: "Doctor Profile | DocAppoint",
      description: "Book secure medical appointments online.",
    };
  }
}

export default async function DoctorPage({ params }) {
  return <DoctorDetails params={params} />;
}