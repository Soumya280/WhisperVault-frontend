import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/CreatePost.css";

const CreatePost = ({ onClose }) => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.createPost(formData);
      navigate("/");
      if (onClose) onClose();
    } catch (err) {
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <div>
            <p className="modal-subtitle">
              Posting as{" "}
              <span className="username">{user?.alias || "Anonymous"}</span>
            </p>
            <h2 className="modal-title">Create New Post</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="An interesting title..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={onChange}
              rows="6"
              placeholder="What are your thoughts?"
              required
            />
          </div>

          {error && <div className="error-box">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
