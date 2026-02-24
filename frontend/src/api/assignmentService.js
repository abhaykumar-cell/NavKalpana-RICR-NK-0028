import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const createAssignment = (data) => {
  return axios.post(`${API_BASE}/assignments`, data);
};

export const updateAssignment = (id, data) => {
  return axios.put(`${API_BASE}/assignments/${id}`, data);
};

export const getAssignmentsByLesson = (lessonId) => {
  return axios.get(`${API_BASE}/assignments/lesson/${lessonId}`);
};

export const getSubmissions = (assignmentId) => {
  return axios.get(`${API_BASE}/submissions/assignment/${assignmentId}`);
};

export const evaluateSubmission = (submissionId, data) => {
  return axios.put(
    `${API_BASE}/submissions/${submissionId}/evaluate`,
    data
  );
};