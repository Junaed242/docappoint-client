"use client";
import React, { useState, useEffect } from "react";
import DoctorCard from "@/components/DoctorCard";
// Import Form directly from HeroUI to utilize the v3 React Aria form engine
import { Form, Input, Button, Spinner } from "@heroui/react";
import { FaSearch } from "react-icons/fa";

export default function AppointmentsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default"); // 'default', 'fee-asc', 'fee-desc'

  // Fetch doctors (handles initial load and search queries)
  const fetchDoctors = (searchQuery = "") => {
    setLoading(true);
    const url = searchQuery 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/doctors?search=${encodeURIComponent(searchQuery)}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/doctors`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDoctors(search);
  };

  // Sort logic (Optional Challenge)
  const getSortedDoctors = () => {
    const doctorsCopy = [...doctors];
    if (sortBy === "fee-asc") {
      return doctorsCopy.sort((a, b) => a.fee - b.fee);
    }
    if (sortBy === "fee-desc") {
      return doctorsCopy.sort((a, b) => b.fee - a.fee);
    }
    return doctorsCopy; 
  };

  const sortedDoctors = getSortedDoctors();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8 pb-20">
      
      {/* Header section */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
          Available Appointments
        </h1>
        <p className="text-slate-500 mt-2">
          Find your preferred specialist and schedule your session instantly.
        </p>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
        
        {/* Search Form (Using HeroUI v3 Form Component) */}
        <Form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:max-w-md">
          <Input
            type="text"
            placeholder="Search by Doctor Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow"
            variant="bordered"
            startcontent={<FaSearch className="text-slate-400" />}
          />
          <Button 
            type="submit" 
            color="primary" 
            className="font-semibold shadow-sm px-6 h-12 rounded-xl"
          >
            Search
          </Button>
        </Form>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-sm font-semibold text-slate-500 whitespace-nowrap">
            Sort by Fee:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-48 px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="default">Recommended</option>
            <option value="fee-asc">Price: Low to High</option>
            <option value="fee-desc">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-24 gap-4">
          <Spinner size="lg" color="primary" />
          <p className="text-sm text-slate-400 font-medium">Fetching available schedules...</p>
        </div>
      ) : sortedDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
          <p className="text-lg font-bold text-slate-700 mb-2">No Doctors Found</p>
          <p className="text-sm text-slate-400">
            We couldn't find any specialist matching "{search}". Try another search.
          </p>
          <Button 
            onPress={() => { setSearch(""); fetchDoctors(); }} 
            className="mt-4 font-semibold"
            variant="flat"
            color="primary"
          >
            Reset Search
          </Button>
        </div>
      )}

    </div>
  );
}