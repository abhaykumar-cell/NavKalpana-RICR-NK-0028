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
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { getAttendanceColor } from "../../utils/attendanceColor";

const StudentTable = ({ students, onOpen }) => {
  return (
    <Box>
      {/* ⭐ Header */}
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

      {/* ⭐ Table Card */}
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
                  <TableCell><b>GitHub</b></TableCell>
                  <TableCell><b>LinkedIn</b></TableCell>
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
                    {/* Avatar */}
                    <TableCell>
                      <Avatar>{s.name?.[0]}</Avatar>
                    </TableCell>

                    {/* Basic info */}
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.enrollmentId}</TableCell>
                    <TableCell>{s.course}</TableCell>

                    {/* Modules */}
                    <TableCell>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {s.modules?.map((m) => (
                          <Chip key={m} label={m} size="small" />
                        ))}
                      </Stack>
                    </TableCell>

                    {/* Attendance */}
                    <TableCell>
                      <Chip
                        label={`${s.attendance}%`}
                        color={getAttendanceColor(s.attendance)}
                        size="small"
                        sx={{ borderRadius: 2, fontWeight: 500 }}
                      />
                    </TableCell>

                    {/* Contact */}
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.phone}</TableCell>

                    {/* ⭐ GitHub */}
                    <TableCell>
                      <Tooltip title="Open GitHub">
                        <IconButton
                          size="small"
                          component="a"
                          href={s.github}
                          target="_blank"
                          disabled={!s.github}
                        >
                          <GitHubIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                    {/* ⭐ LinkedIn */}
                    <TableCell>
                      <Tooltip title="Open LinkedIn">
                        <IconButton
                          size="small"
                          component="a"
                          href={s.linkedin}
                          target="_blank"
                          disabled={!s.linkedin}
                        >
                          <LinkedInIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                    {/* Action */}
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

          {/* ⭐ Empty state */}
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