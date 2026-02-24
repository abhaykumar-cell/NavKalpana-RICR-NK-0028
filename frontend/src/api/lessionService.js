import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const getLessonsByCourse = (courseId) => {
  return axios.get(`${API_BASE}/lessons/course/${courseId}`);
};