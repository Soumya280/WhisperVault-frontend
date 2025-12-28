import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import "../styles/MyProfile.css";
import { useNavigate } from "react-router-dom";
import CreatePost from "../modal/CreatePost";

const MyProfile = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/getuser");
        setProfile(res.data);
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Navigation functions
  const goToMyPosts = () => {
    navigate("/myposts");
  };

  const editProfile = () => {
    // Edit profile logic would go here
    console.log("Edit profile");
  };

  const goToSettings = () => {
    navigate("/settings");
  };

  if (loading) {
    return (
      <div className="my-profile-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-profile-container">
        <div className="error-state">
          <div className="error-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <p className="error-message">{error}</p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="my-profile-container">
        <div className="no-profile-state">
          <div className="no-profile-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <p>No profile found.</p>
        </div>
      </div>
    );
  }

  const initial = profile.alias ? profile.alias.charAt(0).toUpperCase() : "U";
  const joinDate = profile.joinDate
    ? new Date(profile.joinDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : "Unknown";

  return (
    <div className="my-profile-container">
      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="cover-image"></div>

          <div className="profile-info">
            <div className="avatar-container">
              <div className="avatar">{initial}</div>
            </div>
            <div className="profile-details">
              <div className="profile-name-section">
                <h1 className="profile-alias">{profile.alias}</h1>
                <p className="profile-username">{profile.username}</p>
              </div>
              <button className="edit-profile-button" onClick={editProfile}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="profile-grid">
          {/* Account Information */}
          <div className="profile-card">
            <h3 className="card-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              Account Information
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Email</label>
                <p className="info-value">{profile.email}</p>
              </div>
              <div className="info-item">
                <label>Username</label>
                <p className="info-value">{profile.username}</p>
              </div>
              <div className="info-item">
                <label>Display Alias</label>
                <p className="info-value">{profile.alias}</p>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="profile-card">
            <h3 className="card-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
              Activity Stats
            </h3>
            <div className="stats-grid">
              <div className="stat-item messages-stat">
                <div className="stat-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                </div>
                <span className="stat-label">Total Messages</span>
                <span className="stat-value">{profile.messages || 0}</span>
              </div>

              <div className="stat-item karma-stat">
                <div className="stat-icon">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="stat-label">Followers</span>
                <span className="stat-value">{profile.followers || 0}</span>
              </div>

              <div className="stat-item join-date-stat">
                <div className="stat-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <span className="stat-label">Member Since</span>
                <span className="stat-value">{joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="profile-card">
          <h3 className="card-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            Quick Actions
          </h3>
          <div className="actions-grid">
            <button
              className="action-button my-posts-button"
              onClick={goToMyPosts}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                ></path>
              </svg>
              <span>My Posts</span>
            </button>

            <button
              className="action-button create-post-button"
              onClick={() => setShowCreateModal(true)}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              <span>Create Post</span>
            </button>

            <button
              className="action-button edit-profile-action-button"
              onClick={editProfile}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              <span>Edit Profile</span>
            </button>

            <button
              className="action-button settings-button"
              onClick={goToSettings}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
      {showCreateModal && (
        <CreatePost onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};
export default MyProfile;
