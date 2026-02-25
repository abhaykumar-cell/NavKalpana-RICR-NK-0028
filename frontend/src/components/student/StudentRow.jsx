import { TableRow, TableCell, Avatar, Chip, Stack, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { getAttendanceColor } from "../../utils/attendanceColor";

const StudentRow = ({ student, onOpen }) => (
  <TableRow hover>
    <TableCell>
      <Avatar>{student.name[0]}</Avatar>
    </TableCell>
    <TableCell>{student.name}</TableCell>
    <TableCell>{student.enrollmentId}</TableCell>
    <TableCell>{student.course}</TableCell>
    <TableCell>
      <Stack direction="row" spacing={1}>
        {student.modules.map((m) => (
          <Chip key={m} label={m} size="small" />
        ))}
      </Stack>
    </TableCell>
    <TableCell>
      <Chip label={`${student.attendance}%`} color={getAttendanceColor(student.attendance)} />
    </TableCell>
    <TableCell>{student.email}</TableCell>
    <TableCell>{student.phone}</TableCell>
    <TableCell>
          <IconButton onClick={() => onOpen(student)}>
        <InfoIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);

export default StudentRow;