import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditPost from "../modal/EditPost";
import API from "../api/api";
import "../styles/MyPosts.css";
import CreatePost from "../modal/CreatePost";

const MyPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await API.getMyPosts();
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch your posts.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.deletePost(id);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const timeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  // Calculate statistics
  const postCount = posts.length;
  const totalUpvotes = posts.reduce(
    (sum, post) => sum + (post.upvotes || 0),
    0
  );
  const editedCount = posts.filter((post) => post.edited).length;

  if (Loading)
    return (
      <div className="my-container">
        <div className="my-content">
          <main className="my-main">
            <div className="my-loading-state">
              <div className="my-loading-spinner"></div>
              <p>Loading your posts...</p>
            </div>
          </main>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="my-container">
        <div className="my-content">
          <main className="my-main">
            <div className="my-error-state">
              <div className="my-error-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p>{error}</p>
              <button onClick={fetchPosts} className="my-retry-button">
                Try Again
              </button>
            </div>
          </main>
        </div>
      </div>
    );

  return (
    <div className="my-container">
      {/* Create Post Modal */}
      {showCreateModal && (
        <CreatePost onClose={() => setShowCreateModal(false)} />
      )}

      <div className="my-content">
        {/* Main Content */}
        <main className="my-main">
          {/* Page Header */}
          <div className="my-page-header">
            <div className="my-header-content">
              <div>
                <h1>My Posts</h1>
                <p>Manage and edit your published posts</p>
              </div>
              <div className="my-post-count">
                <div className="my-count-number">{postCount}</div>
                <div className="my-count-label">Total Posts</div>
              </div>
            </div>
          </div>

          {/* Posts Container */}
          <div className="my-posts-container">
            {posts.length === 0 ? (
              <div className="my-empty-state">
                <div className="my-empty-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3>No posts yet</h3>
                <p>
                  You haven't created any posts yet. Share your thoughts with
                  the community!
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="my-create-first-button"
                >
                  Create Your First Post
                </button>
              </div>
            ) : (
              <div className="my-posts-list">
                {posts.map((post) => (
                  <article key={post.messageId} className="my-post-card">
                    <div className="my-post-body">
                      <div className="my-post-header">
                        <div className="my-post-info">
                          <h3 className="my-post-title">{post.title}</h3>
                          <div className="my-post-meta">
                            <span>{timeAgo(post.createdAt)}</span>
                            {post.edited && (
                              <span className="my-post-edited">• edited</span>
                            )}
                            <span>• {post.upvotes || 0} upvotes</span>
                          </div>
                        </div>
                        <div id="my-post-actions">
                          <button
                            onClick={() => setEditingPostId(post.messageId)}
                            className="my-edit-button"
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
                              />
                            </svg>
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(post.messageId)}
                            className="my-delete-button"
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
                              />
                            </svg>
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>

                      <p className="my-post-content">{post.content}</p>

                      <div className="my-post-footer">
                        <div className="my-post-stats">
                          <div className="my-stat-item">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{post.upvotes || 0}</span>
                          </div>
                          <div className="my-stat-item">
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
                              />
                            </svg>
                            <span>Comments</span>
                          </div>
                        </div>
                        <div className="my-post-id">ID: {post.messageId}</div>
                      </div>
                    </div>
                    <div id="my-post-actions-footer">
                      <button
                        onClick={() => setEditingPostId(post.messageId)}
                        className="my-edit-button"
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
                          />
                        </svg>

                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(post.messageId)}
                        className="my-delete-button"
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
                          />
                        </svg>

                        <span>Delete</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="my-sidebar">
          <div className="my-sidebar-card">
            <h3>Quick Stats</h3>
            <div className="my-stats-list">
              <div className="my-stat-row">
                <span>Total Posts</span>
                <span className="my-stat-value">{postCount}</span>
              </div>
              <div className="my-stat-row">
                <span>Total Upvotes</span>
                <span className="my-stat-value">{totalUpvotes}</span>
              </div>
              <div className="my-stat-row">
                <span>Edited Posts</span>
                <span className="my-stat-value">{editedCount}</span>
              </div>
            </div>
          </div>

          <div className="my-sidebar-card">
            <h3>Quick Actions</h3>
            <div className="my-action-buttons">
              <button
                onClick={() => setShowCreateModal(true)}
                className="my-action-button my-primary"
              >
                Create New Post
              </button>
              <button
                onClick={() => navigate("/")}
                className="my-action-button my-secondary"
              >
                View All Posts
              </button>
            </div>
          </div>
        </aside>
      </div>
      {editingPostId && (
        <EditPost id={editingPostId} onClose={() => setEditingPostId(null)} />
      )}
    </div>
  );
};

export default MyPosts;
