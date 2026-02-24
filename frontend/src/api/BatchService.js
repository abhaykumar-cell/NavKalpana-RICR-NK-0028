import axios from "axios";

const API_URL = "http://localhost:8080/api/batch"; 
// ⚠️ Agar Railway pe deployed hai to yaha production URL daalna

// Axios instance (JWT support ke liye ready)
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// 🔐 Agar JWT token use kar rahe ho
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --------------------
// CREATE BATCH
// --------------------
export const createBatch = async (batchData) => {
  const response = await axiosInstance.post("", batchData);
  return response.data;
};

// --------------------
// GET ALL BATCHES
// --------------------
export const getAllBatches = async () => {
  const response = await axiosInstance.get("");

  
  return response.data?.data || [];
};

// --------------------
// GET BATCH BY ID
// --------------------
export const getBatchById = async (id) => {
  const response = await axiosInstance.get(`/${id}`);
  return response.data;
};

// --------------------
// UPDATE BATCH
// --------------------
export const updateBatch = async (id, batchData) => {
  const response = await axiosInstance.put(`/${id}`, batchData);
  return response.data;
};

// --------------------
// DELETE BATCH
// --------------------
export const deleteBatch = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data;
};