import { Grid, Box, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";

const SummaryCard = ({
  title,
  value,
  icon,
  gradient,
  onClick,
  active
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        borderRadius: "28px",
        p: 4,
        minHeight: 160,
        color: "#fff",
        background: gradient,
        boxShadow: active
          ? "0 25px 70px rgba(0,0,0,0.35)"
          : "0 20px 45px rgba(0,0,0,0.18)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        transform: active ? "scale(1.05)" : "scale(1)",
        "&:hover": {
          transform: "translateY(-8px)"
        }
      }}
    >
      <Box>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "32px", sm: "38px", md: "44px" },
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

const BatchSummary = ({
  batches = [],
  filter,
  onFilterChange
}) => {
  const total = batches.length;

  const ongoing = batches.filter(
    (b) => b.status?.toUpperCase() === "ONGOING"
  ).length;

  const completed = batches.filter(
    (b) => b.status?.toUpperCase() === "COMPLETED"
  ).length;

  const upcoming = batches.filter(
    (b) => b.status?.toUpperCase() === "UPCOMING"
  ).length;

  return (
    <Grid container spacing={3} mb={4}>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Total Batches"
          value={total}
          icon={<GroupsIcon sx={{ fontSize: 30 }} />}
          gradient="linear-gradient(135deg,#6366f1,#8b5cf6)"
          active={filter === "ALL"}
          onClick={() => onFilterChange("ALL")}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Ongoing"
          value={ongoing}
          icon={<PlayCircleIcon sx={{ fontSize: 30 }} />}
          gradient="linear-gradient(135deg,#0ea5e9,#3b82f6)"
          active={filter === "ONGOING"}
          onClick={() => onFilterChange("ONGOING")}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Completed"
          value={completed}
          icon={<CheckCircleIcon sx={{ fontSize: 30 }} />}
          gradient="linear-gradient(135deg,#16a34a,#22c55e)"
          active={filter === "COMPLETED"}
          onClick={() => onFilterChange("COMPLETED")}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Upcoming"
          value={upcoming}
          icon={<ScheduleIcon sx={{ fontSize: 30 }} />}
          gradient="linear-gradient(135deg,#f97316,#fb923c)"
          active={filter === "UPCOMING"}
          onClick={() => onFilterChange("UPCOMING")}
        />
      </Grid>
    </Grid>
  );
};

export default BatchSummary;