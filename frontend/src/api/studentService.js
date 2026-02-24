import axios from "./axiosInstance";

// ===============================
// GET ALL STUDENTS
// ===============================
export const getStudents = async () => {
  const res = await axios.get("/api/students");
  return res.data?.data || [];
};

// ===============================
// GET SUMMARY
// ===============================
export const getSummary = async () => {
  const res = await axios.get("/api/students/summary");
  return res.data;
};

// ===============================
// GET STUDENT DETAIL
// ===============================
export const getStudentDetail = async (id) => {
  const res = await axios.get(`/api/students/${id}/detail`);
  return res.data;
};

// ===============================
// SEARCH STUDENTS
// ===============================
export const searchStudents = async (q) => {
  const res = await axios.get(`/api/students/search?q=${q}`);
  return res.data?.data || [];
};

// ===============================
// FILTER BY COURSE
// ===============================
export const filterByCourse = async (course) => {
  const res = await axios.get(`/api/students/course/${course}`);
  return res.data?.data || [];
};

// ===============================
// 🔥 GET STUDENTS BY BATCH (FIX)
// ===============================
export const getStudentsByBatch = async (batchId) => {
  const res = await axios.get(`/api/students/batch/${batchId}`);
  return res.data?.data || [];
};