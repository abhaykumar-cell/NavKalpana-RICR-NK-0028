import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

const QuestionBuilder = () => {
  const [question, setQuestion] = useState("");

  return (
    <Box mt={3}>
      <TextField
        fullWidth
        label="Add MCQ Question"
        size="small"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <Button
        variant="outlined"
        sx={{ mt: 2, borderRadius: 1 }}
      >
        Add Question
      </Button>
    </Box>
  );
};

export default QuestionBuilder;