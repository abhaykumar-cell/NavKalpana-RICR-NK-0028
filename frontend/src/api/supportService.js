import axiosInstance from "./axiosInstance";

/* ==========================
        GET SUPPORT LIST
========================== */
export const getSupports = async (filters = {}) => {
  const response = await axiosInstance.get("/api/support", {
    params: filters,
  });
  return response.data;
};

/* ==========================
        REPLY SUPPORT
========================== */
export const replySupport = async (id, data) => {
  const response = await axiosInstance.post(
    `/api/support/${id}/reply`,
    data
  );
  return response.data;
};

/* ==========================
        MARK RESOLVED
========================== */
export const markResolved = async (id) => {
  const response = await axiosInstance.put(
    `/api/support/${id}/resolve`
  );
  return response.data;
};

/* ==========================
        SCHEDULE BACKUP
========================== */
export const scheduleBackup = async (id, data) => {
  const response = await axiosInstance.post(
    `/api/support/${id}/schedule-backup`,
    data
  );
  return response.data;
};

/* ==========================
        CREATE BULK SUPPORTS
========================== */
export const createBulkSupports = async (data) => {
  const response = await axiosInstance.post(
    "/api/support/bulk",
    data
  );
  return response.data;
};

/* ==========================
        DELETE SUPPORT
========================== */
export const deleteSupport = async (id) => {
  const response = await axiosInstance.delete(
    `/api/support/${id}`
  );
  return response.data;
};