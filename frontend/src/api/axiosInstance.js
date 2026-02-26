import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://navkalpana-backend-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");   // ⭐ FIXED

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;