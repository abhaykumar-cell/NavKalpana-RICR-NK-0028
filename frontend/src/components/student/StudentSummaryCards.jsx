import { Grid, Card, CardContent, Typography, Stack, Box } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SummaryCard = ({ title, value, color, bg, icon }) => (
  <Card
    sx={{
      borderRadius: 2,
      border: `2px solid ${color}`,
      background: bg,
      transition: "0.3s",
      height: "100%",
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
    }}
  >
     <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={800}>
            {value}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.25)",
          }}
        > 
           {icon}
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const StudentSummaryCards = ({ students }) => {
  const total = students.length;
  const ongoing = students.filter((s) => s.status === "ongoing").length;
  const completed = students.filter((s) => s.status === "completed").length;

  return (
    <Grid container spacing={3} mb={2}>
      <Grid item xs={12} sm={6} md={4}>
        <SummaryCard
          title="Total Students"
          value={total}
          color="#6366f1"
          bg="linear-gradient(135deg,#6366f1,#8b5cf6)"
          icon={<PeopleAltIcon sx={{ color: "white" }} />}
        />
      </Grid>
       <Grid item xs={12} sm={6} md={4}>
        <SummaryCard
          title="Ongoing"
          value={ongoing}
          color="#f59e0b"
          bg="linear-gradient(135deg,#f59e0b,#fb923c)"
          icon={<TrendingUpIcon sx={{ color: "white" }} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SummaryCard
          title="Completed"
          value={completed}
          color="#22c55e"
          bg="linear-gradient(135deg,#22c55e,#4ade80)"
          icon={<CheckCircleIcon sx={{ color: "white" }} />}
        />
      </Grid>
    </Grid>
  );
};

export default StudentSummaryCards;