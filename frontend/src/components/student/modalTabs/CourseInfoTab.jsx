import {
  Typography,
  Stack,
  Chip,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";

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

const CourseInfoTab = ({ student }) => {
  const totalModules = student?.modules?.length || 0;
  const completedModules =
    totalModules > 0
      ? Math.round(((student?.progress || 0) / 100) * totalModules)
      : 0;

  return (
    <Stack spacing={3} mt={2}>
      {/* ⭐ Basic Info */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <StatCard
            label="Current Course"
            value={student?.course || "N/A"}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StatCard
            label="Enrollment Number"
            value={student?.enrollmentId || "N/A"}
          />
        </Grid>
      </Grid>

      {/* ⭐ Weekly Activity Chart */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Weekly Activity
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          alignItems="flex-end"
          height={80}
        >
          {(student?.weeklyActivity || [4, 6, 3, 7, 5]).map((v, i) => (
            <Box
              key={i}
              sx={{
                width: 18,
                height: v * 10,
                borderRadius: 1,
                background:
                  "linear-gradient(180deg,#6366F1,#8B5CF6)",
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* ⭐ Modules */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Modules ({completedModules}/{totalModules})
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
        >
          {student?.modules?.map((m) => (
            <Chip key={m} label={m} />
          ))}
        </Stack>
      </Box>

      {/* ⭐ Skills */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Skills Acquired
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
        >
          {(student?.skills || ["React", "Node", "Mongo"]).map(
            (s) => (
              <Chip
                key={s}
                label={s}
                color="secondary"
              />
            )
          )}
        </Stack>
      </Box>

      {/* ⭐ Streak + Attendance */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <WhatshotIcon color="error" />
                <Typography fontWeight={700}>
                  {student?.streak || 7} Day Learning Streak
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography fontWeight={600} mb={1}>
                Attendance Summary
              </Typography>

              <LinearProgress
                variant="determinate"
                value={student?.attendance || 0}
                sx={{
                  height: 8,
                  borderRadius: 5,
                }}
              />

              <Typography mt={1}>
                {student?.attendance || 0}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CourseInfoTab;