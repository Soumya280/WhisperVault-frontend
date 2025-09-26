import axios from "axios";

const API = axios.create({
  baseURL: "https://whispervault-backend-5g7q.onrender.com",
  withCredentials: true,
});

// CSRF Token handling for Chromium browsers
API.interceptors.request.use((config) => {
  if (config.method !== "get" && config.method !== "GET") {
    // Get CSRF token from cookie
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
  }
  return config;
});

// Auth endpoints
API.signup = (data) => API.post("/signup", data);
API.login = (data) => API.post("/login", data);
API.getUser = () => API.get("/getuser");

// Posts endpoints
API.getAllPosts = () => API.get("/");
API.getMyPosts = () => API.get("/myMessages");
API.createPost = (data) => API.post("/createPost", data);
API.editPost = (data) => API.put("/editPost", data);
API.deletePost = (id) => API.delete(`/deleteMessage?messageId=${id}`);
API.upvote = (id) => API.post(`/upvote?messageId=${id}`);

export default API;
