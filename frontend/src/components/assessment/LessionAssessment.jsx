import { Box, Tabs, Tab, Typography, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import AssignmentSection from "./AssignmentSection";
import QuizSection from "./QuizSection";
import ProgressSection from "./ProgressSection";

const LessonAssessment = () => {
  const [lesson, setLesson] = useState("Lesson 1");
  const [tab, setTab] = useState(0);

  const lessons = ["Lesson 1", "Lesson 2", "Lesson 3"];

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Lesson-wise Assessment Management
      </Typography>

      {/* Lesson Selector */}
      <Select
        value={lesson}
        onChange={(e) => setLesson(e.target.value)}
        sx={{ mb: 2, minWidth: 200 }}
      >
        {lessons.map((l) => (
          <MenuItem key={l} value={l}>
            {l}
          </MenuItem>
        ))}
      </Select>

      {/* Tabs */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Assignments" />
        <Tab label="Quiz" />
        <Tab label="Progress" />
      </Tabs>

      <Box mt={3}>
        {tab === 0 && <AssignmentSection lesson={lesson} />}
        {tab === 1 && <QuizSection lesson={lesson} />}
        {tab === 2 && <ProgressSection lesson={lesson} />}
      </Box>
    </Box>
  );
};

export default LessonAssessment;