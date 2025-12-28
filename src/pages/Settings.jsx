import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const { user } = useContext(AuthContext);

  // Modal functions
  const showModal = (title, message, onConfirm) => {
    setModalTitle(title);
    setModalMessage(message);
    setConfirmAction(() => onConfirm);
    setShowConfirmationModal(true);
    document.body.style.overflow = "hidden";
  };

  const hideModal = () => {
    setShowConfirmationModal(false);
    document.body.style.overflow = "auto";
  };

  const handleConfirm = () => {
    confirmAction();
    hideModal();
  };

  // Navigation functions
  const goBack = () => {
    navigate(-1);
  };

  // Account Management functions
  const changePassword = () => {
    alert("In a real app, this would open a change password form");
  };

  const updateEmail = () => {
    alert("In a real app, this would open an email update form");
  };

  const editProfile = () => {
    navigate("/profile");
  };

  // Privacy & Data functions
  const downloadData = () => {
    alert("In a real app, this would start downloading your data export");
  };

  const confirmDeleteAllMessages = () => {
    showModal(
      "Delete All Messages",
      "Are you sure you want to delete all your posts and comments? This action cannot be undone.",
      deleteAllMessages
    );
  };

  const deleteAllMessages = () => {
    // Simulate API call
    alert("All messages would be deleted via API call");
  };

  const confirmDeleteAccount = () => {
    showModal(
      "Delete Account",
      "Are you sure you want to permanently delete your account? This will remove all your data and cannot be undone.",
      deleteAccount
    );
  };

  const deleteAccount = () => {
    // Simulate API call
    alert("Account would be deleted via API call and user would be logged out");
  };

  // Local Settings functions
  const confirmClearAllData = () => {
    showModal(
      "Clear All Website Data",
      "This will remove all cookies, cache, local storage, and session data for this website. The page will reload and you may need to log in again.",
      clearAllLocalData
    );
  };

  const clearAllLocalData = () => {
    try {
      // Clear cache
      if ("caches" in window) {
        caches.keys().then(function (names) {
          for (let name of names) {
            caches.delete(name);
          }
        });
      }

      // Clear cookies
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Clear local storage
      localStorage.clear();

      // Clear session storage
      sessionStorage.clear();

      alert("All website data cleared successfully. The page will reload.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      alert("Some data could not be cleared, but the page will reload.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // Support functions
  const contactSupport = () => {
    alert("In a real app, this would open a support contact form");
  };

  const viewPrivacyPolicy = () => {
    alert("In a real app, this would open the privacy policy page");
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      alert("In a real app, this would log out the user and redirect to home");
      // localStorage.removeItem('authToken');
      // navigate('/login');
    }
  };

  // Close modal with Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && showConfirmationModal) {
      hideModal();
    }
  };

  return (
    <div className="settings-container" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="modal-overlay" onClick={hideModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <div className="modal-header">
                <div className="modal-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    ></path>
                  </svg>
                </div>
                <h3 className="modal-title">{modalTitle}</h3>
              </div>

              <p className="modal-message">{modalMessage}</p>

              <div className="modal-actions">
                <button onClick={hideModal} className="modal-cancel">
                  Cancel
                </button>
                <button onClick={handleConfirm} className="modal-confirm">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="settings-content">
        {/* Page Header */}
        <div className="settings-header">
          <div className="header-navigation">
            <button onClick={goBack} className="back-button">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <h1>Settings</h1>
          </div>
          <p>Manage your account preferences and data</p>
        </div>

        {/* Settings Sections */}
        <div className="settings-sections">
          {/* Account Management — only for logged-in users */}
          {user && (
            <div className="settings-card">
              <div className="card-header">
                <h2>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Account Management
                </h2>
              </div>
              <div className="card-body">
                {/* unchanged */}
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Change Password</h3>
                    <p>Update your account password</p>
                  </div>
                  <button
                    onClick={changePassword}
                    className="action-button primary"
                  >
                    Change
                  </button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Update Email</h3>
                    <p>Change your email address</p>
                  </div>
                  <button
                    onClick={updateEmail}
                    className="action-button primary"
                  >
                    Update
                  </button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Edit Profile</h3>
                    <p>Update your username and display name</p>
                  </div>
                  <button
                    onClick={editProfile}
                    className="action-button primary"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Data — only for logged-in users */}
          {user && (
            <div className="settings-card">
              <div className="card-header">
                <h2>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                  Privacy & Data
                </h2>
              </div>
              <div className="card-body">
                {/* unchanged */}
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Download My Data</h3>
                    <p>Export all your posts and account data</p>
                  </div>
                  <button
                    onClick={downloadData}
                    className="action-button success"
                  >
                    Download
                  </button>
                </div>

                <div className="setting-item warning">
                  <div className="setting-info">
                    <h3>Delete All Messages</h3>
                    <p>Permanently remove all your posts and comments</p>
                  </div>
                  <button
                    onClick={confirmDeleteAllMessages}
                    className="action-button warning"
                  >
                    Delete All
                  </button>
                </div>

                <div className="setting-item danger">
                  <div className="setting-info">
                    <h3>Delete Account</h3>
                    <p>
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <button
                    onClick={confirmDeleteAccount}
                    className="action-button danger"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications — only for logged-in users */}
          {user && (
            <div className="settings-card">
              <div className="card-header">
                <h2>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h10V9H4v2z"
                    ></path>
                  </svg>
                  Notifications
                </h2>
              </div>
              <div className="card-body">
                {/* unchanged */}
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Email Notifications</h3>
                    <p>Receive email updates for replies and mentions</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={() =>
                        setEmailNotifications(!emailNotifications)
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Push Notifications</h3>
                    <p>Get browser notifications for new activity</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={pushNotifications}
                      onChange={() => setPushNotifications(!pushNotifications)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Local Settings */}
          <div className="settings-card">
            <div className="card-header">
              <h2>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                Local Settings
              </h2>
            </div>
            <div className="card-body">
              <div className="setting-item danger">
                <div className="setting-info">
                  <h3>Clear All Website Data</h3>
                  <p>
                    Remove all cookies, cache, local storage, and session data
                    for this website. Use this if the app is malfunctioning.
                  </p>
                </div>
                <button
                  onClick={confirmClearAllData}
                  className="action-button danger"
                >
                  Clear All Data
                </button>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="settings-card">
            <div className="card-header">
              <h2>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Support
              </h2>
            </div>
            <div className="card-body">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Contact Support</h3>
                  <p>Get help with your account or report issues</p>
                </div>
                <button
                  onClick={contactSupport}
                  className="action-button success"
                >
                  Contact
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Privacy Policy</h3>
                  <p>Read our privacy policy and terms of service</p>
                </div>
                <button
                  onClick={viewPrivacyPolicy}
                  className="action-button secondary"
                >
                  View
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Logout</h3>
                  <p>Sign out of your account</p>
                </div>
                <button onClick={logout} className="action-button secondary">
                  Logout
                </button>
              </div>
            </div>
            <div className="card-header">
              <h2>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 
          2.865 8.166 6.839 9.489.5.093.683-.217.683-.483 
          0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.341-3.369-1.341
          -.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608
          1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 
          2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.944
          0-1.092.39-1.986 1.029-2.685-.103-.253-.447-1.272.098-2.65 
          0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 
          1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025 
          .546 1.378.202 2.397.1 2.65.64.7 1.028 1.593 
          1.028 2.685 0 3.842-2.339 4.687-4.566 4.935.36.31.682.923.682 1.861
          0 1.343-.012 2.425-.012 2.754 0 .269.18.58.688.481A10.004 
          10.004 0 0022 12c0-5.523-4.477-10-10-10z"
                  ></path>
                </svg>
                Visit GitHub
              </h2>
            </div>

            <div className="card-body">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>GitHub Profile</h3>
                  <p>View source code, projects, and repositories</p>
                </div>

                <button
                  onClick={() =>
                    window.open("https://github.com/Soumya280", "_blank")
                  }
                  className="action-button success"
                >
                  Open
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
