"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const redirectUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("Login successful!");
      router.push(redirectUrl);
      router.refresh();  
    }

    if (error) {
      toast.error(error.message || "Invalid email or password.");
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectUrl,
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="text-center my-3">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-slate-500 text-sm">Welcome back to DocAppoint</p>
      </div>

      <Card className="border border-slate-200 rounded-2xl max-w-md mx-auto p-8 shadow-sm bg-white">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          
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

          {/* Password Field */}
          <TextField isRequired name="password" type="password">
            <Label className="text-sm font-semibold text-slate-700">Password</Label>
            <Input placeholder="Enter your password" className="w-full px-3 py-2 border rounded-xl" />
            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          <Button
            type="submit"
            variant="primary"
            className="w-full font-bold h-12 text-md mt-2"
            isPending={loading} 
          >
            Login
          </Button>
        </Form>

        

        {/* Google Signin Button */}
        <div>
          <Button
            onClick={handleGoogleSignin}
            variant="outline"
            className="w-full rounded-xl border border-slate-200 py-6 font-bold flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} /> Sign in with Google
          </Button>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;