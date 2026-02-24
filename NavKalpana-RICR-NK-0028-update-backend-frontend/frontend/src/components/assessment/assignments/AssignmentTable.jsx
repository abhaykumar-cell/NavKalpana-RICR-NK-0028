import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Button,
  Box,
  TableContainer,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GradeIcon from "@mui/icons-material/Grade";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CreateAssignmentDrawer from "./CreateAssignmentDrawer";
import EvaluationDrawer from "./EvaluationDrawer";

const AssignmentTable = ({ lesson }) => {
  const [open, setOpen] = useState(false);
  const [evaluationOpen, setEvaluationOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [assignments, setAssignments] = useState([]);

  const handleAdd = (data) => {
    const today = new Date();
    const due = new Date(data.dueDate);

    let status = "Active";
    if (due < today) status = "Late";

    setAssignments([...assignments, { ...data, status }]);
  };

  const handleDelete = (index) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  const handleEvaluate = (marks) => {
    const updated = [...assignments];
    updated[selectedIndex].status = "Evaluated";
    updated[selectedIndex].marksAwarded = marks;
    setAssignments(updated);
    setEvaluationOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Late":
        return "error";
      case "Evaluated":
        return "primary";
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
          {lesson} - Assignments
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
          Create Assignment
        </Button>
      </Box>

      {/* 🔥 Table Card */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Batch</b></TableCell>
                  <TableCell><b>Due Date</b></TableCell>
                  <TableCell><b>Max Marks</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell align="right"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {assignments.map((item, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      transition: "0.2s",
                      "&:hover": { backgroundColor: "#f9fafb" },
                    }}
                  >
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.batch}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell>{item.marks}</TableCell>

                    <TableCell>
                      <Chip
                        label={item.status}
                        color={getStatusColor(item.status)}
                        size="small"
                        sx={{ borderRadius: 2, fontWeight: 500 }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => {
                          setSelectedIndex(index);
                          setEvaluationOpen(true);
                        }}
                      >
                        <GradeIcon />
                      </IconButton>

                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {assignments.length === 0 && (
            <Box textAlign="center" py={6}>
              <Typography variant="h6" fontWeight={600}>
                No assignments created yet 🚀
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Click on "Create Assignment" to add your first assignment.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <CreateAssignmentDrawer
        open={open}
        setOpen={setOpen}
        onCreate={handleAdd}
      />

      <EvaluationDrawer
        open={evaluationOpen}
        setOpen={setEvaluationOpen}
        onSubmit={handleEvaluate}
      />
    </Box>
  );
};

export default AssignmentTable;