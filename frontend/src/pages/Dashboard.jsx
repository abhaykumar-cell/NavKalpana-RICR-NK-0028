import { Box, Typography } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import KpiSection from "../components/dashboard/KpiSection";
import PerformanceSection from "../components/dashboard/PerformanceSection";
import DeadlineSection from "../components/dashboard/DeadlineSection";

const Dashboard = () => {
  return (
    <MainLayout>
      {/* Page Header */}
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg, #5B5FEF, #7C4DFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Dashboard
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          Monitor academic performance, batches and deadlines at one place
        </Typography>
      </Box>

      {/* KPI Section */}
      <KpiSection />

      {/* Bottom Section */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 4,
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            flex: 1,
            minWidth: "65%",
            backgroundColor: "#fff",
            borderRadius: 3,
            p: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <PerformanceSection />
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            width: "30%",
            minWidth: "300px",
            backgroundColor: "#fff",
            borderRadius: 3,
            p: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <DeadlineSection />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;