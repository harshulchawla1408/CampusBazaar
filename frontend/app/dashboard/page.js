"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const DEPARTMENTS = ["CSE", "ECE", "ME", "CE", "EE", "Other"];
const YEARS = ["1st", "2nd", "3rd", "4th"];

export default function DashboardPage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    department: "",
    year: "",
    hostelName: "",
    profileImage: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Auth check and fetch profile
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }
      const token = await user.getIdToken();
      const res = await fetch("http://localhost:5000/api/v1/user-profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile({
          name: data.name || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          age: data.age?.toString() || "",
          department: data.department || "",
          year: data.year || "",
          hostelName: data.hostelName || "",
          profileImage: data.profileImage || "",
        });
      } else {
        setProfile({
          name: "",
          email: user.email || "",
          phone: "",
          age: "",
          department: "",
          year: "",
          hostelName: "",
          profileImage: "",
        });
      }
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  // Validation
  const validate = () => {
    const errs = {};
    if (!profile.name.trim()) errs.name = "Name is required.";
    if (!profile.phone.match(/^\d{10}$/)) errs.phone = "Mobile number must be exactly 10 digits.";
    if (profile.age && Number(profile.age) < 16) errs.age = "Age must be at least 16.";
    if (!profile.department) errs.department = "Department is required.";
    if (!profile.year) errs.year = "Year is required.";
    return errs;
  };

  // Handle image upload
  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSaving(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const token = user && await user.getIdToken();
      if (!token) {
        toast.error("You must be logged in to save your profile.");
        setSaving(false);
        return;
      }
      const res = await fetch("http://localhost:5000/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...profile,
          age: profile.age ? Number(profile.age) : undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save profile");
      }
      toast.success("Profile saved successfully!");
      // Refetch profile to update UI
      setLoading(true);
      const refetch = await fetch("http://localhost:5000/api/v1/user-profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (refetch.ok) {
        const data = await refetch.json();
        setProfile({
          name: data.name || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          age: data.age?.toString() || "",
          department: data.department || "",
          year: data.year || "",
          hostelName: data.hostelName || "",
          profileImage: data.profileImage || "",
        });
      }
      setLoading(false);
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Failed to save profile. Please try again.");
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><div className="loader" /></div>;
  }

  const avatar = profile.profileImage || '/images/noimage.jpg';

  return (
    <div className="dashboard-root">
      <aside className="dashboard-sidebar">
        <div className="sidebar-profile-pic-wrapper">
          <label htmlFor="profile-pic-upload" className="sidebar-profile-pic-label">
            <img src={avatar} alt="Profile" className="sidebar-profile-pic" />
            <input id="profile-pic-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleProfilePicChange} />
            <span className="sidebar-edit-pic">Edit</span>
          </label>
        </div>
        <div className="sidebar-profile-info">
          <span className="sidebar-profile-name">{profile.name}</span>
          <span className="sidebar-profile-email">{profile.email}</span>
        </div>
      </aside>
      <main className="dashboard-main">
        <form className="personal-info-form" onSubmit={handleSaveProfile}>
          <div className="form-row">
            <label>Name</label>
            <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
          </div>
          <div className="form-row">
            <label>Email</label>
            <input type="email" value={profile.email} readOnly />
          </div>
          <div className="form-row">
            <label>Mobile Number</label>
            <input type="tel" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
            {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
          </div>
          <div className="form-row">
            <label>Age</label>
            <input type="number" value={profile.age} onChange={e => setProfile({ ...profile, age: e.target.value })} />
            {errors.age && <div className="text-red-500 text-xs mt-1">{errors.age}</div>}
          </div>
          <div className="form-row">
            <label>Department</label>
            <select value={profile.department} onChange={e => setProfile({ ...profile, department: e.target.value })}>
              <option value="">Select</option>
              {DEPARTMENTS.map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>
            {errors.department && <div className="text-red-500 text-xs mt-1">{errors.department}</div>}
          </div>
          <div className="form-row">
            <label>Year</label>
            <select value={profile.year} onChange={e => setProfile({ ...profile, year: e.target.value })}>
              <option value="">Select</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            {errors.year && <div className="text-red-500 text-xs mt-1">{errors.year}</div>}
          </div>
          <div className="form-row">
            <label>Hostel Name</label>
            <input type="text" value={profile.hostelName} onChange={e => setProfile({ ...profile, hostelName: e.target.value })} />
          </div>
          <div className="form-row">
            <label>Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
          </div>
          <button type="submit" className="personal-info-save-btn" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        </form>
      </main>
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 