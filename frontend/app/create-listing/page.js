"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from 'next/image';

export default function CreateListingPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const CATEGORIES = [
    "Study Essentials",
    "Electronics & Gadgets",
    "Furniture & Room Items",
    "Clothing & Accessories",
    "Kitchen & Appliances",
    "Travel & Mobility",
    "Entertainment & Misc",
    "Others"
  ];

  // Helper to get Firebase token from current user
  async function getToken() {
    if (typeof window !== "undefined") {
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) return user.getIdToken();
    }
    return null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !category) {
      if (!category) setCategoryError("Category is required.");
      toast.error("Title, price, and category are required.");
      return;
    }
    setCategoryError("");
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        toast.error("You must be logged in to create a listing.");
        setLoading(false);
        return;
      }
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, price, category, image }),
      });
      if (!res.ok) throw new Error("Failed to create listing");
      toast.success("Listing created successfully!");
      router.push("/");
    } catch (err) {
      toast.error("Failed to create listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-page background image */}
      <div className="fixed inset-0 w-full h-full z-0 bg-cover bg-no-repeat bg-center" style={{backgroundImage: "url('/images/listing_background.jpg')"}} />
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/0 z-10" />
      {/* Removed floating elements for a cleaner look */}
      <div className="relative z-20 flex min-h-screen w-full items-center justify-center">
        {/* Responsive grid: image left, form right */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center min-h-[70vh]">
          {/* Left: Illustration (keeps space for the image, but image is in background) */}
          <div className="hidden lg:block h-full" />
          {/* Right: Glassy Form Card */}
          <div className="flex items-center justify-end w-full h-full ml-auto px-0 lg:px-10">
            <div className="login-glass-card w-full max-w-lg rounded-2xl shadow-2xl backdrop-blur-md bg-white/30 border border-white/30 relative z-20">
              <h1 className="text-3xl font-bold mb-2 text-center text-[#272727]">Create Your Listing</h1>
              <p className="text-base text-center mb-6 text-gray-600">Fill in the details below to list your item for sale.</p>
              <form className="login-form w-full" onSubmit={handleSubmit}>
                {/* Title */}
                <label className="login-label">Title<span className="text-[#FF4E6E]">*</span></label>
                <input
                  type="text"
                  className="login-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                {/* Description */}
                <label className="login-label">Description</label>
                <textarea
                  className="login-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
                {/* Price */}
                <label className="login-label">Price<span className="text-[#FF4E6E]">*</span></label>
                <input
                  type="number"
                  className="login-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min={0}
                />
                {/* Category */}
                <label className="login-label">Category<span className="text-[#FF4E6E]">*</span></label>
                <select
                  className="login-input"
                  value={category}
                  onChange={e => { setCategory(e.target.value); setCategoryError(""); }}
                  required
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                {categoryError && <div className="text-red-500 text-xs mt-1">{categoryError}</div>}
                {/* Image */}
                <label className="login-label">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={handleImageChange}
                />
                {image && (
                  <div className="mt-4 p-2 border border-gray-200 rounded-lg bg-gray-50">
                     <Image src={image} alt="Preview" width={500} height={300} className="rounded-md max-h-64 w-full object-contain" />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold py-3 px-4 rounded-lg hover:from-pink-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out mt-6"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "Create Listing"
                  )}
                </button>
              </form>
              <div className="mt-6 text-sm text-center">
                <a href="/" className="text-blue-500 underline hover:text-blue-700 transition-all duration-200 ease-in-out">
                  &larr; Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Responsive: Stack on mobile */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .grid-cols-2 { grid-template-columns: 1fr !important; }
          .login-glass-card { margin-right: auto !important; margin-left: auto !important; }
        }
        @media (max-width: 900px) {
          .login-glass-card { max-width: 98vw !important; }
        }
        @media (max-width: 700px) {
          .login-glass-card { max-width: 99vw !important; margin-right: auto !important; margin-left: auto !important; }
        }
      `}</style>
    </div>
  );
} 