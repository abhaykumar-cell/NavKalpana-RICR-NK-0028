import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { createBatch } from "../../../api/BatchService";
import { getAllCourses } from "../../../api/CourseService";
import { toast } from "react-toastify";

const CreateBatchDialog = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    progressPercentage: 0,
    status: "ONGOING",
    startDate: "",
    endDate: "",
    courseId: "",
  });

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  // 🔥 Fetch Courses when dialog opens
  useEffect(() => {
    if (!open) return;

    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const data = await getAllCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error("Failed to load courses ❌");
        setCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.type ||
      !form.courseId ||
      !form.startDate ||
      !form.endDate
    ) {
      toast.error("Please fill all required fields ❗");
      return;
    }

    try {
      await createBatch({
        ...form,
        courseId: Number(form.courseId),
      });

      toast.success("Batch created successfully ✅");
      onSuccess();
      onClose();

      // Reset form
      setForm({
        name: "",
        type: "",
        progressPercentage: 0,
        status: "ONGOING",
        startDate: "",
        endDate: "",
        courseId: "",
      });
    } catch (error) {
      toast.error("Failed to create batch ❌");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Batch</DialogTitle>

      <DialogContent>
        {/* Batch Name */}
        <TextField
          fullWidth
          margin="dense"
          label="Batch Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        {/* Batch Type */}
        <TextField
          select
          fullWidth
          margin="dense"
          label="Batch Type"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <MenuItem value="REGULAR">Regular</MenuItem>
          <MenuItem value="WEEKEND">Weekend</MenuItem>
          <MenuItem value="FAST_TRACK">Fast Track</MenuItem>
          <MenuItem value="ONLINE">Online</MenuItem>
        </TextField>

        {/* Course Dropdown */}
        <TextField
          select
          fullWidth
          margin="dense"
          label="Select Course"
          name="courseId"
          value={form.courseId}
          onChange={handleChange}
        >
          {loadingCourses ? (
            <MenuItem disabled>
              <CircularProgress size={20} />
            </MenuItem>
          ) : courses.length === 0 ? (
            <MenuItem disabled>No Courses Available</MenuItem>
          ) : (
            courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
              </MenuItem>
            ))
          )}
        </TextField>

        {/* Start Date */}
        <TextField
          fullWidth
          margin="dense"
          label="Batch Start Date"
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        {/* End Date */}
        <TextField
          fullWidth
          margin="dense"
          label="Batch End Date"
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        {/* Status */}
        <TextField
          select
          fullWidth
          margin="dense"
          label="Batch Status"
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