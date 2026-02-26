import API from "./api";

// ===============================
// STUDENT ANALYTICS
// ===============================
export const getStudentAnalytics = async (studentId) => {
  const { data } = await API.get(`/analytics/student/${studentId}`);
  return data;
};


// ===============================
// BATCH ANALYTICS
// ===============================
export const getBatchAnalytics = async (batchId) => {
  const { data } = await API.get(`/analytics/batch/${batchId}`);
  return data;
};

// ===============================
// LEADERBOARD (COURSE WISE)
// ===============================
export const getLeaderboard = async (courseId) => {
  const { data } = await API.get(`/leaderboard?courseId=${courseId}`);
  return data;
};

export const getClassAnalytics = async (batchId, courseId) => {
  const params = {};

  if (batchId) params.batchId = batchId;
  if (courseId) params.courseId = courseId;

  const response = await axios.get(API, { params });
  return response.data;
};
// ===============================
// BATCH LEADERBOARD
// ===============================
export const getBatchLeaderboard = async (batchId) => {
  const { data } = await API.get(`/leaderboard/batch/${batchId}`);
  return data;
};