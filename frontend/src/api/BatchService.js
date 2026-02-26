import axios from "axios";

const API_URL = "https://navkalpana-backend-production.up.railway.app/api/batch";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach JWT Token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==============================
// CREATE BATCH
// ==============================
export const createBatch = async (batchData) => {
  const response = await axiosInstance.post("", batchData);
  return response.data.data; // 🔥 unwrap ApiResponse
};

// ==============================
// GET ALL BATCHES
// ==============================
export const getAllBatches = async () => {
  const response = await axiosInstance.get("");
  return response.data.data; // 🔥 important
};

// ==============================
// GET BATCH BY ID
// ==============================
export const getBatchById = async (id) => {
  const response = await axiosInstance.get(`/${id}`);
  return response.data.data;
};

// ==============================
// UPDATE BATCH
// ==============================
export const updateBatch = async (id, batchData) => {
  const response = await axiosInstance.put(`/${id}`, batchData);
  return response.data.data;
};

// ==============================
// DELETE BATCH
// ==============================
export const deleteBatch = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data.data;
};