"use client";
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    setLoading(true);
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (error) {
      console.error('Password reset error:', error);
      if (error.code === 'auth/user-not-found') {
        toast.error('No user found with this email address.');
      } else {
        toast.error('Failed to send reset link. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4 font-sans">
      {/* Full-page background image */}
      <div 
        className="fixed inset-0 w-full h-full z-0 bg-cover bg-no-repeat bg-center transition-transform duration-500 ease-in-out transform scale-105"
        style={{ backgroundImage: "url('/images/forgot_pass.jpeg')" }}
      />
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Glassmorphism Card */}
      <div className="relative z-20 w-full max-w-md transition-all duration-500 ease-in-out transform scale-100 hover:scale-105">
        <div className="bg-white/20 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
          
          <h1 className="text-4xl font-bold text-gray-800 mb-3 tracking-tight">Forgot Password?</h1>
          <p className="text-gray-700 mb-8">No worries! Enter your email and we'll send you a reset link.</p>

          {submitted ? (
            <div className="text-center p-4 bg-green-100/80 rounded-lg">
              <p className="text-green-800 font-semibold text-lg mb-4">Reset link sent! Please check your inbox.</p>
              <Link href="/login" className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full px-5 py-3 text-gray-800 bg-white/70 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 shadow-inner"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold py-3 px-4 rounded-lg hover:from-pink-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? 'Sending...' : 'Reset Password'}
              </button>
            </form>
          )}

          {!submitted && (
            <div className="mt-8">
              <Link href="/login" className="text-sm text-gray-700 font-medium hover:text-black hover:underline transition-colors duration-300">
                &larr; Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
