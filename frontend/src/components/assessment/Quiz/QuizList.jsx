import { Box, Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const QuizList = () => {
  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "duration", headerName: "Duration (min)", flex: 1 },
    { field: "totalMarks", headerName: "Total Marks", flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      title: "Java Basics Quiz",
      duration: 30,
      totalMarks: 50,
    },
  ];

  return (
    <Box>
      <Button variant="contained">Create Quiz</Button>

      <Paper sx={{ height: 400, mt: 2 }}>
        <DataGrid rows={rows} columns={columns} />
      </Paper>
    </Box>
  );
};

export default QuizList;