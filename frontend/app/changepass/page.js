"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ChangePasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset email sent! Please check your inbox.");
      setEmail("");
    } catch (err) {
      toast.error("Failed to send reset email. Make sure the email is correct.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white dark:bg-zinc-900 bg-opacity-80 rounded-xl shadow-lg p-8 transition-all duration-200 ease-in-out">
        <h1 className="text-3xl font-bold mb-6 text-center">Reset Your Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your university email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-200 ease-in-out"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          <a href="/login" className="text-blue-500 underline hover:text-blue-700 transition-all duration-200 ease-in-out">
            &larr; Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
