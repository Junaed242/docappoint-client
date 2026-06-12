"use client";
import React from "react";
import Link from "next/link";
import { Button, Avatar } from "@heroui/react";
import { RiHeartPulseFill } from "react-icons/ri";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Successfully logged out!");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to log out.");
        },
      },
    });
  };

  // Helper function to extract initials for the Fallback component (e.g. "John Doe" -> "JD")
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <nav className="border-b rounded-xl m-3 border border-white/30 bg-white/30  backdrop-invert backdrop-opacity-10 sticky top-2 z-50">
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
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-900">
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

        
        <div className="flex items-center gap-3">
          {isPending ? (
            <span className="text-xs text-slate-400">Checking session...</span>
          ) : session ? (
            <div className="flex items-center gap-3">
              <Avatar size="sm" color="accent" className="cursor-pointer ring-2 ring-primary">
                {session.user.image && (
                  <Avatar.Image src={session.user.image} alt={session.user.name} />
                )}
                <Avatar.Fallback>
                  {getInitials(session.user.name)}
                </Avatar.Fallback>
              </Avatar>

              <Button 
                onPress={handleLogout}
                variant="danger-soft" 
                size="sm" 
                className="font-bold"
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button 
                  variant="tertiary" 
                  size="sm" 
                  className="font-medium text-black"
                >
                  Login
                </Button>
              </Link>
              
              <Link href="/register" passHref>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="font-bold shadow-sm"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;