import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { createBatch } from "../../../api/BatchService";

const CreateBatchDialog = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    totalStudents: "",
    progressPercentage: 0,
    status: "ONGOING",
    startDate: "",
    endDate: "",
    courseId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await createBatch(form);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create Batch</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Batch Name" name="name" onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Type" name="type" onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Total Students" name="totalStudents" type="number" onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Course ID" name="courseId" type="number" onChange={handleChange} />
        <TextField fullWidth margin="dense" type="date" name="startDate" onChange={handleChange} />
        <TextField fullWidth margin="dense" type="date" name="endDate" onChange={handleChange} />
        <TextField
          select
          fullWidth
          margin="dense"
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <MenuItem value="ONGOING">Ongoing</MenuItem>
          <MenuItem value="COMPLETED">Completed</MenuItem>
          <MenuItem value="UPCOMING">Upcoming</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBatchDialog;