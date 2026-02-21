import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Grid,
  Drawer,
  MenuItem,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useState } from "react";

const AssessmentManagement = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "React Assignment 1",
      batch: "Batch A",
      dueDate: "2026-02-25",
      status: "Active",
      marks: 50,
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    batch: "",
    dueDate: "",
    marks: "",
  });

  // ✅ Add Assignment
  const handleCreate = () => {
    const newAssignment = {
      id: Date.now(),
      ...formData,
      status: "Active",
    };

    setAssignments([...assignments, newAssignment]);
    setOpenDrawer(false);

    // reset form
    setFormData({
      title: "",
      batch: "",
      dueDate: "",
      marks: "",
    });
  };

  // ✅ Delete Assignment
  const handleDelete = (id) => {
    setAssignments(assignments.filter((item) => item.id !== id));
  };

  // Stats Calculation
  const totalAssignments = assignments.length;
  const activeAssignments = assignments.filter(
    (a) => a.status === "Active"
  ).length;
  const evaluatedAssignments = assignments.filter(
    (a) => a.status === "Evaluated"
  ).length;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Assessment Management
      </Typography>

      {/* Stats */}
    <Grid
  container
  spacing={3}
  sx={{ mb: 4 }}
>
  {[
    {
      title: "Total Assignments",
      count: totalAssignments,
      gradient: "linear-gradient(135deg,#7F00FF,#E100FF)",
      icon: <AssignmentIcon />,
    },
    {
      title: "Active",
      count: activeAssignments,
      gradient: "linear-gradient(135deg,#00C6FF,#0072FF)",
      icon: <AccessTimeIcon />,
    },
    {
      title: "Evaluated",
      count: evaluatedAssignments,
      gradient: "linear-gradient(135deg,#00F260,#0575E6)",
      icon: <DoneIcon />,
    },
  ].map((card, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card
        sx={{
          borderRadius: 1,
          background: card.gradient,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 3,
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{ opacity: 0.85 }}
            >
              {card.title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight={700}
              sx={{ mt: 1 }}
            >
              {card.count}
            </Typography>
          </Box>

          {/* Icon Circle */}
          <Box
            sx={{
              height: 60,
              width: 60,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            {card.icon}
          </Box>
        </CardContent>

        {/* Decorative Circle */}
        <Box
          sx={{
            position: "absolute",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            top: -30,
            right: -30,
          }}
        />
      </Card>
    </Grid>
  ))}
</Grid>

      {/* Create Button */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenDrawer(true)}
        sx={{
          mb: 3,
          borderRadius: 1,
          textTransform: "none",
        }}
      >
        Create Assignment
      </Button>

      {/* Table */}
      <Card sx={{ borderRadius: 1 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Batch</b></TableCell>
                <TableCell><b>Due Date</b></TableCell>
                <TableCell><b>Marks</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell align="right"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{assignment.batch}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell>{assignment.marks}</TableCell>
                  <TableCell>
                    <Chip
                      label={assignment.status}
                      size="small"
                      sx={{ borderRadius: 1 }}
                      color="success"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => handleDelete(assignment.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box sx={{ width: 350, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Create Assignment
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <TextField
            fullWidth
            label="Title"
            margin="normal"
            size="small"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Batch"
            margin="normal"
            size="small"
            value={formData.batch}
            onChange={(e) =>
              setFormData({ ...formData, batch: e.target.value })
            }
          />

          <TextField
            fullWidth
            type="date"
            margin="normal"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Maximum Marks"
            margin="normal"
            size="small"
            value={formData.marks}
            onChange={(e) =>
              setFormData({ ...formData, marks: e.target.value })
            }
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, borderRadius: 1 }}
            onClick={handleCreate}
          >
            Add Assignment
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AssessmentManagement;