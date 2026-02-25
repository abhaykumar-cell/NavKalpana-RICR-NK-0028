import { useParams } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import AssignmentSection from "./AssignmentSection";
import QuizSection from "./QuizSection";

const AssessmentLessonPage = () => {
  const { lessonId } = useParams();
  const [tab, setTab] = useState(0);

  return (
    <Box p={4}>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Assignments" />
        <Tab label="Quizzes" />
      </Tabs>

      {tab === 0 && <AssignmentSection lessonId={lessonId} />}
      {tab === 1 && <QuizSection lessonId={lessonId} />}
    </Box>
  );
};

export default AssessmentLessonPage;