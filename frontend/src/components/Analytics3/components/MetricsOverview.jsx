import { Grid, Card, Typography } from "@mui/material";

export default function MetricsOverview({ data }) {
  const metrics = [
    ["Average Quiz Score", data.averageQuizScore],
    ["Average Assignment Score", data.averageAssignmentScore],
    ["Completion Rate", data.completionRate],
    ["Attendance Rate", data.attendanceRate],
    ["Overall OGI", data.overallOGI],
  ];

  return (
    <Grid container spacing={3} mb={5}>
      {metrics.map(([label, value], i) => (
        <Grid item xs={12} md={2.4} key={i}>
          <Card sx={{ p: 3 }}>
            <Typography variant="body2">{label}</Typography>
            <Typography variant="h5" fontWeight={600}>{value}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}