import { Box, Typography, Paper, Stack } from "@mui/material";
import { useState } from "react";
import LessonSelector from "../components/assessment/LessonSelector";
import AssessmentTabs from "../components/assessment/AssessmentTabs";
import MainLayout from "../components/layout/MainLayout";

const AssessmentManagement = () => {
  const [lesson, setLesson] = useState("Lesson 1");

  return (
    <MainLayout>
      {/* ⭐ Page Wrapper */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, md: 3 },
          maxWidth: 1350,
          mx: "auto",
        }}
      >
        {/* ⭐ Hero Banner */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            color: "#fff",
            boxShadow: "0 18px 40px rgba(99,102,241,0.35)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ fontSize: { xs: 24, md: 32 } }}
          >
            Assessment Management
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.9,
              mt: 1,
              fontSize: { xs: 13, md: 14 },
            }}
          >
            Manage assignments, quizzes and evaluations lesson-wise
          </Typography>
        </Paper>

        {/* ⭐ Lesson Selector Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            mb: 3,
            borderRadius: 4,
            background: "#fff",
            boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              Select Lesson
            </Typography>

            <LessonSelector lesson={lesson} setLesson={setLesson} />
          </Stack>
        </Paper>

        {/* ⭐ Tabs Section */}
        {lesson ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              background: "#fff",
              boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
            }}
          >
            <AssessmentTabs lesson={lesson} />
          </Paper>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: 4,
              textAlign: "center",
              background: "#fff",
              boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              No Lesson Selected
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Please select a lesson to manage assessments.
            </Typography>
          </Paper>
        )}
      </Box>
    </MainLayout>
  );
};

export default AssessmentManagement;