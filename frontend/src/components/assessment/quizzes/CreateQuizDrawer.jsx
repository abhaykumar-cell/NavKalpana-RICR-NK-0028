import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import QuizIcon from "@mui/icons-material/Quiz";
import { useState } from "react";

const CreateQuizDrawer = ({ open, setOpen, onCreate }) => {
  const [quiz, setQuiz] = useState({
    title: "",
    duration: "",
    attemptLimit: "",
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correct: "",
    marks: 1,
  });

  const handleAddQuestion = () => {
    if (!currentQuestion.question) return;

    setQuiz({
      ...quiz,
      questions: [...quiz.questions, currentQuestion],
    });

    setCurrentQuestion({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correct: "",
      marks: 1,
    });
  };

  const handleDeleteQuestion = (index) => {
    const updated = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: updated });
  };

  const handleSubmit = () => {
    const totalMarks = quiz.questions.reduce(
      (sum, q) => sum + Number(q.marks),
      0
    );

    onCreate({ ...quiz, totalMarks });
    setOpen(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          width: { xs: 360, sm: 500 },
          height: "100%",
          p: 4,
          background: "#fff",
        }}
      >
        {/* 🔥 Gradient Header */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            color: "#fff",
            boxShadow: "0 12px 30px rgba(99,102,241,0.3)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <QuizIcon />
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Create Quiz
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Build quiz with multiple questions
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* 📘 Basic Info Section */}
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Quiz Details
        </Typography>

        <TextField
          fullWidth
          label="Quiz Title"
          size="small"
          margin="normal"
          onChange={(e) =>
            setQuiz({ ...quiz, title: e.target.value })
          }
        />

        <TextField
          fullWidth
          label="Duration (minutes)"
          size="small"
          margin="normal"
          type="number"
          onChange={(e) =>
            setQuiz({ ...quiz, duration: e.target.value })
          }
        />

        <TextField
          fullWidth
          label="Attempt Limit"
          size="small"
          margin="normal"
          type="number"
          onChange={(e) =>
            setQuiz({ ...quiz, attemptLimit: e.target.value })
          }
        />

        <Divider sx={{ my: 3 }} />

        {/* 📗 Question Builder Section */}
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Add Question
        </Typography>

        <TextField
          fullWidth
          label="Question"
          size="small"
          margin="normal"
          value={currentQuestion.question}
          onChange={(e) =>
            setCurrentQuestion({
              ...currentQuestion,
              question: e.target.value,
            })
          }
        />

        {["optionA", "optionB", "optionC", "optionD"].map((opt, i) => (
          <TextField
            key={opt}
            fullWidth
            label={`Option ${String.fromCharCode(65 + i)}`}
            size="small"
            margin="normal"
            value={currentQuestion[opt]}
            onChange={(e) =>
              setCurrentQuestion({
                ...currentQuestion,
                [opt]: e.target.value,
              })
            }
          />
        ))}

        <TextField
          fullWidth
          label="Correct Option (A/B/C/D)"
          size="small"
          margin="normal"
          value={currentQuestion.correct}
          onChange={(e) =>
            setCurrentQuestion({
              ...currentQuestion,
              correct: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Marks"
          size="small"
          margin="normal"
          type="number"
          value={currentQuestion.marks}
          onChange={(e) =>
            setCurrentQuestion({
              ...currentQuestion,
              marks: e.target.value,
            })
          }
        />

        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          fullWidth
          sx={{
            mt: 2,
            borderRadius: 3,
            fontWeight: 600,
          }}
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>

        {/* 📋 Question Preview */}
        {quiz.questions.map((q, index) => (
          <Paper
            key={index}
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                {index + 1}. {q.question}
              </Typography>

              <IconButton
                size="small"
                color="error"
                onClick={() => handleDeleteQuestion(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Paper>
        ))}

        <Divider sx={{ my: 3 }} />

        {/* 🔥 Final CTA */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 3,
            fontWeight: 600,
            py: 1.2,
          }}
          onClick={handleSubmit}
        >
          Create Quiz
        </Button>
      </Box>
    </Drawer>
  );
};

export default CreateQuizDrawer;