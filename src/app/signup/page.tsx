'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup success", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error("Signup failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.username && user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md bg-white text-black p-8 rounded-2xl shadow-xl border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          {loading ? "Processing..." : "Create Account"}
        </h1>

        <label htmlFor="username" className="block mb-1 font-semibold text-gray-800">Username</label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
          className="w-full p-2 mb-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
        />

        <label htmlFor="email" className="block mb-1 font-semibold text-gray-800">Email</label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
          className="w-full p-2 mb-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
        />

        <label htmlFor="password" className="block mb-1 font-semibold text-gray-800">Password</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
          className="w-full p-2 mb-6 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
        />

        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className={`w-full p-3 rounded-lg font-semibold transition-all duration-200
            ${buttonDisabled || loading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-900'}
          `}
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
