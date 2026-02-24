import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const QuizSection = ({ lesson }) => {
  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "totalMarks", headerName: "Total Marks", flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      title: `${lesson} - Java Quiz`,
      duration: "30 min",
      totalMarks: 50,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        {lesson} Quiz
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }}>
        + Create Quiz
      </Button>

      <Paper sx={{ height: 350 }}>
        <DataGrid rows={rows} columns={columns} />
      </Paper>
    </Box>
  );
};

export default QuizSection;