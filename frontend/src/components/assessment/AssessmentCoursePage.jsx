import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
  Divider,
  Chip,
  Stack,
  CircularProgress
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuizIcon from "@mui/icons-material/Quiz";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import MainLayout from "../layout/MainLayout";
import CreateAssignmentDialog from "./CreateAssignmentDialog";
import CreateQuizDialog from "./CreateQuizDialog";
import toast from "react-hot-toast";

const AssessmentCoursePage = () => {
  const { courseId } = useParams();

  const [lessons, setLessons] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [lessonContent, setLessonContent] = useState({});
  const [openAssignment, setOpenAssignment] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [loadingLesson, setLoadingLesson] = useState(null);

  useEffect(() => {
    loadLessons();
  }, [courseId]);

  const loadLessons = async () => {
    try {
      const res = await API.get(`/api/lessons/course/${courseId}`);

      console.log("Lessons Response:", res.data);

      const lessonsData =
        res?.data?.data ||
        res?.data ||
        [];

      setLessons(Array.isArray(lessonsData) ? lessonsData : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load lessons");
    }
  };

  const handleExpand = async (lessonId) => {
    try {
      if (expandedLesson === lessonId) {
        setExpandedLesson(null);
        return;
      }

      setLoadingLesson(lessonId);

      const assignmentRes = await API.get(
        `/api/assignments/course/${courseId}/lesson/${lessonId}`
      );

      const quizRes = await API.get(
        `/api/quizzes/lesson/${lessonId}`
      );

      console.log("Assignment Raw:", assignmentRes.data);
      console.log("Quiz Raw:", quizRes.data);

      const assignments =
        assignmentRes?.data?.data ||
        assignmentRes?.data ||
        [];

      const quizzes =
        quizRes?.data?.data ||
        quizRes?.data ||
        [];

      setLessonContent((prev) => ({
        ...prev,
        [lessonId]: {
          assignments: Array.isArray(assignments) ? assignments : [],
          quizzes: Array.isArray(quizzes) ? quizzes : []
        }
      }));

      setExpandedLesson(lessonId);

      toast.success(
        `Loaded ${assignments.length} Assignments & ${quizzes.length} Quizzes`
      );

    } catch (err) {
      console.error(err);
      toast.error("Failed to load lesson data");
    } finally {
      setLoadingLesson(null);
    }
  };

  return (
    <MainLayout>
      <Box p={4}>
        <Typography variant="h5" mb={3}>
          Lessons
        </Typography>

        {lessons.map((lesson) => (
          <Card key={lesson.id} sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">
                    {lesson.sequenceNumber}. {lesson.title}
                  </Typography>
                  <Typography>{lesson.description}</Typography>
                </Box>

                <Box>
                  <IconButton onClick={() => handleExpand(lesson.id)}>
                    {loadingLesson === lesson.id ? (
                      <CircularProgress size={20} />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </IconButton>

                  <IconButton
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                      setSelectedLesson(lesson);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>

              <Collapse in={expandedLesson === lesson.id}>
                <Divider sx={{ my: 2 }} />

                {/* COUNTS */}
                <Stack direction="row" spacing={2} mb={2}>
                  <Chip
                    icon={<AssignmentIcon />}
                    label={`Assignments: ${
                      lessonContent[lesson.id]?.assignments?.length || 0
                    }`}
                    color="primary"
                  />
                  <Chip
                    icon={<QuizIcon />}
                    label={`Quizzes: ${
                      lessonContent[lesson.id]?.quizzes?.length || 0
                    }`}
                    color="secondary"
                  />
                </Stack>

                {/* ASSIGNMENTS */}
                <Typography variant="subtitle1">
                  Assignments
                </Typography>

                {lessonContent[lesson.id]?.assignments?.length === 0 && (
                  <Typography sx={{ ml: 2, color: "gray" }}>
                    No Assignments Found
                  </Typography>
                )}

                {lessonContent[lesson.id]?.assignments?.map((a) => (
                  <Box
                    key={a.id}
                    display="flex"
                    alignItems="center"
                    sx={{ ml: 2, mt: 1 }}
                  >
                    <AssignmentIcon
                      fontSize="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography>
                      {a.title} (Deadline: {a.deadline})
                    </Typography>
                  </Box>
                ))}

                {/* QUIZZES */}
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Quizzes
                </Typography>

                {lessonContent[lesson.id]?.quizzes?.length === 0 && (
                  <Typography sx={{ ml: 2, color: "gray" }}>
                    No Quizzes Found
                  </Typography>
                )}

                {lessonContent[lesson.id]?.quizzes?.map((q) => (
                  <Box
                    key={q.id}
                    display="flex"
                    alignItems="center"
                    sx={{ ml: 2, mt: 1 }}
                  >
                    <QuizIcon
                        fontSize="small"
                        sx={{ mr: 1 }}
                      />
                    <Typography>{q.title}</Typography>
                  </Box>
                ))}
              </Collapse>
            </CardContent>
          </Card>
        ))}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              setOpenAssignment(true);
              setAnchorEl(null);
            }}
          >
            Add Assignment
          </MenuItem>

          <MenuItem
            onClick={() => {
              setOpenQuiz(true);
              setAnchorEl(null);
            }}
          >
            Add Quiz
          </MenuItem>
        </Menu>

        <CreateAssignmentDialog
          open={openAssignment}
          onClose={() => setOpenAssignment(false)}
          lessonId={selectedLesson?.id}
        />

        <CreateQuizDialog
          open={openQuiz}
          onClose={() => setOpenQuiz(false)}
          lessonId={selectedLesson?.id}
        />
      </Box>
    </MainLayout>
  );
};

export default AssessmentCoursePage;