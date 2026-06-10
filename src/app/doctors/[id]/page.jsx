import React from "react";
import DoctorDetails from "@/components/DoctorDetails";
import { auth } from "@/lib/auth-client";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const {token} = await auth.api.getToken({
    headers: await headers()
  })

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/doctors/${resolvedParams.id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
    
    const doctor = await res.json();
    return {
      title: `Book Dr. ${doctor.name} | DocAppoint`,
      description: `Schedule a session with Dr. ${doctor.name}, highly rated ${doctor.specialty} at ${doctor.hospital}. Consultation fee: BDT ${doctor.fee}.`,
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