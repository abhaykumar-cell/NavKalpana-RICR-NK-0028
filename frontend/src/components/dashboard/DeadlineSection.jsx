import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";

const DeadlineItem = ({
  title,
  subtitle,
  date,
  color,
  icon,
  status,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      py: 2,
      "&:hover": {
        backgroundColor: "#f9fafc",
        borderRadius: 2,
        px: 1,
      },
    }}
  >
    {/* LEFT SIDE */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box
        sx={{
          width: 45,
          height: 45,
          borderRadius: "14px",
          backgroundColor: `${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography fontWeight="600">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Box>

    {/* RIGHT SIDE */}
    <Box textAlign="right">
      <Typography
        variant="body2"
        fontWeight="600"
        sx={{ color: color }}
      >
        {date}
      </Typography>

      <Chip
        label={status}
        size="small"
        sx={{
          mt: 0.5,
          backgroundColor: `${color}20`,
          color: color,
          fontWeight: 500,
        }}
      />
    </Box>
  </Box>
);

const DeadlineSection = () => {
  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        height: 340,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="700"
          mb={2}
        >
          Upcoming Deadlines
        </Typography>

        <DeadlineItem
          title="React Assignment"
          subtitle="Batch A"
          date="25 Feb 2026"
          status="Today"
          color="#FF6B6B"
          icon={<AccessTimeIcon sx={{ color: "#FF6B6B" }} />}
        />

        <Divider />

        <DeadlineItem
          title="DSA Quiz"
          subtitle="Batch C"
          date="28 Feb 2026"
          status="Tomorrow"
          color="#6C63FF"
          icon={<EventIcon sx={{ color: "#6C63FF" }} />}
        />
      </CardContent>
    </Card>
  );
};

export default DeadlineSection;
