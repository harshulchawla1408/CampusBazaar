import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 bg-opacity-80 rounded-xl shadow-lg p-8 transition-all duration-200 ease-in-out">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms & Conditions</h1>
        <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
          <h2>Introduction</h2>
          <p>Welcome to CampusBazaar. By using our platform, you agree to these terms and conditions. Please read them carefully.</p>
          <h2>User Responsibilities</h2>
          <ul>
            <li>Provide accurate information during registration.</li>
            <li>Do not engage in fraudulent or illegal activities.</li>
            <li>Respect other users and their privacy.</li>
          </ul>
          <h2>Account Deletion</h2>
          <p>You may delete your account at any time. We reserve the right to remove accounts that violate our policies.</p>
          <h2>Governing Law</h2>
          <p>These terms are governed by the laws of your jurisdiction. Disputes will be resolved in accordance with local regulations.</p>
        </div>
        <div className="text-center">
          <a href="/signup" className="text-blue-500 underline hover:text-blue-700 transition-all duration-200 ease-in-out">&larr; Back to Signup</a>
        </div>
      </div>
    </div>
  );
}
