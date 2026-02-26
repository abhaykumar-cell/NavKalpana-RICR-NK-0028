import { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import MetricCard from "../Analytics3/MetricCard";
import AnalyticsFilters from "../Analytics3/AnalyticsFilter";
import WeeklyTrendChart from "../Analytics3/WeeklyTrendChart";
import AttendanceHeatmap from "../Analytics3/AttendanceHeatmap";
import { getClassAnalytics } from "../../api/analyticsService";

export default function ClassAnalytics() {
  const [data, setData] = useState(null);

  const loadData = async (batchId, courseId) => {
    const response = await getClassAnalytics(batchId, courseId);
    setData(response);
  };

  useEffect(() => {
    loadData(); // 🔥 Auto load overall on enter
  }, []);

  if (!data) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Class Performance Analytics
      </Typography>

      {/* Filters */}
      <AnalyticsFilters onFilter={loadData} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <MetricCard title="Average Quiz Score" value={data.averageQuizScore} />
        </Grid>

        <Grid item xs={12} md={4}>
          <MetricCard title="Average Assignment Score" value={data.averageAssignmentScore} />
        </Grid>

        <Grid item xs={12} md={4}>
          <MetricCard title="Submission Consistency" value={data.submissionConsistency} />
        </Grid>

        <Grid item xs={12} md={4}>
          <MetricCard title="Module Completion Rate" value={data.completionRate} />
        </Grid>

        <Grid item xs={12} md={4}>
          <MetricCard title="Overall Class OGI" value={data.overallOGI} />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <WeeklyTrendChart data={data.weeklyTrend || []} />
      </Box>

      <Box sx={{ mt: 5 }}>
        <AttendanceHeatmap data={data.attendanceHeatmap || []} />
      </Box>
    </Box>
  );
}