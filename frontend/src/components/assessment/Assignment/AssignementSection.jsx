import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const AssignmentSection = ({ lesson }) => {
  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "deadline", headerName: "Deadline", flex: 1 },
    { field: "marks", headerName: "Max Marks", flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      title: `${lesson} - React Assignment`,
      deadline: "2026-02-28",
      marks: 100,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        {lesson} Assignments
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }}>
        + Create Assignment
      </Button>

      <Paper sx={{ height: 350 }}>
        <DataGrid rows={rows} columns={columns} />
      </Paper>
    </Box>
  );
};

export default AssignmentSection;