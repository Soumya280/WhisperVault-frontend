import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import EditPost from "../modal/EditPost";
import "../styles/Home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("hot");
  const [editingPostId, setEditingPostId] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await API.getAllPosts();
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch posts.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Upvote a post
  const handleUpvote = async (id) => {
    try {
      await API.upvote(id);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete a post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.deletePost(id);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // Format time ago
  const timeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading)
    return (
      <div className="home-container">
        <div className="home-content">
          <main className="home-main">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading posts...</p>
            </div>
          </main>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="home-container">
        <div className="home-content">
          <main className="home-main">
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
              <p>{error}</p>
            </div>
          </main>
        </div>
      </div>
    );

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Main Feed */}
        <main className="home-main">
          {/* Header */}
          <div className="feed-header">
            <h2>All Posts</h2>
            <div className="sort-buttons">
              <button
                className={sortBy === "hot" ? "sort-active" : ""}
                onClick={() => setSortBy("hot")}
              >
                Hot
              </button>
              <button
                className={sortBy === "new" ? "sort-active" : ""}
                onClick={() => setSortBy("new")}
              >
                New
              </button>
              <button
                className={sortBy === "top" ? "sort-active" : ""}
                onClick={() => setSortBy("top")}
              >
                Top
              </button>
            </div>
          </div>

          {/* Posts Container */}
          <div className="posts-container">
            {posts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    ></path>
                  </svg>
                </div>
                <p>No posts yet. Be the first to share something!</p>
              </div>
            ) : (
              posts.map((post) => (
                <article key={post.messageId} className="post-card">
                  <div className="post-content">
                    {/* Vote Section */}
                    <div className="vote-section">
                      <button
                        className="vote-btn upvote-btn"
                        onClick={() => handleUpvote(post.messageId)}
                      >
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <span className="vote-count">{post.upvotes || 0}</span>
                      <button className="vote-btn downvote-btn">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="post-body">
                      <div className="post-meta">
                        <span className="post-author">{post.alias}</span>
                        <span className="post-time">
                          {timeAgo(post.createdAt)}
                        </span>
                        {post.edited && (
                          <span className="post-edited">• edited</span>
                        )}
                      </div>

                      <h3 className="post-title">{post.title}</h3>

                      <p className="post-text">{post.content}</p>

                      <div className="post-actions">
                        <button className="action-btn">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            ></path>
                          </svg>
                          <span>Comments</span>
                        </button>

                        <button className="action-btn">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                            ></path>
                          </svg>
                          <span>Share</span>
                        </button>

                        {user && user.id === post.userId && (
                          <>
                            <button
                              onClick={() => setEditingPostId(post.messageId)}
                              className="action-btn"
                            >
                              <svg
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                ></path>
                              </svg>
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleDelete(post.messageId)}
                              className="action-btn delete-btn"
                            >
                              <svg
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                              <span>Delete</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="home-sidebar">
          <div className="sidebar-card">
            <h3>About Community</h3>
            <p>
              Welcome to our community! Share your thoughts, engage with others,
              and discover interesting content.
            </p>
            <div className="community-stats">
              <div>
                <div className="stat-number">1.2k</div>
                <div className="stat-label">Members</div>
              </div>
              <div>
                <div className="stat-number">234</div>
                <div className="stat-label">Online</div>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Community Rules</h3>
            <ul className="rules-list">
              <li>1. Be respectful to others</li>
              <li>2. No spam or self-promotion</li>
              <li>3. Stay on topic</li>
              <li>4. Use appropriate flair</li>
            </ul>
          </div>

          {/* Demo Controls */}
          <div className="sidebar-card demo-card">
            <h3>Demo Controls</h3>
            <p className="demo-info">
              <strong>Current user:</strong>{" "}
              <span>
                {user ? `${user.alias} (ID: ${user.id})` : "Not logged in"}
              </span>
            </p>
          </div>
        </aside>
      </div>
      {editingPostId && (
        <EditPost id={editingPostId} onClose={() => setEditingPostId(null)} />
      )}
    </div>
  );
};

export default Home;
