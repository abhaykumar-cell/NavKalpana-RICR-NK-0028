import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import attendanceService from "../../api/attendanceService";
import MainLayout from "../layout/MainLayout";

const MarkAttendancePage = () => {

  const [batchId, setBatchId] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [students, setStudents] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ===========================
  // Load Students by Batch
  // ===========================
  const loadStudents = async () => {
    try {
      setError("");

      const data =
        await attendanceService.loadRegister(batchId);

      const formatted = data.map(student => ({
        studentId: student.id,
        studentName: student.name,
        status: "PRESENT", // default
        remark: ""
      }));

      setStudents(formatted);

    } catch {
      setError("Failed to load students");
    }
  };

  // ===========================
  // Update Field
  // ===========================
  const updateField = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  // ===========================
  // Submit Attendance
  // ===========================
  const handleSubmit = async () => {
    try {
      const payload = {
        batchId: Number(batchId),
        date,
        attendanceList: students.map(s => ({
          studentId: s.studentId,
          status: s.status,
          remark: s.remark
        }))
      };

      await attendanceService.markBulkAttendance(payload);

      setSuccess("Attendance Marked Successfully");
      setStudents([]);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Attendance already marked for this date"
      );
    }
  };

  return (
    <MainLayout>
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Mark Attendance
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>

        <Box display="flex" gap={2} mb={3}>
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

          <Button
            variant="contained"
            onClick={loadStudents}
          >
            Load Students
          </Button>
        </Box>

        {students.length > 0 && (
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
                {students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {student.studentName}
                    </TableCell>

                    <TableCell>
                      <Select
                        value={student.status}
                        size="small"
                        onChange={(e) =>
                          updateField(index, "status", e.target.value)
                        }
                      >
                        <MenuItem value="PRESENT">PRESENT</MenuItem>
                        <MenuItem value="ABSENT">ABSENT</MenuItem>
                        <MenuItem value="LATE">LATE</MenuItem>
                      </Select>
                    </TableCell>

                    <TableCell>
                      <TextField
                        size="small"
                        value={student.remark}
                        onChange={(e) =>
                          updateField(index, "remark", e.target.value)
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
              Submit Attendance
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
    </MainLayout>
  );
};

export default MarkAttendancePage;