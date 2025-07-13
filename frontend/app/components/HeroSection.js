'use client';

import React from 'react';

const avatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/54.jpg',
  'https://randomuser.me/api/portraits/women/65.jpg',
];

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Left Side */}
      <div className="hero-left">
        <div className="doodle-arrow doodle-1" />
        <h1>
          Buy. Sell. Swap.<br />
          <span>All Within Your Campus.</span>
        </h1>
        <p className="hero-subtext">
          Discover a student-only marketplace for books, gadgets, notes, tickets & more — verified and safe, just for your university.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-primary">Create a Listing</button>
          <button className="btn btn-secondary">
            <span className="play-icon">▶</span> How It Works
          </button>
        </div>
        <div className="hero-avatars">
          <div className="avatar-row">
            {avatars.map((src, i) => (
              <img key={i} src={src} alt="Student avatar" className="avatar-img" />
            ))}
          </div>
          <span className="avatar-text">5,000+ Verified Students</span>
        </div>
        <div className="doodle-arrow doodle-2" />
      </div>
      {/* Right Side */}
      <div className="hero-right">
        <div className="image-bg-container">
          {/* Wavy SVG background */}
          <svg className="wavy-bg" viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="320" height="400" rx="24" fill="#FFE8E0" />
            <path d="M0 80 Q80 120 160 80 T320 80" stroke="#FFBFAE" strokeWidth="6" fill="none" opacity="0.5" />
            <path d="M0 160 Q80 200 160 160 T320 160" stroke="#FFBFAE" strokeWidth="6" fill="none" opacity="0.3" />
            <path d="M0 240 Q80 280 160 240 T320 240" stroke="#FFBFAE" strokeWidth="6" fill="none" opacity="0.2" />
          </svg>
          {/* Student Image */}
          <img src="/images/cbPhoto_1.png" alt="Student" className="student-photo-pop" />
        </div>
        {/* Abstract SVG doodles */}
        <svg className="cloud-doodle" width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 30 Q20 10 40 20 Q60 30 70 10" stroke="#008060" strokeWidth="3" fill="none" opacity="0.18" />
        </svg>
        <svg className="lines-doodle" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="10" y1="50" x2="50" y2="10" stroke="#004D47" strokeWidth="4" opacity="0.13" />
          <line x1="20" y1="55" x2="55" y2="20" stroke="#004D47" strokeWidth="4" opacity="0.13" />
        </svg>
      </div>
      <style jsx>{`
        .hero-section {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          background: #FFF9F5;
          padding: 120px 0 40px 0;
          min-height: 80vh;
          font-family: 'Poppins', 'Inter', sans-serif;
          position: relative;
        }
        .hero-left {
          flex: 0 0 65%;
          padding: 0 5vw 0 8vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        .hero-right {
          flex: 0 0 35%;
          background: #004D47;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top-left-radius: 60px;
          border-bottom-left-radius: 60px;
          box-shadow: -8px 0 32px rgba(0,0,0,0.04);
          min-width: 400px;
          position: relative;
          overflow: visible;
        }
        .image-bg-container {
          position: relative;
          width: 320px;
          height: 400px;
          // border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          background: transparent;
          z-index: 2;
        }
        .wavy-bg {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .student-photo-pop {
          position: absolute;
          left: 50%;
          bottom: 30px;
          transform: translateX(-50%) scale(1.08);
          width: 260px;
          height: 360px;
          object-fit: cover;
          border-radius: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.13);
          background: transparent;
          
          z-index: 3;
        }
        .cloud-doodle {
          position: absolute;
          top: 38px;
          right: 38px;
          z-index: 1;
        }
        .lines-doodle {
          position: absolute;
          bottom: 38px;
          left: 18px;
          z-index: 1;
        }
        h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #004D47;
          margin-bottom: 18px;
          line-height: 1.1;
        }
        h1 span {
          color: #FF865E;
          background: #fff3ec;
          border-radius: 10px;
          padding: 0 8px;
          box-shadow: 0 2px 8px rgba(255,134,94,0.08);
        }
        .hero-subtext {
          font-size: 1.18rem;
          color: #444;
          margin-bottom: 32px;
          max-width: 480px;
        }
        .hero-ctas {
          display: flex;
          gap: 18px;
          margin-bottom: 36px;
        }
        .btn {
          font-size: 1.08rem;
          font-weight: 600;
          border-radius: 30px;
          padding: 13px 32px;
          border: none;
          cursor: pointer;
          transition: box-shadow 0.2s, background 0.2s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .btn-primary {
          background: #008060;
          color: #fff;
        }
        .btn-primary:hover {
          background: #006b50;
        }
        .btn-secondary {
          background: #fff;
          color: #008060;
          border: 2px solid #008060;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-secondary .play-icon {
          font-size: 1.2em;
          color: #FF865E;
        }
        .btn-secondary:hover {
          background: #f3f3f3;
        }
        .hero-avatars {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .avatar-row {
          display: flex;
        }
        .avatar-img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-left: -10px;
          background: #eee;
        }
        .avatar-img:first-child {
          margin-left: 0;
        }
        .avatar-text {
          font-size: 1rem;
          color: #008060;
          font-weight: 600;
        }
        /* Doodles */
        .doodle-arrow {
          position: absolute;
          width: 60px;
          height: 60px;
          pointer-events: none;
        }
        .doodle-1 {
          top: -30px;
          left: 0;
          background: url('data:image/svg+xml;utf8,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><path d="M10 40 Q30 10 50 40" stroke="%23FF865E" stroke-width="4" fill="none"/><circle cx="10" cy="40" r="3" fill="%23FF865E"/><circle cx="50" cy="40" r="3" fill="%23FF865E"/></svg>') no-repeat center/contain;
        }
        .doodle-2 {
          bottom: 20px;
          left: 120px;
          background: url('data:image/svg+xml;utf8,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><path d="M10 20 Q30 50 50 20" stroke="%23FF865E" stroke-width="4" fill="none"/><circle cx="10" cy="20" r="3" fill="%23FF865E"/><circle cx="50" cy="20" r="3" fill="%23FF865E"/></svg>') no-repeat center/contain;
        }
        @media (max-width: 1100px) {
          .hero-section {
            flex-direction: column;
            padding: 90px 0 30px 0;
          }
          .hero-left, .hero-right {
            flex: unset;
            width: 100%;
            min-width: 0;
            padding: 0 5vw;
            border-radius: 0;
          }
          .hero-right {
            margin-top: 40px;
            border-radius: 32px;
            min-width: 0;
          }
          .image-bg-container {
            width: 90vw;
            height: 320px;
          }
        }
        @media (max-width: 700px) {
          .hero-section {
            padding: 70px 0 20px 0;
          }
          h1 {
            font-size: 2.1rem;
          }
          .image-bg-container {
            width: 90vw;
            height: 220px;
          }
          .student-photo-pop {
            width: 120px;
            height: 140px;
            border-radius: 18px;
            bottom: -18px;
          }
        }
      `}</style>
    </section>
  );
} 