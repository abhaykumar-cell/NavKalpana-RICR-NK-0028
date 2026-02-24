import {
  Box,
  Button,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import CreateAssignment from "../assessment/Assignment/CreateAssignment";

const AssignmentList = ({ lesson }) => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  // Lesson-wise Data Load (API ready structure)
  useEffect(() => {
    if (!lesson?.id) return;

    // 🔥 Later replace this with API call:
    // axios.get(`/assignments?lessonId=${lesson.id}`)

    const lessonData = [
      {
        id: 1,
        title: `${lesson.name} - React Hooks`,
        deadline: "2026-02-28",
        maxMarks: 100,
        status: "Submitted",
      },
      {
        id: 2,
        title: `${lesson.name} - API Integration`,
        deadline: "2026-03-05",
        maxMarks: 50,
        status: "Not Submitted",
      },
    ];

    setRows(lessonData);
  }, [lesson?.id]);

  const columns = [
    { field: "title", headerName: "Title", flex: 1.5 },
    { field: "deadline", headerName: "Deadline", flex: 1 },
    { field: "maxMarks", headerName: "Max Marks", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        let color = "default";

        if (params.value === "Evaluated") color = "success";
        else if (params.value === "Late Submitted") color = "warning";
        else if (params.value === "Submitted") color = "info";
        else if (params.value === "Not Submitted") color = "default";

        return <Chip label={params.value} color={color} size="small" />;
      },
    },
  ];

  return (
    <Box>
      {/* Heading */}
      <Typography variant="h6" mb={2}>
        {lesson?.name} Assignments
      </Typography>

      {/* Create Button */}
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        + Create Assignment
      </Button>

      {/* Table Section */}
      <Paper sx={{ height: 400 }}>
        {rows.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography color="text.secondary">
              No assignments created for this lesson.
            </Typography>
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        )}
      </Paper>

      {/* Create Dialog */}
      <CreateAssignment
        open={open}
        handleClose={() => setOpen(false)}
        lesson={lesson}
      />
    </Box>
  );
};

export default AssignmentList;