import { Card, Typography, Box, Stack, CircularProgress } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useEffect, useState } from "react";
import { getSummary } from "../../api/studentService";
import { getAllBatches } from "../../api/BatchService";   // ✅ import added

const KpiCard = ({ title, value, icon, gradient }) => (
  <Card
    sx={{
      flex: "1 1 0",
      minWidth: "280px",
      height: 170,
      borderRadius: 4,
      p: 4,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff",
      background: gradient,
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    }}
  >
    <Box>
      <Typography variant="body1" sx={{ opacity: 0.9 }}>
        {title}
      </Typography>

      <Typography variant="h3" fontWeight="bold" mt={2}>
        {value}
      </Typography>
    </Box>

    <Box
      sx={{
        width: 70,
        height: 70,
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.25)",
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
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeBatches, setActiveBatches] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔥 Fetch both APIs parallel
        const [summaryRes, batchesRes] = await Promise.all([
          getSummary(),
          getAllBatches(),
        ]);

        // ✅ Total Students
        const total =
          summaryRes?.total ??
          summaryRes?.data?.total ??
          0;

        setTotalStudents(total);

        // ✅ Count ONGOING batches
        const ongoingCount = (batchesRes || []).filter(
          (b) => b.status?.toUpperCase() === "ONGOING"
        ).length;

        setActiveBatches(ongoingCount);

      } catch (error) {
        console.error("Failed to load KPI data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack direction="row" spacing={4} flexWrap="wrap" mb={4}>
      <KpiCard
        title="Total Students"
        value={
          loading ? (
            <CircularProgress size={28} sx={{ color: "#fff" }} />
          ) : (
            totalStudents
          )
        }
        icon={<PeopleIcon sx={{ fontSize: 35, color: "#fff" }} />}
        gradient="linear-gradient(135deg, #5B5FEF, #8E7CFF)"
      />

      <KpiCard
        title="Active Batches"
        value={
          loading ? (
            <CircularProgress size={28} sx={{ color: "#fff" }} />
          ) : (
            activeBatches
          )
        }
        icon={<SchoolIcon sx={{ fontSize: 35, color: "#fff" }} />}
        gradient="linear-gradient(135deg, #00C49F, #1DE9B6)"
      />

      <KpiCard
        title="Pending Evaluations"
        value="42"
        icon={<AssignmentIcon sx={{ fontSize: 35, color: "#fff" }} />}
        gradient="linear-gradient(135deg, #FF9800, #FFB74D)"
      />
    </Stack>
  );
};

export default KpiSection;