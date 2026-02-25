import API from "./api";

const assessmentService = {

  /* =============================
        COURSE ( /api/course )
  ============================== */

  getAllCourses: async () => {
    const res = await API.get("/api/course");
    return res.data;   // full ApiResponse
  },

  getCourseById: async (id) => {
    const res = await API.get(`/api/course/${id}`);
    return res.data;
  },

  createCourse: async (data) => {
    const res = await API.post("/api/course", data);
    return res.data;
  },

  updateCourse: async (id, data) => {
    const res = await API.put(`/api/course/${id}`, data);
    return res.data;
  },

  deleteCourse: async (id) => {
    const res = await API.delete(`/api/course/${id}`);
    return res.data;
  },

  getStudentsByCourse: async (id) => {
    const res = await API.get(`/api/course/${id}/students`);
    return res.data;
  },


  /* =============================
        LESSON
        (Assuming /api/lessons)
  ============================== */

  getLessonsByCourse: async (courseId) => {
    const res = await API.get(`/api/lessons/course/${courseId}`);
    return res.data;
  },


  /* =============================
        ASSIGNMENT
  ============================== */

  getAssignmentsByLesson: async (lessonId) => {
    const res = await API.get(`/api/assignments/lesson/${lessonId}`);
    return res.data;
  },

  createAssignment: async (data) => {
    const res = await API.post("/api/assignments", data);
    return res.data;
  },

  updateAssignment: async (id, data) => {
    const res = await API.put(`/api/assignments/${id}`, data);
    return res.data;
  },

  deleteAssignment: async (id) => {
    const res = await API.delete(`/api/assignments/${id}`);
    return res.data;
  },

};

export default assessmentService;