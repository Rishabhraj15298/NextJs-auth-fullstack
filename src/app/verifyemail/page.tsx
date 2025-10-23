'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post('/api/users/verifyEmail', { token });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.log("Email verification failed", error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="bg-white text-black p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-300 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Email Verification</h1>

        {/* Show token (for debugging / confirmation) */}
        <div className="text-sm text-gray-600 mb-6 break-words text-center">
          {token ? (
            <p className="text-gray-700">
              Token detected: <span className="font-mono text-gray-900">{token}</span>
            </p>
          ) : (
            <p className="text-red-600">No token found in URL</p>
          )}
        </div>

        {/* Status messages */}
        {verified && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">✅ Email Verified Successfully!</h2>
            <Link
              href="/login"
              className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-all"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">❌ Verification Failed</h2>
            <p className="text-gray-700 mb-4">Your verification link may have expired or is invalid.</p>
            <Link
              href="/signup"
              className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-all"
            >
              Try Again
            </Link>
          </div>
        )}

        {!verified && !error && (
          <p className="text-gray-700 text-center">Verifying your email... Please wait.</p>
        )}
      </div>
    </div>
  );
}
