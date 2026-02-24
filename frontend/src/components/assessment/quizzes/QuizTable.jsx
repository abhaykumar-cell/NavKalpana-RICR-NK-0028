import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Box,
  TableContainer,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import CreateQuizDrawer from "./CreateQuizDrawer";
import QuizDetailsDrawer from "./QuizDetailsDrawer";

const QuizTable = ({ lesson }) => {
  const [open, setOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleAdd = (quiz) => {
    setQuizzes([...quizzes, { ...quiz, status: "Active" }]);
  };

  const handleDelete = (index) => {
    setQuizzes(quizzes.filter((_, i) => i !== index));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Restricted":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box>
      {/* 🔥 Header */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          borderRadius: 3,
          background: "linear-gradient(90deg,#6366F1,#8B5CF6)",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {lesson} - Quizzes
        </Typography>

        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{
            background: "#fff",
            color: "#6366F1",
            fontWeight: 600,
            borderRadius: 3,
            "&:hover": { background: "#f3f4f6" },
          }}
          onClick={() => setOpen(true)}
        >
          Create Quiz
        </Button>
      </Box>

      {/* 🔥 Table */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Duration</b></TableCell>
                  <TableCell><b>Total Marks</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell align="right"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {quizzes.map((quiz, i) => (
                  <TableRow key={i} hover>
                    <TableCell>{quiz.title}</TableCell>
                    <TableCell>{quiz.duration} mins</TableCell>
                    <TableCell>{quiz.totalMarks}</TableCell>

                    <TableCell>
                      <Chip
                        label={quiz.status}
                        color={getStatusColor(quiz.status)}
                        size="small"
                        sx={{ borderRadius: 2, fontWeight: 500 }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      {/* 👁 View Button */}
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => {
                          setSelectedQuiz(quiz);
                          setViewOpen(true);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {quizzes.length === 0 && (
            <Box textAlign="center" py={6}>
              <Typography variant="h6" fontWeight={600}>
                No quizzes created yet 🚀
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click on "Create Quiz" to add your first quiz.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <CreateQuizDrawer
        open={open}
        setOpen={setOpen}
        onCreate={handleAdd}
      />

      {/* 🔥 Details Drawer */}
      {selectedQuiz && (
        <QuizDetailsDrawer
          open={viewOpen}
          setOpen={setViewOpen}
          quiz={selectedQuiz}
        />
      )}
    </Box>
  );
};

export default QuizTable;