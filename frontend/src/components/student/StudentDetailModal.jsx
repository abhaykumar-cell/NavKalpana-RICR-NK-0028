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
} from "@mui/material";
import { useState, useEffect } from "react";
import { studentTabs } from "../../constants/studentTabs";
import CourseInfoTab from "./modalTabs/CourseInfoTab";
import ProgressTab from "./modalTabs/ProgressTab";
import AttendanceTab from "./modalTabs/AttendanceTab";
import { getAttendanceColor } from "../../utils/attendanceColor";

const StudentDetailModal = ({ open, onClose, student }) => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (open) setTab(0);
  }, [open]);

  if (!student) return null;

  const status = student.status?.toLowerCase();
  const attendance = student.attendancePercentage ?? 0; // ✅ FIXED

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
          {/* Left Side */}
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

          {/* Right Side Chips */}
          <Stack direction="row" spacing={1}>
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

            <Chip
              label={`${attendance}%`}
              color={getAttendanceColor(attendance)}
              size="small"
              sx={{ fontWeight: 700 }}
            />
          </Stack>
        </Stack>
      </DialogTitle>

      {/* ================= CONTENT ================= */}
      <DialogContent dividers>
        {/* Tabs */}
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

        {/* Tab Content */}
        <Box>
          {tab === 0 && <CourseInfoTab student={student} />}
          {tab === 1 && <ProgressTab student={student} />}
          {tab === 2 && (
            <AttendanceTab
              student={student}
              attendance={attendance}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailModal;