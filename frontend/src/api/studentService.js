import axios from "./axiosInstance";


export const getStudents = async () => {
  const res = await axios.get("/api/students");
  return res.data;
};


export const getSummary = async () => {
  const res = await axios.get("/api/students/summary");
  return res.data;
};


export const getStudentDetail = async (id) => {
  const res = await axios.get(`/api/students/${id}/detail`);
  return res.data;
};


export const searchStudents = async (q) => {
  const res = await axios.get(`/api/students/search?q=${q}`);
  return res.data;
};

export const filterByCourse = async (course) => {
  const res = await axios.get(`/api/students/course/${course}`);
  return res.data;
};