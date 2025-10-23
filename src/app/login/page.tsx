'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log("Login success", response.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error("Invalid credentials or user not found!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md bg-white text-black p-8 rounded-2xl shadow-xl border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          {loading ? "Processing..." : "Login to Your Account"}
        </h1>

        {/* Email Field */}
        <label htmlFor="email" className="block mb-1 font-semibold text-gray-800">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
          className="w-full p-2 mb-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
        />

        {/* Password Field */}
        <label htmlFor="password" className="block mb-1 font-semibold text-gray-800">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
          className="w-full p-2 mb-6 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
        />

        {/* Login Button */}
        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className={`w-full p-3 rounded-lg font-semibold transition-all duration-200
            ${buttonDisabled || loading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-900'}
          `}
        >
          {loading ? "Processing..." : "Login"}
        </button>

        {/* Link to Signup */}
        <p className="mt-4 text-center text-gray-700">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-black font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
