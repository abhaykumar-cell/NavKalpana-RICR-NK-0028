import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Chip,
  Stack,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { studentTabs } from "../../constants/studentTabs";
import CourseInfoTab from "./modalTabs/CourseInfoTab";
import ProgressTab from "./modalTabs/ProgressTab";
import AttendanceTab from "./modalTabs/AttendanceTab";
import { getAttendanceColor } from "../../utils/attendanceColor";
import attendanceService from "../../api/attendanceService";

const StudentDetailModal = ({ open, onClose, student }) => {
  const [tab, setTab] = useState(0);

  // Attendance states
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  useEffect(() => {
    if (open) setTab(0);
  }, [open]);

  // ============================
  // FETCH FULL STUDENT ATTENDANCE
  // ============================
  useEffect(() => {
    const fetchAttendance = async () => {
      if (!student?.id) return;

      try {
        setLoadingAttendance(true);

        const records =
          await attendanceService.getAttendanceByStudent(student.id);

        if (!records || records.length === 0) {
          setAttendanceRecords([]);
          setAttendancePercentage(0);
          setTotalClasses(0);
          setPresentCount(0);
          setAbsentCount(0);
          setLateCount(0);
          return;
        }

        // Sort by date (latest first)
        const sortedRecords = [...records].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const total = sortedRecords.length;
        const present = sortedRecords.filter(
          (r) => r.status === "PRESENT"
        ).length;
        const absent = sortedRecords.filter(
          (r) => r.status === "ABSENT"
        ).length;
        const late = sortedRecords.filter(
          (r) => r.status === "LATE"
        ).length;

        const percentage = ((present / total) * 100).toFixed(1);

        setAttendanceRecords(sortedRecords);
        setTotalClasses(total);
        setPresentCount(present);
        setAbsentCount(absent);
        setLateCount(late);
        setAttendancePercentage(Number(percentage));
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoadingAttendance(false);
      }
    };

    if (open) {
      fetchAttendance();
    }
  }, [open, student]);

  if (!student) return null;

  const status = student.status?.toLowerCase();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      {/* ================= HEADER ================= */}
      <DialogTitle sx={{ pb: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          {/* Left */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: "#6366f1",
                fontSize: 22,
              }}
            >
              {student.name?.[0]}
            </Avatar>

            <Stack spacing={0.5}>
              <Typography variant="h6" fontWeight={700}>
                {student.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {student.course} • {student.enrollmentId}
              </Typography>
            </Stack>
          </Stack>

          {/* Right */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={student.status}
              color={
                status === "completed"
                  ? "success"
                  : status === "ongoing"
                  ? "warning"
                  : "default"
              }
              size="small"
              sx={{ fontWeight: 600 }}
            />

            {loadingAttendance ? (
              <CircularProgress size={22} />
            ) : (
              <Chip
                label={`${attendancePercentage}%`}
                color={getAttendanceColor(attendancePercentage)}
                size="small"
                sx={{ fontWeight: 700 }}
              />
            )}
          </Stack>
        </Stack>
      </DialogTitle>

      {/* ================= CONTENT ================= */}
      <DialogContent dividers>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          sx={{ mb: 2 }}
          variant="scrollable"
          allowScrollButtonsMobile
        >
          {studentTabs.map((t) => (
            <Tab key={t.value} label={t.label} value={t.value} />
          ))}
        </Tabs>

        <Box>
          {tab === 0 && <CourseInfoTab student={student} />}
          {tab === 1 && <ProgressTab student={student} />}
          {tab === 2 && (
            <AttendanceTab
              student={student}
              records={attendanceRecords}
              totalClasses={totalClasses}
              present={presentCount}
              absent={absentCount}
              late={lateCount}
              percentage={attendancePercentage}
              loading={loadingAttendance}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailModal;