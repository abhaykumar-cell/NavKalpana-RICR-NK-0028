import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getLessonsByCourse } from "../../../api/lessionService";

const LessonSelector = ({ selectedLesson, onSelectLesson }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  // ⚠️ Change this dynamically later if needed
  const courseId = 1;

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const res = await getLessonsByCourse(courseId);
      setLessons(res.data || []);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const lessonId = event.target.value;
    const lessonObj = lessons.find((l) => l.id === lessonId);
    onSelectLesson(lessonObj);
  };

  return (
    <Box>
      {loading ? (
        <CircularProgress size={28} />
      ) : lessons.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No lessons available
        </Typography>
      ) : (
        <FormControl fullWidth>
          <InputLabel>Select Lesson</InputLabel>
          <Select
            value={selectedLesson?.id || ""}
            label="Select Lesson"
            onChange={handleChange}
          >
            {lessons.map((lesson) => (
              <MenuItem key={lesson.id} value={lesson.id}>
                {lesson.sequenceNumber}. {lesson.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default LessonSelector;