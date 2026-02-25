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
  /* ⭐ Safe fallback data */
  const modules = student?.modules || [];

  const assignment = student?.assignmentStats || {
    total: 10,
    submitted: 8,
    pending: 2,
  };

  const quiz = student?.quizStats || {
    total: 5,
    passed: 4,
    failed: 1,
  };

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
            value={student.progress}
            sx={{ height: 10, borderRadius: 5 }}
          />

          <Typography mt={1}>{student.progress}% completed</Typography>
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
                      value={Math.min(100, student.progress + i * 5)}
                      sx={{ height: 6, borderRadius: 5 }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ✅ Assignment summary */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Assignment Summary
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <StatCard label="Total" value={assignment.total} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard label="Submitted" value={assignment.submitted} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard label="Pending" value={assignment.pending} />
          </Grid>
        </Grid>
      </Box>

      {/* ✅ Quiz summary */}
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

      {/* ✅ Completion status */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Completion Status
        </Typography>

        <Chip
          label={student.progress === 100 ? "Course Completed" : "In Progress"}
          color={student.progress === 100 ? "success" : "primary"}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        />
      </Box>
    </Stack>
  );
};

export default ProgressTab;