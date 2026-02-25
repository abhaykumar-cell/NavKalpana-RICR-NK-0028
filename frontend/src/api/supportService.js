import axiosInstance from "./axiosInstance";


export const getSupports = async (filters = {}) => {
  const response = await axiosInstance.get("/api/support", {
    params: filters,
  });
  return response.data;
};


export const replySupport = async (id, data) => {
  const response = await axiosInstance.post(`
    /api/support/${id}/reply`,
    data
  );
  return response.data;
};


export const markResolved = async (id) => {
  const response = await axiosInstance.put(`
    /api/support/${id}/resolve`
  );
  return response.data;
};


export const scheduleBackup = async (id, data) => {
  const response = await axiosInstance.post(`
    /api/support/${id}/schedule-backup`,
    data
  );
  return response.data;
};

export const createBulkSupports = async (data) => {
  const response = await axiosInstance.post(
    "/api/support/bulk",
    data
  );
  return response.data;
  
};
export const deleteSupport = async (id) => {
  const res = await axiosInstance.delete(`/api/support/${id}`);
  return res.data;
};