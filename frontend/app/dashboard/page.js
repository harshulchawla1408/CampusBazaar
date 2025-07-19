"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const TABS = ["Personal Info", "Listings", "Notifications", "Settings"];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [profilePic, setProfilePic] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    verified: false,
    roll: "",
    phone: "",
    age: "",
    gender: "",
    department: "",
    branch: "",
    year: "",
    semester: "",
    photoURL: "",
  });
  const [profileProgress, setProfileProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Dynamically calculate profile completeness
  useEffect(() => {
    const requiredFields = [
      profile.name,
      profile.roll,
      profile.phone,
      profile.age,
      profile.gender,
      profile.department,
      profile.branch,
      profile.year,
      profile.semester,
    ];
    let filled = requiredFields.filter(Boolean).length;
    const total = requiredFields.length;
    setProfileProgress(total === 0 ? 0 : Math.round((filled / total) * 100));
  }, [profile]);

  useEffect(() => {
    const fetchProfile = async () => {
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();
      const user = auth.currentUser;
      const token = user && await user.getIdToken();
      if (!token) return;
      const res = await fetch("http://localhost:5000/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile({
          name: data.displayName || "",
          email: data.email || "",
          roll: data.roll || "",
          phone: data.phone || "",
          age: data.age || "",
          gender: data.gender || "",
          department: data.department || "",
          branch: data.branch || "",
          year: data.year || "",
          semester: data.semester || "",
          photoURL: data.photoURL || "",
          verified: true
        });
      }
    };
    fetchProfile();
  }, []);

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setProfile((prev) => ({ ...prev, photoURL: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Avatar fallback
  const avatar = profilePic || profile.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || "User")}&background=004D47&color=fff&rounded=true&size=128`;

  // Save profile to backend
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();
      const user = auth.currentUser;
      const token = user && await user.getIdToken();
      if (!token) {
        toast.error("You must be logged in to save your profile.");
        setSaving(false);
        return;
      }
      const res = await fetch("http://localhost:5000/api/v1/users/create-or-update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Failed to save profile");
      toast.success("Profile saved successfully!");
      router.push("/");
    } catch (err) {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-root">
      {/* Sidebar */}
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
          {profile.verified && <span className="sidebar-verified">✅ Verified</span>}
        </div>
        <button className="sidebar-logout-btn">Logout</button>
      </aside>

      {/* Main Panel */}
      <main className="dashboard-main">
        {/* Tab Navigation */}
        <nav className="dashboard-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`dashboard-tab-btn${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <section className="dashboard-tab-content">
          {activeTab === "Personal Info" && (
            <div className="dashboard-personal-info">
              {/* Profile Completeness */}
              <div className="profile-progress-bar-wrapper">
                <span className="profile-progress-label">Profile Completeness</span>
                <div className="profile-progress-bar-bg">
                  <div className="profile-progress-bar" style={{ width: `${profileProgress}%` }} />
                </div>
                <span className="profile-progress-value">{profileProgress}%</span>
              </div>
              <form className="personal-info-form" onSubmit={e => { e.preventDefault(); handleSaveProfile(); }}>
                <div className="form-row">
                  <label>Name</label>
                  <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div className="form-row">
                  <label>Roll Number</label>
                  <input type="text" value={profile.roll} onChange={e => setProfile({ ...profile, roll: e.target.value })} />
                </div>
                <div className="form-row">
                  <label>Phone Number</label>
                  <input type="tel" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
                </div>
                <div className="form-row">
                  <label>Age</label>
                  <input type="number" value={profile.age} onChange={e => setProfile({ ...profile, age: e.target.value })} />
                </div>
                <div className="form-row">
                  <label>Gender</label>
                  <select value={profile.gender} onChange={e => setProfile({ ...profile, gender: e.target.value })}>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Department</label>
                  <input type="text" value={profile.department} onChange={e => setProfile({ ...profile, department: e.target.value })} />
                </div>
                <div className="form-row">
                  <label>Branch</label>
                  <input type="text" value={profile.branch} onChange={e => setProfile({ ...profile, branch: e.target.value })} />
                </div>
                <div className="form-row">
                  <label>Year</label>
                  <select value={profile.year} onChange={e => setProfile({ ...profile, year: e.target.value })}>
                    <option value="">Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Semester</label>
                  <select value={profile.semester} onChange={e => setProfile({ ...profile, semester: e.target.value })}>
                    <option value="">Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Profile Picture</label>
                  <input type="file" accept="image/*" onChange={handleProfilePicChange} />
                </div>
                <button type="submit" className="personal-info-save-btn" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
              </form>
            </div>
          )}
          {activeTab === "Listings" && (
            <div className="dashboard-tab-listings">
              <p>Your listings will appear here.</p>
            </div>
          )}
          {activeTab === "Notifications" && (
            <div className="dashboard-tab-notifications">
              <ul className="notifications-list"></ul>
              <div className="mt-6 text-center">
                <a href="/changepass" className="text-blue-500 underline hover:text-blue-700 transition-all duration-200 ease-in-out">
                  Change Password
                </a>
              </div>
            </div>
          )}
          {activeTab === "Settings" && (
            <div className="dashboard-tab-settings">
              <form className="settings-form">
                <div className="form-row">
                  <label>Change Password</label>
                  <input type="password" placeholder="New Password" />
                </div>
                <button type="button" className="settings-save-btn">Change Password</button>
                <button type="button" className="settings-delete-btn">Delete Account</button>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
} 