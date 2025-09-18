import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import CreatePost from "../modal/CreatePost";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 960);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
    setDropdownOpen(false);
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    // Update body class
    if (newTheme) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.body.classList.add("light");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSettings = () => {
    navigate("/setting");
  };

  return (
    <nav className="whisper-navbar">
      <div className="nav-container">
        {/* Left Section: Logo and Navigation */}
        <div className="nav-left">
          {/* Logo */}
          <Link to={"/home"} className="logo-link">
            <div className="logo">
              <div className="logo-icon">
                <span>W</span>
              </div>
              <h1 className="logo-text">Whispers</h1>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="nav-links">
            {user && (
              <>
                <Link
                  onClick={() => setShowCreateModal(true)}
                  className="nav-link"
                >
                  <svg
                    className="nav-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  <span>Create Post</span>
                </Link>
                <Link to="/myposts" className="nav-link">
                  <svg
                    className="nav-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6c0-1.105-1.343-2-3-2H5a2 2 0 00-2 2v12a2 2 0 002 2h4c1.657 0 3-.895 3-2m0-12c0-1.105 1.343-2 3-2h4a2 2 0 012 2v12a2 2 0 01-2 2h-4c-1.657 0-3-.895-3-2m0-12v12"
                    />
                  </svg>

                  <span>My Posts</span>
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <div className="search-icon">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                height="24"
                width="24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search Whisperer"
              className="search-input"
            />
          </div>
        </div>

        {/* Right Section: User Menu */}
        <div className="nav-right">
          {/* Theme Toggle Button */}
          <button
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              // Sun icon for light mode
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                height="24"
                width="24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                height="24"
                width="24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
            )}
          </button>

          {user ? (
            <>
              {/* Notification and Message Icons */}
              <button className="icon-btn">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </button>
              <button className="icon-btn">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
              </button>

              {/* User Menu */}
              <div className="user-menu" ref={dropdownRef}>
                <div
                  className="user-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="user-avatar">
                    <span>{user.alias.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="user-info">
                    <div className="username">{user.alias}</div>
                  </div>
                  <svg
                    className="dropdown-arrow"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    height="24"
                    width="24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-user-info">
                      <div className="user-avatar">
                        <span>{user.alias.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="username">{user.alias}</div>
                      </div>
                    </div>

                    {/* Show extra nav links only on mobile */}
                    {isMobile && (
                      <>
                        <Link
                          className="dropdown-item"
                          onClick={() => {
                            setDropdownOpen(false);
                            setShowCreateModal(true);
                          }}
                        >
                          <svg
                            className="nav-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            height="24"
                            width="24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4v16m8-8H4"
                            ></path>
                          </svg>
                          Create Post
                        </Link>

                        <Link
                          to="/myposts"
                          className="dropdown-item"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <svg
                            className="nav-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            height="24"
                            width="24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6c0-1.105-1.343-2-3-2H5a2 2 0 00-2 2v12a2 2 0 002 2h4c1.657 0 3-.895 3-2m0-12c0-1.105 1.343-2 3-2h4a2 2 0 012 2v12a2 2 0 01-2 2h-4c-1.657 0-3-.895-3-2m0-12v12"
                            />
                          </svg>
                          My Posts
                        </Link>

                        <div className="dropdown-divider"></div>
                      </>
                    )}

                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg
                        className="dropdown-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      My Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg
                        className="dropdown-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                      Settings
                    </Link>

                    <div className="dropdown-divider"></div>

                    <button onClick={onLogout} className="dropdown-item">
                      <svg
                        className="dropdown-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                Log In
              </Link>
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
      {showCreateModal && (
        <CreatePost onClose={() => setShowCreateModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;
