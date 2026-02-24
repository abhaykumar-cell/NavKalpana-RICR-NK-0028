import api from "./api";

const attendanceService = {

  // Load students of batch
  loadRegister: async (batchId) => {
    const res = await api.get(`/api/attendance/register/${batchId}`); 
    console.log(batchId+"batznknkfds ");
    
    console.log("res in service"+res);
    
    return res.data?.data || [];
    
    
  },

  // Mark bulk attendance
  markBulkAttendance: async (payload) => {
    const res = await api.post(`/api/attendance/mark-bulk`, payload);
    return res.data?.data || [];
  },

  // Edit single attendance
  editAttendance: async (attendanceId, status, remark) => {
    const res = await api.put(
      `/api/attendance/edit/${attendanceId}`,
      null,
      { params: { status, remark } }
    );
    return res.data?.data;
  },

  // Get attendance by batch + date
  getAttendanceByBatchAndDate: async (batchId, date) => {
    const res = await api.get(
      `/api/attendance/batch/${batchId}/date`,
      { params: { date } }
    );
    return res.data?.data || [];
  }

};

export default attendanceService;