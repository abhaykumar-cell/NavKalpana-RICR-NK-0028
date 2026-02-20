import {
  Card,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const KpiCard = ({ title, value, icon, color }) => (
  <Card
    sx={{
      flex: "1 1 0",
      minWidth: "280px",
      borderRadius: 1,
      boxShadow: 3,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: 3,
      background: `linear-gradient(135deg, ${color}15, ${color}05)`,
      transition: "0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 6,
      },
    }}
  >
    <Box>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>

      <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
        {value}
      </Typography>

      <Chip
        icon={<TrendingUpIcon sx={{ fontSize: 16 }} />}
        label="+8%"
        size="small"
        sx={{
          backgroundColor: `${color}25`,
          color: color,
          fontWeight: 500,
        }}
      />
    </Box>

    <Box
      sx={{
        width: 55,
        height: 55,
        borderRadius: "10px",
        backgroundColor: `${color}20`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </Box>
  </Card>
);

const KpiSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        width: "100%",
        flexWrap: "wrap",
         mb: 4,
      }}
    >
      <KpiCard
        title="Total Students"
        value="1,248"
        icon={<PeopleIcon sx={{ color: "#6C63FF" }} />}
        color="#6C63FF"
      />

      <KpiCard
        title="Active Batches"
        value="24"
        icon={<SchoolIcon sx={{ color: "#00C49F" }} />}
        color="#00C49F"
      />

      <KpiCard
        title="Pending Evaluations"
        value="42"
        icon={<AssignmentIcon sx={{ color: "#FF9800" }} />}
        color="#FF9800"
      />
    </Box>
    
  );
};

export default KpiSection;
