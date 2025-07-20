'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { currentUser, logout, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) {
        setProfile(null);
        setProfileLoading(false);
        return;
      }
      setProfileLoading(true);
      const token = await currentUser.getIdToken();
      const res = await fetch("http://localhost:5000/api/v1/user-profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else {
        setProfile(null);
      }
      setProfileLoading(false);
    };
    fetchProfile();
  }, [currentUser]);

  if (loading || profileLoading) {
    return (
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo animate-pulse h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="navbar-links animate-pulse h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="navbar-actions animate-pulse h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <span className="logo-text">CAMPUS</span>
          <span className="logo-text logo-bazaar">BAZAAR</span>
        </div>
        <div className={`navbar-links ${open ? 'open' : ''}`}>
          <a href="#products">Products</a>
          <a href="#whatsnew">What's New</a>
        </div>
        <div className="navbar-actions">
          {currentUser ? (
            <>
              <button
                className="btn btn-logout"
                onClick={async () => { await logout(); router.push('/'); }}
              >
                Logout
              </button>
              <button
                className="btn btn-profile"
                onClick={() => router.push('/dashboard')}
                style={{ padding: 0, background: 'none', border: 'none' }}
              >
                <Image
                  src={profile?.profileImage || currentUser.photoURL || '/images/noimage.jpg'}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full border border-blue-200"
                />
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-login" onClick={() => router.push('/login')}>Login</button>
              <button className="btn btn-register" onClick={() => router.push('/signup')}>Register</button>
            </>
          )}
          <button className="navbar-hamburger" onClick={() => setOpen(!open)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          background: #FFF9F5;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          z-index: 100;
          font-family: 'Poppins', 'Inter', sans-serif;
        }
        .navbar-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4vw;
          height: 70px;
        }
        .navbar-logo {
          display: flex;
          flex-direction: column;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: 1px;
          color: #004D47;
          line-height: 1;
          user-select: none;
        }
        .logo-text {
          color: #fff;
          text-shadow: 1px 2px 0 #FF865E, 2px 4px 0 #004D47;
          font-size: 1.2em;
        }
        .logo-bazaar {
          color: #FF865E;
          text-shadow: 1px 2px 0 #004D47, 2px 4px 0 #fff;
        }
        .navbar-links {
          display: flex;
          gap: 32px;
        }
        .navbar-links a {
          color: #004D47;
          font-weight: 500;
          font-size: 1.08rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .navbar-links a:hover {
          color: #FF865E;
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .btn {
          font-size: 1rem;
          font-weight: 600;
          border-radius: 24px;
          padding: 8px 24px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border 0.2s;
        }
        .btn-login {
          background: #FF865E;
          color: #fff;
          border: 2px solid #FF865E;
          box-shadow: 0 2px 8px rgba(255,134,94,0.08);
        }
        .btn-login:hover {
          background: #ff6a36;
        }
        .btn-register {
          background: #004D47;
          color: #fff;
          border: 2px solid #004D47;
          box-shadow: 0 2px 8px rgba(0,77,71,0.08);
        }
        .btn-register:hover {
          background: #00332f;
        }
        .btn-logout {
          background: #e53e3e;
          color: #fff;
          border: 2px solid #e53e3e;
        }
        .btn-logout:hover {
          background: #c53030;
        }
        .btn-profile {
          padding: 0;
          background: none;
          border: none;
        }
        .navbar-hamburger {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 10px;
        }
        .navbar-hamburger span {
          display: block;
          width: 24px;
          height: 3px;
          background: #004D47;
          border-radius: 2px;
        }
        @media (max-width: 900px) {
          .navbar-links {
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100vw;
            background: #FFF9F5;
            flex-direction: column;
            gap: 0;
            box-shadow: 0 2px 16px rgba(0,0,0,0.06);
            z-index: 99;
          }
          .navbar-links.open {
            display: flex;
          }
          .navbar-hamburger {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 