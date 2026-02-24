import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { studentTabs } from "../../constants/studentTabs";
import CourseInfoTab from "./modalTabs/CourseInfoTab";
import ProgressTab from "./modalTabs/ProgressTab";
import AttendanceTab from "./modalTabs/AttendanceTab";
import { getAttendanceColor } from "../../utils/attendanceColor";

const StudentDetailModal = ({ open, onClose, student }) => {
  const [tab, setTab] = useState(0);

  if (!student) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      {/* ✅ Header */}
      <DialogTitle>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          {/* Left side */}
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={700}>
              {student.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {student.course} • {student.enrollmentId}
            </Typography>
          </Stack>

          {/* Right side badges */}
          <Stack direction="row" spacing={1}>
            <Chip
              label={student.status}
              color={student.status === "completed" ? "success" : "warning"}
              size="small"
            />
            <Chip
              label={`${student.attendance}%`}
              color={getAttendanceColor(student.attendance)}
              size="small"
            />
          </Stack>
        </Stack>
      </DialogTitle>

      {/* ✅ Content */}
      <DialogContent>
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

{tab === 0 && <CourseInfoTab student={student} />}
{tab === 1 && <ProgressTab student={student} />}
{tab === 2 && <AttendanceTab student={student} />}
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailModal;