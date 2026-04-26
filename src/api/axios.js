import axios from "axios";

const API = axios.create({
  baseURL: "https://staggerbackend.onrender.com",
});

// Add interceptor to include the token in every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;