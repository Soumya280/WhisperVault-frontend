import { useState, useEffect } from "react";
import API from "../api/api";
import "../styles/CreatePost.css";

const EditPost = ({ onClose, id }) => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch post details
  const fetchPost = async () => {
    try {
      const res = await API.getAllPosts();
      const post = res.data.find((p) => p.messageId === parseInt(id));
      if (!post) {
        setError("Post not found.");
        setLoading(false);
        return;
      }
      setFormData({ title: post.title, content: post.content });
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch post.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.editPost({ messageId: parseInt(id), ...formData });
      if (onClose) onClose(); // close popup
    } catch (err) {
      setError("Failed to update post.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit Post</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        {loading ? (
          <p>Loading post...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <form onSubmit={onSubmit} className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={onChange}
                rows="6"
                required
              ></textarea>
            </div>

            {error && <div className="error-box">{error}</div>}

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPost;
