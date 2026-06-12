"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { Form, Button, Input, Modal, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FaHospital, FaLocationDot, FaMoneyBillWave, FaClock } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function DoctorDetails({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { data: session } = authClient.useSession();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading doctor details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBookingSubmit = async (e, close) => {
    e.preventDefault();

    if (!session) {
      toast.error("You must be logged in to book an appointment.");
      return;
    }

    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      const bookingData = {
        userEmail: session.user.email,
        doctorName: doctor.name,
        patientName,
        gender,
        phone,
        appointmentDate,
        appointmentTime,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/appointments`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        toast.success("Appointment booked successfully!");
        setPatientName("");
        setPhone("");
        setAppointmentDate("");
        setAppointmentTime("");
        close();
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during booking.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 gap-4">
        <Spinner size="lg" color="primary" />
        <p className="text-sm text-slate-400 font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!doctor) {
    return <div className="text-center py-20 font-bold">Doctor not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl pb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Doctor Photo & Brief (Left Column) */}
        <div className="md:col-span-4 bg-slate-50 p-6 rounded-3xl shadow-purple-800 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-4">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={doctor.image || "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=600&q=80"}
              alt={doctor.name || "alt"}
              fill
              className="object-cover"
              sizes="200px"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">{doctor.name}</h1>
            <p className="text-primary font-bold text-sm uppercase mt-1 tracking-widest">{doctor.specialty}</p>
            <span className="inline-block bg-blue-100/60 text-blue-800 text-xs px-3 py-1 rounded-full font-bold mt-2">
              {doctor.experience} Experience
            </span>
          </div>
        </div>

        {/* Doctor Details Profile (Right Column) */}
        <div className="md:col-span-8 flex flex-col gap-6 ">
          
          {/* Biography */}
          <div className="bg-white p-6 rounded-3xl shadow-purple-800 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-3">About Doctor</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{doctor.description}</p>
          </div>

          {/* Hospital and Fee Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-purple-800 shadow-sm">
              <div className="p-3 bg-blue-50 text-primary rounded-xl text-xl"><FaHospital /></div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">Hospital</p>
                <p className="text-sm font-bold text-slate-700">{doctor.hospital}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-purple-800 shadow-sm">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl text-xl"><FaMoneyBillWave /></div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">Consultation Fee</p>
                <p className="text-sm font-bold text-slate-700">BDT {doctor.fee}</p>
              </div>
            </div>
          </div>

          {/* Location and Timings */}
          <div className="bg-white p-6 rounded-3xl shadow-purple-800 shadow-sm border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <FaLocationDot className="text-primary" />
              <span><strong>Location:</strong> {doctor.location}</span>
            </div>
            <div className="flex flex-col gap-2">
              <strong className="text-slate-700 text-sm">Available Shifts:</strong>
              <div className="flex flex-wrap gap-2">
                {doctor.availability?.map((time, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
                    <FaClock className="text-slate-400" /> {time}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Modal */}
          <Modal>
            <Modal.Trigger>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full md:w-auto font-black h-14 rounded-2xl text-md shadow-xl mt-4"
              >
                Book Appointment
              </Button>
            </Modal.Trigger>
            
            <Modal.Backdrop className="bg-black/40 backdrop-blur-sm">
              <Modal.Container className="max-w-md">
                <Modal.Dialog>
                  {({ close }) => (
                    <div className="w-full">
                      <Modal.CloseTrigger className="absolute right-4 top-4 text-slate-400 cursor-pointer" />
                      
                      <Modal.Header>
                        <Modal.Heading className="text-xl font-black text-slate-800">
                          Confirm Booking
                        </Modal.Heading>
                      </Modal.Header>

                      <Modal.Body>
                        <Form 
                          id="doctor-booking-form"
                          onSubmit={(e) => handleBookingSubmit(e, close)} 
                          className="flex flex-col gap-4 w-full"
                        >
                          <Input
                            required
                            type="text"
                            label="Patient Name"
                            placeholder="Rahim Uddin"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            variant="bordered"
                          />
                          <Input
                            required
                            type="tel"
                            label="Phone Number"
                            placeholder="01712345678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            variant="bordered"
                          />
                          <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-xs font-semibold text-slate-500">Gender</label>
                            <select
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              className="w-full px-3 py-3 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-primary cursor-pointer"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-xs font-semibold text-slate-500">Appointment Date</label>
                            <input
                              required
                              type="date"
                              value={appointmentDate}
                              onChange={(e) => setAppointmentDate(e.target.value)}
                              className="w-full px-3 py-3 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-primary cursor-pointer"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-xs font-semibold text-slate-500">Select Shift</label>
                            <select
                              required
                              value={appointmentTime}
                              onChange={(e) => setAppointmentTime(e.target.value)}
                              className="w-full px-3 py-3 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-primary cursor-pointer"
                            >
                              <option value="">Choose shift...</option>
                              {doctor.availability?.map((time, idx) => (
                                <option key={idx} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>
                        </Form>
                      </Modal.Body>

                      <Modal.Footer className="pt-4 flex justify-end gap-2 w-full">
                        <Button 
                          type="submit" 
                          form="doctor-booking-form"
                          variant="primary" 
                          className="font-bold w-full h-12 rounded-xl"
                        >
                          Confirm Booking
                        </Button>
                      </Modal.Footer>
                    </div>
                  )}
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>

        </div>
      </div>
    </div>
  );
}