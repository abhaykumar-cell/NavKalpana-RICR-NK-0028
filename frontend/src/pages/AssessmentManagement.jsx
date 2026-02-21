import { Box, Typography, Paper } from "@mui/material";
import { useState } from "react";
import LessonSelector from "../components/assessment/LessonSelector";
import AssessmentTabs from "../components/assessment/AssessmentTabs";
import MainLayout from "../components/layout/MainLayout"; // 👈 ADD THIS

const AssessmentManagement = () => {
  const [lesson, setLesson] = useState("Lesson 1");

  return (
    <MainLayout> 
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            color: "#fff",
            boxShadow: "0 12px 32px rgba(99,102,241,0.3)",
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Assessment Management
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Manage assignments, quizzes and evaluations lesson-wise
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            background: "#fff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <LessonSelector lesson={lesson} setLesson={setLesson} />
        </Paper>

        {lesson ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              background: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <AssessmentTabs lesson={lesson} />
          </Paper>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: 3,
              textAlign: "center",
              background: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
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