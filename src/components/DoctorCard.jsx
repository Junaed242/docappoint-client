"use client";
import React from "react";
import { Card, Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FaStar } from "react-icons/fa6";

const DoctorCard = ({ doctor }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleViewDetails = () => {
    if (session) {
      router.push(`/doctors/${doctor._id}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <Card className="p-4 bg-white border border-slate-100/80 shadow-sm rounded-3xl card-hover-effect">
      <Card.Header className="flex-col items-start gap-1 pb-4">
        <span className="text-[10px] font-bold uppercase text-primary tracking-widest bg-blue-50/50 px-2.5 py-1 rounded-md">
          {doctor.specialty}
        </span>
        <Card.Title className="text-xl font-extrabold text-slate-800 tracking-tight mt-1">
          {doctor.name}
        </Card.Title>
        <div className="flex items-center gap-1.5 mt-1">
          <FaStar className="text-amber-400" size={13} />
          <span className="text-xs font-bold text-slate-500">
            {doctor.rating} Rating
          </span>
        </div>
      </Card.Header>

      {/* 2. Content (Formerly CardBody - renamed to Card.Content in v3) */}
      <Card.Content className="py-2 overflow-hidden">
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            className="object-contain object-center transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="mt-4">
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed italic">
            {doctor.description}
          </p>
        </div>
      </Card.Content>

      {/* 3. Footer */}
      <Card.Footer>
        <Button
          onPress={handleViewDetails}
          variant="primary"
          className="w-full font-bold shadow-lg shadow-primary/20"
          size="md"
        >
          View Details
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default DoctorCard;