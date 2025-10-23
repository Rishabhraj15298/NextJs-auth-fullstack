'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data.data._id);
      setData(res.data.data._id);
    } catch (error) {
      toast.error("Error fetching user details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md bg-white text-black p-8 rounded-2xl shadow-xl border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-2">Profile</h1>
        <p className="text-center text-gray-700 mb-6">Welcome to your profile page</p>

        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <p className="font-semibold text-gray-800">User ID:</p>
            <div className="mt-2">
              {data === "nothing" ? (
                <span className="text-gray-500">No data yet</span>
              ) : (
                <Link
                  href={`/profile/${data}`}
                  className="text-blue-600 font-medium hover:underline break-all"
                >
                  {data}
                </Link>
              )}
            </div>
          </div>

          <button
            onClick={getUserDetails}
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition-all"
          >
            Get User Details
          </button>
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-all"
        >
          Logout
        </button>

       
      </div>
    </div>
  );
}
