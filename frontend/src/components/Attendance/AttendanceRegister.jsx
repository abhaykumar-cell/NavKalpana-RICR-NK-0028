import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Chip,
  Divider,
  TextField
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams, useNavigate } from "react-router-dom";
import attendanceService from "../../api/attendanceService";

const AttendanceRegisterPage = () => {

  const { batchId } = useParams();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [classRemark, setClassRemark] = useState("");
  const [rows, setRows] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // Load Students
  // ===============================
  useEffect(() => {
    if (batchId) {
      loadRegister();
    }
  }, [batchId]);

  const loadRegister = async () => {
    try {
      const data = await attendanceService.loadStudentsByBatch(batchId);

      const formatted = data.map((student) => ({
        id: student.id,
        studentId: student.id,
        enrollmentId: student.enrollmentId,
        name: student.name,
        status: ""
      }));

      setRows(formatted);
    } catch {
      setError("Failed to load students");
    }
  };

  // ===============================
  // Status Handling
  // ===============================
  const handleStatusChange = (id, value) => {
    setRows(prev =>
      prev.map(row =>
        row.id === id ? { ...row, status: value } : row
      )
    );
  };

  const convertStatus = (short) => {
    if (short === "P") return "PRESENT";
    if (short === "L") return "LATE";
    return "ABSENT";
  };

  // ===============================
  // Submit Attendance
  // ===============================
  const handleSubmit = async () => {
    try {
      const payload = {
        batchId,
        date,
        classRemark,
        attendanceList: rows.map((row) => ({
          studentId: row.studentId,
          status: row.status ? convertStatus(row.status) : "ABSENT"
        }))
      };

      await attendanceService.markBulkAttendance(payload);

      setSuccess(true);
      setError("");

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong";

      setError(message);
      setSuccess(false);
    }
  };

  // ===============================
  // Summary
  // ===============================
  const summary = useMemo(() => {
    return {
      present: rows.filter(r => r.status === "P").length,
      late: rows.filter(r => r.status === "L").length,
      absent: rows.filter(r => !r.status || r.status === "A").length
    };
  }, [rows]);

  // ===============================
  // Columns
  // ===============================
  const columns = [
    {
      field: "enrollmentId",
      headerName: "Enrollment",
      width: 150
    },
    {
      field: "name",
      headerName: "Student Name",
      flex: 1
    },
    {
      field: "status",
      headerName: "P / A / L",
      flex: 1,
      renderCell: (params) => (
        <ToggleButtonGroup
          value={params.row.status}
          exclusive
          size="small"
          onChange={(e, newValue) =>
            handleStatusChange(params.row.id, newValue)
          }
        >
          <ToggleButton value="P" color="success">P</ToggleButton>
          <ToggleButton value="A" color="error">A</ToggleButton>
          <ToggleButton value="L" color="warning">L</ToggleButton>
        </ToggleButtonGroup>
      )
    }
  ];

  return (
    <Box p={4} sx={{ background: "#f8fafc", minHeight: "100vh" }}>

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Attendance Register
        </Typography>

        <Button variant="outlined" onClick={() => navigate("/batches")}>
          Back
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} mb={3}>
        <Chip label={`Present: ${summary.present}`} color="success" />
        <Chip label={`Absent: ${summary.absent}`} color="error" />
        <Chip label={`Late: ${summary.late}`} color="warning" />
      </Stack>

      <Paper sx={{ p: 3, borderRadius: 4 }}>

        <Stack spacing={3} mb={3}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Today's Class Topic"
            value={classRemark}
            onChange={(e) => setClassRemark(e.target.value)}
            fullWidth
          />
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <div style={{ height: 520 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </div>

        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Submit Attendance
        </Button>

        {/* 🔥 Separate Edit Button */}
        <Button
          variant="outlined"
          size="large"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate(`/attendance/edit/${batchId}`)}
        >
          Edit Existing Attendance
        </Button>

      </Paper>

      {/* Success */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">
          Attendance Saved Successfully
        </Alert>
      </Snackbar>

      {/* Error */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError("")}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default AttendanceRegisterPage;