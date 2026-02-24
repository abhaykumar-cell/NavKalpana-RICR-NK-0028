import { Box } from "@mui/material";

import MainLayout from "../components/layout/MainLayout";
import KpiSection from "../components/dashboard/KpiSection";
import PerformanceSection from "../components/dashboard/PerformanceSection";
import DeadlineSection from "../components/dashboard/DeadlineSection";

const Dashboard = () => {
  return (
    <MainLayout>
      <KpiSection />

      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 4,
          width: "100%",
        }}
      >
        {/* Left */}
        <Box sx={{ width: "70%" }}>
          <PerformanceSection />
        </Box>

        {/* Right */}
        <Box sx={{ width: "30%" }}>
          <DeadlineSection />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
