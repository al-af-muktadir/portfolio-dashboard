/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/Auth";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const { setLoading } = useUser();
  const router = useRouter();
  //("i am the user", user);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = {
      email,
      password,
    };

    // //(data);
    const res = await loginUser(data);

    if (res?.success) {
      setLoading(true);
      toast.success("Logged In SuccessFully");
      router.push("/admin/dashboard");
    } else {
      toast.error("Log in Failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md border border-white rounded-2xl  shadow-lg p-8">
        <h2 className="text-2xl font-bold  text-center text-white mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          Don’t have an account?
          <a href="/register" className="text-green-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
