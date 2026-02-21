import { Box } from "@mui/material";
import KpiSection from "../components/dashboard/KpiSection";
import PerformanceSection from "../components/dashboard/PerformanceSection";
import DeadlineSection from "../components/dashboard/DeadlineSection";

const Dashboard = () => {
  return (
    <>
      <KpiSection />

      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 4,
          width: "100%",
        }}
      >
        <Box sx={{ width: "70%" }}>
          <PerformanceSection />
        </Box>

        <Box sx={{ width: "30%" }}>
          <DeadlineSection />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;