import api from "./api";

const attendanceService = {

  // =========================================
  // 1️⃣ LOAD REGISTER (All Students of Batch)
  // GET /api/attendance/register/{batchId}
  // =========================================
  loadRegister: async (batchId) => {
    try {
      const res = await api.get(`/api/attendance/register/${batchId}`);
      return res.data?.data || [];
    } catch (error) {
      console.error("Error loading register:", error);
      throw error;
    }
  },

  // =========================================
  // 2️⃣ MARK BULK ATTENDANCE
  // POST /api/attendance/mark-bulk
  // =========================================
  markBulkAttendance: async (payload) => {
    try {
      const res = await api.post(`/api/attendance/mark-bulk`, payload);
      return res.data?.data || [];
    } catch (error) {
      console.error("Error marking bulk attendance:", error);
      throw error;
    }
  },

  // =========================================
  // 3️⃣ EDIT ATTENDANCE
  // PUT /api/attendance/edit/{attendanceId}
  // =========================================
  editAttendance: async (attendanceId, status, remark) => {
    try {
      const res = await api.put(
        `/api/attendance/edit/${attendanceId}`,
        null,
        {
          params: {
            status,
            remark
          }
        }
      );
      return res.data?.data;
    } catch (error) {
      console.error("Error editing attendance:", error);
      throw error;
    }
  },

  // =========================================
  // 4️⃣ VIEW ATTENDANCE BY BATCH
  // GET /api/attendance/batch/{batchId}
  // =========================================
  getAttendanceByBatch: async (batchId) => {
    try {
      const res = await api.get(`/api/attendance/batch/${batchId}`);
      return res.data?.data || [];
    } catch (error) {
      console.error("Error fetching batch attendance:", error);
      throw error;
    }
  },

  // =========================================
  // 5️⃣ VIEW ATTENDANCE BY STUDENT
  // GET /api/attendance/student/{studentId}
  // =========================================
  getAttendanceByStudent: async (studentId) => {
    try {
      const res = await api.get(`/api/attendance/student/${studentId}`);
      return res.data?.data || [];
    } catch (error) {
      console.error("Error fetching student attendance:", error);
      throw error;
    }
  },

  // =========================================
  // 6️⃣ VIEW ATTENDANCE BY BATCH + DATE
  // GET /api/attendance/batch/{batchId}/date?date=yyyy-MM-dd
  // =========================================
  getAttendanceByBatchAndDate: async (batchId, date) => {
    try {
      const res = await api.get(
        `/api/attendance/batch/${batchId}/date`,
        {
          params: { date }
        }
      );
      return res.data?.data || [];
    } catch (error) {
      console.error("Error fetching attendance by date:", error);
      throw error;
    }
  }

};

export default attendanceService;