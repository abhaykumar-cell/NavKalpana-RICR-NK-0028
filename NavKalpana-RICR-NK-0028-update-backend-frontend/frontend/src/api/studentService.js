import axios from "./axiosInstance";


export const getStudents = async () => {
  const res = await axios.get("/api/students");
  return res.data;
};


export const getStudentsByBatch = async (batchId) => {
  const res = await axios.get(`/api/students/batch/${batchId}`);
  return res.data;
};


export const searchStudents = async (q) => {
  const res = await axios.get(`/api/students/search?q=${q}`);
  return res.data;
};

export const getSummary = async () => {
  const res = await axios.get("/api/students/summary");
  return res.data;
};


export const getStudentDetail = async (id) => {
  const res = await axios.get(`/api/students/${id}`);
  return res.data;
};