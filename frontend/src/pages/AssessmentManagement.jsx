import {
  Box,
  Tabs,
  Tab,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Paper,
} from "@mui/material";
import { useState } from "react";
import AssignmentList from "../components/assessment/AssignmentList";
import QuizList from "../components/assessment/Quiz/QuizList";
import StudentProgress from "../components/assessment/StudentProgress";
import MainLayout from "../components/layout/MainLayout";

const AssessmentManagement = () => {
  const [tab, setTab] = useState(0);

  const lessons = [
    { id: 1, name: "Lesson 1" },
    { id: 2, name: "Lesson 2" },
    { id: 3, name: "Lesson 3" },
  ];

  const [lesson, setLesson] = useState(lessons[0]);

  const handleLessonChange = (event) => {
    const selected = lessons.find((l) => l.id === event.target.value);
    setLesson(selected);
    setTab(0); // reset to Assignments tab when lesson changes
  };

  return (
    <MainLayout>
    <Box p={3}>
      {/* Header Section */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={600}>
          Lesson-wise Assessment
        </Typography>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Select Lesson</InputLabel>
          <Select
            value={lesson.id}
            label="Select Lesson"
            onChange={handleLessonChange}
          >
            {lessons.map((l) => (
              <MenuItem key={l.id} value={l.id}>
                {l.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Tabs Section */}
      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Assignments" />
          <Tab label="Quiz" />
          <Tab label="Progress" />
        </Tabs>
      </Paper>

      {/* Content Section */}
      <Box mt={3}>
        {tab === 0 && <AssignmentList lesson={lesson} />}
        {tab === 1 && <QuizList lesson={lesson} />}
        {tab === 2 && <StudentProgress lesson={lesson} />}
      </Box>
    </Box>
    </MainLayout>
  );
};

export default AssessmentManagement;