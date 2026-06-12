"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Card, Button, Input, Modal, Spinner, Form } from "@heroui/react";
import toast from "react-hot-toast";
import { FaCalendar, FaTrash, FaUserPen, FaBriefcaseMedical, FaClock } from "react-icons/fa6";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState("bookings"); 
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  // States for Updating Bookings
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editPatientName, setEditPatientName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  // States for Updating Profile
  const [editProfileName, setEditProfileName] = useState("");
  const [editProfileImage, setEditProfileImage] = useState("");

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (session?.user?.email) {
        setBookingsLoading(true);
        try {
          const tokenRes = await authClient.token();
          const token = tokenRes?.data?.token;

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/appointments?email=${session.user.email}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
          );

          if (res.ok) {
            const data = await res.json();
            setBookings(data);
          } else {
            toast.error("Failed to load your appointments.");
          }
        } catch (err) {
          console.error("Error loading dashboard bookings:", err);
        } finally {
          setBookingsLoading(false);
        }
      }
    };

    fetchUserBookings();
  }, [session]);

  const handleDeleteBooking = async (id) => {
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success("Appointment deleted successfully!");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error("Failed to delete booking.");
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  const openEditModal = (booking) => {
    setSelectedBooking(booking);
    setEditPatientName(booking.patientName);
    setEditPhone(booking.phone);
    setEditGender(booking.gender);
    setEditDate(booking.appointmentDate);
    setEditTime(booking.appointmentTime);
  };

  // --- CRUD: Update Booking ---
  const handleUpdateBookingSubmit = async (e, close) => {
    e.preventDefault();
    const updatedData = {
      patientName: editPatientName,
      phone: editPhone,
      gender: editGender,
      appointmentDate: editDate,
      appointmentTime: editTime,
    };

    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${selectedBooking._id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        toast.success("Appointment updated successfully!");
        setBookings((prev) =>
          prev.map((b) => (b._id === selectedBooking._id ? { ...b, ...updatedData } : b))
        );
        close();
      } else {
        toast.error("Update failed.");
      }
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  // Profile: Update User Profile
  const openProfileModal = () => {
    setEditProfileName(session.user.name);
    setEditProfileImage(session.user.image || "");
  };

  const handleUpdateProfileSubmit = async (e, close) => {
    e.preventDefault();
    try {
      await authClient.updateUser({
        name: editProfileName,
        image: editProfileImage,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Profile updated successfully!");
            close();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to update profile.");
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-40">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl pb-20">
      
      {/* Title */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-black text-slate-800">My Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your active appointments and profile credentials</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8 gap-6 justify-center md:justify-start">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`pb-3 font-bold text-sm border-b-2 transition-colors ${
            activeTab === "bookings" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          My Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 font-bold text-sm border-b-2 transition-colors ${
            activeTab === "profile" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          My Profile
        </button>
      </div>

      {/* Contents */}
      {activeTab === "bookings" ? (
        <div>
          {bookingsLoading ? (
            <div className="flex justify-center py-20"><Spinner color="primary" /></div>
          ) : bookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <Card key={booking._id} className="p-6 border border-slate-100 shadow-sm flex flex-col gap-4 bg-white rounded-3xl">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-lg">{booking.doctorName}</h3>
                      <p className="text-xs text-slate-400 font-semibold mt-1 flex items-center gap-1.5">
                        <FaBriefcaseMedical /> Patient: {booking.patientName} ({booking.gender})
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-2 font-medium bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <FaCalendar className="text-primary" /> {booking.appointmentDate}
                    </span>
                    <span className="flex items-center gap-2 font-medium bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <FaClock className="text-primary" /> {booking.appointmentTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-4 w-full">
                    <Modal>
                      <Modal.Trigger>
                        <Button 
                          onPress={() => openEditModal(booking)} 
                          variant="primary"
                          className="grow font-black rounded-xl h-12"
                        >
                          Update
                        </Button>
                      </Modal.Trigger>
                      <Modal.Backdrop className="bg-black/30 backdrop-blur-sm">
                        <Modal.Container className="max-w-md">
                          <Modal.Dialog>
                            {({ close }) => (
                              <div className="w-full">
                                <Modal.CloseTrigger className="absolute right-4 top-4 text-slate-400 cursor-pointer" />
                                <Modal.Header>
                                  <Modal.Heading className="text-lg font-black text-slate-800">Edit Booking</Modal.Heading>
                                </Modal.Header>
                                <Modal.Body>
                                  <Form 
                                    id={`edit-form-${booking._id}`} 
                                    onSubmit={(e) => handleUpdateBookingSubmit(e, close)} 
                                    className="flex flex-col gap-4 w-full"
                                  >
                                    <Input required type="text" label="Patient Name" value={editPatientName} onChange={(e) => setEditPatientName(e.target.value)} variant="bordered" />
                                    <Input required type="tel" label="Phone Number" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} variant="bordered" />
                                    <div className="flex flex-col gap-1.5">
                                      <label className="text-xs font-semibold text-slate-500">Gender</label>
                                      <select value={editGender} onChange={(e) => setEditGender(e.target.value)} className="w-full px-3 py-3 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-700 outline-none">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                      </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                      <label className="text-xs font-semibold text-slate-500">Date</label>
                                      <input required type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="w-full px-3 py-3 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-700 outline-none" />
                                    </div>
                                  </Form>
                                </Modal.Body>
                                <Modal.Footer className="flex gap-2">
                                  <Button type="submit" form={`edit-form-${booking._id}`} variant="primary" className="font-bold w-full h-12 rounded-xl">Save Changes</Button>
                                </Modal.Footer>
                              </div>
                            )}
                          </Modal.Dialog>
                        </Modal.Container>
                      </Modal.Backdrop>
                    </Modal>

                    <Button 
                      onPress={() => handleDeleteBooking(booking._id)} 
                      variant="danger-soft" 
                      className="font-bold rounded-xl h-12 w-12 shrink-0 min-w-12"
                      isIconOnly
                      aria-label="Delete Booking"
                    >
                      <FaTrash size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
              <p className="text-lg font-bold text-slate-700">No Bookings Yet</p>
              <p className="text-sm text-slate-400 mt-1">Book your doctor appointments from the appointments catalog.</p>
            </div>
          )}
        </div>
      ) : (
        /* My Profile tab */
        <div className="max-w-md mx-auto">
          <Card className="p-8 border border-slate-100 shadow-sm flex flex-col items-center gap-6 bg-white rounded-3xl text-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary">
              <Image
                src={session.user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"}
                alt={session.user.name}
                fill
                className="object-cover"
                sizes="100px"
                priority
              />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">{session.user.name}</h3>
              <p className="text-sm text-slate-400 mt-1 font-semibold">{session.user.email}</p>
            </div>

            {/* Better-auth Profile Update Modal */}
            <Modal>
              <Modal.Trigger>
                <Button onPress={openProfileModal} variant="primary" className="font-bold px-8 rounded-xl" startContent={<FaUserPen />}>
                  Update Profile
                </Button>
              </Modal.Trigger>
              <Modal.Backdrop className="bg-black/30 backdrop-blur-sm">
                <Modal.Container className="max-w-md">
                  <Modal.Dialog>
                    {({ close }) => (
                      <div className="w-full">
                        <Modal.CloseTrigger className="absolute right-4 top-4 text-slate-400 cursor-pointer" />
                        
                        <Modal.Header>
                          <Modal.Heading className="text-lg font-black text-slate-800">Update Profile</Modal.Heading>
                        </Modal.Header>
                        
                        <Modal.Body>
                          <Form 
                            id="profile-update-form" 
                            onSubmit={(e) => handleUpdateProfileSubmit(e, close)} 
                            className="flex flex-col gap-4 w-full"
                          >
                            <Input required type="text" label="Name" value={editProfileName} onChange={(e) => setEditProfileName(e.target.value)} variant="bordered" />
                            <Input type="url" label="Photo URL" value={editProfileImage} onChange={(e) => setEditProfileImage(e.target.value)} variant="bordered" />
                          </Form>
                        </Modal.Body>
                        
                        <Modal.Footer>
                          <Button 
                            type="submit" 
                            form="profile-update-form" 
                            variant="primary" 
                            className="font-bold w-full h-12 rounded-xl"
                          >
                            Save Profile
                          </Button>
                        </Modal.Footer>
                      </div>
                    )}
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
          </Card>
        </div>
      )}

    </div>
  );
}