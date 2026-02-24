import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Batch from "./components/batch/BathPage";
import AssessmentManagement from "./pages/AssessmentManagement";
import StudentManagement from "./pages/StudentManagement";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import { ToastContainer } from "react-toastify";

import BatchListPage from "./pages/BatchListPage";
import CourseListPage from "./pages/CourseListPage";
import BatchStudentsPage from "./pages/BatchStudentsPage";
import CourseStudentsPage from "./pages/CourseStudentsPage";
import SupportPage from "../src/components/batch/componets/support/SupportPage";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* ===============================
              PUBLIC ROUTE
        =============================== */}
        <Route path="/" element={<Login />} />

        {/* ===============================
              PROTECTED ROUTES
        =============================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ⭐ STUDENT MANAGEMENT LANDING */}
        <Route
          path="/student-management"
          element={
            <ProtectedRoute>
              <StudentManagement />
            </ProtectedRoute>
          }
        />
<Route
  path="/support"
  element={
    <ProtectedRoute>
      <SupportPage />
    </ProtectedRoute>
  }
/>
        {/* ⭐ BATCH LIST */}
        <Route
          path="/student-management/batches"
          element={
            <ProtectedRoute>
              <BatchListPage />
            </ProtectedRoute>
          }
        />

        {/* ⭐ BATCH STUDENTS */}
        <Route
          path="/batch/:id/students"
          element={
            <ProtectedRoute>
              <BatchStudentsPage />
            </ProtectedRoute>
          }
        />

        {/* ⭐ COURSE LIST */}
        <Route
          path="/student-management/courses"
          element={
            <ProtectedRoute>
              <CourseListPage />
            </ProtectedRoute>
          }
        />

        {/* ⭐ COURSE STUDENTS (NEW ROUTE) */}
        <Route
          path="/course/:id/students"
          element={
            <ProtectedRoute>
              <CourseStudentsPage />
            </ProtectedRoute>
          }
        />

        {/* ⭐ OTHER MODULES */}
        <Route
          path="/batches"
          element={
            <ProtectedRoute>
              <Batch />
            </ProtectedRoute>
          }
        />

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