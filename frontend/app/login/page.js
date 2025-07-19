"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config"; 
import { isAllowedEmail } from "../../firebase/checkDomain"; 
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // setError("");

    if (!isAllowedEmail(email)) {
      toast.error("Only university email domains are allowed.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in user:", user.email);
      toast.success("Welcome back! You've logged in successfully.");
      router.push("/dashboard"); 
    } catch (err) {
      console.error(err.message);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };
 
  return (
    <div className="login-bg-container">
      <div className="login-overlay" />
      <div className="login-center-container min-h-screen flex items-center justify-center">
        <div className="login-glass-card animate-fade-in-up max-w-lg w-full shadow-lg p-8 transition-all duration-200 ease-in-out">
          <h2 className="login-title">Campus Bazaar Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email" className="login-label">University Email</label>
            <input
              type="email"
              id="email"
              className="login-input"
              placeholder="name@university.edu"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end mb-2">
              <a href="/changepass" className="text-sm text-blue-500 hover:text-blue-700 transition-all duration-200 ease-in-out">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn transition-all duration-200 ease-in-out">Login</button>
            <div className="login-forgot-wrapper mt-4 text-center">
              <span className="login-forgot">
                Not registered? <a href="/signup" className="text-blue-500 underline hover:text-blue-700 transition-all duration-200 ease-in-out">Signup</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
