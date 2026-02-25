import {
  Typography,
  Stack,
  Grid,
  Card,
  CardContent,
  Box,
  LinearProgress,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
const StatCard = ({ label, value }) => (
  <Card sx={{ borderRadius: 3 }}>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);
const AttendanceTab = ({ student }) => {
  const stats = student.attendanceStats || {
    present: 20,
    absent: 3,
    late: 2,
  };

  const moduleStats = student.modules?.map((m, i) => ({
    module: m,
    percentage: Math.max(50, student.attendance - i * 5),
  })) || [];

  const remarks = [
    { date: "12 Feb", remark: "Late due to network issue" },
    { date: "18 Feb", remark: "Absent (medical)" },
  ];

  return (
    <Stack spacing={3} mt={2}>
      {/* ⭐ Overall Attendance */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent> <Typography fontWeight={600} mb={1}>
            Overall Attendance
          </Typography>
          <LinearProgress
            variant="determinate"
            value={student.attendance}
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography mt={1}>{student.attendance}%</Typography>
        </CardContent>
      </Card>

      {/* ⭐ Present Absent Late */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <StatCard label="Present" value={stats.present} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Absent" value={stats.absent} />
        </Grid>
         <Grid item xs={12} md={4}>
          <StatCard label="Late" value={stats.late} />
        </Grid>
      </Grid>

      {/* ⭐ Calendar mock */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Calendar View
        </Typography>

        <Grid container spacing={1}>
          {Array.from({ length: 28 }).map((_, i) => {
            const type = i % 5 === 0 ? "A" : i % 7 === 0 ? "L" : "P";
            const color = type === "P" ? "success" : type === "L" ? "warning" : "error";

            return (
              <Grid item key={i}>
                <Chip label={type} color={color} size="small" />
              </Grid>
            );
          })}
        </Grid>
        </Box>

      {/* ⭐ Module wise stats */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Module-wise Attendance
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><b>Module</b></TableCell>
                <TableCell><b>Attendance %</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {moduleStats.map((m) => (
                <TableRow key={m.module}>
                  <TableCell>{m.module}</TableCell>
                  <TableCell>{m.percentage}%</TableCell>
                </TableRow>
                 ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* ⭐ Remarks */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Date-wise Remarks
        </Typography>

        <Stack spacing={1}>
          {remarks.map((r, i) => (
            <Card key={i} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography fontWeight={600}>{r.date}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {r.remark}
                </Typography>
              </CardContent>
            </Card>
              ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default AttendanceTab;
