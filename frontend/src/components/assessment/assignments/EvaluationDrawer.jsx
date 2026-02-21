import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

const EvaluationDrawer = ({ open, setOpen, onSubmit }) => {
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!marks) return; // basic validation

    onSubmit({
      marks,
      feedback,
    });

    setMarks("");
    setFeedback("");
    setOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box
        sx={{
          width: { xs: 320, sm: 420 },
          height: "100%",
          p: 4,
          background: "#fff",
        }}
      >
        {/* 🔥 Gradient Header */}
        <Box
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            color: "#fff",
            boxShadow: "0 10px 24px rgba(99,102,241,0.35)",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Evaluate Assignment
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Provide marks and feedback for the student
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Marks Field */}
        <TextField
          fullWidth
          label="Marks Awarded"
          size="small"
          type="number"
          margin="normal"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />

        {/* Feedback Field */}
        <TextField
          fullWidth
          label="Feedback"
          size="small"
          margin="normal"
          multiline
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {/* Submit Button */}
        <Button
          startIcon={<CheckCircleIcon />}
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            borderRadius: 3,
            fontWeight: 600,
          }}
          onClick={handleSubmit}
        >
          Submit Evaluation
        </Button>
      </Box>
    </Drawer>
  );
};

export default EvaluationDrawer;