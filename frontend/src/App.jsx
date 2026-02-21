import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import AssessmentManagement from "./pages/AssessmentManagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="assessment-management" element={<AssessmentManagement />} />
      </Route>
    </Routes>
  );
}

export default App;