import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your Backend URL
});

// Middleware: Attach Token to every request automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Check if token exists in storage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
