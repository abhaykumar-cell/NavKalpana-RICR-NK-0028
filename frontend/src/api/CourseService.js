import axios from "./axiosInstance";


export const createCourse = async (courseData) => {
  const res = await axios.post("/api/course", courseData);
  return res.data?.data;
};

export const getAllCourses = async () => {
  const res = await axios.get("/api/course");
  
  return res.data?.data ?? [];
};


export const getCourseById = async (id) => {
  const res = await axios.get(`/api/course/${id}`);
  return res.data?.data;
};

export const getStudentsByCourse = async (courseId) => {
  const res = await axios.get(`/api/course/${courseId}/students`);
  console.log("Method Called ! ");
  
  console.log(res.data);
  
  return res.data?.data ?? [];
};


export const updateCourse = async (id, courseData) => {
  const res = await axios.put(`/api/course/${id}`, courseData);
  return res.data?.data;
};

export const deleteCourse = async (id) => {
  const res = await axios.delete(`/api/course/${id}`);
  return res.data;
};