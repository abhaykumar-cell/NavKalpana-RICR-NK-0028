import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Box,
  TableContainer,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { getAttendanceColor } from "../../utils/attendanceColor";

const StudentTable = ({ students, onOpen }) => {
  return (
    <Box>
      {/* 🔥 Gradient Header (same as assessment) */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          borderRadius: 3,
          background: "linear-gradient(90deg,#6366F1,#8B5CF6)",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Students List
        </Typography>
      </Box>

      {/* 🔥 Table Card */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Enrollment</b></TableCell>
                  <TableCell><b>Course</b></TableCell>
                  <TableCell><b>Modules</b></TableCell>
                  <TableCell><b>Attendance</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                  <TableCell align="right"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {students.map((s) => (
                  <TableRow
                    key={s.id}
                    hover
                    sx={{
                      transition: "0.2s",
                      "&:hover": { backgroundColor: "#f9fafb" },
                    }}
                  >
                    <TableCell>
                      <Avatar>{s.name[0]}</Avatar>
                    </TableCell>

                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.enrollmentId}</TableCell>
                    <TableCell>{s.course}</TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {s.modules.map((m) => (
                          <Chip key={m} label={m} size="small" />
                        ))}
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={`${s.attendance}%`}
                        color={getAttendanceColor(s.attendance)}
                        size="small"
                        sx={{ borderRadius: 2, fontWeight: 500 }}
                      />
                    </TableCell>

                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.phone}</TableCell>

                    <TableCell align="right">
                      <IconButton size="small" onClick={() => onOpen(s)}>
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ⭐ Empty state same pattern */}
          {students.length === 0 && (
            <Box textAlign="center" py={6}>
              <Typography variant="h6" fontWeight={600}>
                No students found 🚀
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Add students to see them here.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentTable;