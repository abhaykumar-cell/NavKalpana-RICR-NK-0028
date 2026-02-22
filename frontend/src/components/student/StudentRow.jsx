import {
  TableRow,
  TableCell,
  Avatar,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { getAttendanceColor } from "../../utils/attendanceColor";

const StudentRow = ({ student, onOpen }) => (
  <TableRow
    hover
    sx={{
      transition: "0.2s",
      "&:hover": { backgroundColor: "#f9fafb" },
    }}
  >
    {/* Avatar */}
    <TableCell>
      <Avatar>{student.name?.[0]}</Avatar>
    </TableCell>

    {/* Basic info */}
    <TableCell>{student.name}</TableCell>
    <TableCell>{student.enrollmentId}</TableCell>
    <TableCell>{student.course}</TableCell>

    {/* Modules */}
    <TableCell>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {student.modules?.map((m) => (
          <Chip key={m} label={m} size="small" />
        ))}
      </Stack>
    </TableCell>

    {/* Attendance */}
    <TableCell>
      <Chip
        label={`${student.attendance}%`}
        color={getAttendanceColor(student.attendance)}
        size="small"
        sx={{ borderRadius: 2, fontWeight: 500 }}
      />
    </TableCell>

    {/* Contact */}
    <TableCell>{student.email}</TableCell>
    <TableCell>{student.phone}</TableCell>

    {/* ⭐ GitHub */}
    <TableCell>
      <Tooltip title="Open GitHub">
        <IconButton
          size="small"
          component="a"
          href={student.github}
          target="_blank"
          disabled={!student.github}
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
          href={student.linkedin}
          target="_blank"
          disabled={!student.linkedin}
        >
          <LinkedInIcon color="primary" />
        </IconButton>
      </Tooltip>
    </TableCell>

    {/* Action */}
    <TableCell>
      <IconButton size="small" onClick={() => onOpen(student)}>
        <InfoIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);

export default StudentRow;