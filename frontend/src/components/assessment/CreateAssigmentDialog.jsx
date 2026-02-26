import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem
} from "@mui/material";
import { useState } from "react";
import API from "../../api/api";
import { toast } from "react-toastify";

const submissionTypes = ["PDF", "IMAGE", "ZIP", "DOC", "LINK"];

const CreateAssignmentDialog = ({ open, onClose, lessonId, reload }) => {

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    maxMarks: "",
    submissionType: "PDF"
  });

  const handleSubmit = async () => {
    try {
      await API.post("/api/assignments", {
        ...form,
        lessonId
      });

      toast.success("Assignment Created Successfully");
      reload();
      onClose();
    } catch (error) {
      toast.error("Error creating assignment");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Assignment</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          margin="dense"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <TextField
          fullWidth
          label="Description"
          margin="dense"
          multiline
          rows={3}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <TextField
          fullWidth
          type="date"
          margin="dense"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />

        <TextField
          fullWidth
          type="number"
          label="Max Marks"
          margin="dense"
          onChange={(e) => setForm({ ...form, maxMarks: e.target.value })}
        />

        <TextField
          select
          fullWidth
          label="Submission Type"
          margin="dense"
          defaultValue="PDF"
          onChange={(e) => setForm({ ...form, submissionType: e.target.value })}
        >
          {submissionTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
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