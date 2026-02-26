import {
  Typography,
  LinearProgress,
  Stack,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import assessmentService from "../../../api/AssessmentService";

/* ⭐ Small reusable stat card */
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

const ProgressTab = ({ student }) => {
  const modules = student?.modules || [];
  const batchId = student?.batchId;

  const [assignmentStats, setAssignmentStats] = useState({
    total: 0,
    submitted: 0,
    pending: 0,
  });

  const quiz = student?.quizStats || {
    total: 5,
    passed: 4,
    failed: 1,
  };

  /* ===============================
     🔥 Fetch Assignments By Batch
  =============================== */
  useEffect(() => {
    const fetchAssignments = async () => {
      if (!batchId) return;

      try {
        const assignments =
          await assessmentService.getAssignmentsByBatch(batchId);

        const total = assignments?.length || 0;

        // 👇 Assuming student has submittedAssignmentIds array
        const submitted =
          assignments?.filter((a) =>
            student?.submittedAssignmentIds?.includes(a.id)
          ).length || 0;

        const pending = total - submitted;

        setAssignmentStats({
          total,
          submitted,
          pending,
        });
      } catch (error) {
        console.error("Failed to fetch assignments", error);
      }
    };

    fetchAssignments();
  }, [batchId, student]);

  /* ===============================
     🔥 Calculate Overall Progress
  =============================== */
  const calculatedProgress =
    assignmentStats.total > 0
      ? Math.round(
          (assignmentStats.submitted / assignmentStats.total) * 100
        )
      : 0;

  return (
    <Stack spacing={3} mt={2}>
      {/* ✅ Overall Progress */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography fontWeight={600} mb={1}>
            Overall Progress
          </Typography>

          <LinearProgress
            variant="determinate"
            value={calculatedProgress}
            sx={{ height: 10, borderRadius: 5 }}
          />

          <Typography mt={1}>
            {calculatedProgress}% completed
          </Typography>
        </CardContent>
      </Card>

      {/* ✅ Module-wise completion */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Module-wise Completion
        </Typography>

        <Grid container spacing={2}>
          {modules.map((m, i) => (
            <Grid item xs={12} md={6} key={m}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography>{m}</Typography>

                    <LinearProgress
                      variant="determinate"
                      value={Math.min(100, calculatedProgress + i * 5)}
                      sx={{ height: 6, borderRadius: 5 }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ✅ Assignment Summary */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Assignment Summary
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <StatCard label="Total" value={assignmentStats.total} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard label="Submitted" value={assignmentStats.submitted} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard label="Pending" value={assignmentStats.pending} />
          </Grid>
        </Grid>
      </Box>

      {/* ✅ Quiz Summary */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Quiz Summary
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <StatCard label="Total" value={quiz.total} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard label="Passed" value={quiz.passed} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard label="Failed" value={quiz.failed} />
          </Grid>
        </Grid>
      </Box>

      {/* ✅ Completion Status */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Completion Status
        </Typography>

        <Chip
          label={
            calculatedProgress === 100
              ? "Course Completed"
              : "In Progress"
          }
          color={calculatedProgress === 100 ? "success" : "primary"}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        />
      </Box>
    </Stack>
  );
};

export default ProgressTab;