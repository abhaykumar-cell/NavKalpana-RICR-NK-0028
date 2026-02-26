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
  CircularProgress,
} from "@mui/material";

const StatCard = ({ label, value, color }) => (
  <Card sx={{ borderRadius: 3 }}>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" fontWeight={700} color={color}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const getStatusColor = (status) => {
  switch (status) {
    case "PRESENT":
      return "success";
    case "ABSENT":
      return "error";
    case "LATE":
      return "warning";
    default:
      return "default";
  }
};

const AttendanceTab = ({
  records = [],
  totalClasses = 0,
  present = 0,
  absent = 0,
  late = 0,
  percentage = 0,
  loading = false,
}) => {
  if (loading) {
    return (
      <Box textAlign="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={3} mt={2}>

      {/* ⭐ Overall Attendance */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography fontWeight={600} mb={1}>
            Overall Attendance
          </Typography>

          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{ height: 10, borderRadius: 5 }}
          />

          <Typography mt={1}>
            {percentage}% Attendance
          </Typography>
        </CardContent>
      </Card>

      {/* ⭐ Summary Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StatCard
            label="Total Classes"
            value={totalClasses}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            label="Present"
            value={present}
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            label="Absent"
            value={absent}
            color="#d32f2f"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            label="Late"
            value={late}
            color="#ed6c02"
          />
        </Grid>
      </Grid>

      {/* ⭐ Calendar View (Only Recorded Days) */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Attendance Records
        </Typography>

        <Grid container spacing={1}>
          {records.map((record) => (
            <Grid item key={record.id}>
              <Chip
                label={record.status[0]}
                color={getStatusColor(record.status)}
                size="small"
                title={`${record.date} - ${record.status}`}
              />
            </Grid>
          ))}
        </Grid>

        {records.length === 0 && (
          <Typography mt={2} color="text.secondary">
            No attendance records available.
          </Typography>
        )}
      </Box>

      {/* ⭐ Date-wise Table */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Date-wise Attendance
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={r.status}
                      color={getStatusColor(r.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </Stack>
  );
};

export default AttendanceTab;