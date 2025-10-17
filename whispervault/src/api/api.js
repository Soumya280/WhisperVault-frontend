import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // send cookies for session auth
});

// Auth
API.signup = (data) => API.post("/signup", data);
API.login = (data) => API.post("/login", data);
API.logout = () => API.post("/logout");
API.getUser = () => API.get("/getuser");

// Posts
API.getAllPosts = () => API.get("/");
API.getMyPosts = () => API.get("/myMessages");
API.createPost = (data) => API.post("/createPost", data);
API.editPost = (data) => API.put("/editPost", data);
API.deletePost = (id) => API.delete(`/deleteMessage?messageId=${id}`);
API.upvote = (id) => API.post(`/upvote?messageId=${id}`);

export default API;
