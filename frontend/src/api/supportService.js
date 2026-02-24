import axiosInstance from "./axiosInstance";

/* ===============================
   GET ALL SUPPORT REQUESTS
   Example:
   getSupports()
   getSupports({ status: "PENDING" })
   getSupports({ courseId: 2 })
================================= */
export const getSupports = async (filters = {}) => {
  const response = await axiosInstance.get("/api/support", {
    params: filters,
  });
  return response.data;
};

/* ===============================
   REPLY TO SUPPORT REQUEST
================================= */
export const replySupport = async (id, data) => {
  const response = await axiosInstance.post(
    `/api/support/${id}/reply`,
    data
  );
  return response.data;
};

/* ===============================
   MARK AS RESOLVED
================================= */
export const markResolved = async (id) => {
  const response = await axiosInstance.put(
    `/api/support/${id}/resolve`
  );
  return response.data;
};

/* ===============================
   SCHEDULE BACKUP CLASS
================================= */
export const scheduleBackup = async (id, data) => {
  const response = await axiosInstance.post(
    `/api/support/${id}/schedule-backup`,
    data
  );
  return response.data;
};

/* ===============================
   BULK CREATE SUPPORTS (Optional)
================================= */
export const createBulkSupports = async (data) => {
  const response = await axiosInstance.post(
    "/api/support/bulk",
    data
  );
  return response.data;
};