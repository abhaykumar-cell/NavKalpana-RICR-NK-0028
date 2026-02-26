import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

import AnalyticsHeader from "./components/AnalyticsHeader";
import MetricsOverview from "./components/MetricsOverview";
import ModuleAttendanceChart from "./components/ModuleAttendanceChart";
import WeeklyTrendChart from "./components/WeaklyTrendChart";
import AttendanceHeatmap from "./components/AttendanceHeatmap";
import WeeklySnapshotSection from "./components/WeaklySnapshotSection";
import LeaderboardSection from "./components/LeaderboardSection";
import { fetchAnalytics } from "./services/analyticsApi";

const defaultAnalytics = {
  averageQuizScore: 0,
  averageAssignmentScore: 0,
  completionRate: 0,
  attendanceRate: 0,
  overallOGI: 0,
  moduleAttendance: [],
  weeklyTrend: [],
  attendanceHeatmap: []
};

export default function BatchAnalyticsPage() {
  const [data, setData] = useState(defaultAnalytics);
  const [batchId, setBatchId] = useState(null);
  const [courseId, setCourseId] = useState(null);

  const loadData = () => {
    if (!batchId || !courseId) return;

    fetchAnalytics(batchId, courseId)
      .then(res => {
        const response = res?.data || {};
        setData({
          averageQuizScore: response.averageQuizScore ?? 0,
          averageAssignmentScore: response.averageAssignmentScore ?? 0,
          completionRate: response.completionRate ?? 0,
          attendanceRate: response.attendanceRate ?? 0,
          overallOGI: response.overallOGI ?? 0,
          moduleAttendance: response.moduleAttendance ?? [],
          weeklyTrend: response.weeklyTrend ?? [],
          attendanceHeatmap: response.attendanceHeatmap ?? []
        });
      })
      .catch(() => setData(defaultAnalytics));
  };

  useEffect(() => {
    if (!batchId || !courseId) return;

    loadData();
  }, [batchId, courseId]);

  return (
    <MainLayout>
      <Box p={4}>
        <AnalyticsHeader
          batchId={batchId}
          setBatchId={setBatchId}
          courseId={courseId}
          setCourseId={setCourseId}
        />

        <MetricsOverview data={data} />
        <ModuleAttendanceChart data={data.moduleAttendance} />
        <WeeklyTrendChart data={data.weeklyTrend} />
        <AttendanceHeatmap data={data.attendanceHeatmap} />
        <WeeklySnapshotSection data={data.weeklyTrend} />
        <LeaderboardSection batchId={batchId} courseId={courseId} />
      </Box>
    </MainLayout>
  );
}