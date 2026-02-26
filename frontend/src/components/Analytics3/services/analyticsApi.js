import API from "../../../api/api"

export const fetchAnalytics = (batchId, courseId) =>
  API.get("api/analytics", {
    params: { batchId, courseId }
  });

export const fetchLeaderboard = (batchId, courseId, sortBy = "ogi") =>
  API.get("api/leaderboard", {
    params: { batchId, courseId, sortBy }
  });