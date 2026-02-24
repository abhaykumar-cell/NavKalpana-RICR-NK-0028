import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/Dashboard";
import Batch from "./components/batch/BathPage";
import AssessmentManagement from "./pages/AssessmentManagement";
import StudentManagement from "./pages/StudentManagement";
import AttendanceManagementPage from "./components/Attendance/AttendanceManagementPage";

import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoutes";

import BatchListPage from "./pages/BatchListPage";
import CourseListPage from "./pages/CourseListPage";
import BatchStudentsPage from "./pages/BatchStudentsPage";
import CourseStudentsPage from "./pages/CourseStudentsPage";
import SupportPage from "./components/batch/componets/support/SupportPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        {/* ================= PUBLIC ROUTE ================= */}
        <Route path="/" element={<Login />} />

        {/* ================= PROTECTED ROUTES ================= */}

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Student Management Landing */}
        <Route
          path="/student-management"
          element={
            <ProtectedRoute>
              <StudentManagement />
            </ProtectedRoute>
          }
        />

        {/* Support */}
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <SupportPage />
            </ProtectedRoute>
          }
        />

        {/* Batch List */}
        <Route
          path="/student-management/batches"
          element={
            <ProtectedRoute>
              <BatchListPage />
            </ProtectedRoute>
          }
        />

        {/* Batch Students */}
        <Route
          path="/batch/:id/students"
          element={
            <ProtectedRoute>
              <BatchStudentsPage />
            </ProtectedRoute>
          }
        />

        {/* Course List */}
        <Route
          path="/student-management/courses"
          element={
            <ProtectedRoute>
              <CourseListPage />
            </ProtectedRoute>
          }
        />

        {/* Course Students */}
        <Route
          path="/course/:id/students"
          element={
            <ProtectedRoute>
              <CourseStudentsPage />
            </ProtectedRoute>
          }
        />

        {/* Batch Management */}
        <Route
          path="/batches"
          element={
            <ProtectedRoute>
              <Batch />
            </ProtectedRoute>
          }
        />

        {/* Attendance (Smart Route by Batch) */}
        <Route
          path="/attendance/:batchId"
          element={
            <ProtectedRoute>
              <AttendanceManagementPage />
            </ProtectedRoute>
          }
        />

        {/* Assessment */}
        <Route
          path="/assessment-management"
          element={
            <ProtectedRoute>
              <AssessmentManagement />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;