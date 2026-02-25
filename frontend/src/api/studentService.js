import axiosInstance from "./axiosInstance";

// 🔹 Get All Students
export const getStudents = async () => {
  const res = await axiosInstance.get("/api/students");
  return res.data?.data ?? res.data;
};

// 🔹 Get Students By Batch
export const getStudentsByBatch = async (batchId) => {
  const res = await axiosInstance.get(
    `/api/students/batch/${batchId}`
  );
  return res.data?.data ?? res.data;
};

// 🔹 Search Students (by name / email / enrollment)
export const searchStudents = async (q) => {
  const res = await axiosInstance.get(
    "/api/students/search",
    {
      params: { q },   // better than string concat
    }
  );
  return res.data?.data ?? res.data;
};

// 🔹 Dashboard Summary
export const getSummary = async () => {
  const res = await axiosInstance.get(
    "/api/students/summary"
  );
  return res.data?.data ?? res.data;
};

// 🔹 Get Single Student Detail
export const getStudentDetail = async (id) => {
  const res = await axiosInstance.get(
    `/api/students/${id}`
  );
  return res.data?.data ?? res.data;
};