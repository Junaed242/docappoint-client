"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Separator, Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      toast.success("Registration successful! Redirecting to login...");
      router.push("/login");
    }

    if (error) {
      toast.error(error.message || "Registration failed.");
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="text-center my-3">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-slate-500 text-sm">Start your healthcare journey with DocAppoint</p>
      </div>

      <Card className="border border-slate-200 rounded-2xl max-w-md mx-auto p-8 shadow-sm bg-white">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          
          {/* Name Field */}
          <TextField isRequired name="name" type="text">
            <Label className="text-sm font-semibold text-slate-700">Name</Label>
            <Input placeholder="Enter your name" className="w-full px-3 py-2 border rounded-xl" />
            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          {/* Image URL Field */}
          <TextField name="image" type="url">
            <Label className="text-sm font-semibold text-slate-700">Image URL</Label>
            <Input placeholder="Avatar image url" className="w-full px-3 py-2 border rounded-xl" />
            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-slate-700">Email</Label>
            <Input placeholder="john@example.com" className="w-full px-3 py-2 border rounded-xl" />
            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          {/* Password Field with DocAppoint Rules */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-slate-700">Password</Label>
            <Input placeholder="Enter your password" className="w-full px-3 py-2 border rounded-xl" />
            <Description className="text-xs text-slate-400 mt-1">
              Must be at least 6 characters with 1 uppercase and 1 lowercase
            </Description>
            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          <Button
            type="submit"
            variant="primary"
            className="w-full font-bold h-12 text-md mt-2"
            isPending={loading} 
          >
            Create Account
          </Button>
        </Form>

        

        {/* Google Signup Button */}
        <div>
          <Button
            onClick={handleGoogleSignin}
            variant="outline"
            className="w-full rounded-xl border border-slate-200 py-6 font-bold flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} /> Sign up with Google
          </Button>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;