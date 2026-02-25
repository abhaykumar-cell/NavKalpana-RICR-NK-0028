import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions
} from "@mui/material";
import { useState, useEffect } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";

const CreateAssignmentDialog = ({ open, onClose, lessonId }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    maxMarks: ""
  });

  useEffect(() => {
    if (open) {
      setForm({
        title: "",
        description: "",
        deadline: "",
        maxMarks: ""
      });
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!form.title || !form.deadline || !form.maxMarks) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await API.post("/api/assignments", {
        title: form.title,
        description: form.description,
        deadline: form.deadline,
        maxMarks: Number(form.maxMarks),
        submissionType: "PDF",
        lessonId
      });

      toast.success("Assignment created successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create assignment");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create Assignment</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          fullWidth
          multiline
          rows={3}
        />

        <TextField
          label="Deadline"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label="Max Marks"
          type="number"
          value={form.maxMarks}
          onChange={(e) => setForm({ ...form, maxMarks: e.target.value })}
          required
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAssignmentDialog;