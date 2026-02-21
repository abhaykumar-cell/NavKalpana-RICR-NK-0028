import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Batch from "./components/batch/BathPage"
import Login from "./components/auth/Login"
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          
        />
        <Route path="/batches" element={
            <ProtectedRoute>
              <Batch />
            </ProtectedRoute>
          }
          
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;