'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { currentUser, logout, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-zinc-900">
        <div className="animate-pulse h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="animate-pulse h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-zinc-900">
      <Link href="/" className="text-xl font-bold text-blue-700 dark:text-blue-300">🏠 CampusBazaar</Link>
      {currentUser ? (
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Image
              src={currentUser.photoURL || '/default-avatar.png'}
              alt="User"
              width={40}
              height={40}
              className="rounded-full border border-blue-200"
            />
          </Link>
          <button
            onClick={async () => { await logout(); router.push('/'); }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition-all duration-200 ease-in-out text-sm font-medium"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login" className="text-blue-500 font-medium">Login / Register</Link>
      )}
    </div>
  );
};

export default Navbar; 