import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import attendanceService from "../../api/attendanceService";

const AttendanceViewPage = () => {

  const [batchId, setBatchId] = useState("");
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);
  const [mode, setMode] = useState(""); // "mark" or "edit"
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ===============================
  // Load Attendance or Register
  // ===============================
  const loadAttendance = async () => {
    try {
      setError("");
      setSuccess("");

      const attendance =
        await attendanceService.getAttendanceByBatchAndDate(batchId, date);

      // ✅ If attendance exists → EDIT MODE
      if (attendance.length > 0) {

        const formatted = attendance.map(a => ({
          id: a.id,
          studentId: a.studentId,
          studentName: a.studentName,
          status: a.status,
          remark: a.remark || ""
        }));

        setRecords(formatted);
        setMode("edit");

      } else {
        // ❌ No attendance → LOAD STUDENTS FOR MARKING
        const students =
          await attendanceService.loadStudentsByBatch(batchId);

        const formatted = students.map(s => ({
          studentId: s.id,
          studentName: s.name,
          status: "PRESENT",
          remark: ""
        }));

        setRecords(formatted);
        setMode("mark");
      }

    } catch (err) {
      setError("Failed to load data");
    }
  };

  // ===============================
  // Change Handlers
  // ===============================
  const handleStatusChange = (index, value) => {
    const updated = [...records];
    updated[index].status = value;
    setRecords(updated);
  };

  const handleRemarkChange = (index, value) => {
    const updated = [...records];
    updated[index].remark = value;
    setRecords(updated);
  };

  // ===============================
  // Submit (Mark or Edit)
  // ===============================
  const handleSubmit = async () => {
    try {
      if (mode === "mark") {

        const payload = {
          batchId: Number(batchId),
          date,
          attendanceList: records.map(r => ({
            studentId: r.studentId,
            status: r.status,
            remark: r.remark
          }))
        };

        await attendanceService.markBulkAttendance(payload);
        setSuccess("Attendance Marked Successfully");

      } else if (mode === "edit") {

        await Promise.all(
          records.map(r =>
            attendanceService.editAttendance(
              r.id,
              r.status,
              r.remark
            )
          )
        );

        setSuccess("Attendance Updated Successfully");
      }

      loadAttendance();

    } catch (err) {
      setError("Operation Failed");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Attendance Management
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>

        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="Batch ID"
            type="number"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
          />

          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Button variant="contained" onClick={loadAttendance}>
            Load
          </Button>
        </Box>

        {records.length > 0 && (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Remark</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {records.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.studentName}</TableCell>

                    <TableCell>
                      <Select
                        value={record.status}
                        onChange={(e) =>
                          handleStatusChange(index, e.target.value)
                        }
                        size="small"
                      >
                        <MenuItem value="PRESENT">PRESENT</MenuItem>
                        <MenuItem value="ABSENT">ABSENT</MenuItem>
                        <MenuItem value="LATE">LATE</MenuItem>
                      </Select>
                    </TableCell>

                    <TableCell>
                      <TextField
                        size="small"
                        value={record.remark}
                        onChange={(e) =>
                          handleRemarkChange(index, e.target.value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleSubmit}
            >
              {mode === "mark" ? "Mark Attendance" : "Update Attendance"}
            </Button>
          </>
        )}
      </Paper>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AttendanceViewPage;