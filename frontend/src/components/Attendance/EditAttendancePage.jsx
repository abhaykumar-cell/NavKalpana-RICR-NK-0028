import React, { useState, useEffect } from "react";
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
  TextField,
  Divider,
  CircularProgress
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams, useNavigate } from "react-router-dom";
import attendanceService from "../../api/attendanceService";
import MainLayout from "../layout/MainLayout";

const EditAttendancePage = () => {

  const { batchId } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [rows, setRows] = useState([]);
  const [mode, setMode] = useState(""); // 🔥 NEW
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const convertShort = (status) => {
    if (status === "PRESENT") return "P";
    if (status === "LATE") return "L";
    return "A";
  };

  const convertFull = (short) => {
    if (short === "P") return "PRESENT";
    if (short === "L") return "LATE";
    return "ABSENT";
  };

  useEffect(() => {
    if (batchId && date) {
      loadAttendance();
    }
  }, [batchId, date]);

  // ===============================
  // SMART LOAD
  // ===============================
  const loadAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const attendanceList =
        await attendanceService.getAttendanceByBatchAndDate(batchId, date);
        console.log("from Edit page : "+attendanceList);
        

      // 🔥 EDIT MODE
      if (attendanceList.length > 0) {

        const formatted = attendanceList.map((record) => ({
          id: record.id,
          studentId: record.studentId,
          studentName: record.studentName,
          status: convertShort(record.status),
          remark: record.remark || "",
          editable: record.editable
        }));

        setRows(formatted);
        setMode("edit");

      } else {

        // 🔥 MARK MODE
        const students =
          await attendanceService.loadRegister(batchId);

        const formatted = students.map(student => ({
          studentId: student.id,
          studentName: student.name,
          status: "P",
          remark: "",
          editable: true
        }));

        setRows(formatted);
        setMode("mark");
      }

    } catch (err) {
      setRows([]);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id, value) => {
    if (!value) return;
    setRows(prev =>
      prev.map(row =>
        (row.id || row.studentId) === id
          ? { ...row, status: value }
          : row
      )
    );
  };

  const handleRemarkChange = (id, value) => {
    setRows(prev =>
      prev.map(row =>
        (row.id || row.studentId) === id
          ? { ...row, remark: value }
          : row
      )
    );
  };

  // ===============================
  // SMART SUBMIT
  // ===============================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (mode === "mark") {

        const payload = {
          batchId: Number(batchId),
          date,
          attendanceList: rows.map(row => ({
            studentId: row.studentId,
            status: convertFull(row.status),
            remark: row.remark
          }))
        };

        await attendanceService.markBulkAttendance(payload);
        setSuccess("Attendance Marked Successfully");

      } else {

        await Promise.all(
          rows
            .filter(row => row.editable)
            .map(row =>
              attendanceService.editAttendance(
                row.id,
                convertFull(row.status),
                row.remark
              )
            )
        );

        setSuccess("Attendance Updated Successfully");
      }

      loadAttendance();

    } catch (err) {
      setError("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "studentName", headerName: "Student", flex: 1 },
    {
      field: "status",
      headerName: "P / A / L",
      flex: 1,
      renderCell: (params) => (
        <ToggleButtonGroup
          value={params.row.status}
          exclusive
          size="small"
          disabled={mode === "edit" && !params.row.editable}
          onChange={(e, newValue) =>
            handleStatusChange(
              params.row.id || params.row.studentId,
              newValue
            )
          }
        >
          <ToggleButton value="P" color="success">P</ToggleButton>
          <ToggleButton value="A" color="error">A</ToggleButton>
          <ToggleButton value="L" color="warning">L</ToggleButton>
        </ToggleButtonGroup>
      )
    },
    {
      field: "remark",
      headerName: "Remark",
      flex: 1,
      renderCell: (params) => (
        <TextField
          size="small"
          fullWidth
          disabled={mode === "edit" && !params.row.editable}
          value={params.row.remark}
          onChange={(e) =>
            handleRemarkChange(
              params.row.id || params.row.studentId,
              e.target.value
            )
          }
        />
      )
    }
  ];

  return (
    <MainLayout>
    <Box p={4} sx={{ background: "#f8fafc", minHeight: "100vh" }}>

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={700}>
          {mode === "mark" ? "Mark Attendance" : "Edit Attendance"}
        </Typography>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Stack>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          label="Select Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Paper>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div style={{ height: 500 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id || row.studentId}
              pageSizeOptions={[10]}
            />
          </div>

          {rows.length > 0 && (
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleSubmit}
            >
              {mode === "mark"
                ? "Mark Attendance"
                : "Update Attendance"}
            </Button>
          )}
        </>
      )}

      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess("")}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError("")}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>

    </Box>
    </MainLayout>
  );
};

export default EditAttendancePage;