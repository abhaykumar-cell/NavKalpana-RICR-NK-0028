import { Tabs, Tab, Box, Paper } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuizIcon from "@mui/icons-material/Quiz";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useState } from "react";

import AssignmentTable from "./assignments/AssignmentTable";
import QuizTable from "./quizzes/QuizTable";
import SubmissionPanel from "./assignments/SubmissionPanel";

const AssessmentTabs = ({ lesson }) => {
  const [value, setValue] = useState(0);

  return (
    <Box>

      {/* 🔥 Tabs Container */}
      <Paper
        elevation={0}
        sx={{
          p: 1,
          mb: 4,
          borderRadius: 4,
          background: "#F3F4F6",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          {/* Assignments Tab */}
          <Tab
            icon={<AssignmentIcon fontSize="small" />}
            iconPosition="start"
            label="Assignments"
            sx={tabStyle}
          />

          {/* Quizzes Tab */}
          <Tab
            icon={<QuizIcon fontSize="small" />}
            iconPosition="start"
            label="Quizzes"
            sx={tabStyle}
          />

          {/* NEW Submissions Tab */}
          <Tab
            icon={<FactCheckIcon fontSize="small" />}
            iconPosition="start"
            label="Submissions"
            sx={tabStyle}
          />
        </Tabs>
      </Paper>

      {/* 🔥 Content Wrapper */}
      <Box sx={{ transition: "all 0.3s ease" }}>
        {value === 0 && <AssignmentTable lesson={lesson} />}
        {value === 1 && <QuizTable lesson={lesson} />}
        {value === 2 && <SubmissionPanel lesson={lesson} />}
      </Box>

    </Box>
  );
};

const tabStyle = {
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 3,
  px: 3,
  minHeight: 40,
  transition: "all 0.3s ease",
  "&.Mui-selected": {
    background: "linear-gradient(90deg,#6366F1,#8B5CF6)",
    color: "#fff",
    boxShadow: "0 6px 18px rgba(99,102,241,0.35)",
  },
};

export default AssessmentTabs;