'use client';

import React from 'react';

export default function QuickListingBanner() {
  return (
    <div className="quick-listing-banner">
      <div className="qlb-content">
        <span className="qlb-icon">+</span>
        <span className="qlb-text">Got something to sell? <b>List it now in 30 seconds!</b></span>
      </div>
      <button className="qlb-btn">Create a Listing</button>
      <style jsx>{`
        .quick-listing-banner {
          margin: 0 auto;
          margin-top: 32px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 36px;
          max-width: 800px;
          font-family: 'Poppins', 'Inter', sans-serif;
          gap: 18px;
        }
        .qlb-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .qlb-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FF865E;
          color: #fff;
          font-size: 1.7rem;
          font-weight: 700;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(255,134,94,0.13);
        }
        .qlb-text {
          font-size: 1.13rem;
          color: #004D47;
        }
        .qlb-btn {
          background: #008060;
          color: #fff;
          font-size: 1.08rem;
          font-weight: 600;
          border: none;
          border-radius: 30px;
          padding: 12px 32px;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: background 0.2s;
        }
        .qlb-btn:hover {
          background: #006b50;
        }
        @media (max-width: 700px) {
          .quick-listing-banner {
            flex-direction: column;
            align-items: stretch;
            padding: 18px 10px;
            gap: 14px;
          }
          .qlb-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
} 