"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { isAllowedEmail } from "../../firebase/checkDomain";
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    // setError("");

    // 🛡️ Validations
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    if (!isAllowedEmail(email)) {
      toast.error("Only university email domains are allowed.");
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Mobile number must be exactly 10 digits.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please re-enter.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      toast.success("Account created! Welcome to CampusBazaar.");
      // ✅ Optional: Save mobile in Firestore or DB later
      router.push("/dashboard");
    } catch (err) {
      console.error(err.message);
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please login instead.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    }
  };

  return (
    <div className="register-bg-container">
      <div className="login-overlay" />
      <div className="login-center-container">
        <div className="login-glass-card">
          <h2 className="login-title">Campus Bazaar Signup</h2>
          <form className="login-form" onSubmit={handleSignup}>
            <label htmlFor="name" className="login-label">Name</label>
            <input
              type="text"
              id="name"
              className="login-input"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email" className="login-label">University Email</label>
            <input
              type="email"
              id="email"
              className="login-input"
              placeholder="name@csepup.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="mobile" className="login-label">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              className="login-input"
              placeholder="10-digit Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              pattern="\d{10}"
              maxLength={10}
            />
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword" className="login-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="login-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
             <div className="mt-6 text-center text-sm text-gray-400 dark:text-gray-500">
            By signing up, you agree to our
            <a href="/terms" className="text-blue-500 underline hover:text-blue-700 transition-all duration-200 ease-in-out mx-1">Terms & Conditions</a>
            and
            <a href="/privacypolicy" className="text-blue-500 underline hover:text-blue-700 transition-all duration-200 ease-in-out mx-1">Privacy Policy</a>.
          </div>
            <button type="submit" className="login-btn transition-all duration-200 ease-in-out">Register</button>
          </form>
          
          <div className="mt-4 text-center">
            <span className="login-forgot">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 underline hover:text-blue-700 transition-all duration-200 ease-in-out">Login here</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
