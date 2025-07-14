"use client";
import React, { useState, useEffect } from "react";

const TABS = ["Personal Info", "Listings", "Notifications", "Settings"];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [profilePic, setProfilePic] = useState(null);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@university.edu",
    verified: true,
    roll: "2021001",
    phone: "9876543210",
    age: "20",
    gender: "Male",
    department: "Engineering",
    branch: "CSE",
    year: "2",
    semester: "4",
  });
  const [profileProgress, setProfileProgress] = useState(80);

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
    // Optionally count profilePic as well:
    // if (profilePic) filled++;
    const total = requiredFields.length;
    setProfileProgress(Math.round((filled / total) * 100));
  }, [profile]);

  // Placeholder listing summary
  const listingSummary = {
    posted: 5,
    purchased: 2,
    saved: 7,
  };

  // Placeholder notifications
  const notifications = [
    { id: 1, text: "Your notes listing received 3 new views" },
    { id: 2, text: "Campus Bazaar Fest Clearance sale starts tomorrow!" },
  ];

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Avatar fallback
  const avatar = profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=004D47&color=fff&rounded=true&size=128`;

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
              <form className="personal-info-form">
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
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Semester</label>
                  <select value={profile.semester} onChange={e => setProfile({ ...profile, semester: e.target.value })}>
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
                <button type="button" className="personal-info-save-btn">Save</button>
              </form>
              {/* Listings Summary */}
              <div className="dashboard-listing-summary">
                <div className="listing-card listing-posted">
                  <span className="listing-icon">✅</span>
                  <span className="listing-label">Listings Posted</span>
                  <span className="listing-value">{listingSummary.posted}</span>
                </div>
                <div className="listing-card listing-purchased">
                  <span className="listing-icon">🛒</span>
                  <span className="listing-label">Items Purchased</span>
                  <span className="listing-value">{listingSummary.purchased}</span>
                </div>
                <div className="listing-card listing-saved">
                  <span className="listing-icon">📌</span>
                  <span className="listing-label">Saved Listings</span>
                  <span className="listing-value">{listingSummary.saved}</span>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Listings" && (
            <div className="dashboard-tab-listings">
              <p>Your listings will appear here.</p>
            </div>
          )}
          {activeTab === "Notifications" && (
            <div className="dashboard-tab-notifications">
              <ul className="notifications-list">
                {notifications.map(n => (
                  <li key={n.id} className="notification-item">{n.text}</li>
                ))}
              </ul>
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