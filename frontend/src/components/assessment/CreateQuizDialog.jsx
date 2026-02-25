import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Box,
  MenuItem,
  Typography,
  Divider
} from "@mui/material";
import { useState, useEffect } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";

const CreateQuizDialog = ({ open, onClose, lessonId }) => {
  const [quiz, setQuiz] = useState({
    title: "",
    duration: "",
    attemptLimit: "",
    questions: []
  });

  useEffect(() => {
    if (open) {
      setQuiz({
        title: "",
        duration: "",
        attemptLimit: "",
        questions: []
      });
    }
  }, [open]);

  const addQuestion = () => {
    setQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "",
          marks: 1
        }
      ]
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...quiz.questions];
    updated[index][field] = value;
    setQuiz({ ...quiz, questions: updated });
  };

  const handleSubmit = async () => {
    if (!quiz.title || !quiz.duration) {
      toast.error("Please fill quiz details");
      return;
    }

    if (quiz.questions.length === 0) {
      toast.error("Add at least one question");
      return;
    }

    try {
      await API.post("/api/quizzes", {
        ...quiz,
        duration: Number(quiz.duration),
        attemptLimit: Number(quiz.attemptLimit),
        lessonId
      });

      toast.success("Quiz created successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create quiz");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create Quiz</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

        {/* Quiz Basic Info */}
        <TextField
          label="Quiz Title"
          fullWidth
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />

        <TextField
          label="Duration (minutes)"
          type="number"
          fullWidth
          value={quiz.duration}
          onChange={(e) => setQuiz({ ...quiz, duration: e.target.value })}
        />

        <TextField
          label="Attempt Limit"
          type="number"
          fullWidth
          value={quiz.attemptLimit}
          onChange={(e) => setQuiz({ ...quiz, attemptLimit: e.target.value })}
        />

        <Divider sx={{ my: 2 }} />

        {/* Add Question Button */}
        <Button variant="contained" onClick={addQuestion}>
          Add Question
        </Button>

        {/* Questions Section */}
        {quiz.questions.map((q, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              mt: 2
            }}
          >
            <Typography variant="subtitle1" mb={1}>
              Question {index + 1}
            </Typography>

            <TextField
              fullWidth
              label="Question"
              sx={{ mb: 2 }}
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
            />

            <TextField
              fullWidth
              label="Option A"
              sx={{ mb: 2 }}
              value={q.optionA}
              onChange={(e) =>
                handleQuestionChange(index, "optionA", e.target.value)
              }
            />

            <TextField
              fullWidth
              label="Option B"
              sx={{ mb: 2 }}
              value={q.optionB}
              onChange={(e) =>
                handleQuestionChange(index, "optionB", e.target.value)
              }
            />

            <TextField
              fullWidth
              label="Option C"
              sx={{ mb: 2 }}
              value={q.optionC}
              onChange={(e) =>
                handleQuestionChange(index, "optionC", e.target.value)
              }
            />

            <TextField
              fullWidth
              label="Option D"
              sx={{ mb: 2 }}
              value={q.optionD}
              onChange={(e) =>
                handleQuestionChange(index, "optionD", e.target.value)
              }
            />

            <TextField
              select
              fullWidth
              label="Correct Answer"
              sx={{ mb: 2 }}
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswer", e.target.value)
              }
            >
              <MenuItem value="A">Option A</MenuItem>
              <MenuItem value="B">Option B</MenuItem>
              <MenuItem value="C">Option C</MenuItem>
              <MenuItem value="D">Option D</MenuItem>
            </TextField>

            <TextField
              fullWidth
              type="number"
              label="Marks"
              value={q.marks}
              onChange={(e) =>
                handleQuestionChange(index, "marks", e.target.value)
              }
            />
          </Box>
        ))}

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Quiz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateQuizDialog;