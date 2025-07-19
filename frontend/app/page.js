'use client';

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import QuickListingBanner from "./components/QuickListingBanner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 80 }}>
        <HeroSection />
        <div className="flex justify-end max-w-5xl mx-auto px-4 mt-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-200 ease-in-out"
            onClick={() => router.push('/create-listing')}
          >
            + Create a Listing
          </button>
        </div>
        <QuickListingBanner />
        {/* Newly Updated Listings Section */}
        <section className="products-section">
          <h2>Newly Updated Listings</h2>
          <div className="products-grid">
            {products.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-8">No listings yet.</div>
            ) : (
              products.map((p, i) => (
                <div className="product-card" key={p._id || i}>
                  <img src={p.image || '/images/book.jpg'} alt={p.title} className="product-img" />
                  <div className="product-info">
                    <div className="product-title">{p.title}</div>
                    <div className="product-price">₹{p.price}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        {/* Footer */}
        <footer className="footer">
          <div className="footer-main">Campus Bazaar</div>
          <div className="footer-tagline">Built by Students, for Students</div>
          <div className="footer-links">
            <a href="/privacypolicy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
            <a href="#">Contact</a>
          </div>
        </footer>
      </div>
      <style jsx>{`
        .products-section {
          margin: 60px auto 0 auto;
          max-width: 1100px;
          padding: 0 5vw;
        }
        .products-section h2 {
          color: #004D47;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 32px;
          font-family: 'Poppins', 'Inter', sans-serif;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 32px;
        }
        .product-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.08);
          padding: 22px 18px 18px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .product-card:hover {
          box-shadow: 0 8px 32px rgba(255,134,94,0.13);
          transform: translateY(-4px) scale(1.03);
        }
        .product-img {
          width: 110px;
          height: 110px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 18px;
          background: #f3f3f3;
        }
        .product-info {
          text-align: center;
        }
        .product-title {
          font-size: 1.08rem;
          font-weight: 600;
          color: #004D47;
          margin-bottom: 6px;
        }
        .product-price {
          color: #FF865E;
          font-size: 1.1rem;
          font-weight: 700;
        }
        .footer {
          background: #004D47;
          color: #fff;
          margin-top: 70px;
          padding: 38px 0 24px 0;
          text-align: center;
          border-top-left-radius: 32px;
          border-top-right-radius: 32px;
        }
        .footer-main {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .footer-tagline {
          font-size: 1.08rem;
          margin-bottom: 18px;
          color: #FF865E;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 32px;
          font-size: 1rem;
        }
        .footer-links a {
          color: #fff;
          text-decoration: none;
          opacity: 0.85;
          transition: opacity 0.2s;
        }
        .footer-links a:hover {
          opacity: 1;
          text-decoration: underline;
        }
        @media (max-width: 700px) {
          .products-section h2 {
            font-size: 1.3rem;
          }
          .products-grid {
            gap: 18px;
          }
          .footer {
            border-radius: 0;
            padding: 28px 0 16px 0;
          }
        }
      `}</style>
    </div>
  );
}
