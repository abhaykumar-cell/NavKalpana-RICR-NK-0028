import axios from "axios";

const API_URL = "http://localhost:8080/api/batch"; 

const axiosInstance = axios.create({
  baseURL: API_URL,
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const createBatch = async (batchData) => {
  const response = await axiosInstance.post("", batchData);
  return response.data;
};


export const getAllBatches = async () => {
  const response = await axiosInstance.get("");
   console.log(response.data);
  return response.data;
 
  
};

export const getBatchById = async (id) => {
  const response = await axiosInstance.get(`/${id}`);
  return response.data;
};


export const updateBatch = async (id, batchData) => {
  const response = await axiosInstance.put(`/${id}`, batchData);
  return response.data;
};

export const deleteBatch = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data;
};