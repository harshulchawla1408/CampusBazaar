"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
    <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white dark:bg-zinc-900 bg-opacity-80 rounded-xl shadow-lg p-8 transition-all duration-200 ease-in-out">
        <h1 className="text-2xl font-bold mb-6 text-center">Create a Listing</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Title<span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price<span className="text-red-500">*</span></label>
            <input
              type="number"
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min={0}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Category<span className="text-red-500">*</span></label>
            <select
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              value={category}
              onChange={e => { setCategory(e.target.value); setCategoryError(""); }}
              required
            >
              <option value="">Select Category</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {categoryError && <div className="text-red-500 text-xs mt-1">{categoryError}</div>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={handleImageChange}
            />
            {image && (
              <img src={image} alt="Preview" className="mt-3 rounded-md max-h-40 mx-auto" />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-200 ease-in-out"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          <a href="/" className="text-blue-500 underline hover:text-blue-700 transition-all duration-200 ease-in-out">
            &larr; Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 