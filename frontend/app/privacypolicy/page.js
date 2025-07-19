import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 bg-opacity-80 rounded-xl shadow-lg p-8 transition-all duration-200 ease-in-out">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
          <h2>What Data We Collect</h2>
          <p>We collect information you provide during registration, such as your name, email, and mobile number.</p>
          <h2>Why We Collect It</h2>
          <p>We use your data to provide and improve our services, personalize your experience, and ensure platform security.</p>
          <h2>How We Store It</h2>
          <p>Your data is stored securely and is not shared with third parties except as required by law.</p>
          <h2>Your Rights</h2>
          <ul>
            <li>Access and update your personal information.</li>
            <li>Request deletion of your account and data.</li>
            <li>Contact us for any privacy-related concerns.</li>
          </ul>
        </div>
        <div className="text-center">
          <a href="/signup" className="text-blue-500 underline hover:text-blue-700 transition-all duration-200 ease-in-out">&larr; Back to Signup</a>
        </div>
      </div>
    </div>
  );
}
