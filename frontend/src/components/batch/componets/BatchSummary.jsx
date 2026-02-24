import { Grid, Box, Typography, Stack } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
const SummaryCard = ({ title, value, icon, gradient }) => {
  return (
    <Box
      sx={{
        borderRadius: "28px",
        p: 4,                         // padding bada
        minHeight: 160,               // height bada
        color: "#fff",
        background: gradient,
        boxShadow: "0 20px 45px rgba(0,0,0,0.18)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25)"
        }
      }}
    >
      <Box>
        <Typography
          variant="body1"
          sx={{ opacity: 0.9, fontSize: "16px" }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "32px", sm: "38px", md: "44px" },  // number bada
            fontWeight: "bold",
            mt: 1
          }}
        >
          {value}
        </Typography>
      </Box>

      <Box
        sx={{
          background: "rgba(255,255,255,0.25)",
          p: 2,
          borderRadius: "50%"
        }}
      >
        {icon}
      </Box>
    </Box>
  );
};
const BatchSummary = ({ batches }) => {
  const total = batches.length;
  const ongoing = batches.filter(b => b.status === "Ongoing").length;
  const completed = batches.filter(b => b.status === "Completed").length;
  const upcoming = batches.filter(b => b.status === "Upcoming").length;

  return (
    <Grid container spacing={3} mb={4}>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Total Batches"
          value={total}
          icon={<GroupsIcon sx={{ fontSize: 30 }} />}
          gradient="linear-gradient(135deg,#6366f1,#8b5cf6)"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Ongoing"
          value={ongoing}
          icon={<PlayCircleIcon sx={{ fontSize: 30 }} />}
          gradient="linear-gradient(135deg,#0ea5e9,#3b82f6)"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Completed"
          value={completed}
          icon={<CheckCircleIcon sx={{ fontSize: 30 }} />}
          gradient="linear-gradient(135deg,#16a34a,#22c55e)"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Upcoming"
          value={upcoming}
          icon={<ScheduleIcon sx={{ fontSize: 30 }} />}
          gradient="linear-gradient(135deg,#f97316,#fb923c)"
        />
      </Grid>
    </Grid>
  );
};

export default BatchSummary;