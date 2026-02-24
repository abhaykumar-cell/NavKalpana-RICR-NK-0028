import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateBatch } from "../../../api/BatchService";

const EditBatchDialog = ({ batch, onClose, onSuccess }) => {
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

  const [loading, setLoading] = useState(false);

  // 🔥 Prefill form when batch changes
  useEffect(() => {
    if (batch) {
      setForm({
        name: batch.name || "",
        type: batch.type || "",
        totalStudents: batch.totalStudents || "",
        progressPercentage: batch.progressPercentage || 0,
        status: batch.status || "ONGOING",
        startDate: batch.startDate || "",
        endDate: batch.endDate || "",
        courseId: batch.courseId || "",
      });
    }
  }, [batch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateBatch(batch.id, form);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (!batch) return null;

  return (
    <Dialog open={Boolean(batch)} onClose={onClose} fullWidth>
      <DialogTitle>Edit Batch</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Batch Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Total Students"
            name="totalStudents"
            type="number"
            value={form.totalStudents}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Progress (%)"
            name="progressPercentage"
            type="number"
            value={form.progressPercentage}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="ONGOING">Ongoing</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
            <MenuItem value="UPCOMING">Upcoming</MenuItem>
          </TextField>

          <TextField
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Course ID"
            name="courseId"
            type="number"
            value={form.courseId}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBatchDialog;