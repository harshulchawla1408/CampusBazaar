"use client";
import React from "react";

export default function LoginPage() {
  return (
    <div className="login-bg-container">
      <div className="login-overlay" />
      <div className="login-center-container">
        <div className="login-glass-card animate-fade-in-up">
          <h2 className="login-title">Campus Bazaar Login</h2>
          <form className="login-form">
            <label htmlFor="email" className="login-label">University Email</label>
            <input
              type="email"
              id="email"
              className="login-input"
              placeholder="name@university.edu"
              required
            />
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Password"
              required
            />
            <button type="submit" className="login-btn">Login</button>
            <div className="login-forgot-wrapper">
              <a href="#" className="login-forgot">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 